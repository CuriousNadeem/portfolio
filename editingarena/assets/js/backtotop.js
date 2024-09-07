// JavaScript for Back to Top button and URL update
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');

  // Show or hide the button based on scroll position
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  });

  // Scroll to top and update URL
  backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Remove hash from the URL
      history.replaceState(null, null, window.location.pathname);
  });
});
