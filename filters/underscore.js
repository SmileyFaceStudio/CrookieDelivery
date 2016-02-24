angular.module('formApp')
.filter('underscoreless', function () {
  return function (input) {
      return input.split('_').map(function(wrd) {
      	return wrd.charAt(0).toUpperCase() + wrd.substr(1).toLowerCase();
      }).join(' ');
  };
});