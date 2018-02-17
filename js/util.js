'use strict';

(function () {

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
    }
  };

})();
