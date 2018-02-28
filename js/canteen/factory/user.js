angular.module('canteen').factory('canteenFtryUser', ['$localStorage', function($localStorage) {
    return {
    	response: {status: false, message: "", data: []},
		init: function() {
			if ( typeof $localStorage.users == "undefined" || $localStorage.users == null) {
				$localStorage.users = [{
					name: "Suyash Kale",
					mobile: 8889644426,
					password: "3658",
					isAdmin: true
				}];
			}
		},
		clear: function() {
			$localStorage.users = null;
		},
        get: function() {
			return angular.copy($localStorage.users);
        },
        set: function(userList) {
			$localStorage.users = angular.copy(userList);
        },
		add: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				duplicate = this.findByMobile(obj.mobile);
			if (duplicate.length > 0) {
				response.message = "Mobile "+obj.mobile+" is already Registered !";
			} else {
				response.status = true;
				response.message = "User added Successfully !";
				$localStorage.users.unshift(obj);
			}
			return response;
		},
		update: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				i = this.indexByMobile(obj.mobile),
				users = this.get();
			if ( i != null) {
				users[i] = obj;
				this.set(users);
				response.status = true;
				response.message = "User Updated Successfully !";
			} else {
				response.message = "Unable to find the user !";
			}
			return response;
		},
		remove: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				i = this.indexByMobile(obj.mobile),
				users = this.get();
			if ( i != null) {
				users.splice(i, 1);
				this.set(users);
				response.status = true;
				response.message = "User Removed Successfully !";
			} else {
				response.message = "Unable to find the user !";
			}
			return response;
		},
		findByMobile: function(mobile) {
			return $localStorage.users.filter(function(v) { return v.mobile == mobile; });
		},
		indexByMobile: function(mobile) {
			var  i=null;
			$.each(this.get(), function(ind, elm) { if (elm.mobile == mobile) { i=ind; return false; } })
			return i;
		}
    };
}]);