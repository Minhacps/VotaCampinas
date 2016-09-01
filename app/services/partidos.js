(function () {
  'use strict';

  angular
    .module('votaCampinas')
    .factory('Partidos', Partidos);

  function Partidos ($http) {
    return {
      obterTodos: obterTodos
    };

    function obterTodos () {
      return $http
        .get('/api/partidos')
        .then(obterTodosComplete);

      function obterTodosComplete (res) {
        console.log(res);
        return res.data;
      }
    }
  }
})();
