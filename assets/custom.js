//This is to prevent arrow keys from navigating to the previous or next page
document.addEventListener('keydown', function (event) {
    // Check if the pressed key is the left or right arrow
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Prevent the default GitBook behavior
        event.stopPropagation();
        event.preventDefault();
    }
}, true); // Use capture phase to intercept the event before GitBook