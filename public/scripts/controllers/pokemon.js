'use strict';

/**
* @ngdoc function
* @name pokemonAchieverApp.controller:PokemonCtrl
* @description
* # PokemonCtrl
* Controller responsible for the .accept page of the Review.
*/
angular.module('pokemonAchieverApp')
.controller('PokemonCtrl', function ($scope, $stateParams, $http) {
// when landing on the page, get all the projects and show them
	$http.get('http://pokeapi.co/api/v2/pokemon')
	.success(function(data) {
		$scope.pokemon = data;
	})
	.error(function(data) {
		console.log('Error: reviewAppController: Projects could not be loaded.');
	});
})
