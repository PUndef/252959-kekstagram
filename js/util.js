'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomComments: function (inputCommentsArray, countForOutput) {
      var comments = [];
      for (var j = 0; j < countForOutput; j++) {
        comments.push(inputCommentsArray[window.util.getRandomInt(0, inputCommentsArray.length - 1)]);
      }
      return comments;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };

})();
