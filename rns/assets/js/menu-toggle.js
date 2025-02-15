document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".toggle-btn");
  const circle = document.querySelector(".circle");
  const mobilemenu = document.querySelector(".js-mobilemenu");
  let toggled = false;

  function toggleMenuIcon() {
    if (!toggled) {
      // Shrink the outer circle
      circle.classList.add("shrunk-circle");
      toggled = true;
      toggleBtn.classList.remove("toggled");

      // Expand the mobilemenu
      mobilemenu.style.maxHeight = mobilemenu.scrollHeight + 100 + "px";
      mobilemenu.style.padding = "15px";
    } else {
      // Restore the outer circle and reset to the initial state
      circle.classList.remove("shrunk-circle");
      toggled = false;
      toggleBtn.classList.add("toggled");

      // Collapse the mobilemenu
      mobilemenu.style.maxHeight = "0";
      mobilemenu.style.padding = "0";
    }
  }

  toggleBtn.addEventListener("click", function () {
    toggleMenuIcon();
  });
});
