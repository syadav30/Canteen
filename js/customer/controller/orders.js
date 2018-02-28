angular.module('customer')
 .controller('customerCtrlOrders',['$scope', 'canteenFtryOrder',function($scope,  canteenFtryOrder) {

 	$scope.methods.view.myOrders = {
 		get: function() {
 			$scope.data.myOrders = canteenFtryOrder.findByUser($scope.data.user);
 		}
 	};
 	$scope.methods.view.myOrders.get();

 }]);