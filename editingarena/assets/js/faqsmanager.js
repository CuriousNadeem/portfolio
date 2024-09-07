import { faqs } from "../data/faqs.js";

document.addEventListener('DOMContentLoaded', function() {
    generateFaqsHTML();
    
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.icon');

        question.addEventListener('click', () => {
            // Check if it's already expanded
            const isExpanded = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // Toggle the answer visibility smoothly
            if (isExpanded) {
                // Collapse the answer
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
                icon.textContent = '+'; // Change back to +
                icon.style.transform = 'rotate(0deg)'; // Rotate back
            } else {
                // Expand the answer
                answer.style.maxHeight = answer.scrollHeight + 20 + 'px';
                answer.style.padding = '10px 0';
                icon.textContent = '-'; // Change to -
                icon.style.transform = 'rotate(180deg)'; // Rotate to minus
            }
        });
    });

    function generateFaqsHTML() {
        //generate html
        let faqsHTML = ''; 
        let listHTML = '';
        faqs.forEach((faq) => {
            if(!faq.list){
                faqsHTML += `
                <div class="faq-item">
                    <div class="faq-question">
                        <span>${faq.question}</span>
                        <span class="icon">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>${faq.answer}</p>
                    </div>
                </div>
                `;
            } else {
                faq.list.forEach((listitem)=>{
                    listHTML += `<li>${listitem}</li>`;
                });
                faqsHTML += `
                <div class="faq-item">
                    <div class="faq-question">
                        <span>${faq.question}</span>
                        <span class="icon">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>${faq.answer}</p>
                        ${listHTML}
                    </div>
                </div>
                `; 
                listHTML = '';
            }
        });
        const faqsContainer = document.querySelector('.js-faqs-container');
        faqsContainer.innerHTML = faqsHTML;
    }
});
