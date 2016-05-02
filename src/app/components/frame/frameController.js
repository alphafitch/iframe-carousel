carousel.controller("frameController", function($scope, $rootScope, $http) {

    // Sets the iFrame to a given URL from the list
    $scope.setFrame = function(frameIndex) {
        document.getElementById("error-message").classList.add("hide");
        var frameToDisplay = $scope.frames[frameIndex];
        $http({
            method: "POST",
            url: "src/app/components/frame/frameChecker.php",
            data: "url="+frameToDisplay,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(data) {
            if (data.allowsiframe) {
                // iFrame allowed for destination URL
                // Show iFrame and hide the error message
                document.getElementById("frame").classList.remove("hide");
                // Set iframe source to URL
                document.getElementById("frame").src = frameToDisplay;
            } else {
                // iFrame not allowed for destination URL
                // Hide iFrame and show the error message
                document.getElementById("error-message").classList.remove("hide");
                document.getElementById("frame").classList.add("hide");
            }
        }).error(function() {
            // Checking the iFrame did not work for some reason
        });
    };

    // Changes the iFrame to the next URL in the list
    $scope.$on("nextFrame", function() {
        if ($rootScope.currentFrame != $scope.frames.length - 1) {
            $rootScope.currentFrame += 1;
        }
        else {
            $rootScope.currentFrame = 0;
        }
        $scope.setFrame($rootScope.currentFrame);
    });

    // Changes the iFrame to the previous URL in the list
    $scope.$on("previousFrame", function() {
        if ($rootScope.currentFrame !== 0) {
            $rootScope.currentFrame -= 1;
        }
        else {
            $rootScope.currentFrame = $scope.frames.length - 1;
        }
        $scope.setFrame($rootScope.currentFrame);
    });

    // Resets the iFrame to the first URL in the list
    $scope.$on("resetFrame", function() {
        // Reset the frame counter and clear the iframe source
        $rootScope.currentFrame = -1;
        document.getElementById("frame").src = "";
        // Hide the iframe and the error message
        document.getElementById("frame").classList.add("hide");
        document.getElementById("error-message").classList.add("hide");
        // Show the title page
        document.getElementById("title").classList.remove("hide");
    });

});