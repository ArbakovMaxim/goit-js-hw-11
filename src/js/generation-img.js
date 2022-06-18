import galleryImg from '../templates/img.hbs'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";
import refs from './refs';

function markupGeneration (pictureInformation){
    const markup =  galleryImg(pictureInformation)
    refs.gallery.insertAdjacentHTML("beforeend", markup);
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh ();
}


export default {markupGeneration};