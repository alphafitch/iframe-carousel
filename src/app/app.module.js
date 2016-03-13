var carousel = angular.module("carousel", ["ngMaterial", "ngRoute"]);

carousel.directive("siteheader", function() {
    return {
        templateUrl: "src/app/common/header/headerView.html",
        controller: "headerController"
    };
});