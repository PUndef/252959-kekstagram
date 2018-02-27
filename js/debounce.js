'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var THROTTLING_INTERVAL = 500; // ms

  var lastTimeout;
  var throttlingTimeout;
  var isThrottle = false;
  window.debounce = function (fun) {
    if (isThrottle === false) {
      isThrottle = true;
      throttlingTimeout = window.setTimeout(function () {
        isThrottle = false;
        fun();
      }, THROTTLING_INTERVAL);
    } else {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun();
        isThrottle = false;
        window.clearTimeout(throttlingTimeout);
      }, DEBOUNCE_INTERVAL);
    }
  };

})();
