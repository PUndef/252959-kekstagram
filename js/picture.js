'use strict';

(function () {

  var pictures = document.querySelector('.pictures');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');

  window.data.request.requestLoad();

  var openGalleryOverlay = function (src, likes, comments) {
    galleryOverlay.classList.remove('hidden');
    galleryOverlay.querySelector('.gallery-overlay-image').src = src;
    galleryOverlay.querySelector('.likes-count').textContent = likes;
    galleryOverlay.querySelector('.comments-count').textContent = comments;
    document.addEventListener('keydown', window.popup.onPopupEscPress);
  };

  var onEnterPress = function (evt) {
    var pictureFocus = document.querySelector('.pictures .picture:focus');
    var src = pictureFocus.querySelector('img').getAttribute('src');
    var likes = pictureFocus.querySelector('.picture-likes').textContent;
    var comments = pictureFocus.querySelector('.picture-comments').textContent;
    var isEnterEvent = window.util.isEnterEvent(evt);
    if (isEnterEvent === true) {
      evt.preventDefault();
      openGalleryOverlay(src, likes, comments);
    }
  };

  pictures.addEventListener('keydown', onEnterPress);

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
