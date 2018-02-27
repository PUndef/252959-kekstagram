'use strict';

(function () {

  var effectImagePreview = document.querySelector('.effect-image-preview');

  var stepResizeValue = 25;
  var uploadResizeMinValue = 25;
  var uploadResizeMaxValue = 100;
  var scaleProportion = 1 / 100;
  var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
  var decreaseUploadImageSize = document.querySelector('.upload-resize-controls-button-dec');
  var increaseUploadImageSize = document.querySelector('.upload-resize-controls-button-inc');

  decreaseUploadImageSize.addEventListener('click', function () {
    var currentUploadResizeValue = parseInt(uploadResizeValue.value, 10);
    if (currentUploadResizeValue > uploadResizeMinValue) {
      currentUploadResizeValue -= stepResizeValue;
      window.imageUploadResize.changeUploadImagesSize(currentUploadResizeValue);
    }
  });

  increaseUploadImageSize.addEventListener('click', function () {
    var currentUploadResizeValue = parseInt(uploadResizeValue.value, 10);
    if (currentUploadResizeValue < uploadResizeMaxValue) {
      currentUploadResizeValue += stepResizeValue;
      window.imageUploadResize.changeUploadImagesSize(currentUploadResizeValue);
    }
  });


  window.imageUploadResize = {
    changeUploadImagesSize: function (currentUploadResizeValue) {
      uploadResizeValue.value = currentUploadResizeValue + '%';
      effectImagePreview.style.transform = 'scale(' + currentUploadResizeValue * scaleProportion + ')';
    }
  };

})();
