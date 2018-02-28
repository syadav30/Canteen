angular.module('admin')
	.controller('adminCtrlUser', ['$scope', 'canteenFtryUser', function($scope, canteenFtryUser) {

		$scope.formData.users = {
			add: angular.copy($scope.interface.user),
			remove: angular.copy($scope.interface.user)
		};

		$scope.methods.view.users = {
			get: function() {
				$scope.data.users = canteenFtryUser.get();
			},
			addUpdateOpenModal: function(u) {
				if (typeof u != "undefined") {
					$scope.formData.users.add = angular.copy(u);
					$scope.formData.users.add.isEdit = true;
				} else {
					$scope.formData.users.add = angular.copy($scope.interface.user);
					$scope.formData.users.add.isEdit = false;
				}
				$("#modal-add-user").modal("show");
			},
			addUpdate: function(valid, isEdit) {
				if (valid) {
					if (isEdit) {
						var response = canteenFtryUser.update($scope.formData.users.add);
					} else {
						var response = canteenFtryUser.add($scope.formData.users.add);
					}
					$scope.methods.message($("body"), {
						status: response.status ? "success" : "danger",
						message: response.message
					});
					if (response.status) {
						$("#modal-add-user").modal("hide");
						$scope.methods.view.users.get();
					}
				} else {
					$scope.methods.message($("body"), {
						status: "danger",
						message: "Please fill all Mandatory fields."
					});
				}
			},
			removeOpenModal: function(u) {
				$scope.formData.users.remove = angular.copy(u);
				$("#modal-remove-user").modal("show");
			},
			remove: function() {
				var response = canteenFtryUser.remove($scope.formData.users.remove);
				if (response.status) {
					$("#modal-remove-user").modal("hide");
					$scope.methods.view.users.get();
				}
				$scope.methods.message($("body"), {
					status: response.status ? "success" : "danger",
					message: response.message
				});
			}
		};

		$scope.methods.view.users.get();

	}]);