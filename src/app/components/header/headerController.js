carousel.controller("headerController", function($scope, $rootScope, $interval) {

    var timeout;

    $scope.toggleCarousel = function() {
        if (!$rootScope.playing && !$rootScope.paused) {
            // From complete stop to play
            $scope.$broadcast("setFrame", $rootScope.currentFrame);
            $scope.$broadcast("setPlayMode");
            // Reset the progress bar and start timer again
            $rootScope.progress = 0;
            $scope.$broadcast("restartTimer");
        }
        if ($rootScope.playing && !$rootScope.paused) {
            // From play to complete stop, clear timer and progress bar
            $scope.$broadcast("setStopMode");
            $rootScope.progress = 0;
            $scope.$broadcast("stopTimer");
            $scope.$broadcast("resetFrame");
        }
        if (!$rootScope.playing && $rootScope.paused) {
            // From paused to play, don't set the frame again or clear the progress bar
            $scope.$broadcast("setPlayMode");
            $scope.$broadcast("restartTimer");
            $rootScope.paused = false;
        }
        // Change the current mode of the carousel
        $rootScope.playing = !$rootScope.playing;
    };

    $scope.pauseCarousel = function() {
        $scope.$broadcast("setPauseMode");
        $scope.$broadcast("stopTimer");
        $rootScope.playing = false;
        $rootScope.paused = true;
    };

    $scope.stepBack = function() {
        if ($rootScope.playing) {
            // Reset the progress bar and start timer again
            $rootScope.progress = 0;
            $scope.$broadcast("restartTimer");
        }
        $scope.$broadcast("previousFrame");
    };

    $scope.stepForward = function() {
        if ($rootScope.playing) {
            // Reset the progress bar and start timer again
            $rootScope.progress = 0;
            $scope.$broadcast("restartTimer");
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
        // Reveal the iFrame and hide the title/error message
        document.getElementById("frame").classList.remove("hide");
        document.getElementById("title").classList.add("hide");
        document.getElementById("error-message").classList.add("hide");
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
    });

    $scope.$on("restartTimer", function() {
        // Cancel the timeout and clear the variable
        if (angular.isDefined(timeout)) {
            $interval.cancel(timeout);
            timeout = undefined;
        }
        // Start a new timeout and assign it to the variable
        timeout = $interval(function() {
            if ($rootScope.progress >= $rootScope.progressBarTotal) {
                // Move the iFrame to the next URL in the list
                $scope.$broadcast("nextFrame");
                // Reset the progress bar
                $rootScope.progress = 0;
            }
            else {
                $rootScope.progress += $rootScope.progressBarIncrement;
            }
        }, $rootScope.intervalTime);
    });

    $scope.$on("$destroy", function() {
        // Make sure that the interval is destroyed too
        $scope.$broadcast("stopTimer");
    });

});