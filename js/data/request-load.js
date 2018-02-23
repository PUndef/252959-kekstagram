'use strict';

(function () {

  var onError = function () {
    // console.log('message');
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
