'use strict';

(function () {

  var filters = document.querySelector('.filters');
  filters.addEventListener('click', function (evt) {
    window.data.filter.setNewFilter(evt);
    window.debounce(window.gallery.renderPicturesFilter);
  });


  window.data.filter = {
    dataArray: [],
    setNewFilter: function (evt) {
      var copyData = [];
      if (window.data.filter.dataArray.length === 0) {
        copyData = window.data.request.rawData.slice(0);
      } else {
        copyData = window.data.filter.dataArray;
      }
      var clickedElement = evt.target;
      var selectElement = filters.querySelector('input:checked');
      if (!clickedElement.classList.contains('filters')) {
        if (selectElement.value === 'popular') {
          window.data.filter.popularSort(copyData);
        } else if (selectElement.value === 'recommend') {
          copyData = window.data.filter.recommendSort();
        } else if (selectElement.value === 'discussed') {
          window.data.filter.discussSort(copyData);
        } else if (selectElement.value === 'random') {
          copyData = window.util.shuffleArray(copyData);
        }
      }
      window.data.filter.dataArray = copyData;
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
      return window.data.request.rawData.slice(0);
    },
    popularSort: function (data) {
      window.data.filter.descendingOrder(data, 'likes');
    },
    discussSort: function (data) {
      window.data.filter.descendingOrder(data, 'comments');
      data.sort(function (first, second) {
        if (first['comments'].length > second['comments'].length) {
          return -1;
        } else if (first['comments'].length < second['comments'].length) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  };

})();
