import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import iconError from '/img/error.svg';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="searchQuery"]');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn__load-more');
let page = 1;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      titleColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: iconError,
    });
    return;
  }

  currentQuery = query;
  page = 1;
  clearGallery();
  showLoader();
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await fetchImages(currentQuery, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(data.hits);
      if (data.totalHits > page * 15) {
        loadMoreBtn.classList.remove('hidden');
      }
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      titleColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: iconError,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, page);
    hideLoader();

    renderImages(data.hits);
    if (page * 15 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      titleColor: 'white',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      iconUrl: iconError,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}
