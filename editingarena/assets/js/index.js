let testimonialsHTML1 = '';
let testimonialsHTML2 = '';
let testimonialsHTML3 = '';
const testimonials1 = [
    {
        summary: "Working with Editing Arena has been a game-changer for our content. Sameer truly understands the vision and always delivers outstanding results.",
        name: "Jessica Peter",
        job: "Marketing Manager",
        item: "item1",
        image: "assets/images/testimonials/test1.webp"
    },
    {
        summary: "Sameer has an incredible eye for detail. His edits took our videos to the next level. Highly recommend Editing Arena!",
        name: "David Langford",
        job: "Filmmaker",
        item: "item2",
        image: "assets/images/testimonials/test2.webp"
    },
    {
        summary: "I've worked with many editors, but Sameer stands out. His creativity and dedication make Editing Arena the best choice for any video project.",
        name: "Sophia Mitchell",
        job: "Content Creator",
        item: "item3",
        image: "assets/images/testimonials/test3.webp"
    },
    {
        summary: "Editing Arena never disappoints. Sameer's work is always on time and exceeds expectations. Truly a master of his craft.",
        name: "Michael Kingston",
        job: "YouTuber",
        item: "item4",
        image: "assets/images/testimonials/test4.webp"
    },
    {
        summary: "Sameer transformed our raw footage into a compelling story. Editing Arena is now our go-to for all video editing needs.",
        name: "Rachel Anderson",
        job: "Documentary Producer",
        item: "item5",
        image: "assets/images/testimonials/test5.webp"
    },
    {
        summary: "Sameer’s attention to detail is unparalleled. Editing Arena took our corporate videos to a professional level.",
        name: "Robert Carlson",
        job: "Business Owner",
        item: "item6",
        image: "assets/images/testimonials/test6.webp"
    },
    {
        summary: "The videos Sameer edited for us were nothing short of spectacular. Editing Arena knows how to make content shine.",
        name: "Emily Thompson",
        job: "Event Organizer",
        item: "item7",
        image: "assets/images/testimonials/test7.webp"
    },
    {
        summary: "Editing Arena brought our vision to life with creativity and precision. Sameer's skills are truly top-notch.",
        name: "Daniel Hughes",
        job: "Musician",
        item: "item8",
        image: "assets/images/testimonials/test8.webp"
    }
].forEach((review)=>{
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

const testimonials2 = [
    {
        summary: "Sameer’s edits were exactly what we needed to elevate our brand’s message. Editing Arena is a true partner in our success.",
        name: "Olivia Sanders",
        job: "Brand Manager",
        item: "item1",
        image: "assets/images/testimonials/test9.webp"
    },
    {
        summary: "We’ve been working with Editing Arena for years, and Sameer always delivers excellence. Highly recommend for any project.",
        name: "Chris Williams",
        job: "Advertising Agency",
        item: "item2",
        image: "assets/images/testimonials/test10.webp"
    },
    {
        summary: "Sameer is incredibly talented and professional. Editing Arena provided us with videos that captured the essence of our campaign.",
        name: "Lily Baker",
        job: "PR Specialist",
        item: "item3",
        image: "assets/images/testimonials/test11.webp"
    },
    {
        summary: "The storytelling in Sameer’s edits is phenomenal. Editing Arena took our project to new heights.",
        name: "Ethan Reynolds",
        job: "Independent Filmmaker",
        item: "item4",
        image: "assets/images/testimonials/test12.webp"
    },
    {
        summary: "Editing Arena turned our raw footage into a polished masterpiece. Sameer’s work speaks for itself.",
        name: "Sarah Grant",
        job: "Wedding Planner",
        item: "item5",
        image: "assets/images/testimonials/test13.webp"
    },
    {
        summary: "Sameer understands the importance of timing and flow in a video. Editing Arena is simply the best.",
        name: "Jake Patterson",
        job: "Fitness Coach",
        item: "item6",
        image: "assets/images/testimonials/test14.webp"
    },
    {
        summary: "Working with Editing Arena was a seamless experience. Sameer’s expertise ensured our videos were exactly what we envisioned.",
        name: "Amanda Johnson",
        job: "Social Media Influencer",
        item: "item7",
        image: "assets/images/testimonials/test15.webp"
    },
    {
        summary: "Sameer’s creativity and technical skills are unmatched. Editing Arena delivered exactly what we needed, on time and on budget.",
        name: "Matthew Davies",
        job: "Corporate Trainer",
        item: "item8",
        image: "assets/images/testimonials/test16.webp"
    }
].forEach((review)=>{
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

const testimonials3 = [
    {
        summary: "I couldn’t be happier with the results from Editing Arena. Sameer is a true professional who understands the art of editing.",
        name: "Laura Vincent",
        job: "E-commerce Business Owner",
        item: "item1",
        image: "assets/images/testimonials/test17.webp"
    },
    {
        summary: "Editing Arena exceeded our expectations in every way. Sameer’s edits were clean, creative, and impactful.",
        name: "Eric Brown",
        job: "Non-Profit Director",
        item: "item2",
        image: "assets/images/testimonials/test18.webp"
    },
    {
        summary: "Sameer’s ability to turn our ideas into reality is incredible. Editing Arena is our first choice for video editing.",
        name: "Grace Nichols",
        job: "Real Estate Agent",
        item: "item3",
        image: "assets/images/testimonials/test19.webp"
    },
    {
        summary: "The precision and creativity that Sameer brings to his work are evident in every project. Editing Arena is phenomenal.",
        name: "Ryan Fletcher",
        job: "Tech Entrepreneur",
        item: "item4",
        image: "assets/images/testimonials/test20.webp"
    },
    {
        summary: "Editing Arena has been a key part of our content strategy. Sameer always delivers videos that engage and inspire our audience.",
        name: "Hannah Miller",
        job: "Digital Marketer",
        item: "item5",
        image: "assets/images/testimonials/test21.webp"
    },
    {
        summary: "Sameer’s editing brought a fresh perspective to our videos. Editing Arena truly understands what makes a video resonate.",
        name: "Justin Kelley",
        job: "Fashion Designer",
        item: "item6",
        image: "assets/images/testimonials/test22.webp"
    },
    {
        summary: "We’ve had nothing but positive experiences with Editing Arena. Sameer’s dedication and talent shine through in his work.",
        name: "Mia Carter",
        job: "Travel Blogger",
        item: "item7",
        image: "assets/images/testimonials/test23.webp"
    },
    {
        summary: "The quality of Sameer’s work is exceptional. Editing Arena consistently delivers videos that are polished and professional.",
        name: "Nathan Scott",
        job: "Music Producer",
        item: "item8",
        image: "assets/images/testimonials/test24.webp"
    }
].forEach((review)=>{
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
    console.log('done');
};
displayTestimonials();