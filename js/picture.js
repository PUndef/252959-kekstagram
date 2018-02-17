'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  for (var i = 0; i < window.data.photosArray.length; i++) {
    fragment.appendChild(window.galleryRenderPictures.renderPictures(window.data.photosArray[i]));
  }
  pictures.appendChild(fragment);

  var openGalleryOverlay = function (src, likes, comments) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('.gallery-overlay-image').src = src;
    galleryOverlay.querySelector('.likes-count').textContent = likes;
    galleryOverlay.querySelector('.comments-count').textContent = comments;
    document.addEventListener('keydown', window.popup.onPopupEscPress);
  };

  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    var elem = evt.target;
    var comments = elem.nextElementSibling.querySelector('.picture-comments').textContent;
    var likes = elem.nextElementSibling.querySelector('.picture-likes').textContent;
    var src = evt.target.getAttribute('src');
    openGalleryOverlay(src, likes, comments);
  });

  galleryOverlayClose.addEventListener('click', function () {
    window.popup.closePopup();
  });

})();
