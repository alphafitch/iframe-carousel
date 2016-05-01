carousel.controller("frameController", function($scope, $http) {

    // Start the list before the first frame, so that next takes you to the first
    $scope.currentFrame = -1;

    // Sets the iFrame to a given URL from the list
    $scope.setFrame = function(frameIndex) {
        var frameToDisplay = $scope.frames[frameIndex];
        $http({
            method: "POST",
            url: "src/app/components/frame/frameChecker.php",
            data: "url="+frameToDisplay,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).success(function(data, status) {
            if (data.allowsiframe) {
                // iFrame allowed for destination URL
                // Show iFrame and hide the error message
                document.getElementById("error-message").classList.add("hide");
                document.getElementById("frame").classList.remove("hide");
                // Set iframe source to URL
                document.getElementById("frame").src = frameToDisplay;
            } else {
                // iFrame not allowed for destination URL
                // Hide iFrame and show the error message
                document.getElementById("error-message").classList.remove("hide");
                document.getElementById("frame").classList.add("hide");
            }
        }).error(function(data, status) {
            // Checking the iFrame did not work for some reason
        });
    };

    // Changes the iFrame to the next URL in the list
    $scope.$on("nextFrame", function() {
        document.getElementById("error-message").classList.add("hide");
        if ($scope.currentFrame != $scope.frames.length - 1) {
            $scope.currentFrame += 1;
        }
        else {
            $scope.currentFrame = 0;
        }
        $scope.setFrame($scope.currentFrame);
    });

    // Changes the iFrame to the previous URL in the list
    $scope.$on("previousFrame", function() {
        document.getElementById("error-message").classList.add("hide");
        if ($scope.currentFrame !== 0) {
            $scope.currentFrame -= 1;
        }
        else {
            $scope.currentFrame = $scope.frames.length - 1;
        }
        $scope.setFrame($scope.currentFrame);
    });

    // Resets the iFrame to the first URL in the list
    $scope.$on("resetFrame", function() {
        // Start the list before the first frame, so that next takes you to the first
        $scope.currentFrame = -1;
        // Hide the iframe and the error message
        document.getElementById("frame").classList.add("hide");
        document.getElementById("error-message").classList.add("hide");
        // Show the title page
        document.getElementById("title").classList.remove("hide");
    });

});