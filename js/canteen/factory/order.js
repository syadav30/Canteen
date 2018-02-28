angular.module('canteen').factory('canteenFtryOrder', ['$localStorage', function($localStorage) {
    return {
    	response: {status: false, message: "", data: []},
		// Cooking(info), cooking(info), Ready(warning), Delivering(warning), Delivered(success), Canceled(danger)
		status: ["Cooking", "Cooked", "Ready", "Delivering", "Delivered", "Canceled"],
		type: {
			admin: ["Having Here", "Take Away"],
			user: ["Home Delivery", "Pick Up"]
		},
		init: function() {
			if ( typeof $localStorage.orders == "undefined" || $localStorage.orders == null) {
				$localStorage.orders = [];
			}
		},
		clear: function() {
			$localStorage.orders = null;
		},
        get: function() {
			return angular.copy($localStorage.orders);
        },
        set: function(orders) {
			$localStorage.orders = angular.copy(orders);
        },
		add: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				date = new Date();
			obj.status = this.status[0];
			obj.statusTime = {};
			obj.statusTime[this.status[0]] = date;
			obj.id =  (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear() +"_"+ (this.get().length+1);
			var products = [];
			$.each(obj.products, function(ind, elm) {
				elm.cooking = angular.copy(elm).quantity;
				products.push(elm);
			});
			obj.products = products;
			$localStorage.orders.unshift(obj);
			response.status = true;
			response.data = obj;
			response.message = "Order added Successfully !";
			return response;
		},
		update: function(obj) {
			var response = angular.copy(this.response),
				obj = angular.copy(obj),
				i = this.indexById(obj.id),
				orders = this.get();
			if ( i != null) {
				orders[i] = obj;
				this.set(orders);
				response.status = true;
				response.message = "User Updated Successfully !";
			} else {
				response.message = "Unable to find the user !";
			}
			return response;
		},
		findById: function(id) {
			return $localStorage.orders.filter(function(v) { return v.id == id; });
		},
		indexById: function(id) {
			var  i=null;
			$.each(this.get(), function(ind, elm) { if (elm.id == id) { i=ind; return false; } });
			return i;
		},
		findByUser: function(u) {
			return this.get().filter(function(v) { return v.for != null ? (v.for.mobile == u.mobile) : false ; });
		},
		getCooking: function() {
			var that= this,
				products = [];
			$.each(that.get().filter(function(v) {
				return v.status == that.status[0];
			}), function(i, e) {
				$.each(e.products, function(ind, elm) {
					if (elm.cooking != 0) {
						var duplicate = products.filter(function(v) {
							return v.id == elm.id;
						});
						if (duplicate.length > 0) {
							duplicate[0].cooking += elm.cooking;
						} else {
							products.push(elm);
						}
					}
				});
			});
			return products;
		},
		cooked: function(c) {
			var that = this,
				response = angular.copy(this.response);
			var order = this.get().filter(function(v) { return v.status == that.status[0] && v.products.filter(function(vv) { return vv.id == c.id && vv.cooking != 0; }).length > 0 }).reverse();
			if (order.length > 0) {
				order = order[0];
				var product = order.products.filter(function(v) {
					return v.id == c.id && v.cooking != 0;
				});
				if (product.length > 0) {
					product = product[0];
					product.cooking--;
					if (product.cooking == 0 && order.products.filter(function(v) {
						return v.cooking != 0;
					}).length == 0) {
						that.updateStatus(order, that.status[1]);
					} else {
						that.update(order);
					}
					response.status = true;
					response.message = "Status Changed Successfully !";
				} else {
					response.message = "Cant find the Product, Please try again later !";
				}
			} else {
				response.message = "Cant find the Order, Please try again later !";
			}
			return response;
		},
		updateStatus: function(order, status) {
			var that = this,
				order = angular.copy(order),
				response = angular.copy(this.response);
			if (that.status.indexOf(status) >= 0) {
				order.status = status;
				order.statusTime[order.status] = new Date();
				var iResponse = that.update(order);
				if (iResponse.status) {
					response.status = true;
					response.message = "Status updated Successfully !";
				} else {
					response = iResponse;
				}
			} else {
				response.message = "Status is Invalid !";
			}
			return response;
		},
		getCooked: function() {
			var that = this;
			return that.get().filter(function(v) {
				return v.status == that.status[1];
			});
		}
    };
}]);