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

    $scope.pauseCarousel = function() {
        $scope.$broadcast("pauseCarousel");
    };

    $scope.$on("startCarousel", function() {
        // Period of time to increment the progress bar, fixed to 100ms/1s for smooth progress bar
        var intervalTime = 100,
            // Max value of the progress bar
            progressBarTotal = 100,
            // Convert s into ms
            userSetTime = $scope.timer * 1000,
            // Value to increase progress bar per interval
            progressBarIncrement = (intervalTime * progressBarTotal) / userSetTime;

        // Set starting point for the progress bar
        $scope.progress = 0;

        // Set the buttons to play mode
        document.getElementById("stop").classList.remove("hide");
        document.getElementById("pause").classList.remove("hide");
        document.getElementById("play").classList.add("hide");
        document.getElementById("back").classList.remove("hide");
        document.getElementById("forward").classList.remove("hide");
        // Reveal the iFrame and hide the title
        document.getElementById("frame").classList.remove("hide");
        document.getElementById("title").classList.add("hide");
        // Don't start a timeout if one is already there
        if (angular.isDefined(timeout)) {
            return;
        }
        // Set the timeout to the variable
        timeout = $interval(function() {
            if ($scope.progress >= progressBarTotal) {
                // Move the iFrame to the next URL in the list
                $scope.$broadcast("nextFrame");
                // Reset the progress bar
                $scope.progress = 0;
            }
            else {
                $scope.progress += progressBarIncrement;
            }
        }, intervalTime);
    });

    $scope.$on("stopCarousel", function() {
        // Set the buttons to stop mode
        document.getElementById("stop").classList.add("hide");
        document.getElementById("pause").classList.add("hide");
        document.getElementById("back").classList.add("hide");
        document.getElementById("forward").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        if (angular.isDefined(timeout)) {
            // Cancel the timeout and clear the variable
            $interval.cancel(timeout);
            timeout = undefined;
            // Reset the progress bar
            $scope.progress = 0;
            // Reset and hide the iFrame
            $scope.$broadcast("resetFrame");
            document.getElementById("frame").classList.add("hide");
            // Show the title
            document.getElementById("title").classList.remove("hide");
        }
    });

    $scope.$on("pauseCarousel", function() {
        // Set the buttons to stop mode but don't hide the iframe
        document.getElementById("stop").classList.add("hide");
        document.getElementById("pause").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        if (angular.isDefined(timeout)) {
            // Cancel the timeout and clear the variable
            $interval.cancel(timeout);
            timeout = undefined;
            // Reset the progress bar
            $scope.progress = 0;
        }
    });

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.$broadcast("stopCarousel");
    });

}]);