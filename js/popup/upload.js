'use strict';

(function () {

  var defaulUploadResizeValue = 100;
  var defaultEffectLevel = 100;
  var defaultEffect = 'none';

  var upload = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');

  var effectImagePreview = document.querySelector('.effect-image-preview');

  upload.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.popup.openPopup(uploadOverlay, window.popup.onUploadPopupEscPress);
  });

  uploadClose.addEventListener('click', function () {
    window.popupUpload.closeUploadPopup();
  });

  uploadEffectLevelPin.addEventListener('mouseup', function () {
    if (effectImagePreview.classList[1]) {
      var currentEffect = effectImagePreview.classList[1].replace('effect-', '');
      var currentLevel = parseInt(uploadEffectLevelPin.style.left, 10);
      window.imageChange.setNewEffectLevel(currentLevel, currentEffect);
    }
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
