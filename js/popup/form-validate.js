'use strict';

(function () {

  var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
  var maxCountHastags = 5;
  var maxLengthHashtag = 20;

  window.popupFormValidate = {
    validateHashtags: function () {
      var hashtags = uploadFormHashtags.value;
      var arrayHashtags = hashtags.trim().split(' ');
      var countFailed = 0;
      for (var i = 0; i < arrayHashtags.length; i++) {
        arrayHashtags[i] = arrayHashtags[i].toLowerCase();
        if (arrayHashtags[i].charAt(0) !== '#') {
          countFailed++;
          uploadFormHashtags.setCustomValidity('Хэш-тег должен начинаться с символа #');
        }
        if (arrayHashtags[i].length > maxLengthHashtag) {
          countFailed++;
          uploadFormHashtags.setCustomValidity('Максимальная длина хэш-тега ' + maxLengthHashtag + ' символов');
        }
        if (arrayHashtags[i].split('#').length - 1 > 1) {
          countFailed++;
          uploadFormHashtags.setCustomValidity('Напишите, пожалуйста, ваши хэш-теги через пробел');
        }
        for (var j = 0; j < arrayHashtags.length; j++) {
          if (arrayHashtags[i] === arrayHashtags[j] && i !== j) {
            countFailed++;
            uploadFormHashtags.setCustomValidity('Хэш-теги не должны повторяться (регистр тегов не имеет значения)');
          }
        }
      }
      if (arrayHashtags.length > maxCountHastags) {
        countFailed++;
        uploadFormHashtags.setCustomValidity('Максимум можно добавить ' + maxCountHastags + ' хэш-тегов');
      }
      if (countFailed === 0) {
        uploadFormHashtags.setCustomValidity('');
      }
      if (hashtags === '') {
        uploadFormHashtags.setCustomValidity('');
      }
    }
  };

})();
