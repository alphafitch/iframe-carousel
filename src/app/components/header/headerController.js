carousel.controller("headerController", function($scope, $rootScope, $interval) {

    var timeout;

    $scope.toggleCarousel = function() {
        if (!$rootScope.playing) {
            $scope.$broadcast("setPlayMode");
            $scope.$broadcast("resetTimer");
        }
        else {
            $scope.$broadcast("setStopMode");
            $scope.$broadcast("stopTimer");
            $scope.$broadcast("resetFrame");
        }
        // Change the current mode of the carousel
        $rootScope.playing = !$rootScope.playing;
    };

    $scope.pauseCarousel = function() {
        $scope.$broadcast("setPauseMode");
        $scope.$broadcast("pauseTimer");
        $rootScope.playing = false;
    };

    $scope.stepBack = function() {
        document.getElementById("error-message").classList.add("hide");
        if ($rootScope.playing) {
            $scope.$broadcast("resetTimer");
        }
        $scope.$broadcast("previousFrame");
    };

    $scope.stepForward = function() {
        document.getElementById("error-message").classList.add("hide");
        if ($rootScope.playing) {
            $scope.$broadcast("resetTimer");
        }
        $scope.$broadcast("nextFrame");
    };

    $scope.$on("setPlayMode", function() {
        // Change main button to play
        document.getElementById("stop").classList.remove("hide");
        document.getElementById("play").classList.add("hide");
        // Reveal the other buttons
        document.getElementById("pause").classList.remove("fade");
        document.getElementById("back").classList.remove("fade");
        document.getElementById("forward").classList.remove("fade");
        // Reveal the iFrame and hide the title
        document.getElementById("frame").classList.remove("hide");
        document.getElementById("title").classList.add("hide");
    });

    $scope.$on("setStopMode", function() {
        // Change the main button to stop
        document.getElementById("stop").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        // Fade out the other buttons
        document.getElementById("pause").classList.add("fade");
        document.getElementById("back").classList.add("fade");
        document.getElementById("forward").classList.add("fade");
        // Reveal the title and hide the iFrame/error message
        document.getElementById("frame").classList.add("hide");
        document.getElementById("error-message").classList.add("hide");
        document.getElementById("title").classList.remove("hide");
    });

    $scope.$on("setPauseMode", function() {
        // Change the main button to stop
        document.getElementById("stop").classList.add("hide");
        document.getElementById("play").classList.remove("hide");
        // Fade the pause button but still show the iFrame and other options
        document.getElementById("pause").classList.add("fade");
    });

    $scope.$on("stopTimer", function() {
        // Cancel the timeout and clear the variable
        if (angular.isDefined(timeout)) {
            $interval.cancel(timeout);
            timeout = undefined;
        }
        // Clear the progress bar
        $scope.progress = 0;
    });

    $scope.$on("pauseTimer", function() {
        // Cancel the timeout and clear the variable
        if (angular.isDefined(timeout)) {
            $interval.cancel(timeout);
            timeout = undefined;
        }
    });

    $scope.$on("resetTimer", function() {
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

        // Cancel the timeout and clear the variable
        if (angular.isDefined(timeout)) {
            $interval.cancel(timeout);
            timeout = undefined;
        }
        // Start a new timeout and assign it to the variable
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

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.$broadcast("stopTimer");
    });

});