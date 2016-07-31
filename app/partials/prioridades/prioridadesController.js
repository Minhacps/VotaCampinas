(function() {

  'use strict';

  var app = angular.module('votaCampinas');

  var prioridadesController = function($scope, $timeout, $http) { 
  	var inTransition = false;

    $scope.submitOk     = false;
  	$scope.pagina       = 1;
    $scope.respostas    = [];
    
    $scope.model = {
      id: "",
      prioridade: ""
    };

    $http.get('/api/prioridades')
    .success(function(suc){
      $scope.opcoes = suc;
    })
    .error(function(err){
      console.log(err);
    })

  	$scope.next = function(){
      $scope.enviando = true;
  		if(!inTransition){
        var opcoes  = $scope.opcoes,
            opcao   = $scope.model.prioridade,
            op      = {};

        var idx = opcoes.map(function(i){
          if(i.id == opcao){ op = i; }
          return Number(i.id);
        }).indexOf(Number(opcao));

        if($scope.pagina >= 3 && !$scope.submitOk) {
          $scope.submitOk = true;
        } else if($scope.submitOk) {
          $scope.respostas.pop();
        } else{
          inTransition = true;
          $timeout(function(){
            opcoes.splice(idx, 1);
            opcao = '';
            $scope.pagina += 1;
            $('.opcoes').animate({left: '600', opacity: 0}, 400).animate({left: '-400'}, 400).animate({left: '0', opacity: 1}, 400);
            return inTransition = false;
          }, 500);

        }

        $scope.respostas.push(op);
        $scope.enviando = false;
      }
  	}

  	$scope.back = function(){
      if($scope.submitOk){ $scope.respostas.pop(); $scope.submitOk = false; }
      $scope.opcoes.push($scope.respostas.pop());
  		$scope.model.prioridade = '';
		  $scope.pagina -= 1;
      $('.opcoes').animate({left: '-400', opacity: 0}, 400).animate({left: '500'}, 400).animate({left: '0', opacity: 1}, 400);
  	}

    $scope.submit = function(){
      $http.post('/api/prioridades', $scope.respostas)
      .success(function(suc){
        console.log(suc);
      })
      .error(function(err){
        console.log(err);
      })
    }

  }

  app.controller('prioridadesController', prioridadesController);

}());