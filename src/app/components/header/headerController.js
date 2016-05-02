carousel.controller("headerController", function($scope, $interval) {

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

    $scope.stepBack = function() {
        document.getElementById("error-message").classList.add("hide");
        $scope.$broadcast("previousFrame");
    };

    $scope.stepForward = function() {
        document.getElementById("error-message").classList.add("hide");
        $scope.$broadcast("nextFrame");
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

        // Go to first frame
        $scope.$broadcast("nextFrame");

        // Set main button to play mode
        document.getElementById("stop").classList.remove("hide");
        document.getElementById("play").classList.add("hide");
        // Reveal the other buttons
        document.getElementById("pause").classList.remove("fade");
        document.getElementById("back").classList.remove("fade");
        document.getElementById("forward").classList.remove("fade");
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
        // Set the main button to stop mode
        document.getElementById("stop").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        // Fade out the other buttons
        document.getElementById("pause").classList.add("fade");
        document.getElementById("back").classList.add("fade");
        document.getElementById("forward").classList.add("fade");
        if (angular.isDefined(timeout)) {
            // Cancel the timeout and clear the variable
            $interval.cancel(timeout);
            timeout = undefined;
            // Reset the progress bar and the iFrame
            $scope.progress = 0;
            $scope.$broadcast("resetFrame");
        }
    });

    $scope.$on("pauseCarousel", function() {
        // Set the main button to stop mode
        document.getElementById("stop").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        // Fade the pause button but still show the iFrame and other options
        document.getElementById("pause").classList.add("fade");
        if (angular.isDefined(timeout)) {
            // Cancel the timeout and clear the variable
            $interval.cancel(timeout);
            timeout = undefined;
        }
    });

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.$broadcast("stopCarousel");
    });

});