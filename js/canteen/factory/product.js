angular.module('canteen').factory('canteenFtryProduct', ['$localStorage', function($localStorage) {
    return {
    	response: {status: false, message: "", data: []},
		init: function() {
			if ( typeof $localStorage.products == "undefined" || $localStorage.products == null) {
				$localStorage.products = [];
			}
		},
		clear: function() {
			$localStorage.products = null;
		},
        get: function() {
			return angular.copy($localStorage.products);
        },
        set: function(products) {
			$localStorage.products = angular.copy(products);
        },
		add: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				duplicate = this.findById(obj.id);
			if (duplicate.length > 0) {
				response.message = "Product Id "+obj.id+" is already exist !";
			} else {
				response.status = true;
				response.message = "Product added Successfully !";
				$localStorage.products.unshift(obj);
			}
			return response;
		},
		update: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				i = this.indexById(obj.id),
				products = this.get();
			if ( i != null) {
				products[i] = obj;
				this.set(products);
				response.status = true;
				response.message = "Product Updated Successfully !";
			} else {
				response.message = "Unable to find the Product !";
			}
			return response;
		},
		remove: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				i = this.indexById(obj.id),
				products = this.get();
			if ( i != null) {
				products.splice(i, 1);
				this.set(products);
				response.status = true;
				response.message = "Product Removed Successfully !";
			} else {
				response.message = "Unable to find the Product !";
			}
			return response;
		},
		findById: function(id) {
			return $localStorage.products.filter(function(v) { return v.id == id; });
		},
		indexById: function(id) {
			var  i=null;
			$.each(this.get(), function(ind, elm) { if (elm.id == id) { i=ind; return false; } });
			return i;
		}
    };
}]);