'use strict';

(function () {
  var modal = document.querySelector('.modal-overlay');
  var modalContent = document.querySelector('.modal-overlay-content');
  var filters = document.querySelector('.filters');
  var errorMessageTimeout = 2000;

  var onError = function (message) {
    modalContent.textContent = message;
    modal.classList.remove('hidden');
    setTimeout(function () {
      modal.classList.add('hidden');
    }, errorMessageTimeout);
  };

  window.data.request = {
    requestLoad: function () {

      var onSuccess = function (data) {
        window.gallery.renderPictures(data);
        filters.classList.remove('filters-inactive');
        window.data.request.rawData = data;
      };

      window.backend.load('GET', 'https://js.dump.academy/kekstagram/data', onSuccess, onError, '');
    },
    uploadData: function (data) {

      var onSuccess = function () {
        window.popupUpload.closeUploadPopup();
      };

      window.backend.load('POST', 'https://js.dump.academy/kekstagram', onSuccess, onError, data);
    },
    rawData: []
  };

})();
