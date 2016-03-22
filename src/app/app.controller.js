carousel.controller("appController", function($scope,  $http) {

    // Required for version info from the bower file
    $http.get('bower.json').then(function(response) {
        $scope.bower = response.data;
    });

    // Get the list of iframes to display in the carousel
    $http.get("src/app/app.config.json").then(function(response) {
        $scope.frames = response.data.list;
        $scope.timer = response.data.timer;
        $scope.totalFrames = $scope.frames.length;
    });

});