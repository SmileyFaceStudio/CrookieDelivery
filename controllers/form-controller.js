angular.module('formApp')
.controller('formController', function($scope, $http, alertService, $state, $filter) {
    // $scope.cookies = ['chocolate_chip', 'macadamia_nut', 'white_chocolate', 'oatmeal_raisin'];
    $scope.cookies = {
        'chocolate_chip': {
            name: 'Chocolate Chip',
            image: 'assets/black_cookie.svg'
        },
        'macadamia_nut': {
            name: 'Macadamia Nut',
            image: 'assets/yellow_cookie.svg'
        },
        'white_chocolate': {
            name: 'White Chocolate',
            image: 'assets/pink_cookie.svg'
        },
        'oatmeal_raisin': {
            name: 'Oatmeal Raisin',
            image: 'assets/brown_cookie.svg'
        }
    }
    $scope.priceTotal = 0;
    // we will store all of our form data in this object
    $scope.formData = {
            'oatmeal_raisin': 0,
            'macadamia_nut': 0,
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

    $scope.onlyOrderScreen = function () {
        if ($state.current.name == 'form.order')
            return true;
    }

    $scope.nextText = function() {
        if ($state.current.name == "form.review") {
            return 'D o n e';
        } else {
            return 'N e x t';
        }
    }

    $scope.nextSection = function() {
        if ($state.current.name == "form.order") {
            return validateOrders();
        } else if ($state.current.name == "form.info") {
            return validateInfo();
        } else if ($state.current.name == "form.review") {
            return processForm();
        }
        // switch (step) {
        //     case 1:
        //         $state.go('form.order');
        //         break;
        //     case 2:
        //         validateOrders();
        //         break;
        //     case 3:
        //         validateInfo();
        //         break;
        // }
    }

    $scope.previousSection = function() {
        if ($state.current.name == "form.info") {
            return $state.go("form.order");
        } else if ($state.current.name == "form.review") {
            return $state.go("form.info");
        }
    }

    var cloneFormdata = function() {
        $scope.reviewData = {};
        angular.copy($scope.formData, $scope.reviewData);
        delete $scope.reviewData['Email'];
        delete $scope.reviewData['Name'];
        delete $scope.reviewData['Phone'];
        delete $scope.reviewData['Notes'];
        delete $scope.reviewData['Pickup'];
    }


    var validateInfo = function() {
        $scope.submitted = true;
        var infoForm = $scope.appForm.infoForm;
        if (infoForm.$valid == true) {
            alertService.clear();
            cloneFormdata();
            return $state.go('form.review');
        } else {
            alertService.add("warning", "Please correct your information.");
            $scope.$watch('appForm.infoForm.$valid', function(newValue) {
                if (newValue == true) {
                    return alertService.clear();
                }
            });
        }
    }

    $scope.$watchGroup(['formData.macadamia_nut', 'formData.white_chocolate', 'formData.chocolate_chip', 'formData.oatmeal_raisin'], function(newValue) {
        $scope.priceTotal = newValue.reduce(function(a, b) { return a + b; }) * 2;
        $scope.ordersValid = false;
        angular.forEach(newValue, function(value) {
            if (value > 0) {
                return $scope.ordersValid = true;
            }
        })
        if ($scope.ordersValid === true) {
            return alertService.clear();
        }
    })

    var validateOrders = function() {
        // angular.forEach($scope.formData.cookie, function(value, key) {
        //   validated = (value > 0) ? true : false;
        // })

        if ($scope.ordersValid === false) {
          alertService.add("warning", "You need to add some cookies to your cart.");
        } else {
          alertService.clear();
          $state.go('form.info');
        }
    }
    
    // function to process the form
    $scope.processForm = function() {
        $http.post('https://sheetsu.com/apis/2ae6fdf1', $scope.formData)
         .success(function(data, status) {
            if (data.success) {
                alert('Your order is successful! We will contact you when we deliver');
            } else if (!data.success) {
                alertService.add('warning', "Something went wrong with your form! Contact Pirate Cookie Staff.");
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