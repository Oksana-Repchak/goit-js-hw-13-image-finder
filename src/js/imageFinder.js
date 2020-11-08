import ApiService from './apiService';
import imageTemplate from '../templates/imageCard.hbs';
import animateScroll from 'animated-scroll-to';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('#load-more'),
  imageContainer: document.querySelector('.gallery'),
};

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);



async function onSearch(e) {
  e.preventDefault();

  try {
    const inputValue = e.currentTarget.elements.query.value;

    apiService.resetPage();
    apiService.searchQuery = inputValue;

   const response = await apiService.fetchImages();
    clearListImage();
    listImageMarkup(response);
    // apiService.fetchImages().then(images => {
    //   clearListImage();
    //   listImageMarkup(images);
    // });
  }
  catch (error) {
    console.log('Error');
  }
}

function listImageMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
}

async function onLoadMore(e) {
  try {
    const response = await apiService.fetchImages();
    listImageMarkup(response);
    scroll();
  }
  catch {
    console.log('Error');
  }
  // apiService.fetchImages().then(listImageMarkup);
  // scroll();

}

function clearListImage() {
  refs.gallery.innerHTML = '';
}

function scroll() {
  const indexToScroll = 12 * (apiService.page - 1) - 11;
  const itemToScroll = refs.imageContainer.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScroll(itemToScroll, options);
}