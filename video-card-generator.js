// Separate arrays for each category
const wordVideos = [
    { name: "Basic Document Skills", category: "Microsoft Word", url: "https://www.youtube.com/embed/9nXTVvLDRg4?si=WmnjYaSxmFZTwtdp" },
    { name: "Text Formatting", category: "Microsoft Word", url: "https://www.youtube.com/embed/ti3yHf0ar-I?si=I5Rhbh1d31vRArzN" },


];
const excelVideos = [
    //{ name: "Excel for Beginners", category: "Microsoft Excel", url: "https://www.youtube.com/embed/GEZhD3J89ZE" }
];
const pptVideos = [
    //{ name: "PowerPoint Crash Course", category: "Microsoft PowerPoint", url: "https://www.youtube.com/embed/hdI2bqOjy3c" }
];
const accessVideos = [
    //{ name: "Access Database Tutorial", category: "Microsoft Access", url: "https://www.youtube.com/embed/ZXsQAXx_ao0" }
];
const photoshop = [
    //{ name: "Outlook Email Basics", category: "Photoshop", url: "https://www.youtube.com/embed/1EsKQ6a6p4g" }
];


// Merge all videos for display
const videoData = [
    ...wordVideos,
    ...excelVideos,
    ...pptVideos,
    ...accessVideos,
    ...photoshop
];

// Load YouTube API
function loadYouTubeAPI() {
    if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Store all player instances
const players = new Map();

function renderVideoCards(videos) {
    const container = document.getElementById('videoCardsContainer');
    const noResults = document.getElementById('videoNoResults');
    if (!container) return;
    container.innerHTML = '';
    if (noResults) noResults.classList.add('hidden');
    if (videos.length === 0) {
        if (noResults) noResults.classList.remove('hidden');
        return;
    }

    // Load YouTube API
    loadYouTubeAPI();

    videos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'glass-video-card rounded-3xl p-6 text-center hover-scale flex flex-col items-center mb-6';
        const playerId = `youtube-player-${index}`;
        
        // Add YouTube controls and branding options for better visibility
        let embedUrl = video.url;
        if (embedUrl.includes('youtube.com/embed/')) {
            embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'enablejsapi=1&controls=1&modestbranding=1&rel=0&showinfo=1';
        }
        
        card.innerHTML = `
            <div class="w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-black/30 flex items-center justify-center">
                <iframe id="${playerId}" src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media" class="w-full h-48 md:h-56 rounded-2xl"></iframe>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2 line-clamp-2">${video.name}</h3>
            <span class="text-sm bg-white/20 text-white px-4 py-2 rounded-full mb-2">${video.category}</span>
        `;
        container.appendChild(card);

        // Initialize YouTube player when API is ready
        if (window.YT && window.YT.Player) {
            initializePlayer(playerId, index);
        } else {
            window.onYouTubeIframeAPIReady = function() {
                document.querySelectorAll('[id^="youtube-player-"]').forEach((iframe, idx) => {
                    initializePlayer(iframe.id, idx);
                });
            };
        }
    });
}

function initializePlayer(playerId, index) {
    const player = new YT.Player(playerId, {
        events: {
            'onStateChange': function(event) {
                // When video starts playing (state = 1)
                if (event.data === YT.PlayerState.PLAYING) {
                    // Pause all other videos
                    players.forEach((otherPlayer, otherIndex) => {
                        if (otherIndex !== index && otherPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                            otherPlayer.pauseVideo();
                        }
                    });
                }
            }
        }
    });
    players.set(index, player);
}

function filterVideos() {
    const search = document.getElementById('videoSearch').value.toLowerCase();
    const category = document.getElementById('videoCategory').value;
    let filtered = videoData.filter(v =>
        v.name.toLowerCase().includes(search) &&
        (category === '' || v.category === category)
    );
    renderVideoCards(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    // Populate category filter
    const categories = [...new Set(videoData.map(v => v.category))];
    const select = document.getElementById('videoCategory');
    select.innerHTML = '<option value="">All Categories</option>' +
        categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    // Initial render
    renderVideoCards(videoData);
    // Add event listeners
    document.getElementById('videoSearch').addEventListener('input', filterVideos);
    document.getElementById('videoCategory').addEventListener('change', filterVideos);
});
