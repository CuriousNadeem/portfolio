function readjustheight() {
    document.querySelectorAll('.section').forEach((section) => {
        section.classList.add('no-height');
        setTimeout(() => {
            section.classList.remove('no-height'); // readjust height after 0.5 seconds
        }, 100);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let currentSectionId = "1"; // Track current section ID

    // Preloader removal after loading
    setTimeout(() => {
        document.getElementById("preloader").style.opacity = "0";
    }, 1000);

    function moveUp() {
        let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
        let nextSection = document.querySelector(`.section[data-id="${parseInt(currentSectionId) + 1}"]`);

        if (nextSection) {
            currentSection.classList.remove("active");
            currentSection.classList.add("hidden-up"); // Move current section up

            nextSection.classList.remove("hidden-down");
            nextSection.classList.add("active"); // Move next section from below

            currentSectionId = nextSection.getAttribute("data-id"); // Update current section
        }
    }

    function moveDown() {
        let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
        let prevSection = document.querySelector(`.section[data-id="${parseInt(currentSectionId) - 1}"]`);

        if (prevSection) {
            currentSection.classList.remove("active");
            currentSection.classList.add("hidden-down"); // Move current section down

            prevSection.classList.remove("hidden-up");
            prevSection.classList.add("active"); // Move previous section from above

            currentSectionId = prevSection.getAttribute("data-id"); // Update current section
        }
    }

    function moveLogo() {
        readjustheight();
        setTimeout(() => {
            moveUp(); // Move logo section up after 2 seconds
        }, 3000);
    }

    // Automatically start logo animation on page load
    moveLogo();

    // Keyboard navigation (Arrow keys, Page Up, Page Down)
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "PageDown") moveUp();
        if (e.key === "ArrowUp" || e.key === "PageUp") moveDown();
    });

    // Mouse wheel scrolling navigation
    window.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
            moveUp(); // Scroll down moves to the next section
        } else if (event.deltaY < 0) {
            moveDown(); // Scroll up moves to the previous section
        }
    });
});
