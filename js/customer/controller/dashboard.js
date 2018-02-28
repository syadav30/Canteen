 angular.module('customer')
 	.controller('customerCtrlDashboard', ['$scope', 'canteenFtryProduct', '$localStorage', function($scope, canteenFtryProduct, $localStorage) {

 		$scope.methods.view.customerDashboard = {
 			products: {
 				get: function() {
 					$scope.data.products = canteenFtryProduct.get();
 				}
 			}
 		};
 		$scope.methods.view.customerDashboard.products.get();

 	}]);