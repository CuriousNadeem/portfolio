import { testimonials } from "../data/testimonials.js";

document.addEventListener("DOMContentLoaded", function () {
  let testimonialsIndex = 0; // Tracks the first visible image
  let testimonialsCount; // Initial image count based on screen size
  let startTestimonialsScroll;
  let TestimonialsWidth;
  const TestWrapper = document.querySelector(".js-testimonials-wrapper");

  // Function to get the number of images to display based on screen width
  function gettestimonialsCount() {
    const newscreenWidth = window.innerWidth;
    if (newscreenWidth > 1200) return 3;
    if (newscreenWidth > 768) return 2;
    return 1;
  }

  // Function to calculate the total width of the image container (excluding padding)
  function getImageTestimonialsWidth() {
    const container = document.querySelector(".testimonial");
    return container.offsetWidth;
  }
  // Set the carousel to auto-scroll every 5 seconds
  function startTestScroll() {
    startTestimonialsScroll = setInterval(moveTestimonials, 5000); // 5-second interval for auto-scroll
  }

  function loadTest() {
    TestWrapper.innerHTML = "";
    testimonialsCount = gettestimonialsCount();
    console.log(testimonialsCount);
    for (let i = 0; i < testimonialsCount + 2; i++) {
      let testIndex = (testimonialsIndex + i) % testimonials.length;

      // Create the testimonial container div
      const testimonial = document.createElement("div");
      testimonial.classList.add("testimonial");

      // Create the image container div
      const testimonialstext = document.createElement("div");
      testimonialstext.classList.add("testimonials-text");

      // Create the paragraph
      const testimonialsParagraph = document.createElement("p");
      testimonialsParagraph.textContent = testimonials[testIndex].review;

      // create the name
      const testimonialsspan = document.createElement("span");
      testimonialsspan.classList.add("highlights");
      testimonialsspan.textContent = testimonials[testIndex].name;

      // Create the image element
      const img = document.createElement("img");
      img.classList.add("testimonials-image");
      img.src = testimonials[testIndex].src;

      // Append image and paragraphs to container, and container to the wrapper
      TestWrapper.appendChild(testimonial);
      testimonial.appendChild(testimonialstext);
      testimonialstext.appendChild(testimonialsParagraph);
      testimonialstext.appendChild(testimonialsspan);
      testimonial.appendChild(img);
    }
  }

  // Function to move carousel left smoothly
  function moveTestimonials() {
    TestimonialsWidth = getImageTestimonialsWidth();
    // Apply the transformation to shift images left
    TestWrapper.style.transform = `translateX(-${TestimonialsWidth}px)`;

    // After the transition ends, update the images and reset position smoothly
    setTimeout(() => {
      testimonialsIndex = (testimonialsIndex + 1) % testimonials.length; // Shift to the next image set
      loadTest();
      TestWrapper.style.transition = "none"; // Temporarily disable transition

      // Set the wrapper back to initial position (no movement)
      TestWrapper.style.transform = `translateX(0)`;

      // Re-enable the transition for the next slide
      setTimeout(() => {
        TestWrapper.style.transition = "transform 0.5s ease";
      }, 20);
    }, 500); // Match this with the CSS transition duration
  }

  // Initialize the carousel
  function initCarousel() {
    testimonialsCount = gettestimonialsCount(); // Set initial display count based on screen size
    loadTest(); // Load images initially
    startTestScroll(); // Start auto-scrolling
  }

  // Call the initialization function to start everything
  initCarousel();
});
