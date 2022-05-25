import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(items) {
  return items
    .map(
      item => `<li><a class="gallery__item" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
</a></li>`,
    )
    .join('');
}

galleryRef.innerHTML = galleryMarkup;

const handleClick = e => {
  e.preventDefault();

  console.log(e.target.nodeName);
  if (e.target.nodeName !== 'IMG') {
    return;
  }
};
galleryRef.addEventListener('click', handleClick);

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
  caption: true,
  captionsData: 'alt',
  captionDelay: 250,
});
// var lightbox = $('.gallery a').simpleLightbox({
//   /* options */
// });
