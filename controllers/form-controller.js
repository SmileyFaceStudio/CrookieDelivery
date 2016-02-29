angular.module('formApp')
.controller('formController', function($scope, $http, alertService, $state) {
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

    $scope.nextSection = function(step) {
        switch (step) {
            case 1:
                $state.go('form.order');
                break;
            case 2:
                validateOrders();
                break;
            case 3:
                $state.go('form.payment');
                break;
        }
    }

    var validateOrders = function() {
        var validated;
        angular.forEach($scope.formData.cookie, function(value, key) {
          if (value > 0)
            validated = true;
        })
        // var orderForm = $scope.appForm.orderForm;

        $scope.$watch('formData.cookie', function(newValue) {
            angular.forEach(newValue, function(value) {
                if (value > 0) {
                    return alertService.clear();
                }
            })
        }, true)

        if (!validated) {
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

    $scope.phoneNumberPattern = (function() {
        var regexp = /^\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})$/;
        return {
            test: function(value) {
                return regexp.test(value);
            }
        };
    })();
    
});