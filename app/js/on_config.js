'use strict';

/* @ngInject */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'movieController',
    templateUrl: 'home.html',
    title: 'Home'
  });

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;