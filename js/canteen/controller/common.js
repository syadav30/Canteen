 angular.module('canteen')
 	.controller('canteenCtrlcommon', ['$scope', 'canteenFtryUser', '$window', '$location', 'canteenFtryAuth', 'canteenFtryProduct', 'canteenFtryOrder', '$localStorage', function($scope, canteenFtryUser, $window, $location, canteenFtryAuth, canteenFtryProduct, canteenFtryOrder, $localStorage) {

 		$scope.data = {
 			user: null
 		};
 		$scope.interface = {
 			user: {
 					name: "",
 					email: "",
 					password: "",
 					isAdmin: false
 				},
 				product: {
 					name: "",
 					id: 0,
 					price: 0
 				},
 				order: {
 					orderId: 0,
 					for: null,
 					products: [],
 					total: 0,
 					status: canteenFtryOrder.status[0],
 					statusTime: {},
 					type: null
 				}
 		};
 		$scope.data.config = {
 			dateFilter: "dd, MMM yyyy",
 			dateTimeFilter: "dd, MMM yyyy - hh:mm a"
 		};
 		$scope.formData = {
 			cart: angular.copy($scope.interface.order)
 		};
 		if (typeof $localStorage.cart != "undefined" && $localStorage.cart != null) {
 			$scope.formData.cart = $localStorage.cart;
 		}
 		$scope.methods = {
 			orderStatusNgClass: function(obj, preFix) {
 				var info = preFix + "info",
 					warning = preFix + "warning",
 					success = preFix + "success",
 					danger = preFix + "danger",
 					returnNgClass = {};
 				returnNgClass[info] = obj == 'Cooking' || obj == 'Cooked',
 					returnNgClass[warning] = obj == 'Ready' || obj == 'Delivering',
 					returnNgClass[success] = obj == 'Delivered',
 					returnNgClass[danger] = obj == 'Canceled'
 				return returnNgClass;
 			},
 			cart: {
 				clear: function(para) {
 					if (para == true) {
 						$scope.formData.cart = angular.copy($scope.interface.order);
 						$localStorage.cart = null;
 					} else {
 						$scope.formData.cart.products = [];
 						$localStorage.cart.products = [];
 					}
 					this.calculate();
 				},
 				add: function(p) {
 					var duplicate = $scope.formData.cart.products.filter(function(v) {
 						return v.id == p.id
 					});
 					if (duplicate.length > 0) {
 						duplicate[0].quantity++;
 						duplicate[0].total = duplicate[0].price * duplicate[0].quantity;
 					} else {
 						p.quantity = 1;
 						p.total = p.price;
 						$scope.formData.cart.products.push(p);
 					}
 					this.calculate();
 				},
 				calculate: function() {
 					$scope.formData.cart.total = 0;
 					$.each($scope.formData.cart.products, function(ind, elm) {
 						elm.total = elm.quantity * elm.price;
 						$scope.formData.cart.total += elm.total;
 					});
 					$localStorage.cart = $scope.formData.cart;
 				},
 				order: function(o) {
 					if (typeof o == "undefined") {
 						o = $scope.formData.cart;
 					}
 					var response = canteenFtryOrder.add(o);
 					$scope.methods.message($("body"), {
 						status: response.status ? "success" : "danger",
 						message: response.message
 					});
 					if (response.status) {
 						this.clear();
 					}
 					return response;
 				}
 			},
 			view: {},
 			message: function(elm, data) {
 				elm.canteenMessage(data);
 			},
 			clearForm: function(obj) {
 				$.each(obj, function(ind, elm) {
 					obj[ind] = "";
 				});
 			},
 			location: function(p) {
 				$location.path(p);
 			},
 			user: {
 				clear: function(what) {
 					var all = what == "all" ? true : false;
 					if (what == "users" || all) {
 						canteenFtryUser.clear();
 					}
 					if (what == "products" || all) {
 						canteenFtryProduct.clear();
 					}
 					if (what == "orders" || all) {
 						canteenFtryOrder.clear();
 					}
 					this.signOut();
 				},
 				signOut: function() {
 					$scope.data.user = null;
 					canteenFtryAuth.clearuser();
 					$location.path("/");
 					$window.location.reload();
 				}
 			}
 		};
 		canteenFtryUser.init();
 		canteenFtryProduct.init();
 		canteenFtryOrder.init();
 		if (canteenFtryAuth.signIn()) {
 			$scope.data.user = canteenFtryAuth.user;
 		}
 	}]);


 angular.module('canteen').filter('canteenOrderId', function($sce) {
 	return function(input, full) {
 		var orderId = full == true ? input : input.split("_")[1];
 		return $sce.trustAsHtml("<strong><span class='text-primary'>#</span>" + orderId+"</strong>");
 	}
 });
 angular.module('canteen').filter('canteenCurrency', function($sce) {
 	return function(input) {
 		return $sce.trustAsHtml("<span class='small'>Rs. </span>" + input);
 	}
 });
 angular.module('canteen').filter('canteenMobile', function($sce) {
 	return function(input) {
 		return $sce.trustAsHtml("<a href='tel:+91" + input + "'><span class='small'>+91</span>" + input + "</a>");
 	}
 });
