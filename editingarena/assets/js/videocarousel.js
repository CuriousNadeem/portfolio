import { video  } from "../data/videos.js";

let videolinks = '';
let currentvideoindex = 0;
let indicationarray = [];

const carouselIndication= document.querySelector('.carouselindication');

function generateIndicationHTML() {
    let indicationHTML = '';
    for (let i = 0; i < video.length; i++) {
        if (i === currentvideoindex) {
            indicationHTML += '<span class="indication-icon active">—</span>';
        } else {
            indicationHTML += '<span class="indication-icon notactive">—</span>';
        }
    }
    return indicationHTML;
}


video.forEach((vid, index) => {
    videolinks += vid.link;
    indicationarray.push(`<span class="indication-icon notactive indication-${index}">—</span>`);
});
if (video.length <= 1 ) {
    document.querySelector('.js-carousel').innerHTML = videolinks;
    carouselIndication.innerHTML = indicationHTML;
} else {
    document.querySelector('.js-carousel').innerHTML = video[0].link;
    currentvideoindex = 0;

    document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();

}
const buttonleft = document.querySelector('.js-carousel-control-left');
    if(currentvideoindex === 0) {
        buttonleft.disabled = true;
    } else {
        buttonleft.disabled = false;
    }
    buttonleft.addEventListener('click', ()=> {
        if(currentvideoindex !== 0) {
            currentvideoindex -= 1;
            document.querySelector('.js-carousel').innerHTML = video[(currentvideoindex)].link;
            document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();
        }
    });

const buttonright = document.querySelector('.js-carousel-control-right');
    if(currentvideoindex === video.length-1) {
        buttonright.disabled = true;
    } else {
        buttonright.disabled = false;
    }
    buttonright.addEventListener('click', ()=> {
        if(currentvideoindex !== video.length-1) {
            currentvideoindex += 1;
            document.querySelector('.js-carousel').innerHTML = video[(currentvideoindex)].link;
            document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();
        }
    });