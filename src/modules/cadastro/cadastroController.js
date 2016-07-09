(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var cadastroController = function($scope) {    
  	$('select').material_select();
  }

  app.controller('cadastroController', cadastroController);

}());
