angular.module('formApp')
.controller('formController', function($scope) {
    $scope.cookies = ['chocolate_chip', 'macadamian_nut', 'white_chocolate', 'oatmeal_raisin'];

    // we will store all of our form data in this object
    $scope.formData = {
        'oatmeal_raisin': 0,
        'macadamian_nut': 0,
        'white_chocolate': 0,
        'chocolate_chip': 0
    };
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };
    
});