document.addEventListener('DOMContentLoaded', function() {
const circle = document.querySelector('.mouse-circle');


let mouseX = 0, mouseY = 0;  // Mouse's actual position
let circleX = 0, circleY = 0;  // Circle's position (will "lag" behind)
const speed = 0.2;  // Speed factor for trailing effect (lower = slower, more trailing)
let insideIframe = false;  // Track if mouse is inside the iframe

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (!insideIframe) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
});

const iframes = document.querySelectorAll('iframe');  // Select your YouTube iframe here

    // Loop through each iframe to apply event listeners
    iframes.forEach((iframe) => {
        iframe.addEventListener('mouseenter', () => {
            insideIframe = true;  // Mouse entered iframe, stop updating position
            circle.style.opacity = '0';  // Optionally, hide the circle while inside iframe
        });

        iframe.addEventListener('mouseleave', () => {
            insideIframe = false;  // Mouse left iframe, resume updating position
            circle.style.opacity = '1';  // Show the circle again
        });
    });

// Smooth trailing effect using requestAnimationFrame
function animate() {
    // Calculate the distance between circle and mouse position
    let dx = mouseX - circleX;
    let dy = mouseY - circleY;

    // Gradually move the circle towards the mouse position
    circleX += dx * speed;
    circleY += dy * speed;

    // Update the circle's position
    circle.style.left = `${circleX}px`;
    circle.style.top = `${circleY}px`;

    requestAnimationFrame(animate);  // Continuously call animate
}

animate();

});
