import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery__item">
        <a href="${largeImageURL}" class="gallery__link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <ul class="info">
          <li class="info__item"><b>Likes:</b> ${likes}</li>
          <li class="info__item"><b>Views:</b> ${views}</li>
          <li class="info__item"><b>Comments:</b> ${comments}</li>
          <li class="info__item"><b>Downloads:</b> ${downloads}</li>
        </ul>
      </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showEndOfResultsMessage() {
  alert("We're sorry, but you've reached the end of search results.");
}
