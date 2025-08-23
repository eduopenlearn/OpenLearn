// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_QRk_FozjBq6pOz114w8dsXvizs8dJ7U",
    authDomain: "open-learn-edu.firebaseapp.com",
    projectId: "open-learn-edu",
    storageBucket: "open-learn-edu.firebasestorage.app",
    messagingSenderId: "366212148278",
    appId: "1:366212148278:web:2bd66dee1fa9fe65267c97",
    measurementId: "G-KR8VP936VS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global variables
let allFiles = [];
let currentSection = 'home';

// Notification System
function updateNotificationBadge() {
    const notificationDot = document.getElementById('notificationDot');
    const notificationList = document.getElementById('notificationList');
    
    // Get recent files (uploaded within last 24 hours)
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const recentFiles = allFiles.filter(file => {
        const uploadDate = new Date(file.uploadDate).getTime();
        return (now - uploadDate) < oneDayMs;
    });

    // Update notification dot
    if (recentFiles.length > 0) {
        notificationDot.classList.remove('hidden');
    } else {
        notificationDot.classList.add('hidden');
    }

    // Update notification list
    notificationList.innerHTML = recentFiles.map(file => `
        <li class="notification-hover px-4 py-3 transition-all duration-300">
            <div class="flex items-center">
                <i class="${getFileIcon(getFileType(file.downloadLink))} text-purple-400 mr-3"></i>
                <div class="flex-1">
                    <h4 class="text-sm font-semibold text-white mb-1">${file.title || 'Untitled'}</h4>
                    <p class="text-xs text-gray-400">
                        Uploaded ${new Date(file.uploadDate).toLocaleString()}
                    </p>
                </div>
            </div>
        </li>
    `).join('') || '<li class="p-4 text-center text-gray-400">No new files</li>';
}

// Load files and update counts on page load
window.addEventListener('DOMContentLoaded', () => {
    loadFiles();
    setupSectionSearch();
});

// Load files from Firestore
async function loadFiles() {
    try {
        const filesSnapshot = await db.collection('files').get();
        allFiles = [];
        
        filesSnapshot.forEach(doc => {
            allFiles.push({
                id: doc.id,
                ...doc.data()
            });
        });

        updateCounts();
        loadingState.classList.add('hidden');
        updateNotificationBadge();
    } catch (error) {
        console.error('Error loading files:', error);
        loadingState.innerHTML = '<div class="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 text-center border border-red-500/20"><p class="text-red-300">Error loading files. Please try again later.</p></div>';
    }
}

// Update file counts
function updateCounts() {
    const notesFiles = allFiles.filter(file => {
        const lowerCategory = file.category?.toLowerCase() || '';
        const lowerTitle = file.title?.toLowerCase() || '';
        // Check if it's specifically categorized as notes
        if (lowerCategory === 'notes' || lowerCategory === 'study notes') return true;
        // Check if it contains 'notes' and isn't a paper or assignment
        return (lowerCategory.includes('notes') || lowerTitle.includes('notes')) && 
               !lowerCategory.includes('paper') && 
               !lowerCategory.includes('assignment');
    });

    const PapersFiles = allFiles.filter(file => {
        const lowerCategory = file.category?.toLowerCase() || '';
        const lowerTitle = file.title?.toLowerCase() || '';
        // Specifically look for practical papers only
        return lowerCategory.includes('practical paper') || 
               lowerTitle.includes('practical paper') ||
               lowerCategory === 'papers';
    });

    const assignmentFiles = allFiles.filter(file => 
        file.category?.toLowerCase().includes('assignment') || 
        file.title?.toLowerCase().includes('assignment') ||
        file.category?.toLowerCase().includes('exercise')
    );
    const videoFiles = allFiles.filter(file => 
        file.category?.toLowerCase().includes('video') || 
        file.title?.toLowerCase().includes('video') ||
        file.category?.toLowerCase().includes('tutorial')
    );
    
    // Include videos from video-card-generator.js
    const totalVideoCount = videoFiles.length + (typeof videoData !== 'undefined' ? videoData.length : 0);
    
    const totalDownloadCount = allFiles.reduce((sum, file) => sum + (file.downloads || 0), 0);

    notesCount.textContent = `${notesFiles.length} Notes`;
    PapersCount.textContent = `${PapersFiles.length} Practical Papers`;
    assignmentCount.textContent = `${assignmentFiles.length} Assignments`;
    videoCount.textContent = `${totalVideoCount} Videos`;
}

// Section navigation
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    // Show selected section
    document.getElementById(section + 'Section').classList.remove('hidden');
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    currentSection = section;
    // Load section-specific content
    if (section === 'notes') {
        renderCategoryFiles('notes', 'notesGrid', 'notesNoResults');
    } else if (section === 'assignment') {
        renderCategoryFiles('Assignment', 'assignmentGrid', 'assignmentNoResults');
    } else if (section === 'Papers') {
        renderCategoryFiles('Papers', 'PapersGrid', 'PapersNoResults');
    }
}

function showAllFiles() {
    // Show all files in a modal or redirect to notes section with all files
    showSection('notes');
    renderAllFiles('notesGrid', 'notesNoResults');
}

// Render files by category
function renderCategoryFiles(category, gridId, noResultsId) {
    const grid = document.getElementById(gridId);
    const noResults = document.getElementById(noResultsId);
    let filteredFiles;
    if (category === 'notes') {
        filteredFiles = allFiles.filter(file => {
            const cat = file.category?.toLowerCase() || '';
            const title = file.title?.toLowerCase() || '';
            return cat.includes('note') || title.includes('note');
        });
    } else if (category === 'assignment' || category === 'Assignment') {
        filteredFiles = allFiles.filter(file => {
            const cat = file.category?.toLowerCase() || '';
            const title = file.title?.toLowerCase() || '';
            return cat === 'assignment' || title.includes('assignment');
        });
    } else if (category === 'Papers') {
        filteredFiles = allFiles.filter(file => {
            const cat = file.category?.toLowerCase() || '';
            const title = file.title?.toLowerCase() || '';
            // Exclude files that are notes or assignments
            const isNotNote = !cat.includes('note') && !title.includes('note');
            const isNotAssignment = !cat.includes('assignment') && !title.includes('assignment');
            // Check if it's a paper or research document
            const isPaper = cat.includes('paper') || cat.includes('research') || title.includes('paper');
            return isPaper && isNotNote && isNotAssignment;
        });
    }
    if (!filteredFiles || filteredFiles.length === 0) {
        grid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }
    noResults.classList.add('hidden');
    grid.classList.remove('hidden');
    renderFilesGrid(filteredFiles, grid);
}

// Render all files
function renderAllFiles(gridId, noResultsId) {
    const grid = document.getElementById(gridId);
    const noResults = document.getElementById(noResultsId);
    
    if (allFiles.length === 0) {
        grid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    grid.classList.remove('hidden');
    
    renderFilesGrid(allFiles, grid);
}

// Render files grid
function renderFilesGrid(files, container) {
    // Always recalculate 'NEW' status for every render
    const now = Date.now();
    const threeDaysMs = 3 * 24 * 60 * 60 * 1000;
    
    // Sort files by upload date (most recent first)
    const sortedFiles = [...files].sort((a, b) => {
        const dateA = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
        const dateB = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
        return dateB - dateA;
    });
    
    container.innerHTML = sortedFiles.map(file => {
        const uploadDate = file.uploadDate ? new Date(file.uploadDate).toLocaleDateString() : 'N/A';
        const fileType = getFileType(file.downloadLink || '');
        // Choose icon and gradient by courseCategory if present, else fallback to fileType
        let courseIcon = '', courseGradient = '';
        switch ((file.courseCategory || '').toLowerCase()) {
            case 'word':
                courseIcon = 'fas fa-file-word';
                courseGradient = 'from-blue-500 to-blue-700';
                break;
            case 'excel':
                courseIcon = 'fas fa-file-excel';
                courseGradient = 'from-green-500 to-green-700';
                break;
            case 'powerpoint':
                courseIcon = 'fas fa-file-powerpoint';
                courseGradient = 'from-orange-500 to-red-500';
                break;
            case 'access':
                courseIcon = 'fas fa-database';
                courseGradient = 'from-pink-600 to-red-700';
                break;
            case 'photoshop':
                courseIcon = 'fas fa-paint-brush';
                courseGradient = 'from-indigo-500 to-blue-900';
                break;
            default:
                courseIcon = getFileIcon(fileType);
                courseGradient = getIconGradient(fileType);
        }
        // recalculate isNew for every card
        const isNew = file.uploadDate && (now - new Date(file.uploadDate).getTime() < threeDaysMs);
        return `
            <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-white/20 hover-scale relative">
                ${isNew ? '<span class="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">NEW</span>' : ''}
                <div class="p-6">
                    <!-- File Icon -->
                    <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${courseGradient} rounded-2xl floating">
                        <i class="${courseIcon} text-white text-2xl"></i>
                    </div>

                    <!-- File Info -->
                    <div class="text-center mb-4">
                        <h3 class="font-bold text-lg text-white mb-3 line-clamp-2" title="${file.title || 'Untitled'}">${file.title || 'Untitled'}</h3>
                        <p class="text-sm text-gray-300 mb-2">
                            <i class="fas fa-user mr-2 text-purple-400"></i>
                            ${file.author || 'Muditha Kaushalya'}
                        </p>
                        <p class="text-xs text-gray-400 mb-2">
                            <i class="fas fa-calendar mr-2 text-blue-400"></i>
                            ${uploadDate}
                        </p>
                        
                        <p class="text-xs text-gray-400 mb-2">
                            <i class="fas fa-download mr-2 text-green-400"></i>
                            ${file.downloads || 0} downloads
                        </p>

                        <span class="inline-block px-3 py-1 text-xs font-semibold text-purple-200 bg-purple-500/30 rounded-full backdrop-blur-sm border border-purple-400/30">
                            ${file.category || fileType}
                        </span>
                    </div>

                    <!-- Action Buttons -->
                    <div class="space-y-3">
                        ${fileType === 'PDF' ? `
                            <button onclick="viewPDF('${file.downloadLink}', '${file.title}')" 
                                    class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                                <i class="fas fa-eye mr-2"></i>
                                View PDF
                            </button>
                        ` : ''}
                        <button onclick="downloadFile('${file.id}', '${file.downloadLink}', '${file.title}')" 
                                class="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-lg">
                                <i class="fas fa-download mr-2"></i>
                                Download ${fileType}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Helper functions
function getFileType(url) {
    const extension = url.split('.').pop().toLowerCase();
    switch(extension) {
        case 'pdf': return 'PDF';
        case 'doc':
        case 'docx': return 'DOCX';
        case 'zip':
        case 'rar': return 'ZIP';
        case 'txt': return 'TXT';
        case 'jpg':
        case 'jpeg':
        case 'png': return 'IMG';
        default: return 'FILE';
    }
}

function getFileIcon(fileType) {
    switch(fileType) {
        case 'PDF': return 'fas fa-file-pdf';
        case 'DOCX': return 'fas fa-file-word';
        case 'ZIP': return 'fas fa-file-archive';
        case 'TXT': return 'fas fa-file-alt';
        case 'IMG': return 'fas fa-file-image';
        default: return 'fas fa-file';
    }
}

function getIconGradient(fileType) {
    switch(fileType) {
        case 'PDF': return 'from-red-500 to-red-600';
        case 'DOCX': return 'from-blue-500 to-blue-600';
        case 'ZIP': return 'from-yellow-500 to-yellow-600';
        case 'TXT': return 'from-gray-500 to-gray-600';
        case 'IMG': return 'from-green-500 to-green-600';
        default: return 'from-purple-500 to-purple-600';
    }
}


// Download file and track
async function downloadFile(fileId, downloadLink, fileName) {
    try {
        // Create download link first to ensure user gets the file
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = fileName || 'download';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Try to increment download counter, but don't block the download
        try {
            await db.collection('files').doc(fileId).update({
                downloads: firebase.firestore.FieldValue.increment(1)
            });
            // Only refresh files if counter update was successful
            setTimeout(() => {
                loadFiles();
            }, 1000);
        } catch (counterError) {
            // Silently handle counter update errors
            console.log('Download counter not updated due to permissions');
        }
    } catch (error) {
        console.error('Error initiating download:', error);
        // Fallback to direct download
        window.open(downloadLink, '_blank');
    }
}

// Search functionality for sections
function setupSectionSearch() {
    // Notes search
    const notesSearchInput = document.getElementById('notesSearchInput');
    const notesFilterSelect = document.getElementById('notesFilterSelect');
    const courseCategoryFilterNotes = document.getElementById('courseCategoryFilterNotes');
    if (notesSearchInput) {
        notesSearchInput.addEventListener('input', () => {
            searchAndFilterSection('notes', notesSearchInput.value, notesFilterSelect.value, 'notesGrid', 'notesNoResults', courseCategoryFilterNotes.value);
        });
    }
    if (notesFilterSelect) {
        notesFilterSelect.addEventListener('change', () => {
            searchAndFilterSection('notes', notesSearchInput.value, notesFilterSelect.value, 'notesGrid', 'notesNoResults', courseCategoryFilterNotes.value);
        });
    }
    if (courseCategoryFilterNotes) {
        courseCategoryFilterNotes.addEventListener('change', () => {
            searchAndFilterSection('notes', notesSearchInput.value, notesFilterSelect.value, 'notesGrid', 'notesNoResults', courseCategoryFilterNotes.value);
        });
    }
    // Assignment search
    const assignmentSearchInput = document.getElementById('assignmentSearchInput');
    const assignmentFilterSelect = document.getElementById('assignmentFilterSelect');
    const courseCategoryFilterAssignment = document.getElementById('courseCategoryFilterAssignment');
    if (assignmentSearchInput) {
        assignmentSearchInput.addEventListener('input', () => {
            searchAndFilterSection('Assignment', assignmentSearchInput.value, assignmentFilterSelect.value, 'assignmentGrid', 'assignmentNoResults', courseCategoryFilterAssignment.value);
        });
    }
    if (assignmentFilterSelect) {
        assignmentFilterSelect.addEventListener('change', () => {
            searchAndFilterSection('Assignment', assignmentSearchInput.value, assignmentFilterSelect.value, 'assignmentGrid', 'assignmentNoResults', courseCategoryFilterAssignment.value);
        });
    }
    if (courseCategoryFilterAssignment) {
        courseCategoryFilterAssignment.addEventListener('change', () => {
            searchAndFilterSection('Assignment', assignmentSearchInput.value, assignmentFilterSelect.value, 'assignmentGrid', 'assignmentNoResults', courseCategoryFilterAssignment.value);
        });
    }
    // Papers search
    const PapersSearchInput = document.getElementById('PapersSearchInput');
    const PapersFilterSelect = document.getElementById('PapersFilterSelect');
    const courseCategoryFilterPapers = document.getElementById('courseCategoryFilterPapers');
    if (PapersSearchInput) {
        PapersSearchInput.addEventListener('input', () => {
            searchAndFilterSection('Papers', PapersSearchInput.value, PapersFilterSelect.value, 'PapersGrid', 'PapersNoResults', courseCategoryFilterPapers.value);
        });
    }
    if (PapersFilterSelect) {
        PapersFilterSelect.addEventListener('change', () => {
            searchAndFilterSection('Papers', PapersSearchInput.value, PapersFilterSelect.value, 'PapersGrid', 'PapersNoResults', courseCategoryFilterPapers.value);
        });
    }
    if (courseCategoryFilterPapers) {
        courseCategoryFilterPapers.addEventListener('change', () => {
            searchAndFilterSection('Papers', PapersSearchInput.value, PapersFilterSelect.value, 'PapersGrid', 'PapersNoResults', courseCategoryFilterPapers.value);
        });
    }
}

// Search and filter for sections
function searchAndFilterSection(category, searchTerm, filterType, gridId, noResultsId, courseCategory) {
    let filteredFiles;
    
    // Filter by category first
    if (category === 'notes') {
        filteredFiles = allFiles.filter(file => 
            (file.category?.toLowerCase().includes('note') || file.title?.toLowerCase().includes('note'))
        );
    } else if (category === 'Assignment' || category === 'assignment') {
        filteredFiles = allFiles.filter(file => 
            file.category?.toLowerCase() === 'assignment' || file.title?.toLowerCase().includes('assignment')
        );
    } else if (category === 'Papers') {
        filteredFiles = allFiles.filter(file => {
            const cat = file.category?.toLowerCase() || '';
            return (
                (cat.includes('paper') || cat.includes('research')) && cat !== 'assignment'
            ) ||
            (file.title?.toLowerCase().includes('paper') && cat !== 'assignment');
        });
    }

    // Apply course category filter
    if (courseCategory && courseCategory !== 'all') {
        filteredFiles = filteredFiles.filter(file => 
            file.courseCategory?.toLowerCase() === courseCategory.toLowerCase()
        );
    }

    // Apply search term filter
    if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredFiles = filteredFiles.filter(file => 
            file.title?.toLowerCase().includes(searchLower) ||
            file.author?.toLowerCase().includes(searchLower) ||
            file.category?.toLowerCase().includes(searchLower)
        );
    }

    // Apply sort filter
    if (filterType) {
        switch (filterType) {
            case 'latest':
                filteredFiles.sort((a, b) => {
                    if (!a.uploadDate) return 1;
                    if (!b.uploadDate) return -1;
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
                });
                break;
            case 'popular':
                filteredFiles.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
                break;
            case 'title':
                filteredFiles.sort((a, b) => {
                    if (!a.title) return 1;
                    if (!b.title) return -1;
                    return a.title.localeCompare(b.title);
                });
                break;
            case 'author':
                filteredFiles.sort((a, b) => {
                    if (!a.author) return 1;
                    if (!b.author) return -1;
                    return a.author.localeCompare(b.author);
                });
                break;
        }
    }

    // Display results
    const grid = document.getElementById(gridId);
    const noResults = document.getElementById(noResultsId);

    if (!filteredFiles || filteredFiles.length === 0) {
        grid.classList.add('hidden');
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');
    grid.classList.remove('hidden');
    renderFilesGrid(filteredFiles, grid);
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    closeMobileMenu.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!mobileSidebar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            // Close mobile menu
            mobileSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Initialize event listeners for notification system
document.addEventListener('DOMContentLoaded', () => {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    // Initialize mobile menu
    setupMobileMenu();

    // Toggle notification dropdown
    notificationBtn.addEventListener('click', () => {
        notificationDropdown.classList.toggle('hidden');
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!notificationBtn.contains(event.target) && !notificationDropdown.contains(event.target)) {
            notificationDropdown.classList.add('hidden');
        }
    });

    // Close PDF modal when clicking close button or outside
    const closePdfModal = document.getElementById('closePdfModal');
    const pdfModal = document.getElementById('pdfModal');
    
    if (closePdfModal && pdfModal) {
        closePdfModal.addEventListener('click', () => {
            pdfModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        pdfModal.addEventListener('click', (event) => {
            if (event.target === pdfModal) {
                pdfModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
