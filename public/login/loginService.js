'use strict';

angular.module('myApp.login.service', [])

.service('loginService',['$location',function($location){
	this.validateUser=function(){
		$location.path("/home/212435");
	}
}])
