angular.module('admin')
 .controller('adminCtrlOrder',['$scope', 'canteenFtryOrder',function($scope, canteenFtryOrder) {

 	$scope.methods.view.order = {
 		get: function() {
 			$scope.data.orders = canteenFtryOrder.get();
 		}
 	};

	$scope.methods.view.order.get();
 
 }]);