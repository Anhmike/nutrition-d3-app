'use strict';

/**
 * @ngdoc function
 * @name nutriAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nutriAppApp
 */


angular.module('nutriAppApp')
	.controller('MainCtrl', function($scope, $http) {

		$scope.ingredientLabels = {
			kcal: {
				label: "Calorie"
			},

			protein: {
				label: "Protein"
			},

			carbohydrates: {
				label: "Carbohydrates"
			},

			sugar: {
				label: "Sugar"
			}
		};


		$http({
			method: 'GET',
			url: 'foodData.json'
		}).then(function successCallback(response) {
			drawGraph(response.data);
		}, function errorCallback(response) {
			console.error(response)
		});

		var radius = 4;
		var svgWidth = $('.svg-container').width();
		var svgHeight = 600;

		var margin = {
			top: 40,
			bottom: 40,
			left: 40,
			right: 40
		}



		var svg = d3.select(".svg-container").append("svg").attr({
			width: svgWidth,
			height: svgHeight
		});



		function drawGraph(dataset) {

			var xScale = d3.scale.linear() //protein
				.domain([0, d3.max(dataset, function(d) {
					return d.protein + 5;
				})])
				.range([margin.left, svgWidth - margin.right]);

			var yScale = d3.scale.linear() //sugar
				.domain([d3.max(dataset, function(d) {
					return d.sugar + 5;
				}), 0])
				.range([margin.top, svgHeight - margin.bottom]);

			var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
			var yAxis = d3.svg.axis().scale(yScale).orient("left");

			svg.append("g").attr({
				"class": "axis",
				transform: "translate(" + [0, svgHeight - margin.bottom] + ")"
			}).call(xAxis);

			svg.append("g").attr({
				"class": "axis",
				transform: "translate(" + [margin.left, 0] + ")"
			}).call(yAxis);


			svg.selectAll("cirlce").data(dataset).enter().append("circle").attr({
				cx: function(d) {
					return xScale(d.protein);
				},
				cy: function(d) {
					return yScale(d.sugar);
				},
				r: radius

			}).on("mouseover", function(d, i) {
				d3.select(this).attr({
					fill: "#705BC8",
					r: radius * 1.5
				})

				svg.append("text")
					.attr({
						id: "circleWithId" + d.id,
						x: function() {
							return xScale(d.protein) - 10;
						},
						y: function() {
							return yScale(d.sugar) - 10;
						}
					})
					.text(function() {
						return d.description;
					})
					// .text(function() {
					// 	return [d.protein, d.sugar];
					// })

			}).on("mouseout", function(d, i) {
				d3.select(this).attr({
					fill: "black",
					r: radius
				});

				d3.select("#circleWithId" + d.id).remove();
			});
		}



		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});