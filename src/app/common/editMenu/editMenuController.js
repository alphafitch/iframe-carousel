carousel.controller("editMenuController", function($scope, $mdSidenav) {

    $scope.toggleEditMenu = function() {
        $mdSidenav("editMenu").toggle();
        // Reset the frame and the timer when the edit menu is opened
        $scope.$broadcast("stopTimeout");
    };

});