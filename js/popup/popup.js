'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var galleryOverlay = document.querySelector('.gallery-overlay');

  window.popup = {
    openPopup: function (elem, escPressListener) {
      elem.classList.remove('hidden');
      document.addEventListener('keydown', escPressListener);
    },
    closePopup: function () {
      galleryOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.popup.onPopupEscPress);
    },
    onPopupEscPress: function (evt) {
      window.util.isEscEvent(evt, window.popup.closePopup);
    },
    onUploadPopupEscPress: function (evt) {
      window.util.isEscEvent(evt, window.popupUpload.closeUploadPopup);
    },
    stopCloseEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.stopPropagation();
      }
    }
  };
})();
