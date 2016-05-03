carousel.controller("editMenuController", function($scope, $rootScope, $mdSidenav) {

    $scope.toggleEditMenu = function() {
        $mdSidenav("editMenu").toggle();
        // This behaves the same as hitting the stop button
        $scope.$broadcast("setStopMode");
        $rootScope.progress = 0;
        $scope.$broadcast("stopTimer");
        $scope.$broadcast("resetFrame");
        $rootScope.playing = false;
    };

    $scope.addFrame = function() {
        $scope.frames.push("https://en.wikipedia.org/wiki/Main_Page");
        $scope.totalFrames = $scope.frames.length;
    };

    $scope.removeFrame = function() {
        if ($scope.totalFrames > 1) {
            $scope.frames.pop();
            $scope.totalFrames = $scope.frames.length;
        }
    };

});