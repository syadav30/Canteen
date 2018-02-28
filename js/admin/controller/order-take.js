angular.module('admin')
	.controller('adminCtrlOrderTake', ['$scope', 'canteenFtryUser', 'canteenFtryProduct', 'canteenFtryOrder', '$location', '$window', function($scope, canteenFtryUser, canteenFtryProduct, canteenFtryOrder, $location, $window) {

		$scope.formData.orderTake = {
			userSelect: {
				isDone: false,
				isAnonymous: false,
				isNew: false,
			},
			orderExpand: false,
			productsSearch: false
		};

		$scope.methods.view.orderTake = {
			product: {
				get: function() {
					$scope.data.products = canteenFtryProduct.get();
				}
			},
			userSelect: {
				userAnonymous: function() {
					$scope.formData.cart.for = null;
					$scope.formData.orderTake.userSelect.isDone = true;
				},
				go: function(valid) {
					if (valid) {
						var response = canteenFtryUser.findByMobile($scope.formData.cart.for.mobile);
						if (response.length > 0) {
							$scope.formData.cart.for = response[0];
							$scope.formData.orderTake.userSelect.isDone = true;
						} else {
							$scope.formData.orderTake.isNew = true;
						}
					} else {
						$scope.methods.message($("body"), {
							status: "danger",
							message: "Please fill all Mandatory fields."
						});
					}
				},
				newGo: function(valid) {
					if (valid) {
						$scope.formData.cart.for.password = $scope.formData.cart.for.mobile;
						var response = canteenFtryUser.add($scope.formData.cart.for);
						if (response.status) {
							this.go(true);
						} else {
							$scope.methods.message($("body"), {
								status: "danger",
								message: "Something went wrong, Please try again."
							});
							$scope.methods.user.signOut();
						}
					} else {
						$scope.methods.message($("body"), {
							status: "danger",
							message: "Please fill all Mandatory fields."
						});
					}
				},
				remove: function() {
					$scope.formData.orderTake.userSelect.isDone = false;
					$scope.formData.orderTake.userSelect.isAnonymous = false;
					$scope.formData.cart = angular.copy($scope.interface.order);
				}
			},
			clearOrder: function() {
				$scope.methods.cart.clear(true);
				$window.location.reload();
			},
			confirmOrder: function() {
				if ($scope.formData.orderTake.orderExpand) {
					var response = $scope.methods.cart.order();
					$scope.methods.message($("body"), {
						status: response.status ? "success" : "danger",
						message: response.message
					});
					if (response.status) {
						this.clearOrder();
						$scope.formData.cart = angular.copy($scope.interface.order);
						$location.path("/admin/dashboard/");
					}
				} else {
					$scope.formData.orderTake.orderExpand = true;
					$scope.methods.message($("body"), {status: "danger", message: "Please Read Out the Order."});
				}
			}
		};

		if ($scope.formData.cart.for != null) {
			$scope.methods.view.orderTake.userSelect.go(true);
		}
		if (typeof $scope.data.products == "undefined") {
			$scope.methods.view.orderTake.product.get();
		}
		$scope.formData.cart.type = canteenFtryOrder.type.admin[0];

	}]);