carousel.controller("editMenuController", function($scope, $mdSidenav) {

    $scope.toggleEditMenu = function() {
        $mdSidenav("editMenu").toggle();
        // Reset the frame and the timer when the edit menu is opened
        $scope.$broadcast("stopCarousel");
    };

    $scope.addFrame = function() {
        $scope.frames.push("https://en.wikipedia.org/wiki/Main_Page");
        $scope.totalFrames = $scope.frames.length;
    };

    $scope.removeFrame = function() {
        if ($scope.totalFrames > 1) {
            $scope.frames.pop("https://en.wikipedia.org/wiki/Main_Page");
            $scope.totalFrames = $scope.frames.length;
        }
    };

});