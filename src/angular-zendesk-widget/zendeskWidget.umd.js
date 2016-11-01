(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('angular'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['angular'], function (angular) {
      return (root.returnExportsGlobal = factory(angular));
    });
  } else {
    // Global Variables
    root.returnExportsGlobal = factory(root.angular);
  }
}(this, function (angular) {
  // Your actual module
  return angular.module('zendeskWidget');
}));
