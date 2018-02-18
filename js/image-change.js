'use strict';

(function () {
  var PROPORTION_1 = 1 / 100;
  var PROPORTION_3 = 3 / 100;
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectLevelValue = document.querySelector('.upload-effect-level-value');

  window.imageChange = {
    setNewEffectLevel: function (levelEffect, nameEffect) {
      if (nameEffect === 'none') {
        effectImagePreview.style.filter = 'none';
        uploadEffectLevel.classList.add('hidden');
      }
      if (nameEffect === 'chrome') {
        document.querySelector('.effect-chrome').style.filter = 'grayscale(' + levelEffect * PROPORTION_1 + ')';
      }
      if (nameEffect === 'sepia') {
        document.querySelector('.effect-sepia').style.filter = 'sepia(' + levelEffect * PROPORTION_1 + ')';
      }
      if (nameEffect === 'marvin') {
        document.querySelector('.effect-marvin').style.filter = 'invert(' + levelEffect + '%)';
      }
      if (nameEffect === 'phobos') {
        document.querySelector('.effect-phobos').style.filter = 'blur(' + levelEffect * PROPORTION_3 + 'px)';
      }
      if (nameEffect === 'heat') {
        document.querySelector('.effect-heat').style.filter = 'brightness(' + levelEffect * PROPORTION_3 + ')';
      }
    },
    updateEffectLevel: function () {
      if (effectImagePreview.classList[1]) {
        var currentEffect = effectImagePreview.classList[1].replace('effect-', '');
        var currentLevel = uploadEffectLevelValue.value;
        window.imageChange.setNewEffectLevel(currentLevel, currentEffect);
      }
    }
  };

})();
