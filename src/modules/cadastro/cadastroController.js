(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var cadastroController = function($scope) {    
  	$('select').material_select();
  	$('.exclusivo-candidato').hide();
  	$('#sou-candidato').change(function (){
  		$('.exclusivo-candidato').toggle("slow");
  	});
  }

  app.controller('cadastroController', cadastroController);

}());
