carousel.controller("appController", function($scope,  $http) {

    // The list of available options when selecting the timer
    $scope.timerOptions = ["10", "100"];

    // Get the list of iframes to display in the carousel
    $http.get("src/app/app.config.json").then(function(response) {
        $scope.frames = response.data.list;
        $scope.timer = response.data.timer;
    });

});