(function(angular) {
  var
    settings = {
      accountUrl: '',
      beforePageLoad: angular.noop
    },
    apiMethods = [
      'setLocale',
      'identify',
      'hide',
      'show',
      'activate',
      'setHelpCenterSuggestions'
    ];

  angular.module('zendeskWidget')
    .value('zendeskWidgetSettings', settings)
    .provider('ZendeskWidget', [function() {
      /**
       * Configure the widget
       * @param {Object} opts settings
       * @param {String} accountUrl Zendesk account url
       * @param {Function} [beforePageLoad] Callback to run after
       * widget instantiated but before page load, such as hiding
       * the widget immediately. Receives the raw zE API object.
       * Callback does *not* need to wrap calls in a zE() closure.
       * For more info, see:
       * https://developer.zendesk.com/embeddables/docs/widget/api#ze.hide).
       */
      this.init = function(opts) {
        angular.extend(settings, opts);
      };

      this.$get = [
        '$window',
        function($window) {
          /**
           * Thin wrapper over Zendesk's Web Widget API:
           * https://developer.zendesk.com/embeddables/docs/widget/api
           * @class ZendeskWidgetApi
           */
          function ZendeskWidgetApi() {}

          angular.forEach(apiMethods, function(method) {
            ZendeskWidgetApi.prototype[method] = function() {
              var closureArgs = arguments;
              $window.zE(function() {
                $window.zE[method].apply($window.zE, closureArgs);
              })
            };
          });

          return new ZendeskWidgetApi();
        }
      ];
    }]);

})(angular);
