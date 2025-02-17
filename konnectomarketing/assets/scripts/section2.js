document.addEventListener("DOMContentLoaded", () => {
    const middleSection = document.querySelector(".middle-section");
    const topSection = document.querySelector(".top-section");
    const bottomSection = document.querySelector(".bottom-section");
    //const cards = document.querySelectorAll(".card");

    let timeoutId = null; // Store timeout reference

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    middleSection.classList.add("active");
    
                    // Clear any previous timeout to prevent duplicate execution
                    clearTimeout(timeoutId);
    
                    // Set a timeout to run after 1 second
                    timeoutId = setTimeout(() => {
                        topSection.classList.add("active");
                        bottomSection.classList.add("active");
                        console.log("run");
                    }, 1000);
    
                } else {
                    middleSection.classList.remove("active");
                    topSection.classList.remove("active");
                    bottomSection.classList.remove("active");
    
                    // Clear timeout if the section leaves viewport before timeout completes
                    clearTimeout(timeoutId);
                }
            });
        },
        { threshold: 0.5 } // Adjust threshold as needed
    );
    
    observer.observe(middleSection);
});
