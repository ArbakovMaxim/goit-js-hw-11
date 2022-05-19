import axios from 'axios';
import markup from './generation-img.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import params from './get-params';



const baseURL = 'https://pixabay.com/api/';


async function getImage() {
    //refs.btnLoad.style.display = 'none';
    try {
        const response = await axios.get(`${baseURL}`,{params});
            if(response.data.hits.length === 0) {
                return
            } 
            else {
                markup.markupGeneration (response.data.hits);
                //refs.btnLoad.style.display = 'flex';
                return response;
            }
    }
    catch (error) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
}



export default {getImage};
