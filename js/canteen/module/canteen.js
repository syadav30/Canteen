var app = angular.module("canteen", [
	"ngRoute",
	"ngStorage",
	"admin",
	"customer"
]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/canteen/signIn.html",
		controller : "canteenCtrlSignIn",
        resolve: {
            isSignOut: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignOut();
            }
        }
    })
    .when("/signIn", {
        templateUrl : "view/canteen/signIn.html",
		controller : "canteenCtrlSignIn",
        resolve: {
            isSignOut: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignOut();
            }
        }
    })
});
