(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var prioridadesController = function($scope, $timeout) { 
  	var prioridades  = [],
  		inTransition = false;

  	$scope.model = {
  		prioridade: "",
  		selecionadas: {}
  	}

  	$scope.opcoes = [
  		"Ass Social",
  		"Educação",
  		"Saúde",
  		"Segurança",
  		"Transpote"
  	]

  	$scope.pagina = 1;

  	$scope.selecionadas = {};

  	$scope.next = function(){
  		if(!inTransition){
  			inTransition = true;
  			$timeout(function(){
		  		prioridades.push($scope.model.prioridade);
				$scope.model.prioridade = 0;
				$scope.pagina += 1;
				return inTransition = false;
			}, 1200);
  		}
  	}

  	$scope.back = function(){
  		prioridades.pop();
  		$scope.model.prioridade = 0;
		$scope.pagina -= 1;
  		console.log(prioridades);
  	}

  }

  app.controller('prioridadesController', prioridadesController);

}());