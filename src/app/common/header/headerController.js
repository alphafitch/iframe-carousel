carousel.controller("headerController", ["$scope", "$interval", function($scope, $interval) {

    var timeout;

    $scope.toggleCarousel = function() {
        if (!document.getElementById("pause").style.display) {
            // Play
            document.getElementById("pause").style.display = "block";
            document.getElementById("play").style.display = "none";
            $scope.startTimeout();
        }
        else {
            // Pause
            document.getElementById("pause").style.display = "";
            document.getElementById("play").style.display = "block";
            $scope.stopTimeout();
        }
    };

    $scope.startTimeout = function() {
        $scope.progress = 0;
        // Reveale the iFrame hide the title
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
        }, 100);
    };

    $scope.stopTimeout = function() {
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
    };

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.stopTimeout();
    });

}]);