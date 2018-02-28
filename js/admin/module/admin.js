var app = angular.module("admin", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/admin/dashboard", {
        templateUrl : "view/admin/dashboard.html",
		controller : "adminCtrlDashboard",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
	.when("/admin/user", {
        templateUrl : "view/admin/user.html",
		controller : "adminCtrlUser",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
	.when("/admin/product", {
        templateUrl : "view/admin/product.html",
		controller : "adminCtrlProduct",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
	.when("/admin/order", {
        templateUrl : "view/admin/order.html",
		controller : "adminCtrlOrder",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
    .when("/admin/order/take", {
        templateUrl : "view/admin/order-take.html",
        controller : "adminCtrlOrderTake",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
    .when("/admin/order/:id", {
        templateUrl : "view/admin/order-detail.html",
        controller : "adminCtrlOrderDetail",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
    .when("/admin/profile/:mobile", {
        templateUrl : "view/admin/profile-detail.html",
        controller : "adminCtrlOrderProfileDetail",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
    .when("/admin/kitchen", {
        templateUrl : "view/admin/kitchen.html",
        controller : "adminCtrlKitchen",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
    .when("/admin/delivery", {
        templateUrl : "view/admin/delivery.html",
        controller : "adminCtrlDelivery",
        resolve: {
            isSignIn: function(canteenFtryAuth) {
                return canteenFtryAuth.isSignIn();
            },
            isAdmin: function(canteenFtryAuth) {
                return canteenFtryAuth.isAdmin();
            }
        }
    })
});
