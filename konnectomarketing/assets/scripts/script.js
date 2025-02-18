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
    let nextSectionId = 3;
    let jump = false;
    const cards = document.querySelectorAll(".card");

    // Preloader removal after loading
    setTimeout(() => {
        document.getElementById("preloader").style.opacity = "0";
    }, 1000);
    document.getElementById("preloader").style.display = "none";

    function moveUp() {
        if(jump === false){
            nextSectionId = parseInt(currentSectionId) + 1;
        }
        let nextSection = document.querySelector(`.section[data-id="${nextSectionId}"]`);

        if (nextSection) {
            while(currentSectionId < nextSectionId){
                let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
                if(currentSection.classList.contains("active"))
                    currentSection.classList.remove("active");
                if(currentSection.classList.contains("hidden-down"))
                    currentSection.classList.remove("hidden-down");
                
                currentSection.classList.add("hidden-up"); // Move current section up
                currentSectionId++;
            }

            nextSection.classList.remove("hidden-down");
            nextSection.classList.add("active"); // Move next section from below

            currentSectionId = nextSection.getAttribute("data-id"); // Update current section
        }
    }

    function moveDown() {
        if(jump === false){
            nextSectionId = parseInt(currentSectionId) - 1;
        }
        let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
        let prevSection = document.querySelector(`.section[data-id="${nextSectionId}"]`);

        if (prevSection) {
            currentSection.classList.remove("active");
            currentSection.classList.add("hidden-down"); // Move current section down

            prevSection.classList.remove("hidden-up");
            prevSection.classList.add("active"); // Move previous section from above

            currentSectionId = prevSection.getAttribute("data-id"); // Update current section
        }
    }

    function moveLogo() {
        jump = false;
        readjustheight();
        setTimeout(() => {
            moveUp(); // Move logo section up after 2 seconds
        }, 3000);
    }

    // Automatically start logo animation on page load
    moveLogo();

    // Keyboard navigation (Arrow keys, Page Up, Page Down)
    document.addEventListener("keydown", (e) => {
        jump = false;
        if (e.key === "ArrowDown" || e.key === "PageDown") moveUp();
        if (e.key === "ArrowUp" || e.key === "PageUp") moveDown();
    });

    // Mouse wheel scrolling navigation
    window.addEventListener("wheel", (event) => {
        jump = false;
        if (event.deltaY > 0) {
            moveUp(); // Scroll down moves to the next section
        } else if (event.deltaY < 0) {
            moveDown(); // Scroll up moves to the previous section
        }
    });

    cards.forEach((card)=>{
        card.addEventListener("click", ()=>{
            nextSectionId = parseInt(card.dataset.gotoId);
            jump = true;
            moveUp();
        });
    });
});
