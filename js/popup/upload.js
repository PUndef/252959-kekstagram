'use strict';

(function () {

  var defaulUploadResizeValue = 100;
  var defaultEffectLevel = 100;
  var defaultEffect = 'none';

  var upload = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadClose = document.querySelector('#upload-cancel');

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.popup.openPopup(uploadOverlay, window.popup.onUploadPopupEscPress);
  });

  uploadClose.addEventListener('click', function () {
    window.popupUpload.closeUploadPopup();
  });

  window.popupUpload = {
    closeUploadPopup: function () {
      upload.value = '';
      uploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.popup.onUploadPopupEscPress);
      window.imageUploadResize.changeUploadImagesSize(defaulUploadResizeValue);
      window.imageChange.setNewEffectLevel(defaultEffectLevel, defaultEffect);
    }
  };

})();
