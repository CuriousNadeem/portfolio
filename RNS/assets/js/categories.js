// Array of image objects with design and category properties
import { images } from "../data/categories.js";

let currentIndex = 0; // Tracks the first visible image
let displayCount = getDisplayCount(); // Initial image count based on screen size
const carouselWrapper = document.querySelector(".carousel-wrapper");

// Function to get the number of images to display based on screen width
function getDisplayCount() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 1024) return 4;
  if (screenWidth > 768) return 3;
  if (screenWidth > 660) return 2;
  return 1;
}

// Function to load images into the carousel with paragraphs
function loadImages() {
  // Clear the wrapper
  carouselWrapper.innerHTML = "";

  // Display the number of images based on the current screen size
  for (let i = 0; i < displayCount + 1; i++) {
    let imgIndex = (currentIndex + i) % images.length;

    // Create the image container div
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    // Create the image element
    const img = document.createElement("img");
    img.src = images[imgIndex].src;

    // Create the first paragraph (design)
    const designParagraph = document.createElement("h5");
    designParagraph.classList.add("design");
    designParagraph.textContent = images[imgIndex].design;

    // Create the second paragraph (category)
    const categoryParagraph = document.createElement("span");
    categoryParagraph.classList.add("highlights");
    categoryParagraph.classList.add("animated-underline");
    categoryParagraph.textContent = images[imgIndex].category;

    // Append image and paragraphs to container, and container to the wrapper
    imgContainer.appendChild(img);
    imgContainer.appendChild(designParagraph);
    imgContainer.appendChild(categoryParagraph);
    carouselWrapper.appendChild(imgContainer);
  }
}

// Function to calculate the total width of the image container (including padding)
function getImageContainerWidth() {
  const container = document.querySelector(".image-container");
  return container.offsetWidth; // Removed padding from the calculation as per your fix
}

// Function to move carousel left smoothly
function moveCarousel() {
  // Calculate the total width of the image container
  const containerWidth = getImageContainerWidth();

  // Apply the transformation to shift images left
  carouselWrapper.style.transform = `translateX(-${containerWidth}px)`;

  // After the transition ends, update the images and reset position smoothly
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % images.length; // Shift to the next image set
    loadImages(); // Load the updated images
    carouselWrapper.style.transition = "none"; // Temporarily disable transition

    // Set the wrapper back to initial position (no movement)
    carouselWrapper.style.transform = `translateX(0)`;

    // Re-enable the transition for the next slide
    setTimeout(() => {
      carouselWrapper.style.transition = "transform 0.5s ease";
    }, 20);
  }, 500); // Match this with the CSS transition duration
}

// Set the carousel to auto-scroll every 5 seconds
setInterval(moveCarousel, 5000);

// Initial load of images
loadImages();

// Recalculate number of images and reload on window resize
window.addEventListener("resize", () => {
  displayCount = getDisplayCount();
  loadImages();
});
