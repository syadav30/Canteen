angular.module('customer')
 .controller('customerCtrlCart',['$scope',function($scope) {

	$scope.formData.cart.for = $scope.data.user;
 	$scope.methods.view.cart = {
 		addOrder: function() {
 			$scope.methods.cart.order();
 		}
 	};

 }]);