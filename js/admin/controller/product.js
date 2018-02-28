angular.module('canteen')
	.controller('adminCtrlProduct', ['$scope', 'canteenFtryProduct', function($scope, canteenFtryProduct) {

		$scope.formData.products = {
			add: angular.copy($scope.interface.product),
			remove: angular.copy($scope.interface.product)
		};

		$scope.methods.view.products = {
			get: function() {
				$scope.data.products = canteenFtryProduct.get();
			},
			addUpdateOpenModal: function(u) {
				if (typeof u != "undefined") {
					$scope.formData.products.add = angular.copy(u);
					$scope.formData.products.add.isEdit = true;
				} else {
					$scope.formData.products.add = angular.copy($scope.interface.user);
					$scope.formData.products.add.isEdit = false;
				}
				$("#modal-add-products").modal("show");
			},
			addUpdate: function(valid, isEdit) {
				if (valid) {
					if (isEdit) {
						var response = canteenFtryProduct.update($scope.formData.products.add);
					} else {
						var response = canteenFtryProduct.add($scope.formData.products.add);
					}
					$scope.methods.message($("body"), {
						status: response.status ? "success" : "danger",
						message: response.message
					});
					if (response.status) {
						$("#modal-add-products").modal("hide");
						$scope.methods.view.products.get();
					}
				} else {
					$scope.methods.message($("body"), {
						status: "danger",
						message: "Please fill all Mandatory fields."
					});
				}
			},
			removeOpenModal: function(u) {
				$scope.formData.products.remove = angular.copy(u);
				$("#modal-remove-products").modal("show");
			},
			remove: function() {
				var response = canteenFtryProduct.remove($scope.formData.products.remove);
				if (response.status) {
					$("#modal-remove-products").modal("hide");
					$scope.methods.view.products.get();
				}
				$scope.methods.message($("body"), {
					status: response.status ? "success" : "danger",
					message: response.message
				});
			}
		};
		$scope.methods.view.products.get();

	}]);