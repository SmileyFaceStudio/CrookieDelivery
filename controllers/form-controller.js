angular.module('formApp')
.controller('formController', function($scope, $http) {
    $scope.cookies = ['chocolate_chip', 'macadamian_nut', 'white_chocolate', 'oatmeal_raisin'];

    // we will store all of our form data in this object
    $scope.formData = {
        cookie: {
            'oatmeal_raisin': 0,
            'macadamian_nut': 0,
            'white_chocolate': 0,
            'chocolate_chip': 0
        }
    };
    
    // function to process the form
    $scope.processForm = function() {
        // for (var cookie in $scope.formData.cookie) {
        //     if ($scope.formData.cookie[cookie] == 0) {
        //         delete cookie;
        //     }
        // }
        $scope.formData.Cookie = '';
        angular.forEach($scope.formData.cookie, function(value, key) {
            if (value == 0) {
                delete $scope.formData.cookie[key];
            }
            else {
                $scope.formData.Cookie += key + ' ' + value + ' ';
            }
        });
        delete $scope.formData.cookie;

         $http.post('https://sheetsu.com/apis/2ae6fdf1', $scope.formData)
         .success(function(data, status) {
            if (data.success) {
                alert('Your order is successful! We will contact you when we deliver')
            }
         })
    };
    
});