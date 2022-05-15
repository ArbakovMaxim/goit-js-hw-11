import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import galleryImg from '../templates/img.hbs'
import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('.search-form--input'),
    btnLoad: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

const apiKey = `27247276-2a88fcc64ac0c5c7b7477cb08`;
const axios = require('axios');
const baseURL = 'https://pixabay.com/api/';
const perPage = 40;
let page = 1;


refs.form.addEventListener('submit', pictureRequest);

function  pictureRequest(event) {
    event.preventDefault();
    pageReset();
    clearGallery();
    getUser(refs.input.value);
}

async function getUser(searchTerm) {
    refs.btnLoad.style.display = 'none';
    try {
        const response = await axios.get(`${baseURL}?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`);
            if(response.data.hits.length === 0) {
                Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 
    else {
        Notify.success(`Hooray! We found ${response.data.total} images.`);
            markupGeneration (response.data);
            refs.btnLoad.style.display = 'flex';
    }
        console.log(response.data);}
    catch (error) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
}

function markupGeneration (pictureInformation){
    const markup =  pictureInformation.hits.map(item =>galleryImg(item)).join('');
    refs.gallery.insertAdjacentHTML("beforeend", markup);
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh ();
}

function pageReset () {
    page = 1;
}

function pageIncrement () {
    page +=1;
}   


function clearGallery () {
    refs.gallery.innerHTML = '';
}

refs.btnLoad.style.display = 'none';
refs.btnLoad.addEventListener('click', loadMore);

function loadMore () {
    pageIncrement();
    getUser(refs.input.value);
}


