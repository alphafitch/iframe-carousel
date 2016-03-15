carousel.controller("headerController", ["$scope", "$interval", function($scope, $interval) {

    var timeout;

    $scope.toggleCarousel = function() {
        if (!document.getElementById("play").classList.contains("hide")) {
            $scope.$broadcast("startCarousel");
        }
        else {
            $scope.$broadcast("stopCarousel");
        }
    };

    $scope.$on("startCarousel", function() {
        // Set the button to play mode
        document.getElementById("pause").classList.remove("hide");
        document.getElementById("play").classList.add("hide");
        $scope.progress = 0;
        // Reveal the iFrame hide the title
        document.getElementById("frame").style.display = "block";
        document.getElementById("title").classList.add("hide");
        // Don't start a timeout if one is already there
        if (angular.isDefined(timeout)) {
            return;
        }
        // Set the timeout to the variable
        timeout = $interval(function() {
            if ($scope.progress >= 100) {
                // Move the iFrame to the next URL in the list
                $scope.$broadcast("nextFrame");
                // Reset the progress bar
                $scope.progress = 0;
            }
            else {
                $scope.progress += 1;
            }
        }, $scope.timer);
    });

    $scope.$on("stopCarousel", function() {
        // Set the button to pause mode
        document.getElementById("pause").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        if (angular.isDefined(timeout)) {
            // Cancel the timeout and clear the variable
            $interval.cancel(timeout);
            timeout = undefined;
            // Reset the progress bar
            $scope.progress = 0;
            // Reset and hide the iFrame
            $scope.$broadcast("resetFrame");
            document.getElementById("frame").style.display = "";
            // Show the title
            document.getElementById("title").classList.remove("hide");
        }
    });

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.$broadcast("stopCarousel");
    });

}]);