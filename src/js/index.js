import '../css/styles.css';
import api from './get-api.js';
import refs from './refs';
import params from './get-params';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs.form.addEventListener('submit', pictureRequest);

function  pictureRequest(event) {
    event.preventDefault();
    params.page = 1;
    clearGallery();
    params.q = refs.input.value;
    api.getImage()
    .then(response => messegeFoundImg(response.data.total))
    .catch(error => Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
}

function messegeFoundImg(found){
    if(found){
    Notify.success(`Hooray! We found ${found} images.`);
    }
}

function clearGallery () {
    refs.gallery.innerHTML = '';
}

const onEntry =(entries) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio && params.q !== ""){
                params.page +=1;
                api.getImage(refs.input.value);
            }
        }
)};

const options = {
        rootMargin: "300px",
}
    
const observer = new IntersectionObserver(onEntry, options);
      
observer.observe(refs.sentinel);


/* refs.btnLoad.style.display = 'none';
refs.btnLoad.addEventListener('click', loadMore);

function loadMore () {
    params.page +=1;
    api.getImage(refs.input.value);
} */