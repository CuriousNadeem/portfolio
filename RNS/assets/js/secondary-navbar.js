// JavaScript for Back to Top button and URL update
document.addEventListener("DOMContentLoaded", function () {
  const secondaryNavbar = document.querySelector(".js-secondary-navbar");
  // Show or hide the button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.innerWidth > 1024) {
      if (window.pageYOffset > 600) {
        secondaryNavbar.classList.add("nav-active");
      } else {
        secondaryNavbar.classList.remove("nav-active");
      }
    }
  });

  // Scroll to top and update URL
  secondaryNavbar.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Remove hash from the URL
    history.replaceState(null, null, window.location.pathname);
  });
});
