'use strict';

(function () {
  window.backend = {
    load: function (method, url, onSuccess, onError, data) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      if (method === 'POST') {
        xhr.open('POST', url);
        xhr.send(data);
      } else {
        xhr.open('GET', url);
        xhr.send();
      }

    }
  };

})();
