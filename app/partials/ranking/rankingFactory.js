angular
  .module('votaCampinas')
  .factory('Ranking', Ranking);

function Ranking ($http) {
  return {
    obterMatches: obterMatches
  };

  function obterMatches () {
    return $http
    .get('/api/ranking')
    .then(obterMatchesComplete)
    .catch(obterMatchesFailed);

    function obterMatchesComplete (res) {
      return res.data;
    }

    function obterMatchesFailed (err) {
      return err;
    }
  }
}
