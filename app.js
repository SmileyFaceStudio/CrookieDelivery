// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('formApp', ['ngAnimate', 'ui.router', 'ngMessages'])

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
        
        .state('form.review', {
            url: '/review',
            templateUrl: 'templates/review.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/order');
})
.run(function($rootScope, alertService) {
    $rootScope.$on("$stateChangeStart", 
        function (event, toState, toParams, fromState, fromParams) {
            alertService.clear();
        }
    );
    $rootScope.$on("$stateChangeSuccess", 
        function (event, toState, toParams, fromState, fromParams) {
            // var body = document.body,
            // html = document.documentElement;
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                switch(toState.name) {
                    case 'form.order':
                        $rootScope.height = 1415;
                        break;
                    case 'form.info':
                        $rootScope.height = 1000;
                        break;
                    case 'form.review':
                        $rootScope.height = 800;
                        break;
                }
            }
        }
    );
});
