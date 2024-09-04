$(document).ready(function() {
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        document.getElementById('js-mailalert').style.color = '#28a745';
        document.getElementById('js-mailalert').innerHTML = 'Your message is being sent. Please wait a moment...';
        event.preventDefault(); // Prevent the default form submission
    
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        const email = 'editingarena@gmail.com';
        const serviceId = 'service_5yoreop';
        const templateId = 'template_r02m4vh';
        // Send the form data using EmailJS
        emailjs.send(serviceId, templateId, formData)
        .then(function(response) {
            document.getElementById('js-mailalert').style.color = '#28a745';
            document.getElementById('js-mailalert').innerHTML = 'Message sent successfully!';
        }, function(error) {
            document.getElementById('js-mailalert').style.color = '#dc3545';
            document.getElementById('js-mailalert').innerHTML = `There was an issue sending your message. Please try again later or reach out to us at ${email}.`;
        });
    });
});