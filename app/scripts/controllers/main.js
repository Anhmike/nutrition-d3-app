'use strict';

/**
 * @ngdoc function
 * @name nutriAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nutriAppApp
 */
angular.module('nutriAppApp')
  .controller('MainCtrl', function () {

  	var svg = d3.select(".svg-container").append("svg").attr({
  		width:$(".svg-container").width(),
  		height: 600
  	});


    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
