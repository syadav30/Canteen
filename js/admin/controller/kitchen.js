 angular.module('admin')
 	.controller('adminCtrlKitchen', ['$scope', 'canteenFtryOrder', '$timeout', function($scope, canteenFtryOrder, $timeout) {

 		$scope.formData.kitchen = {
 			tab: {
 				active: "Cooking"
 			}
 		};
 		$scope.methods.view.kitchen = {
 			cooking: {
 				get: function() {
 					if ($scope.formData.kitchen.tab.active == "Cooking") {
	 					$scope.data.cooking = canteenFtryOrder.getCooking();
 					}
 				},
 				getAuto: function() {
 					$scope.methods.view.kitchen.cooking.get();
 					$timeout(function() {
 						$scope.methods.view.kitchen.cooking.getAuto();
 					}, 5000);
 				},
 				cooked: function(c) {
 					var response = canteenFtryOrder.cooked(c);
 					$scope.methods.message($("body"), {
 						status: response.status ? "success" : "danger",
 						message: response.message
 					});
 					this.get();
 				}
 			},
 			cooked: {
 				get: function() {
 					if ($scope.formData.kitchen.tab.active == "Cooked") {
	 					$scope.data.cooked = canteenFtryOrder.getCooked();
 					}
 				},
 				getAuto: function() {
 					$scope.methods.view.kitchen.cooked.get();
 					$timeout(function() {
 						$scope.methods.view.kitchen.cooked.getAuto();
 					}, 5000);
 				},
 				ready: function(c) {
 					var response = canteenFtryOrder.updateStatus(c, canteenFtryOrder.status[2]);
 					$scope.methods.message($("body"), {
 						status: response.status ? "success" : "danger",
 						message: response.message
 					});
 					this.get();
 				}
 			}
 		};

 		$scope.methods.view.kitchen.cooking.getAuto();
 		$scope.methods.view.kitchen.cooked.getAuto();

 	}]);