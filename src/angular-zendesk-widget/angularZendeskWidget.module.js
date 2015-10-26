(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('angularZendeskWidget.config', [])
      .value('angularZendeskWidget.config', {
          debug: true
      });

  // Modules
  angular.module('angularZendeskWidget.directives', []);
  angular.module('angularZendeskWidget.services', []);
  angular.module('angularZendeskWidget',
      [
          'angularZendeskWidget.config',
          'angularZendeskWidget.directives',
          'angularZendeskWidget.services'
      ]);

})(angular);
