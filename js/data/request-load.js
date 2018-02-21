'use strict';

(function () {


  window.data = {
    requestLoad: function () {
      var onError = function () {
        window.galleryRenderPictures.renderPictures(window.data.photosArray);
      };

      var onSuccess = function (data) {
        window.galleryRenderPictures.renderPictures(data);
      };

      window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
    }
  };

})();
