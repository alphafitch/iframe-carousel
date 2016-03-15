carousel.controller('appController', function($scope,  $http) {

    // Get the list of iframes to display in the carousel
    $http.get("src/app/components/frame/frames.json").then(function(response) {
        $scope.frames = response.data.list;
    });

});