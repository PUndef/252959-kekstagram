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

  var getDataForGalleryOverlay = function (elem) {
    var dataGallery = {
      comments: elem.querySelector('.picture-comments').textContent,
      likes: elem.querySelector('.picture-likes').textContent,
      src: elem.querySelector('img').getAttribute('src')
    };
    openGalleryOverlay(dataGallery.src, dataGallery.likes, dataGallery.comments);
  };

  var onEnterPress = function (evt) {
    var isEnterEvent = window.util.isEnterEvent(evt);
    if (isEnterEvent === true) {
      evt.preventDefault();
      var elem = pictures.querySelector('.picture:focus');
      getDataForGalleryOverlay(elem);
    }
  };

  pictures.addEventListener('keydown', onEnterPress);

  pictures.addEventListener('click', function (evt) {
    evt.preventDefault();
    var elem = evt.target.parentNode;
    getDataForGalleryOverlay(elem);
  });

  galleryOverlayClose.addEventListener('click', function () {
    window.popup.closePopup();
  });

})();
