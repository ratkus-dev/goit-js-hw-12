import { fetchImages } from './js/pixabay-api';
import {
  renderImages,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import iconError from '/img/error.svg';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="query"]');
const loader = document.querySelector('.loader');
let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
document.querySelector('.btn__load-more').addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    showToastError('Please enter a search query.');
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;
    hideLoader();

    if (totalHits === 0) {
      iziToast.info({
        title: 'No results',
        message: 'No images found. Please try again!',
      });
    } else {
      renderImages(data.hits);
      if (data.hits.length < totalHits) showLoadMoreButton();
    }
  } catch (error) {
    handleFetchError();
  }
}

async function onLoadMore() {
  hideLoadMoreButton();
  page += 1;
  showLoader();

  try {
    const data = await fetchImages(query, page);
    renderImages(data.hits);
    hideLoader();

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    } else {
      showLoadMoreButton();
    }

    smoothScroll();
  } catch (error) {
    handleFetchError();
  }
}

function showLoader() {
  loader.classList.add('visible');
}

function hideLoader() {
  loader.classList.remove('visible');
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showToastError(message) {
  iziToast.error({
    title: 'Error',
    message,
    titleColor: 'white',
    position: 'topRight',
    backgroundColor: 'red',
    messageColor: 'white',
    iconUrl: iconError,
  });
}

function handleFetchError() {
  hideLoader();
  showToastError('Something went wrong. Please try again later.');
}

function showEndOfResultsMessage() {
  iziToast.info({
    title: 'End of results',
    message: "We're sorry, but you've reached the end of search results.",
  });
}
