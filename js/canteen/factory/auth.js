angular.module('canteen').factory('canteenFtryAuth', ['$location','$localStorage', function($location, $localStorage) {
    return {
    	user: null,
    	setUser: function(user) {
    		this.user = user;
    		$localStorage.user = user;
    	},
    	clearuser: function() {
    		$localStorage.user = null;
    		this.user = null;
    	},
    	signIn: function() {
	    	if (typeof $localStorage.user != "undefined" && $localStorage.user != null) {
	    		this.user = $localStorage.user;
	    		return true;
	    	}
    		return false;
    	},
		isSignIn: function() {
			var flag = this.user != null && typeof this.user.mobile != "undefined" ? true : false;
			if (!flag) {
				$location.path("/signIn");
			}
			return flag;
		},
		isSignOut: function() {
			var flag = this.user == null ? true : false;
			if (!flag) {
				if (this.user.isAdmin) {
					$location.path("/admin/dashboard");
				} else {
					$location.path("/customer/");
				}
			}
			return flag;
		},
		isAdmin: function() {
			var flag = this.user.isAdmin;
			if (!flag) {
				$location.path("/customer/dashboard");
			}
			return flag;
		}
    };
}]);