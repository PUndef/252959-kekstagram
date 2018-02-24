'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  window.data.requestLoad();

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
