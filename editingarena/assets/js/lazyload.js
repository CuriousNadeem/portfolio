document.addEventListener("DOMContentLoaded", function() {
    const lazyLoadElements = document.querySelectorAll('.lazy-load');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    lazyLoadElements.forEach(element => {
        observer.observe(element);
    });
});
