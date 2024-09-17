import { carouselImgs } from "../data/hero-carousel.js";

document.addEventListener("DOMContentLoaded", function () {
  let bulletHTML = ``;
  function addBulletsHTML() {
    const bulletContainer = document.querySelector(".bullet-container");
    for (let index = 0; index < carouselImgs.length; index++) {
      bulletHTML += `
                <div class="image-sequence" id="icon${index}" data-icon-id="${index}">
                  <img
                    src="assets/imgs/sequence/0.png"
                    hidden
                    class="frame"
                    data-frame="0"
                  />
                  <img
                    src="assets/imgs/sequence/1.png"
                    hidden
                    class="frame"
                    data-frame="1"
                  />
                  <img
                    src="assets/imgs/sequence/2.png"
                    hidden
                    class="frame"
                    data-frame="2"
                  />
                  <img
                    src="assets/imgs/sequence/3.png"
                    hidden
                    class="frame"
                    data-frame="3"
                  />
                  <img
                    src="assets/imgs/sequence/4.png"
                    hidden
                    class="frame"
                    data-frame="4"
                  />
                  <img
                    src="assets/imgs/sequence/5.png"
                    hidden
                    class="frame"
                    data-frame="5"
                  />
                  <img
                    src="assets/imgs/sequence/6.png"
                    hidden
                    class="frame"
                    data-frame="6"
                  />
                  <img
                    src="assets/imgs/sequence/7.png"
                    hidden
                    class="frame"
                    data-frame="7"
                  />
                  <img
                    src="assets/imgs/sequence/8.png"
                    hidden
                    class="frame"
                    data-frame="8"
                  />
                  <img
                    src="assets/imgs/sequence/9.png"
                    hidden
                    class="frame"
                    data-frame="9"
                  />
                  <img
                    src="assets/imgs/sequence/10.png"
                    hidden
                    class="frame"
                    data-frame="10"
                  />
                  <img
                    src="assets/imgs/sequence/11.png"
                    hidden
                    class="frame"
                    data-frame="11"
                  />
                  <img
                    src="assets/imgs/sequence/12.png"
                    hidden
                    class="frame"
                    data-frame="12"
                  />
                  <img
                    src="assets/imgs/sequence/13.png"
                    hidden
                    class="frame"
                    data-frame="13"
                  />
                  <img
                    src="assets/imgs/sequence/14.png"
                    hidden
                    class="frame"
                    data-frame="14"
                  />
                  <img
                    src="assets/imgs/sequence/15.png"
                    hidden
                    class="frame"
                    data-frame="15"
                  />
                  <img
                    src="assets/imgs/sequence/16.png"
                    hidden
                    class="frame"
                    data-frame="16"
                  />
                  <img
                    src="assets/imgs/sequence/17.png"
                    hidden
                    class="frame"
                    data-frame="17"
                  />
                  <img
                    src="assets/imgs/sequence/18.png"
                    hidden
                    class="frame"
                    data-frame="18"
                  />
                  <img
                    src="assets/imgs/sequence/19.png"
                    hidden
                    class="frame"
                    data-frame="19"
                  />
                  <img
                    src="assets/imgs/sequence/20.png"
                    hidden
                    class="frame"
                    data-frame="20"
                  />
                  <img
                    src="assets/imgs/sequence/21.png"
                    hidden
                    class="frame"
                    data-frame="21"
                  />
                  <img
                    src="assets/imgs/sequence/22.png"
                    hidden
                    class="frame"
                    data-frame="22"
                  />
                  <img
                    src="assets/imgs/sequence/23.png"
                    hidden
                    class="frame"
                    data-frame="23"
                  />
                  <img
                    src="assets/imgs/sequence/24.png"
                    hidden
                    class="frame"
                    data-frame="24"
                  />
                  <img
                    src="assets/imgs/sequence/25.png"
                    hidden
                    class="frame"
                    data-frame="25"
                  />
                  <img
                    src="assets/imgs/sequence/26.png"
                    hidden
                    class="frame"
                    data-frame="26"
                  />
                  <img
                    src="assets/imgs/sequence/27.png"
                    hidden
                    class="frame"
                    data-frame="27"
                  />
                  <img
                    src="assets/imgs/sequence/28.png"
                    hidden
                    class="frame"
                    data-frame="28"
                  />
                  <img
                    src="assets/imgs/sequence/29.png"
                    hidden
                    class="frame"
                    data-frame="29"
                  />
                  <img
                    src="assets/imgs/sequence/30.png"
                    hidden
                    class="frame"
                    data-frame="30"
                  />
                </div>
                `;
    }
    bulletContainer.innerHTML = bulletHTML;
  }

  addBulletsHTML();
});
