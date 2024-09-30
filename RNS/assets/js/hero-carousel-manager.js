import { carouselImgs } from "../data/hero-carousel.js";
import { setActiveIcon } from "./bullet-image-sequence-stacked.js";

document.addEventListener("DOMContentLoaded", function () {
  let currentCarouselIndex = 0; // Start with the first image
  let autoCarouselInterval;

  // Single button delay flag
  let canClick = true;

  // Function to update the header background image
  function updateBackground() {
    const header = document.querySelector("header");
    const imageUrl = carouselImgs[currentCarouselIndex].link;
    header.style.backgroundImage = `url(${imageUrl})`;
    setActiveIcon(currentCarouselIndex);
  }

  // Function to move to the next image
  function nextImage() {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselImgs.length; // Move to the next image
    updateBackground();
  }

  // Function to move to the previous image
  function prevImage() {
    currentCarouselIndex =
      (currentCarouselIndex - 1 + carouselImgs.length) % carouselImgs.length; // Move to the previous image
    updateBackground();
  }

  // Function to reset the interval for the automatic carousel when a button is clicked
  function resetInterval() {
    clearInterval(autoCarouselInterval); // Stop the current automatic carousel
    autoCarouselInterval = setInterval(nextImage, 5000); // Restart it
  }

  // Function to disable buttons temporarily (1 second delay)
  function disableButtons() {
    canClick = false;

    // Re-enable after 1 second (1000 milliseconds)
    setTimeout(() => {
      canClick = true;
    }, 850);
  }

  function setImageUsingIndex(index) {
    if (canClick) {
      currentCarouselIndex = index;
      updateBackground();
      resetInterval(); // Restart the interval to maintain consistency
      disableButtons();
    }
  }

  // Event listeners for the buttons
  const nextbtn = document.getElementById("next-btn");
  const prevbtn = document.getElementById("prev-btn");

  nextbtn.addEventListener("click", () => {
    if (canClick) {
      nextImage();
      resetInterval(); // Restart the interval to maintain consistency
      disableButtons();
    }
  });

  prevbtn.addEventListener("click", () => {
    if (canClick) {
      prevImage();
      resetInterval(); // Restart the interval to maintain consistency
      disableButtons();
    }
  });

  const icons = document.querySelectorAll(".image-sequence");
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      setImageUsingIndex(icon.dataset.iconId);
    });
  });

  // Initially set the first image
  updateBackground();

  // Start the automatic carousel (Change background image every 5 seconds)
  autoCarouselInterval = setInterval(nextImage, 5000);
});
