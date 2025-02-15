import { video  } from "../data/videos.js";

let videolinks = '';
let style1videos = [];
let style2videos = [];
let style3videos = [];
let style4videos = [];
let style5videos = [];
let activeStyleArray = [];
let currentvideoindex = 0;
let indicationarray = [];

document.addEventListener('DOMContentLoaded', function() {

    let activebutton = document.querySelector('.js-menu-1'); //seting active button value to 1st button

    const carouselIndication= document.querySelector('.carouselindication');

    function generateIndicationHTML() {
        let indicationHTML = '';
        for (let i = 0; i < activeStyleArray.length; i++) {
            if (i === currentvideoindex) {
                indicationHTML += '<span class="indication-icon active">—</span>';
            } else {
                indicationHTML += '<span class="indication-icon notactive">—</span>';
            }
        }
        return indicationHTML;
    }

    function restartCarousel() {
        document.querySelector('.js-carousel').innerHTML = activeStyleArray[0].link;
        currentvideoindex = 0;
        document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();
    }

    function activateButton(button) {
        // Remove the 'active' class from all buttons if you want only one active at a time
        document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
        
        // Add the 'active' class to the button that was passed to the function
        button.classList.add('active');
    }
    function activeStyle1ByDefault() {
        activeStyleArray = style1videos;
        activateButton(activebutton);
    }


    video.forEach((vid, index) => {

        //added videosHTML according to there styles.
        if(vid.style === 1) {
            style1videos.push(vid);
        }else if (vid.style === 2) {
            style2videos.push(vid);
        }else if (vid.style === 3) {
            style3videos.push(vid);
        }else if (vid.style === 4) {
            style4videos.push(vid);
        }else if (vid.style === 5) {
            style5videos.push(vid);
        }

        indicationarray.push(`<span class="indication-icon notactive indication-${index}">—</span>`);
    });

    activeStyle1ByDefault(); //seting style1 as default

    if (video.length <= 1 ) {
        videolinks += vid.link;
        document.querySelector('.js-carousel').innerHTML = videolinks;
        carouselIndication.innerHTML = indicationHTML;
    } else {
        restartCarousel();
    }

    const buttonleft = document.querySelector('.js-carousel-control-left');
        if(currentvideoindex === 0) {
            buttonleft.disabled = true;
        } else {
            buttonleft.disabled = false;
        }
        buttonleft.addEventListener('click', ()=> {
            if(activeStyleArray){
                if(currentvideoindex !== 0) {
                    currentvideoindex -= 1;
                    document.querySelector('.js-carousel').innerHTML = activeStyleArray[(currentvideoindex)].link;
                    document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();
                }
            }else{
                console.log("activeStyleArray is null");
            }
        });

    const buttonright = document.querySelector('.js-carousel-control-right');
        if(currentvideoindex === activeStyleArray.length-1) {
            buttonright.disabled = true;
        } else {
            buttonright.disabled = false;
        }
        buttonright.addEventListener('click', ()=> {
            if(activeStyleArray){
                if(currentvideoindex !== activeStyleArray.length-1) {
                    currentvideoindex += 1;
                    document.querySelector('.js-carousel').innerHTML = activeStyleArray[(currentvideoindex)].link;
                    document.querySelector('.carouselindication').innerHTML = generateIndicationHTML();
                }
            }else{
                console.log("activeStyleArray is null");
            }
        });

        //change active style
        activebutton.addEventListener('click', ()=> {
            activeStyle1ByDefault();
            restartCarousel();
        });
        const menubutton2 = document.querySelector('.js-menu-2');
        menubutton2.addEventListener('click', ()=> {
            activeStyleArray = style2videos;
            restartCarousel();
            activateButton(menubutton2);
        });
        const menubutton3 = document.querySelector('.js-menu-3');
        menubutton3.addEventListener('click', ()=> {
            activeStyleArray = style3videos;
            restartCarousel();
            activateButton(menubutton3);
        });
        const menubutton4 = document.querySelector('.js-menu-4');
        menubutton4.addEventListener('click', ()=> {
            activeStyleArray = style4videos;
            restartCarousel();
            activateButton(menubutton4);
        });
        const menubutton5 = document.querySelector('.js-menu-5');
        menubutton5.addEventListener('click', ()=> {
            activeStyleArray = style5videos;
            restartCarousel();
            activateButton(menubutton5);
        });

});
