carousel.controller("appController", function($scope,  $http) {

    // Get the list of iframes to display in the carousel
    $http.get("src/app/app.config.json").then(function(response) {
        $scope.frames = response.data.list;
        $scope.timer = response.data.timer;
    });

});