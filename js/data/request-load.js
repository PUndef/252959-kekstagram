'use strict';

(function () {
  var modal = document.querySelector('.modal-overlay');
  var modalContent = document.querySelector('.modal-overlay-content');

  var onError = function (message) {
    modalContent.textContent = message;
    modal.classList.remove('hidden');
    setTimeout(function () {
      modal.classList.add('hidden');
    }, 2000);
  };

  window.data = {
    requestLoad: function () {

      var onSuccess = function (data) {
        window.galleryRenderPictures.renderPictures(data);
      };

      window.backend.load('GET', 'https://js.dump.academy/kekstagram/data', onSuccess, onError, '');
    },
    uploadData: function (data) {

      var onSuccess = function () {
        window.popupUpload.closeUploadPopup();
      };

      window.backend.load('POST', 'https://js.dump.academy/kekstagram', onSuccess, onError, data);
    }
  };

})();
