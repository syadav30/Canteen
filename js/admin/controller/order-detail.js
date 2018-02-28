 angular.module('admin')
 .controller('adminCtrlOrderDetail',['$scope', '$route', 'canteenFtryOrder',function($scope, $route, canteenFtryOrder) {

 	$scope.methods.view.orderDetail = {
 		get: function() {
 			$scope.data.orderDetail = canteenFtryOrder.findById($route.current.params.id)[0];
 			if (typeof $scope.data.orderDetail == "undefined") {
 				$scope.methods.message($("body"), {
					status: "danger",
					message: "Order Not Found !"
				});
 				$location.path("/");
 			}
 		}
 	};

 	if (typeof $scope.data.orderDetail == "undefined" || $scope.data.orderDetail.id != $route.current.params.id) {
 		$scope.methods.view.orderDetail.get();
 	}

 }]);