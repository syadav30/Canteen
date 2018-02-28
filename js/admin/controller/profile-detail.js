 angular.module('admin')
 .controller('adminCtrlOrderProfileDetail',['$scope', '$route', 'canteenFtryUser', 'canteenFtryOrder', function($scope, $route, canteenFtryUser, canteenFtryOrder) {

 	if (typeof $scope.data.profileDetail == "undefined" || $scope.data.profileDetail.mobile != $route.current.params.mobile) {
	 	$scope.data.profileDetail = canteenFtryUser.findByMobile($route.current.params.mobile)[0];
	 	$scope.data.myOrders = canteenFtryOrder.findByUser($scope.data.user);
 	}
 
 }]);