document.addEventListener("DOMContentLoaded", function () {
  let containers = document.querySelectorAll(".image-sequence"); // Get all image-sequence containers
  const speed = 10; // Speed in milliseconds
  let activeIcons = {}; // Keep track of which icons are being animated
  let bulletTriggered = false;

  if (containers) {
    containers.forEach((container, index) => {
      const frames = Array.from(container.getElementsByClassName("frame"));
      const totalFrames = frames.length;
      let currentFrame = 0;
      let interval;

      // Function to update the visibility of frames for this specific icon
      function updateFrames() {
        frames.forEach((frame, idx) => {
          frame.hidden = idx !== currentFrame;
        });
      }

      // Play animation forward
      function playForward() {
        clearInterval(interval);
        interval = setInterval(() => {
          if (currentFrame < totalFrames - 1) {
            currentFrame++;
            updateFrames();
          } else {
            clearInterval(interval);
          }
        }, speed);
      }

      // Play animation backward
      function playReverse() {
        clearInterval(interval);
        interval = setInterval(() => {
          if (currentFrame > 0) {
            currentFrame--;
            updateFrames();
          } else {
            clearInterval(interval);
          }
        }, speed);
      }

      // Function to handle both hover and active class animation
      function startAnimation(triggerType) {
        if (!activeIcons[index]) {
          activeIcons[index] = triggerType;
          playForward();
        }
      }

      function reverseAnimation(triggerType) {
        if (activeIcons[index] === triggerType) {
          playReverse();
          delete activeIcons[index];
        }
      }

      // Handle hover events
      container.addEventListener("mouseenter", () => {
        startAnimation("hover");
      });

      container.addEventListener("mouseleave", () => {
        if (container.classList.contains("active")) {
          reverseAnimation("hover");
          startAnimation("active");
          bulletTriggered = true;
        }
        reverseAnimation("hover");
      });

      // Observe the active class being added/removed
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            if (container.classList.contains("active")) {
              if (bulletTriggered) {
                //checking if the button which is unhovered has active class then re-apply the start animation.
                //This will happen when the bullet is clicked after is was hovered.
                reverseAnimation("active");
                bulletTriggered = false;
              }
              startAnimation("active");
            } else {
              reverseAnimation("active");
            }
          }
        });
      });

      // Start observing changes in the class attribute
      observer.observe(container, { attributes: true });

      // Initialize with the first frame visible
      updateFrames();
    });
  } else {
    containers = document.querySelectorAll(".image-sequence");
    console.log("Icons are Null");
  }
});
export function setActiveIcon(index) {
  // First, remove the 'active' class from all containers (if needed)
  const containers = document.querySelectorAll(".image-sequence");
  containers.forEach((container) => {
    container.classList.remove("active");
  });

  // Then, find the container with the id 'icon${index}' and add the 'active' class
  const targetIcon = document.getElementById(`icon${index}`);
  if (targetIcon) {
    targetIcon.classList.add("active");
  } else {
    console.error(`No icon found with id 'icon${index}'`);
  }
}
