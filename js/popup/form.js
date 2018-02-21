'use strict';

(function () {

  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');
  var formUpload = document.querySelector('#upload-select-image');

  uploadFormHashtags.addEventListener('keyup', function () {
    window.popupFormValidate.validateHashtags();
  });

  uploadFormHashtags.addEventListener('keydown', function (evt) {
    window.popup.stopCloseEscPress(evt);
  });

  uploadFormDescription.addEventListener('keydown', function (evt) {
    window.popup.stopCloseEscPress(evt);
  });

  formUpload.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.uploadData();
  });

})();
