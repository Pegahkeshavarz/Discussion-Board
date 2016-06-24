myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })
    .when('/dashboard',{
        templateUrl: 'partials/dashboard.html'
    })
    .when('/topic/:id',{
        templateUrl: 'partials/topic.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
