(function(angular) {

  angular.module('zendeskWidget', [])
    .run([
      '$window',
      'zendeskWidgetSettings',
      function($window, zendeskWidgetSettings) {



        function injectZendeskScript() {
          if (zendeskWidgetSettings.__loaded) return;
          zendeskWidgetSettings.__loaded = true;

          if (!zendeskWidgetSettings.accountUrl) {
            throw new Error('Missing accountUrl. Please set in app config via ZendeskWidgetProvider');
          }


          var window = $window;

          // Following is essentially a copy paste of JS portion of the Zendesk embed code
          // with our settings subbed in. For more info, see:
          // https://support.zendesk.com/hc/en-us/articles/203908456-Using-Web-Widget-to-embed-customer-service-in-your-website

          /*eslint-disable */

          window.zEmbed || function(e, t) {
            var n, o, d, i, s, a = [],
              r = document.createElement("iframe");
            window.zEmbed = function() {
              a.push(arguments)
            }, window.zE = window.zE || window.zEmbed, r.src = "javascript:false", r.title = "", r.role = "presentation", (r.frameElement || r).style.cssText = "display: none", d = document.getElementsByTagName("script"), d = d[d.length - 1], d.parentNode.insertBefore(r, d), i = r.contentWindow, s = i.document;
            try {
              o = s
            } catch (c) {
              n = document.domain, r.src = 'javascript:var d=document.open();d.domain="' + n + '";void(0);', o = s
            }
            o.open()._l = function() {
              var o = this.createElement("script");
              n && (this.domain = n), o.id = "js-iframe-async", o.src = e, this.t = +new Date, this.zendeskHost = t, this.zEQueue = a, this.body.appendChild(o)
            }, o.write('<body onload="document._l();">'), o.close()
          }("https://assets.zendesk.com/embeddable_framework/main.js", zendeskWidgetSettings.accountUrl);

          /*eslint-enable */

          $window.zE(function() {
            zendeskWidgetSettings.beforePageLoad($window.zE);
          });
        }

        zendeskWidgetSettings.__inject = injectZendeskScript;

        if (!zendeskWidgetSettings.manual) injectZendeskScript();
      }
    ]);

})(angular);

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
      'activate'
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
      var init = this.init = function(opts) {
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

          ZendeskWidgetApi.prototype.injectZendeskScript = settings.__inject || angular.noop;
          ZendeskWidgetApi.prototype.settings = init;

          angular.forEach(apiMethods, function(method) {
            ZendeskWidgetApi.prototype[method] = function() {
              $window.zE[method].apply($window.zE, arguments);
            };
          });

          return new ZendeskWidgetApi();
        }
      ];
    }]);

})(angular);
