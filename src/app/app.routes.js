carousel.config(function ($routeProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "src/app/components/frame/frameView.html",
            controller: "frameController"
        })
        .otherwise({
            redirectTo: "/"
        });
});