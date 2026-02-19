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
        return; 
    }

    // 3. SETUP - Select the slide wrappers instead of just the images
    var slides = container.querySelectorAll('.slide-wrapper');
    if (slides.length === 0) return;

    var slideInterval = 6000; 
    var fadeDuration = 2000;
    var zoomLevel = 1.15;
    var animationDuration = slideInterval + fadeDuration;

    var currentIndex = 0;
    var zIndexCounter = 10; 

    // Helper: The animation logic
    function startSlide(index) {
        var slide = slides[index];
        var img = slide.querySelector('.slide-img'); // Target just the image for zooming
        
        // Bring to top
        zIndexCounter++;
        slide.style.zIndex = zIndexCounter;

        // Animate Opacity on the whole wrapper (fades image & link together)
        slide.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: fadeDuration,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        // Animate Zoom ONLY on the image (prevents text stretching)
        img.animate([
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
            if (slides[prevIndex]) {
                var prevSlide = slides[prevIndex];
                var prevImg = prevSlide.querySelector('.slide-img');
                
                prevSlide.style.opacity = 0;
                prevSlide.style.zIndex = 0;
                
                // Cancel animations on the wrapper (fade)
                var wrapperAnims = prevSlide.getAnimations();
                for (var i = 0; i < wrapperAnims.length; i++) {
                    wrapperAnims[i].cancel();
                }

                // Cancel animations on the image (zoom)
                var imgAnims = prevImg.getAnimations();
                for (var j = 0; j < imgAnims.length; j++) {
                    imgAnims[j].cancel();
                }
            }
        }, fadeDuration);
    }

    // 4. START: Reset all slides to clean slate 
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
document.addEventListener("DOMContentLoaded", initHeroSlideshow);

if (window.gitbook) {
    gitbook.events.on('page.change', function() {
        initHeroSlideshow();
    });
}