// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCF2ZNpG7xI4cCbillpi4RLm0gyavQzIrQ",
    authDomain: "open-learn-lms.firebaseapp.com",
    projectId: "open-learn-lms",
    storageBucket: "open-learn-lms.firebasestorage.app",
    messagingSenderId: "536639333963",
    appId: "1:536639333963:web:7e92c5e8b18b9a9fa30fce",
    measurementId: "G-3N7EDVQDMX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Global variables
let currentUser = null;
let userProfile = null;

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const loginPage = document.getElementById('loginPage');
const dashboard = document.getElementById('dashboard');
const homeSection = document.getElementById('homeSection');
const profileSection = document.getElementById('profileSection');
const submissionsSection = document.getElementById('submissionsSection');
const completedSection = document.getElementById('completedSection');

// Navigation elements
const homeBtn = document.getElementById('homeBtn');
const profileBtn = document.getElementById('profileBtn');
const submissionsBtn = document.getElementById('submissionsBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Mobile Navigation elements
const mobileHomeBtn = document.getElementById('mobileHomeBtn');
const mobileProfileBtn = document.getElementById('mobileProfileBtn');

// Utility Functions
function showLoading() {
    loadingScreen.classList.remove('hidden');
}

function hideLoading() {
    loadingScreen.classList.add('hidden');
}

function showError(message, elementId = 'loginError', duration = 5000) {
    const errorEl = document.getElementById(elementId);
    if (!errorEl) return;

    // Clear any existing timeout
    if (errorEl.timeoutId) {
        clearTimeout(errorEl.timeoutId);
    }

    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
    
    // For cooldown messages, show them longer
    const timeoutDuration = message.includes('Please wait') ? 10000 : duration;
    
    errorEl.timeoutId = setTimeout(() => {
        errorEl.classList.add('hidden');
    }, timeoutDuration);
}

function showSuccess(message) {
    // Create enhanced success message
    const successEl = document.createElement('div');
    successEl.className = 'fixed top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 slide-up border border-white/20';
    successEl.innerHTML = `
        <div class="flex items-center space-x-3">
        </div>
    `;
    document.body.appendChild(successEl);
    setTimeout(() => {
        successEl.style.opacity = '0';
        successEl.style.transform = 'translateX(100%)';
        setTimeout(() => successEl.remove(), 300);
    }, 3000);
}

// Convert Google Drive share link to direct download link
function convertGoogleDriveLink(shareLink) {
    const fileIdMatch = shareLink.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
    return shareLink; // Return original if not a Google Drive link
}

// Section Management
function showSection(section) {
    // Hide all sections first
    homeSection.classList.add('hidden');
    profileSection.classList.add('hidden');
    submissionsSection.classList.add('hidden');
    completedSection.classList.add('hidden');

    // Reset all navigation highlights
    document.getElementById('homeBtn').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('profileBtn').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('submissionsBtn').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('completedBtn').classList.remove('text-blue-600', 'bg-blue-50');

    // Show the selected section and highlight its navigation
    switch(section) {
        case 'home':
            homeSection.classList.remove('hidden');
            document.getElementById('homeBtn').classList.add('text-blue-600', 'bg-blue-50');
            break;
        case 'profile':
            profileSection.classList.remove('hidden');
            document.getElementById('profileBtn').classList.add('text-blue-600', 'bg-blue-50');
            break;
        case 'submissions':
            submissionsSection.classList.remove('hidden');
            document.getElementById('submissionsBtn').classList.add('text-blue-600', 'bg-blue-50');
            loadSubmissions();
            break;
        case 'completed':
            completedSection.classList.remove('hidden');
            document.getElementById('completedBtn').classList.add('text-blue-600', 'bg-blue-50');
            loadSubmissions();
            break;
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

// Authentication State Observer
auth.onAuthStateChanged(async (user) => {
    if (user) {
        currentUser = user;
        await loadUserProfile();
        if (userProfile && userProfile.role === 'student') {
            showSection('home'); // Show home section by default
        } else {
            auth.signOut();
            showError('Access denied. This portal is for students only.');
        }
    } else {
        currentUser = null;
        userProfile = null;
        showLogin();
    }
    hideLoading();
});

// Load user profile from database
async function loadUserProfile() {
    try {
        const snapshot = await database.ref(`users/${currentUser.uid}`).once('value');
        userProfile = snapshot.val();
        if (userProfile) {
            populateProfileForm();
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        showError('Error loading profile data');
    }
}

// Populate profile form with user data
function populateProfileForm() {
    if (userProfile) {
        document.getElementById('profileName').value = userProfile.name || '';
        document.getElementById('profileEmail').value = userProfile.email || '';
        document.getElementById('profileContact').value = userProfile.contact || '';
        document.getElementById('profileAddress').value = userProfile.address || '';
    }
}

// Show login page
function showLogin() {
    loginPage.classList.remove('hidden');
    dashboard.classList.add('hidden');
}

// Show dashboard
function showDashboard() {
    loginPage.classList.add('hidden');
    dashboard.classList.remove('hidden');
    showProfileSection(); // Default to profile section
    loadSubmissions();
}

// Navigation functions
function showProfileSection() {
    profileSection.classList.remove('hidden');
    submissionsSection.classList.add('hidden');
    profileBtn.classList.add('text-blue-600', 'bg-blue-50');
    submissionsBtn.classList.remove('text-blue-600', 'bg-blue-50');
}

function showSubmissionsSection() {
    // Clear all section displays
    document.getElementById('profileSection').classList.add('hidden');
    document.getElementById('submissionsSection').classList.remove('hidden');
    document.getElementById('completedSection').classList.add('hidden');
    
    // Update button states
    document.getElementById('profileBtn').classList.remove('text-blue-600', 'bg-blue-50');
    document.getElementById('submissionsBtn').classList.add('text-blue-600', 'bg-blue-50');
    document.getElementById('completedBtn').classList.remove('text-blue-600', 'bg-blue-50');
    
    // Clear containers and reload submissions
    document.getElementById('activeSubmissions').innerHTML = '';
    document.getElementById('previousSubmissions').innerHTML = '';
    loadSubmissions();
}

// Load submissions
async function loadSubmissions() {
    try {
        console.log('Loading submissions...');
        // Clear both containers first
        document.getElementById('activeSubmissions').innerHTML = '<div class="text-center py-4">Loading submissions...</div>';
        document.getElementById('previousSubmissions').innerHTML = '';
        
        // Load active submissions
        const submissionsSnapshot = await database.ref('submissions').once('value');
        const submissions = submissionsSnapshot.val() || {};
        console.log('Loaded submissions:', submissions);
        
        // Load student submissions
        const studentSubmissionsSnapshot = await database.ref('studentSubmissions').once('value');
        const studentSubmissions = studentSubmissionsSnapshot.val() || {};
        console.log('Loaded student submissions:', studentSubmissions);
        
        // Always display both sections when loading
        displayActiveSubmissions(submissions, studentSubmissions);
        displayPreviousSubmissions(submissions, studentSubmissions);
        
        console.log('Submissions displayed');
    } catch (error) {
        console.error('Error loading submissions:', error);
        document.getElementById('activeSubmissions').innerHTML = '';
        showError('Error loading submissions: ' + error.message);
    }
}

// Display active submissions
function displayActiveSubmissions(submissions, studentSubmissions) {
    console.log('Displaying active submissions');
    const container = document.getElementById('activeSubmissions');
    container.innerHTML = '';
    
    let hasActiveSubmissions = false;
    
    if (!submissions || Object.keys(submissions).length === 0) {
        container.innerHTML = '<div class="text-center py-8">No active assignments found</div>';
        return;
    }
    
    Object.entries(submissions).forEach(([submissionId, submission]) => {
        console.log('Processing submission:', submissionId, submission);
        const userSubmission = studentSubmissions[submissionId]?.[currentUser.uid];
        if (!userSubmission && submission) {
            hasActiveSubmissions = true;
            container.appendChild(createSubmissionCard(submissionId, submission));
        }
    });
    
    if (!hasActiveSubmissions) {
        container.innerHTML = '<div class="text-center py-8">No active assignments available</div>';
    }
}

// Display previous submissions
function displayPreviousSubmissions(submissions, studentSubmissions) {
    const container = document.getElementById('previousSubmissions');
    container.innerHTML = '';
    
    let hasPreviousSubmissions = false;
    
    Object.entries(submissions).forEach(([submissionId, submission]) => {
        const userSubmission = studentSubmissions[submissionId]?.[currentUser.uid];
        if (userSubmission && submission) {
            hasPreviousSubmissions = true;
            container.appendChild(createPreviousSubmissionCard(submissionId, submission, userSubmission));
        }
    });
    
    if (!hasPreviousSubmissions) {
        container.innerHTML = '<div class="text-center py-8">No completed assignments found</div>';
    }
}

// Create enhanced submission card
function createSubmissionCard(submissionId, submission) {
    const card = document.createElement('div');
    card.className = 'bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 card-hover slide-up';
    
    card.innerHTML = `
        <div class="card-content">
            <h3 class="text-xl font-semibold mb-2">${submission.title}</h3>
            <p class="text-gray-600 mb-4">${submission.description}</p>
            <div class="space-y-4 mt-auto">
                <div class="relative">
                    <input type="text" id="url-${submissionId}" placeholder="Paste Google Drive link here" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200">
                </div>
                <button onclick="submitAssignment('${submissionId}')" class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Submit Assignment</span>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Create enhanced previous submission card
function createPreviousSubmissionCard(submissionId, submission, userSubmission) {
    const card = document.createElement('div');
    card.className = 'bg-white/80 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 card-hover slide-up';
    
    const submittedDate = new Date(userSubmission.submittedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    card.innerHTML = `
        <div class="card-content">
            <h3 class="text-xl font-semibold mb-2">${submission.title}</h3>
            <p class="text-gray-600 mb-4">${submission.description}</p>
            <div class="mt-4 pt-4 border-t border-gray-100">
                <p class="text-sm text-gray-500">Submitted on ${submittedDate}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Submit assignment
window.submitAssignment = async function(submissionId) {
    const urlInput = document.getElementById(`url-${submissionId}`);
    const url = urlInput.value.trim();
    
    if (!url) {
        showError('Please enter a Google Drive link');
        return;
    }
    
    // Add loading state
    const button = urlInput.parentElement.nextElementSibling;
    const originalText = button.innerHTML;
    button.innerHTML = `
        <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
        <span>Submitting...</span>
    `;
    button.disabled = true;
    
    try {
        const directDownload = convertGoogleDriveLink(url);
        
        await database.ref(`studentSubmissions/${submissionId}/${currentUser.uid}`).set({
            submittedAt: new Date().toISOString()
        });
        
        showSuccess('Assignment submitted successfully!');
        loadSubmissions(); // Refresh submissions
    } catch (error) {
        console.error('Error submitting assignment:', error);
        showError('Error submitting assignment');
        
        // Restore button
        button.innerHTML = originalText;
        button.disabled = false;
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            <span>Signing In...</span>
        `;
        submitBtn.disabled = true;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            showError("Your Email or Password is wrong Please Try Again");
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
            <span>Saving...</span>
        `;
        submitBtn.disabled = true;
        
        try {
            const updates = {
                name: document.getElementById('profileName').value,
                email: document.getElementById('profileEmail').value,
                contact: document.getElementById('profileContact').value,
                address: document.getElementById('profileAddress').value
            };
            
            await database.ref(`users/${currentUser.uid}`).update(updates);
            showSuccess('Profile updated successfully!');
            userProfile = { ...userProfile, ...updates };
        } catch (error) {
            console.error('Error updating profile:', error);
            showError('Error updating profile');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Navigation event listeners
    homeBtn?.addEventListener('click', () => showSection('home'));
    mobileHomeBtn?.addEventListener('click', () => showSection('home'));
    profileBtn?.addEventListener('click', () => showSection('profile'));
    mobileProfileBtn?.addEventListener('click', () => showSection('profile'));
    submissionsBtn?.addEventListener('click', () => showSection('submissions'));
    document.getElementById('completedBtn')?.addEventListener('click', () => showSection('completed'));
    
    logoutBtn?.addEventListener('click', () => {
        auth.signOut();
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Initialize app
    showLoading();
});
