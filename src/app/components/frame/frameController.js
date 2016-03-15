carousel.controller("frameController", function($scope, $http) {

    $scope.currentFrame = 0;

    this.selectedTimer = "";
    this.timerOptions = ["100", "200"];

    // Get the list of iframes to display in the carousel
    $http.get("src/app/components/frame/frames.json").then(function(response) {
        $scope.frames = response.data.list;
        $scope.setFrame($scope.currentFrame); // Set the first iframe
    });

    // Sets the iFrame to a given URL from the list
    $scope.setFrame = function(frameIndex) {
        document.getElementById("frame").src = $scope.frames[frameIndex];
    };

    // Increments the iFrame to the next URL in the list
    $scope.$on("nextFrame", function() {
        if ($scope.currentFrame != $scope.frames.length - 1) {
            $scope.currentFrame += 1;
        }
        else {
            $scope.currentFrame = 0;
        }
        $scope.setFrame($scope.currentFrame);
    });

    // Resets the iFrame to the first URL in the list
    $scope.$on("resetFrame", function() {
        $scope.currentFrame = 0;
        $scope.setFrame($scope.currentFrame);
    });

});