'use strict';

/**
* @ngdoc overview
* @name pokemonAchieverApp
* @description
* # pokemonAchieverApp
*
* Main module of the application.
*/
angular
.module('pokemonAchieverApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'ngStorage'
])
.config(function ($stateProvider, $urlRouterProvider) {
  // link adresses to views and controllers
  $stateProvider
  .state('main', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .state('main.general', {
    url: '/',
    templateUrl: 'views/general.html'
  });

	$urlRouterProvider.otherwise('/');
})
.controller('MainCtrl', function($scope, $http, $sessionStorage) {
  var stepSize = 20;

  if ($scope.data == undefined){
    $scope.data = $sessionStorage;
  }
  // Where we get the data loaded from pokeapi
  if ($scope.db == undefined){
    $scope.db = {};
    $scope.db.pokemons = [];
    $scope.db.count = 0;
  }

  function getAllThePokemon(counter,max){
    return new Promise(function (fulfill, reject){
      if(counter > max){
        fulfill();
      } else {
        $http.get('http://localhost:8000/api/v2/pokemon/'+counter)
        .then(function(res2) {
          var new_data = {};
          new_data.name = res2.data.name;
          new_data.id = res2.data.id;
          new_data.names = res2.data.names;
          new_data.types = res2.data.types;
          $scope.db.pokemons.push(new_data);
          fulfill(getAllThePokemon(counter +1, max));
        },function(data) {
          console.log('Error: Loading pokemon ' +counter);
        });
      }
    });
  }

  $http.get('http://localhost:8000/api/v2/pokemon')
  .then(function(res) {
    getAllThePokemon(1,res.data.count);
  },function(data) {
    console.log('Error: Loading Pokemon Count.');
  });

})
