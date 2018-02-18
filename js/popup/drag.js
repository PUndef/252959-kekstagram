'use strict';

(function () {

  var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
  var minEffectLevelVal = 0;
  var maxEffectLevelVal = 100;

  var setNewPositionPin = function (newPosition) {
    uploadEffectLevelPin.style.left = newPosition + '%';
    uploadEffectLevelVal.style.width = newPosition + '%';
    uploadEffectLevelValue.value = newPosition;
    window.imageChange.updateEffectLevel();
  };

  uploadEffectLevelPin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var lengthSlider = uploadEffectLevelLine.offsetWidth;
      var proportionSlider = 100 / lengthSlider;
      var newPosition = uploadEffectLevelValue.value - shift.x * proportionSlider;
      newPosition = Math.round(newPosition);
      if (newPosition >= minEffectLevelVal && newPosition <= maxEffectLevelVal) {
        setNewPositionPin(newPosition);
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      var currentValue = uploadEffectLevelValue.value;
      setNewPositionPin(currentValue);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
