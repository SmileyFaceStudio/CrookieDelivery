// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'templates/form.html',
            controller: 'formController'
        })
        
        // nested states 
        .state('form.order', {
            url: '/order',
            templateUrl: 'templates/order.html'
        })
        
        .state('form.info', {
            url: '/info',
            templateUrl: 'templates/info.html'
        })
        
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'templates/payment.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/order');
});
