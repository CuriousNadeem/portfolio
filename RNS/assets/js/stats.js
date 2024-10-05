document.addEventListener("DOMContentLoaded", function () {
  const percentage = document.querySelectorAll(".js-stat-percent");
  const line = document.querySelectorAll(".simple-line");
  const statsPart = document.querySelector(".stats-part");

  // Create an IntersectionObserver to trigger the animation when .stats-part is in view
  const observer = new IntersectionObserver(
    function (entries) {
      // Check if the .stats-part is intersecting (in view)
      if (entries[0].isIntersecting) {
        // Iterate over each line and apply the width animation
        for (let index = 0; index < percentage.length; index++) {
          // Get the percentage value and remove the '%' sign
          let percentValue = percentage[index].innerHTML.trim();

          // Apply the width dynamically with transition for smooth animation
          line[index].style.transition = "width 2s linear"; // You can adjust the duration as needed
          line[index].style.width = percentValue; // Set the final width
          animateScissorMovement(percentValue, index);
        }
        // Stop observing once the animation has been triggered
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  ); // Trigger when 50% of .stats-part is in view

  // Start observing the .stats-part section
  observer.observe(statsPart);
});

function animateScissorMovement(percentValue, index) {
  // Remove the '%' symbol and convert the value to a number
  let numericValue = parseInt(percentValue, 10);

  // Subtract 5 from the numeric value
  let adjustedValue = numericValue - 2;

  // Reapply the '%' symbol to the adjusted value
  let newPercentValue = adjustedValue + "%";
  // Create a new <style> element
  const style = document.createElement("style");
  // Create the dynamic keyframe rule with the new left value
  const keyframes = `
    @keyframes minimoveRight${index} {
      from {
        left: 0;
      }
      to {
        left: ${newPercentValue}; /* Set to the passed percentage value */
      }
    }
  `;

  // Set the content of the <style> element
  style.innerHTML = keyframes;

  // Append the <style> element to the <head> section of the document
  document.head.appendChild(style);

  // Apply the new animation to all elements with the 'mini-move-Right' class
  const scissorElements = document.querySelectorAll(
    `.stat-mini-scissor${index}`
  );
  scissorElements.forEach((element) => {
    element.style.animationName = `minimoveRight${index}`; // Use the newly created keyframe
    element.style.animationDuration = "2s"; // Set duration, can be customized
    element.style.animationTimingFunction = "linear";
    element.style.animationFillMode = "forwards";
    console.log(index);
  });
}
