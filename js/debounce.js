'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 3000; // ms

  var lastTimeout;
  window.debounce = function (fun) {
    console.log(DEBOUNCE_INTERVAL);
    console.log(fun);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

})();
