'use strict';

(function () {

  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var uploadFormDescription = document.querySelector('.upload-form-description');

  uploadFormHashtags.addEventListener('keyup', function () {
    window.popupFormValidate.validateHashtags();
  });

  uploadFormHashtags.addEventListener('keydown', function (evt) {
    window.popup.stopCloseEscPress(evt);
  });

  uploadFormDescription.addEventListener('keydown', function (evt) {
    window.popup.stopCloseEscPress(evt);
  });

})();
