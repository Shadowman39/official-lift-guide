//This is to prevent arrow keys from navigating to the previous or next page
document.addEventListener('keydown', function (event) {
    // Check if the pressed key is the left or right arrow
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // Prevent the default GitBook behavior
        event.stopPropagation();
        event.preventDefault();
    }
}, true); // Use capture phase to intercept the event before GitBook

// This is to scroll to the details element when it is opened
document.addEventListener('DOMContentLoaded', function() {
    const detailsElement = document.getElementById('lift-types-details');
  
    if (detailsElement) {
      detailsElement.addEventListener('toggle', function(event) {
        if (detailsElement.open) {
          detailsElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });
    }
  });
