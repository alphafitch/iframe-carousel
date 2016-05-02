carousel.controller("appController", function($scope, $rootScope, $http) {

    // Flag to show if the carousel is playing or not
    $rootScope.playing = false;
    // Start the list before the first frame, so that next takes you to the first
    $rootScope.currentFrame = 0;

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