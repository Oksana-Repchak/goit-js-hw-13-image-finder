import ApiService from './apiService';
import imageTemplate from '../templates/imageCard.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('#load-more'),
};

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);
refs.button.addEventListener('click', scrollTo);



function onSearch(e) {
  e.preventDefault();

  const inputValue = e.currentTarget.elements.query.value;
  
  // if (apiService.inputValue = '') {
  //   return alert('Enter the correct value');
  // }

  apiService.resetPage();
  apiService.searchQuery = inputValue;
  apiService.fetchImages().then(images => {
    clearListImage();
    listImageMarkup(images);
  });
}

function listImageMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imageTemplate(images));
}

function onLoadMore(e) {
  apiService.fetchImages().then(listImageMarkup);
  scrollTo();
}

function clearListImage() {
  refs.gallery.innerHTML = '';
}

function scrollTo() {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth',
    });
}