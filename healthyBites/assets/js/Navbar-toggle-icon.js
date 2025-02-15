$(document).ready(function () {
    var $toggler = $('.navbar-toggler');
    var $barsIcon = $('#bars');   // Icon for bars
    var $closeIcon = $('#close'); // Icon for close

    // Initial state: Bars icon visible, Close icon hidden
    $barsIcon.css('opacity', 1);
    $closeIcon.css('opacity', 0);

    function toggleIcons() {
        if ($barsIcon.css('opacity') == 1) {
            $barsIcon.css('opacity', 0);   // Hide bars icon
            $closeIcon.css('opacity', 1);  // Show close icon
        } else {
            $barsIcon.css('opacity', 1);   // Show bars icon
            $closeIcon.css('opacity', 0);  // Hide close icon
        }
    }

    $toggler.on('click', function () {
        toggleIcons(); // Toggle icon visibility on click
    });
});
