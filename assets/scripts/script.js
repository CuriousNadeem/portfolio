document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    let currentIndex = 0;

    function moveUp() {
        if (currentIndex < sections.length - 1) {
            sections[currentIndex].classList.remove("active");
            sections[currentIndex].classList.add("hidden-up"); // Move current section up

            currentIndex++;
            sections[currentIndex].classList.remove("hidden-down");
            sections[currentIndex].classList.add("active"); // Move next section from below
        }
    }

    function moveDown() {
        if (currentIndex > 0) {
            sections[currentIndex].classList.remove("active");
            sections[currentIndex].classList.add("hidden-down"); // Move current section down

            currentIndex--;
            sections[currentIndex].classList.remove("hidden-up");
            sections[currentIndex].classList.add("active"); // Move previous section from above
        }
    }

    setTimeout(() => {
        moveUp(); // Move logo section up after 2 seconds
    }, 1000);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") moveUp();
        if (e.key === "ArrowUp") moveDown();
    });
});