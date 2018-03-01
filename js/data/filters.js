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
      var copyDatas = [];
      if (window.data.filter.dataArray.length === 0) {
        copyDatas = window.data.request.rawDatas.slice(0);
      } else {
        copyDatas = window.data.filter.dataArray;
      }
      var clickedElement = evt.target;
      var selectElement = filters.querySelector('input:checked');
      if (!clickedElement.classList.contains('filters')) {
        if (selectElement.value === 'popular') {
          window.data.filter.popularSort(copyDatas);
        } else if (selectElement.value === 'recommend') {
          copyDatas = window.data.filter.recommendSort();
        } else if (selectElement.value === 'discussed') {
          window.data.filter.discussSort(copyDatas);
        } else if (selectElement.value === 'random') {
          copyDatas = window.util.shuffleArray(copyDatas);
        }
      }
      window.data.filter.dataArray = copyDatas;
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
      return window.data.request.rawDatas.slice(0);
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
