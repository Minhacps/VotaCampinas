(function () {
  'use strict';

  var app = angular.module('votaCampinas');

  var questoesController = function ($scope, $timeout, perguntasFactory) {
    perguntasFactory.obterPerguntas()
    .success(function (perguntas) {
      $scope.perguntas = perguntas;
    });

  	var prioridades  = [],
  		inTransition = false;

  	$scope.model = {
  		prioridade: "",
  		selecionadas: {}
  	}

  	$scope.pagina = 0;

  	$scope.selecionadas = {};

    $scope.next = function () {
      perguntasFactory.salvarResposta($scope.perguntas[$scope.pagina])
      .success(function () {
        ++$scope.pagina;
      });
  		// if (!inTransition) {
  		// 	inTransition = true;
  		// 	$timeout(function (){
		  // 		prioridades.push($scope.model.prioridade);
			// 	$scope.model.prioridade = 0;
			// 	$scope.pagina += 1;
			// 	return inTransition = false;
			// }, 1200);
  		// }
  	}

  	$scope.back = function (){
  		prioridades.pop();
  		$scope.model.prioridade = 0;
		$scope.pagina -= 1;
  		console.log(prioridades);
  	}

  }

  app.controller('questoesController', questoesController);

}());
