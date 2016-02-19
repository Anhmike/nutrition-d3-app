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


		$scope.ingredientsToShow = {
			availableOptions: [{
				id: '1',
				key: 'kcal',
				label: 'Calories'
			}, {
				id: '2',
				key: 'protein',
				label: 'Protein'
			}, {
				id: '3',
				key: 'carbohydrates',
				label: 'Carbohydrates'
			}, {
				id: '4',
				key: 'sugar',
				label: 'Sugar'
			}],
			selectedX: {
				id: '2',
				key: 'protein',
				label: 'Protein'
			},
			selectedY: {
				id: '4',
				key: 'sugar',
				label: 'Sugar'
			}
		};


		$http({
			method: 'GET',
			url: 'foodData.json'
		}).then(function successCallback(response) {
			$scope.dataset = response.data;
			$scope.drawGraph();
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



		$scope.drawGraph = function() {

			$('.svg-container svg').remove();

			var svg = d3.select(".svg-container").append("svg").attr({
				width: svgWidth,
				height: svgHeight
			});
			

			var xScale = d3.scale.linear() //protein
				.domain([0, d3.max($scope.dataset, function(d) {
					return d[$scope.ingredientsToShow.selectedX.key] + 5;
				})])
				.range([margin.left, svgWidth - margin.right]);

			var yScale = d3.scale.linear() //sugar
				.domain([d3.max($scope.dataset, function(d) {
					return d[$scope.ingredientsToShow.selectedY.key] + 5;
				}), 0])
				.range([margin.top, svgHeight - margin.bottom]);

			var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
			var yAxis = d3.svg.axis().scale(yScale).orient("left");




			var visualization = svg.selectAll("cirlce").data($scope.dataset);

			svg.append("g").attr({
				"class": "axis",
				transform: "translate(" + [0, svgHeight - margin.bottom] + ")"
			}).call(xAxis);

			svg.append("g").attr({
				"class": "axis",
				transform: "translate(" + [margin.left, 0] + ")"
			}).call(yAxis);

			visualization.exit().remove();
			visualization.enter().append("circle").attr({
				cx: function(d) {
					return xScale(d[$scope.ingredientsToShow.selectedX.key]);
				},
				cy: function(d) {
					return yScale(d[$scope.ingredientsToShow.selectedY.key]);
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
							return xScale(d[$scope.ingredientsToShow.selectedX.key]) - 10;
						},
						y: function() {
							return yScale(d[$scope.ingredientsToShow.selectedY.key]) - 10;
						}
					})
					.text(function() {
						return d.description;
					})
					// .text(function() {
					// 	return [d[$scope.ingredientsToShow.selectedX.key], d[$scope.ingredientsToShow.selectedY.key]];
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