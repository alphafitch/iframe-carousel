carousel.controller("appController", function($scope, $rootScope, $http) {

    // Flag to show if the carousel is playing or not
    $rootScope.playing = false;
    // Flag to show if the carousel is paused or not
    $rootScope.paused = false;
    // The current frame in the list to display
    $rootScope.currentFrame = 0;
    // The position of the progress bar
    $rootScope.progress = 0;
    // Max value of the progress bar
    $rootScope.progressBarTotal = 100;
    // Length of time to complete one interval, fixed to 100ms/1s for smooth progress bar movement
    $rootScope.intervalTime = 100;

    // Required for version info from the bower file
    $http.get("bower.json").then(function(response) {
        $scope.bower = response.data;
    });

    // Get the list of iframes to display in the carousel
    $http.get("src/app/app.config.json").then(function(response) {
        $scope.frames = response.data.list;
        $scope.timer = response.data.timer;
        $scope.totalFrames = $scope.frames.length;
    });

});