import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryContainer = document.querySelector('.gallery');
export const loadMoreBtn = document.querySelector('.btn__load-more');

export function renderImages(images) {
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

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
