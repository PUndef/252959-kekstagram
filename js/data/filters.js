'use strict';

(function () {

  var pictures = document.querySelector('.pictures');

  var filters = document.querySelector('.filters');
  filters.addEventListener('click', function (evt) {
    window.debounce(window.data.filter.setNewFilter(evt));
  });


  window.data.filter = {
    setNewFilter: function (evt) {
      var copyData = window.data.request.rawData.slice(0);
      var selectElement = evt.toElement;
      if (selectElement.value) {
        console.log(selectElement.value);
        if (selectElement.value === 'popular') {
          window.data.filter.popularSort(copyData);
        } else if (selectElement.value === 'recommend') {
          copyData = window.data.filter.recommendSort();
        } else if (selectElement.value === 'discussed') {
          window.data.filter.discussSort(copyData);
        } else if (selectElement.value === 'random') {
          copyData = window.util.shuffleArray(copyData);
        }
        pictures.innerHTML = '';
        window.gallery.renderPictures(copyData);
      }

    },
    descendingOrder: function (data, nameParameter) {
      data.sort(function (first, second) {
        if (first[nameParameter] > second[nameParameter]) {
          return -1;
        } else if (first[nameParameter] < second[nameParameter]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    recommendSort: function () {
      return window.data.request.rawData;
    },
    popularSort: function (data) {
      window.data.filter.descendingOrder(data, 'likes');
    },
    discussSort: function (data) {
      window.data.filter.descendingOrder(data, 'comments');
    }
  };

})();
