import { shortvideo } from "../data/shortvideos.js";

let shortvideoHTML = '';
shortvideo.forEach((svid) => {
    shortvideoHTML += svid.link;
});
document.querySelector('.grid-6').innerHTML = shortvideoHTML;