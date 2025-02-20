function readjustHeight() {
    document.querySelectorAll('.section').forEach((section) => {
        section.classList.add('no-height');
        setTimeout(() => {
            section.classList.remove('no-height'); // readjust height after 0.2 seconds
        }, 200);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let currentSectionId = 1; // Ensure this is always a number
    let nextSectionId = 3;
    let jump = false;
    const cards = document.querySelectorAll(".card");

    // Preloader removal after loading
    const preloader = document.getElementById("preloader");
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
            preloader.style.display = "none"; // Hide after transition
        }, 1500); // Matches CSS transition time
    }, 1000);

    function moveUp() {
        if (!jump) {
            nextSectionId = currentSectionId + 1;
        }
    
        let nextSection = document.querySelector(`.section[data-id="${nextSectionId}"]`);
        
        if (nextSection) {
            while (currentSectionId < nextSectionId) {
                let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
                if (currentSection) {
                    currentSection.classList.remove("active", "hidden-down");
                    currentSection.classList.add("hidden-up");
                }
                currentSectionId++; // Move to the next section
            }
    
            // Activate the target section
            nextSection.classList.remove("hidden-down");
            nextSection.classList.add("active");
    
            // Update the current section ID
            currentSectionId = Number(nextSection.dataset.id);
            navbarManage();
        }
    }
    

    function moveDown() {
        if (!jump) {
            nextSectionId = currentSectionId - 1;
        }
        let prevSection = document.querySelector(`.section[data-id="${nextSectionId}"]`);

        if (prevSection) {

            while (currentSectionId > nextSectionId) {
                let currentSection = document.querySelector(`.section[data-id="${currentSectionId}"]`);
                if (currentSection) {
                    currentSection.classList.remove("active", "hidden-up");
                    currentSection.classList.add("hidden-down");
                }
                currentSectionId--; // Move to the next section
            }

            prevSection.classList.remove("hidden-up");
            prevSection.classList.add("active");

            currentSectionId = Number(prevSection.dataset.id);
            navbarManage();
        }
    }

    function moveLogo() {
        jump = false;
        readjustHeight();
        setTimeout(moveUp, 3000); // Move up after 3s
    }

    // Start logo animation on page load
    moveLogo();

    // Keyboard navigation
    let isMoving = false; // Cooldown flag
    document.addEventListener("keydown", (e) => {
        if (isMoving) return; // Prevent multiple triggers
    
        if (["ArrowDown", "PageDown"].includes(e.key)) {
            jump = false;
            isMoving = true;
            moveUp();
            setTimeout(() => (isMoving = false), 800); // Allow movement after 0.8s
        } else if (["ArrowUp", "PageUp"].includes(e.key)) {
            jump = false;
            isMoving = true;
            moveDown();
            setTimeout(() => (isMoving = false), 800); // Allow movement after 0.8s
        }
    });

    // Mouse wheel scrolling navigation
    window.addEventListener("wheel", (event) => {
        if (isMoving) return; // Prevent multiple triggers
    
        jump = false;
        isMoving = true;
    
        if (event.deltaY > 0) {
            moveUp(); // Scroll down moves to the next section
        } else if (event.deltaY < 0) {
            moveDown(); // Scroll up moves to the previous section
        }
    
        setTimeout(() => (isMoving = false), 800); // Allow movement after transition
    });
    

    // Card click navigation
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            nextSectionId = Number(card.dataset.gotoId);
            jump = true;
            moveUp();
        });
    });
    function navbarManage(){
       const navbar = document.querySelector(".navbar");
        if(currentSectionId > 1) {
            navbar.classList.add("active");
        } else {
            navbar.classList.remove("active");
        }
    }
    menuSwitch();
    function menuSwitch() {
        const menubarList = document.querySelectorAll(".menu-bar li");
        menubarList[1].classList.add("active");
    }
});

