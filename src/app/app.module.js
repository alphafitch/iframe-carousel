var carousel = angular.module("carousel", ["ngMaterial", "ngRoute"]);

carousel.directive("siteheader", function() {
    return {
        templateUrl: "src/app/components/header/headerView.html",
        controller: "headerController"
    };
});

carousel.directive("editMenu", function() {
    return {
        templateUrl: "src/app/components/editMenu/editMenuView.html",
        controller: "editMenuController"
    };
});