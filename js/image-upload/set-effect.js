'use strict';

(function () {

  var DEFAULT_LEVEL_EFFECT = 100;

  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
  var uploadEffectLevelVal = document.querySelector('.upload-effect-level-val');
  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');

  var setNewEffect = function (nameEffect) {
    effectImagePreview.className = '';
    effectImagePreview.classList.add('effect-image-preview', 'effect-' + nameEffect);

    window.imageChange.setNewEffectLevel(DEFAULT_LEVEL_EFFECT, nameEffect);
    uploadEffectLevelPin.style.left = DEFAULT_LEVEL_EFFECT + '%';
    uploadEffectLevelVal.style.width = DEFAULT_LEVEL_EFFECT + '%';
    uploadEffectLevelValue.value = DEFAULT_LEVEL_EFFECT;
    if (nameEffect !== 'none') {
      uploadEffectLevel.classList.remove('hidden');
    }

  };

  uploadEffectControls.addEventListener('click', function (evt) {
    var selectElement = evt.toElement;
    if (selectElement.value) {
      setNewEffect(evt.toElement.value);
    }
  });

})();
