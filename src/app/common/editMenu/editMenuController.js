carousel.controller("editMenuController", function($scope, $mdSidenav) {

    // Generic function to build a toggler that opens/closes the sidenavs
    $scope.buildToggler = function(navID) {
        return function() {
            $mdSidenav(navID).toggle();
        };
    };

    $scope.toggleEditMenu = $scope.buildToggler("editMenu");
});