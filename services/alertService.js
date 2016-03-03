angular.module('formApp')
    .factory('alertService', [
      '$rootScope','$timeout', function($rootScope, $timeout) {
        var alertService;
        $rootScope.alerts = [];
        var alertConversion = {
        	warning: 'alert-danger',
        	success: 'alert-success'
        }
        return alertService = {
    	  add: function(type, msg, timeout) {
            $rootScope.alerts.push({
              type: alertConversion[type],
              msg: msg,
              close: function() {
                return alertService.closeAlert(this);
              }
            });

            if (timeout) { 
              $timeout(function(){ 
                alertService.closeAlert(this); 
              }, timeout); 
            }
          },
          closeAlert: function(alert) {
            return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
          },
          closeAlertIdx: function(index) {
            return $rootScope.alerts.splice(index, 1);
          },
          clear: function(){
            $rootScope.alerts = [];
          }
        };
      }
    ]);