// JavaScript

// Preload images globally
const images = [];
for (let i = 1; i <= 50; i++) {
  const img = new Image();
  img.src = `assets/imgs/sequence3/scissor (${i}).png`;
  images.push(img);
}

// Function to play animation for a specific element
function playAnimation(animationFrameElement, animationSectionElement) {
  let currentFrame = 0;
  const totalFrames = images.length;
  const frameRate = 24; // frames per second
  const frameDuration = 1000 / frameRate; // duration per frame in ms
  const totalDuration = (totalFrames / frameRate) * 1000; // total duration in ms

  // Start the move-right animation
  animationSectionElement.style.animationDuration = totalDuration + "ms";
  animationSectionElement.classList.add("move-right");

  function updateFrame() {
    if (currentFrame < totalFrames) {
      animationFrameElement.src = images[currentFrame].src;
      currentFrame++;
      setTimeout(updateFrame, frameDuration);
    } else {
      // Animation ended, ensure the last frame is displayed
      animationFrameElement.src = images[totalFrames - 1].src;
    }
  }

  // Start the frame animation
  updateFrame();
}

// Intersection Observer setup
const animationSections = document.querySelectorAll(".animation-section");

const observerOptions = {
  root: null,
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const animationSectionElement = entry.target;
    const animationFrameElement =
      animationSectionElement.querySelector(".animation-frame");

    if (entry.isIntersecting) {
      // Play animation if not already played
      if (!animationSectionElement.dataset.played) {
        playAnimation(animationFrameElement, animationSectionElement);
        animationSectionElement.dataset.played = "true"; // Mark as played
      }
    }
  });
}, observerOptions);

// Observe each animation section
animationSections.forEach((section) => {
  observer.observe(section);
});
