document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.navbar-burger');
    const collapseMenu = document.querySelector('.collapse-menu');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        collapseMenu.classList.toggle('active');
    });
});
