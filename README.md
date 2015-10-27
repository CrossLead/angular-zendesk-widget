# angular-zendesk-widget
Angular wrapper for the [Zendesk Web Widget](https://support.zendesk.com/hc/en-us/articles/203908456-Using-Web-Widget-to-embed-customer-service-in-your-website)

## Installation
Via bower:
```bash
$ bower install angular-zendesk-widget
```
Or grab the [latest release](https://github.com/CrossLead/angular-zendesk-widget/releases) and add the JavaScript directly:
```html
<!-- Minified -->
<script type="text/javascript" src="dist/angular-zendesk-widget.min.js"></script>
<!-- Unminified -->
<script type="text/javascript" src="dist/angular-zendesk-widget.js"></script>
```

## Usage
First, you'll need to setup the widget during the Angular configuration phase using the `ZendeskWidgetProvider`:
```js
angular.module('myApp', ['zendeskWidget'])
  .config(['ZendeskWidgetProvider', function(ZendeskWidgetProvider) {
    ZendeskWidgetProvider.init({
      accountUrl: 'crosslead.zendesk.com'
      // See below for more settings
    });
  }]);
```
Then simply inject the `ZendeskWidget` service and use it to call any of the [Web Widget API methods](https://developer.zendesk.com/embeddables/docs/widget/api):

JavaScript:
```js
angular.module('myApp')
  .controller('MyAppCtrl', ['ZendeskWidget', function(ZendeskWidget) {
	  $scope.doCustomWidgetStuff = function() {
        ZendeskWidget.identify({
          name: $scope.currentUser.displayName,
          email: $scope.currentUser.email,
          externalId: $scope.currentUser._id,
        });
        ZendeskWidget.activate({hideOnClose:true});
	  };
  }]);
```
HTML:
```html
<div ng-app="myApp" ng-controller="MyAppCtrl">
	<a ng-click="doCustomWidgetStuff()">Click me</a>
</div>
```
# Settings
The following are all the settings that you can pass to `ZendeskWidgetProvider.init()`:
```js
ZendeskWidgetProvider.init({
  // Your Zendesk account URL. Required
  accountUrl: 'crosslead.zendesk.com',
  // Callback to execute after the Zendesk Widget initializes
  // but before the page finishes loading. Probably the best
  // example from the Zendesk docs is hiding the widget initially (see
  // https://developer.zendesk.com/embeddables/docs/widget/api#ze.hide).
  // Note you do **not** need to wrap your calls in an extra `ze()` closure
  beforePageLoad: function(zE) {
    zE.hide();
  }
});
```
