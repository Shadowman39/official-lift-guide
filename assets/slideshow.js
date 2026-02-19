// Store the interval ID globally so we can stop it when navigating pages
var heroSlideshowInterval;

function initHeroSlideshow() {
    // 1. CLEANUP: Always clear any existing timer first to prevent duplicates
    if (heroSlideshowInterval) {
        clearInterval(heroSlideshowInterval);
        heroSlideshowInterval = null;
    }

    // 2. CHECK: Do we have a slideshow on this specific page?
    var container = document.getElementById('js-slideshow');
    if (!container) {
        // Not the intro page, so we are done.
        return; 
    }

    // 3. SETUP
    var slides = container.querySelectorAll('.slide-img');
    if (slides.length === 0) return;

    var slideInterval = 6000; 
    var fadeDuration = 2000;
    var zoomLevel = 1.15;
    var animationDuration = slideInterval + fadeDuration;

    var currentIndex = 0;
    var zIndexCounter = 10; // Start higher than the CSS default

    // Helper: The animation logic
    function startSlide(index) {
        var slide = slides[index];
        
        // Bring to top
        zIndexCounter++;
        slide.style.zIndex = zIndexCounter;

        // Animate Opacity
        slide.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: fadeDuration,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        // Animate Zoom
        slide.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(' + zoomLevel + ')' }
        ], {
            duration: animationDuration,
            easing: 'linear',
            fill: 'forwards'
        });
    }

    // Helper: Cleanup logic for the hidden slide
    function cleanupPreviousSlide(prevIndex) {
        setTimeout(function() {
            // Check if the slide still exists (user might have navigated away)
            if (slides[prevIndex]) {
                var prevSlide = slides[prevIndex];
                prevSlide.style.opacity = 0;
                prevSlide.style.zIndex = 0;
                
                // Cancel animations to reset transform
                var anims = prevSlide.getAnimations();
                for (var i = 0; i < anims.length; i++) {
                    anims[i].cancel();
                }
            }
        }, fadeDuration);
    }

    // 4. START: 
    // Reset all slides to clean slate (in case of back-button navigation artifacts)
    slides.forEach(function(s) { 
        s.style.opacity = 0; 
        s.style.zIndex = 0;
    });

    // Start first slide
    startSlide(0);

    // 5. LOOP
    heroSlideshowInterval = setInterval(function() {
        var prevIndex = currentIndex;
        currentIndex = (currentIndex + 1) % slides.length;
        
        startSlide(currentIndex);
        cleanupPreviousSlide(prevIndex);

    }, slideInterval);
}

// --- Event Listeners ---

// 1. Run on initial full page load
document.addEventListener("DOMContentLoaded", initHeroSlideshow);

// 2. Run on GitBook internal navigation (The "Back Button" Fix)
if (window.gitbook) {
    gitbook.events.on('page.change', function() {
        initHeroSlideshow();
    });
}