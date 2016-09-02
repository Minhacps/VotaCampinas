angular.module('votaCampinas')
  .filter('capitalize', function() {
    return function(input){
      input = input.replace(/[0-9]/g, '').toLowerCase().split(" ");
      input.pop(input.indexOf(''));
      input.pop(input.indexOf('-'));

      return input.map(function(e){
        return e.charAt(0).toUpperCase() + e.substr(1);
      }).join(' ');
    };
});
