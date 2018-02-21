'use strict';

(function () {

  var filename = document.querySelector('input[name="filename"]');
  var scale = document.querySelector('input[name="scale"]');
  var effectLevel = document.querySelector('input[name="effect-level"]');
  var effect = document.querySelector('input[name="effect"]');
  var hashtags = document.querySelector('input[name="hashtags"]');
  var description = document.querySelector('textarea[name="description"]');

  var onError = function () {
    console.log('message');
  };

  window.data = {
    requestLoad: function () {

      var onSuccess = function (data) {
        window.galleryRenderPictures.renderPictures(data);
      };

      window.load('GET', 'https://js.dump.academy/kekstagram/data', onSuccess, onError, '');
    },
    uploadData: function () {

      var onSuccess = function () {
        window.popupUpload.closeUploadPopup();
      };

      var dataBoundary = {
        filename: filename.value,
        scale: scale.value,
        effectLevel: effectLevel.value,
        effect: effect.value,
        hashtags: hashtags.value,
        description: description.value
      };

      var boundary = String(Math.random()).slice(2);
      var boundaryMiddle = '--' + boundary + '\r\n';
      var boundaryLast = '--' + boundary + '--\r\n';

      var body = ['\r\n'];

      for (var key in dataBoundary) {
        if (Object.prototype.hasOwnProperty) {
          body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + dataBoundary[key] + '\r\n');
        }
      }

      body = body.join(boundaryMiddle) + boundaryLast;

      window.load('POST', 'https://js.dump.academy/kekstagram', onSuccess, onError, boundary, body);
    }
  };

})();
