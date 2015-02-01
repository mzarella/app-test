(function() {
  angular.module("app", ["ui.router"]);

}).call(this);

(function() {
  var app;

  app = angular.module("app");

  app.controller("FooterCtrl", [
    "$scope", "$state", function($scope, $state) {
      return angular.extend($scope, {});
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module("app");

  app.controller("HeaderCtrl", [
    "$scope", "$state", function($scope, $state) {
      return angular.extend($scope, {});
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module("app");

  app.controller("LandingCtrl", [
    "$scope", "$state", "$http", function($scope, $state, $http) {
      $scope.login = function() {
        return gapi.auth.signIn({
          callback: $scope.signInCallback,
          clientid: "nope",
          cookiepolicy: "single_host_origin",
          requestvisibleactions: "http://schema.org/AddAction",
          scope: "https://www.googleapis.com/auth/plus.login",
          theme: "light"
        });
      };
      return $scope.signInCallback = function(authResult) {
        if (authResult && !authResult.error) {
          $state.go("app.dashboard");
        }
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module("app");

  app.config([
    "$locationProvider", "$stateProvider", "$urlRouterProvider", function($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
      $stateProvider.state("app", {
        abstract: true,
        url: "",
        views: {
          "footer": {
            templateUrl: "components/footer/index.html",
            controller: "FooterCtrl"
          },
          "header": {
            templateUrl: "components/header/index.html",
            controller: "HeaderCtrl"
          }
        }
      }).state("app.landing", {
        url: "/",
        views: {
          "landing@": {
            controller: "LandingCtrl",
            templateUrl: "/components/landing/index.html"
          }
        }
      });
      return $urlRouterProvider.otherwise("");
    }
  ]).run([
    '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      return $rootScope.$stateParams = $stateParams;
    }
  ]);

}).call(this);

(function() {
  if (document.readyState !== 'complete') {
    angular.element(document).ready(function() {
      return angular.bootstrap(document, ['app']);
    });
  } else {
    angular.bootstrap(document, ['app']);
  }

}).call(this);
