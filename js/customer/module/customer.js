var app = angular.module("customer", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/customer/", {
        templateUrl : "view/customer/dashboard.html",
		controller : "customerCtrlDashboard",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
    })
    .when("/customer/Home", {
        templateUrl : "view/customer/dashboard.html",
        controller : "customerCtrlDashboard",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
    })
    .when("/customer/dashboard", {
        templateUrl : "view/customer/dashboard.html",
        controller : "customerCtrlDashboard",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
    })
	.when("/customer/orders",{
		templateUrl : "view/customer/orders.html",
		controller : "customerCtrlOrders",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
	})
	.when("/customer/cart",{
		templateUrl : "view/customer/cart.html",
		controller : "customerCtrlCart",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
	})
	.when("/customer/profile",{
		templateUrl : "view/customer/profile.html",
		controller : "customerCtrlProfile",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            }
        }
	})
});
