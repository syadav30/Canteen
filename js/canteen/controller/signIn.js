 angular.module('canteen')
 .controller('canteenCtrlSignIn',['$scope','$location','canteenFtryUser','canteenFtryAuth' ,function($scope, $location, canteenFtryUser, canteenFtryAuth) {

	$scope.formData.signIn = {
		mobile: 8889644426,
		password: "3658",
		message: "",
		passwordType: ""
	};
	$scope.methods.view.signIn = function(valid) {
		if (valid) {
			var user = canteenFtryUser.findByMobile($scope.formData.signIn.mobile);
			if (user.length > 0) {
				if (user[0].password == $scope.formData.signIn.password) {
					$scope.data.user = user[0];
					canteenFtryAuth.setUser($scope.data.user);
					if ($scope.data.user.isAdmin) {
						$location.path("/admin/dashboard");
					} else {
						$location.path("/customer/");
					}
				} else {
					$scope.methods.message($("body"), {status: "danger", message: "Password is incorrect for Mobile "+$scope.formData.signIn.mobile+" !"});
				}
			} else {
				$scope.methods.message($("body"), {status: "danger", message: "Mobile "+$scope.formData.signIn.mobile+" is not registered !"});
			}
		} else {
			$scope.methods.message($("body"), {status: "danger", message: "Please fill all Mandatory fields."});
		}
	};
	 
 }]);