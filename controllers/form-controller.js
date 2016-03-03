angular.module('formApp')
.controller('formController', function($scope, $http, alertService, $state, $filter) {
    $scope.cookies = ['chocolate_chip', 'macadamian_nut', 'white_chocolate', 'oatmeal_raisin'];

    // we will store all of our form data in this object
    $scope.formData = {
            'oatmeal_raisin': 0,
            'macadamian_nut': 0,
            'white_chocolate': 0,
            'chocolate_chip': 0
    };

    $scope.restrictSection = function(step) {
        if (($state.current.name == 'form.order' && step == 2) || ($state.current.name == 'form.order' && step == 3)) {
            return true;
        } else if ($state.current.name == 'form.info' && step == 3) {
            return true;
        } else {
            return false;
        }
    }

    $scope.nextSection = function(step) {
        switch (step) {
            case 1:
                $state.go('form.order');
                break;
            case 2:
                validateOrders();
                break;
            case 3:
                validateInfo();
                break;
        }
    }

    var validateInfo = function() {
        $scope.submitted = true;
        var infoForm = $scope.appForm.infoForm;
        if (infoForm.$valid == true) {
            alertService.clear();
            return $state.go('form.payment');
        } else {
            alertService.add("warning", "Please correct your information.");
            $scope.$watch('appForm.infoForm.$valid', function(newValue) {
                if (newValue == true) {
                    return alertService.clear();
                }
            });
        }
    }

    var validateOrders = function() {
        var validated;
        // angular.forEach($scope.formData.cookie, function(value, key) {
        //   validated = (value > 0) ? true : false;
        // })

        // $scope.$watch('formData.cookie', function(newValue) {
        //     angular.forEach(newValue, function(value) {
        //         if (value > 0) {
        //             return alertService.clear();
        //         }
        //     })
        // }, true)

        if (validated == false) {
          alertService.add("warning", "You need to add some cookies to your cart.");
        } else {
          alertService.clear();
          $state.go('form.info');
        }
    }
    
    // function to process the form
    $scope.processForm = function() {
        // for (var cookie in $scope.formData.cookie) {
        //     if ($scope.formData.cookie[cookie] == 0) {
        //         delete cookie;
        //     }
        // }

        angular.forEach($scope.formData, function(value, key) {
            key = $filter('underscoreless')(key);
        })
        console.log($scope.formData);
        // $http.post('https://sheetsu.com/apis/2ae6fdf1', $scope.formData)
        //  .success(function(data, status) {
        //     if (data.success) {
        //         alert('Your order is successful! We will contact you when we deliver');
        //     } else if (!data.success) {
        //         alertService.add('warning', "Something went wrong with your form! Contact Pirate Cookie Staff.");
        //     }
        // })
    };

    $scope.phoneNumberPattern = (function() {
        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();
    
});