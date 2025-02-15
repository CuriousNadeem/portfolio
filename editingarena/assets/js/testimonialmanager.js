import { testimonials1 } from "../data/testimonials.js";
import { testimonials2 } from "../data/testimonials.js";
import { testimonials3 } from "../data/testimonials.js";


let testimonialsHTML1 = '';
let testimonialsHTML2 = '';
let testimonialsHTML3 = '';
testimonials1.forEach((review)=>{
    testimonialsHTML1 += 
    `
        <div class="itemRight ${review.item} d-flex flex-col">
            <p class="m-10 test-text">
                ${review.summary}
            </p>
            <div class="test-profile-div">
                <img src="${review.image}" class="test-img" alt="gif">
                <div>
                    <p class="test-name text-white">${review.name}</p>
                    <p class="test-name">${review.job}</p>
                </div>
            </div>
        </div>
    `;
});

testimonials2.forEach((review)=>{
    testimonialsHTML2 += 
    `
        <div class="itemLeft ${review.item} d-flex flex-col">
            <p class="m-10 test-text">
                ${review.summary}
            </p>
            <div class="test-profile-div">
                <img src="${review.image}" class="test-img" alt="gif">
                <div>
                    <p class="test-name text-white">${review.name}</p>
                    <p class="test-name">${review.job}</p>
                </div>
            </div>
        </div>
    `;
});

testimonials3.forEach((review)=>{
    testimonialsHTML3 += 
    `
        <div class="itemRight ${review.item} d-flex flex-col">
            <p class="m-10 test-text">
                ${review.summary}
            </p>
            <div class="test-profile-div">
                <img src="${review.image}" class="test-img" alt="gif">
                <div>
                    <p class="test-name text-white">${review.name}</p>
                    <p class="test-name">${review.job}</p>
                </div>
            </div>
        </div>
    `;
});
function displayTestimonials() {
    document.querySelector('.js-wrapper1').innerHTML = testimonialsHTML1;
    document.querySelector('.js-wrapper2').innerHTML = testimonialsHTML2;
    document.querySelector('.js-wrapper3').innerHTML = testimonialsHTML3;
};
displayTestimonials();