'use strict';

var app = angular.module('myApp.schoolInfo', ['ngRoute','ngAnimate', 'ngTouch'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schoolInfo', {templateUrl: 'schoolInfo/schoolInfo.html'})
  .when('/schoolLife',{templateUrl: 'schoolInfo/schoolLife.html'})
  .when('/schoolGallery',{templateUrl: 'schoolInfo/schoolLife.html'});
}])

app.controller("schoolInfoCtrl", function($scope,  schoolInfo) {
	
	$scope.getIntro = function(){

		return schoolInfo.getIntro();
	}
	$scope.getTag = function(){
		return schoolInfo.getTag();
	}
	
	$scope.getFirstFewReviews = function(){
		return schoolInfo.getReviews().slice(0,2);
	}
});


app.factory("schoolInfo", function()
{
	var service = {};

	var school = {
    	img: "no-school-photo.png",
    	name: "小金星幼儿园2",
    	addr: "福建省 福州市 金山金环路１３号",
    	phone: "12345",
    	tags:  ["幼儿园", "双语"],
    	intro: "集团在中国全资拥有六十多所大、中型直营幼儿园，教职员工两千余名，学生万余名，园舍总面积超过二十万平方米，设全日制，面向海内“小金星国际幼儿园”教学模式融贯中西，广泛摄取蒙台梭利、感觉统合、奥尔夫音乐教学、瑞吉欧方案教学等国际先进教育模式，结合中华文化精髓，全面实施幼儿素质教育，以“爱心教育、开蒙养正、服务社会、培养新生”为办学宗旨，集团化统筹管理，优化集团内外资源，强化与国际接轨的能力，形成了自己独特的“中英双语教学，科学艺术启蒙”办学特色，为幼儿的终身可持续发展奠定了良好素质基础，给孩子们创造了一个温馨、快、优美、舒适、洋溢着爱心的儿童乐园。",
    	reviews: [
    		{ reviewer: "父母1", content: "不错的学校,老师很好"}, 
    		{ reviewer: "父母2", content: "幼儿园科研部门对各年龄阶段的孩子提出了体能测试的要求"},
    		{ reviewer: "父母3", content: "幼儿园科研部门对各年龄阶段的孩子提出了体能测试的要求"},
    		{ reviewer: "父母4", content: "幼儿园科研部门对各年龄阶段的孩子提出了体能测试的要求"}
    	],
    	gallery: [
    	 	{src: 'gallery/0.jpg', desc: 'school0'},
    	 	{src: 'gallery/1.jpg', desc: 'school1'},
    	 	{src: 'gallery/2.jpg', desc: 'school2'},
    	]
    	
    }

	service.getSchoolName = function()
	{
		return school.name;
	}

	service.getAddr = function()
	{
		return school.addr;
	}

	service.getPhone = function()
	{
		return school.phone;
	}

	service.getTagString = function()
	{
	    return school.tags.join(" ");
	}

	service.getImg = function(){
		return school.img;
	}
	service.getIntro =  function() {
		return school.intro;
	}

	service.getTag = function(){
	   	return school.tags.join(" ");
	}
	service.getReviews =function(){
		return school.reviews;
	}

	service.getGallery =function(){
		 return school.gallery;
	}
	return service;

})
