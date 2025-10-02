// MCQ Handler Class
class MCQHandler {
    constructor() {
        this.currentQuestions = [];
        this.currentAnswers = [];
        this.currentIndex = 0;
        this.timer = null;
        this.seconds = 0;
        this.initializeElements();
        this.initializeEventListeners();
        console.log('MCQ Handler initialized');
    }

    initializeElements() {
        // Get all required elements
        this.subjectSelect = document.getElementById('mcqSubject');
        this.paperSelect = document.getElementById('mcqPaper');
        this.startButton = document.getElementById('startMcq');
        this.mcqContainer = document.getElementById('mcqContainer');
        this.resultsContainer = document.getElementById('resultsContainer');
        this.questionText = document.getElementById('questionText');
        this.optionsContainer = document.getElementById('options');
        this.currentQuestionSpan = document.getElementById('currentQuestion');
        this.totalQuestionsSpan = document.getElementById('totalQuestions');
        this.timerSpan = document.getElementById('mcqTimer');
        this.prevButton = document.getElementById('prevQuestion');
        this.nextButton = document.getElementById('nextQuestion');
        this.submitButton = document.getElementById('submitMcq');
        this.tryAnotherButton = document.getElementById('tryAnotherMcq');

        // Verify all elements exist
        const elements = {
            subjectSelect: this.subjectSelect,
            paperSelect: this.paperSelect,
            startButton: this.startButton,
            mcqContainer: this.mcqContainer
        };

        for (let [name, element] of Object.entries(elements)) {
            if (!element) {
                console.error(`Element ${name} not found!`);
            }
        }
    }

    initializeEventListeners() {
        if (this.subjectSelect) {
            this.subjectSelect.addEventListener('change', () => {
                console.log('Subject changed');
                this.handleSubjectChange();
            });
        }

        if (this.paperSelect) {
            this.paperSelect.addEventListener('change', () => {
                console.log('Paper changed');
                this.handlePaperChange();
            });
        }

        if (this.startButton) {
            this.startButton.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startMCQ();
            });
        }

        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.showPreviousQuestion());
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.showNextQuestion());
        }

        if (this.submitButton) {
            this.submitButton.addEventListener('click', () => this.submitMCQ());
        }

        if (this.tryAnotherButton) {
            this.tryAnotherButton.addEventListener('click', () => this.resetMCQ());
        }

        console.log('Event listeners attached');
    }

    handleSubjectChange() {
        const subject = this.subjectSelect.value;
        console.log('Selected subject:', subject);

        // Reset paper selection
        this.paperSelect.innerHTML = '<option value="">Select Paper</option>';
        this.paperSelect.disabled = true;
        this.startButton.disabled = true;

        if (!subject) {
            console.log('No subject selected');
            return;
        }

        // Check if mcqData exists
        if (typeof mcqData === 'undefined') {
            console.error('mcqData is not defined!');
            alert('Error: MCQ data not loaded. Please refresh the page.');
            return;
        }

        // Check if subject exists in data
        if (!mcqData[subject]) {
            console.error('Subject not found in mcqData:', subject);
            alert('No data available for this subject.');
            return;
        }

        // Get papers for this subject
        const papers = Object.keys(mcqData[subject]);
        console.log('Papers available:', papers);

        if (papers.length === 0) {
            console.log('No papers found for subject');
            return;
        }

        // Populate paper dropdown
        papers.forEach(paper => {
            const option = document.createElement('option');
            option.value = paper;
            option.textContent = paper;
            this.paperSelect.appendChild(option);
        });

        // Enable paper dropdown
        this.paperSelect.disabled = false;
        console.log('Paper dropdown populated and enabled');
    }

    handlePaperChange() {
        const paperValue = this.paperSelect.value;
        console.log('Selected paper:', paperValue);

        // Enable start button only if paper is selected
        this.startButton.disabled = !paperValue;
        
        if (paperValue) {
            console.log('Start button enabled');
        }
    }

    startMCQ() {
        const subject = this.subjectSelect.value;
        const paper = this.paperSelect.value;

        console.log('Starting MCQ:', { subject, paper });

        // Validate selections
        if (!subject || !paper) {
            alert('Please select both subject and paper');
            return;
        }

        // Check if data exists
        if (typeof mcqData === 'undefined' || !mcqData[subject] || !mcqData[subject][paper]) {
            console.error('MCQ data not found:', { subject, paper });
            alert('Error: MCQ data not found. Please try again.');
            return;
        }

        // Get questions
        this.currentQuestions = mcqData[subject][paper];

        if (!this.currentQuestions || this.currentQuestions.length === 0) {
            alert('No questions available for this paper');
            return;
        }

        console.log('Loaded questions:', this.currentQuestions.length);

        // Initialize MCQ state
        this.currentAnswers = new Array(this.currentQuestions.length).fill(null);
        this.currentIndex = 0;
        this.seconds = 0;

        // Show MCQ container, hide results
        this.mcqContainer.classList.remove('hidden');
        this.resultsContainer.classList.add('hidden');
        this.submitButton.classList.add('hidden');

        // Update UI
        this.totalQuestionsSpan.textContent = this.currentQuestions.length;
        
        // Start timer
        this.startTimer();
        
        // Show first question
        this.showQuestion();
    }

    showQuestion() {
        const question = this.currentQuestions[this.currentIndex];
        
        // Update question number
        this.currentQuestionSpan.textContent = this.currentIndex + 1;
        
        // Update question text
        this.questionText.textContent = question.question;

        // Clear and populate options
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'w-full p-4 text-left rounded-xl transition-all duration-200 ';
            
            // Highlight if this option was selected
            if (this.currentAnswers[this.currentIndex] === index) {
                button.className += 'bg-purple-600 text-white';
            } else {
                button.className += 'bg-white/10 text-white hover:bg-white/20';
            }
            
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.optionsContainer.appendChild(button);
        });

        // Update navigation buttons
        this.prevButton.disabled = this.currentIndex === 0;
        
        // Change next button text on last question
        if (this.currentIndex === this.currentQuestions.length - 1) {
            this.nextButton.innerHTML = 'Finish<i class="fas fa-check ml-2"></i>';
        } else {
            this.nextButton.innerHTML = 'Next<i class="fas fa-arrow-right ml-2"></i>';
        }
    }

    selectAnswer(index) {
        console.log('Answer selected:', index);
        this.currentAnswers[this.currentIndex] = index;
        this.showQuestion(); // Refresh to show selection
    }

    showPreviousQuestion() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.showQuestion();
        }
    }

    showNextQuestion() {
        if (this.currentIndex < this.currentQuestions.length - 1) {
            this.currentIndex++;
            this.showQuestion();
        } else {
            // Show submit button on last question
            this.submitButton.classList.remove('hidden');
        }
    }

    startTimer() {
        // Clear existing timer if any
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const remainingSeconds = this.seconds % 60;
            this.timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }, 1000);
    }

    submitMCQ() {
        // Stop timer
        clearInterval(this.timer);

        // Hide MCQ container
        this.mcqContainer.classList.add('hidden');
        
        // Show results container
        this.resultsContainer.classList.remove('hidden');

        // Calculate results
        const totalQuestions = this.currentQuestions.length;
        let correctAnswers = 0;

        this.currentAnswers.forEach((answer, index) => {
            if (answer === this.currentQuestions[index].answer) {
                correctAnswers++;
            }
        });

        // Display results
        document.getElementById('resultTotal').textContent = totalQuestions;
        document.getElementById('resultCorrect').textContent = correctAnswers;
        document.getElementById('resultTime').textContent = this.timerSpan.textContent;

        // Show answer review
        const answersReview = document.getElementById('answersReview');
        answersReview.innerHTML = '';

        this.currentQuestions.forEach((question, index) => {
            const userAnswer = this.currentAnswers[index];
            const isCorrect = userAnswer === question.answer;

            const questionDiv = document.createElement('div');
            questionDiv.className = `p-6 rounded-2xl ${isCorrect ? 'bg-green-600/20 border border-green-500/30' : 'bg-red-600/20 border border-red-500/30'}`;
            
            questionDiv.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-white">Question ${index + 1}</h3>
                    <span class="${isCorrect ? 'text-green-400' : 'text-red-400'} flex items-center gap-2">
                        <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                        ${isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                <p class="text-white mb-4 font-medium">${question.question}</p>
                <div class="space-y-2 text-sm">
                    <p class="text-gray-300">
                        <span class="font-semibold">Your answer:</span> 
                        <span class="text-white">${userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</span>
                    </p>
                    <p class="text-gray-300">
                        <span class="font-semibold">Correct answer:</span> 
                        <span class="text-green-400">${question.options[question.answer]}</span>
                    </p>
                    <p class="text-gray-300 mt-3 pt-3 border-t border-white/10">
                        <i class="fas fa-info-circle mr-2"></i>
                        <span class="font-semibold">Explanation:</span> ${question.explanation}
                    </p>
                </div>
            `;
            
            answersReview.appendChild(questionDiv);
        });

        // Scroll to top of results
        this.resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }

    resetMCQ() {
        // Reset all values
        this.subjectSelect.value = '';
        this.paperSelect.innerHTML = '<option value="">Select Paper</option>';
        this.paperSelect.disabled = true;
        this.startButton.disabled = true;
        
        // Hide containers
        this.mcqContainer.classList.add('hidden');
        this.resultsContainer.classList.add('hidden');
        
        // Reset state
        this.currentQuestions = [];
        this.currentAnswers = [];
        this.currentIndex = 0;
        
        // Stop and reset timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.seconds = 0;
        this.timerSpan.textContent = '00:00';

        console.log('MCQ reset');
    }
}

// Initialize MCQ Handler when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMCQHandler);
} else {
    initializeMCQHandler();
}

function initializeMCQHandler() {
    // Check if mcqData is loaded
    if (typeof mcqData === 'undefined') {
        console.error('ERROR: mcqData is not loaded! Make sure mcq-data.js is included before mcq-handler.js');
        alert('Error loading MCQ data. Please refresh the page.');
        return;
    }

    console.log('MCQ Data available:', Object.keys(mcqData));
    
    // Create global instance
    window.mcqHandler = new MCQHandler();
    console.log('MCQ Handler ready!');
}