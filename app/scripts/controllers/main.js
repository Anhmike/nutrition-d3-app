'use strict';

/**
 * @ngdoc function
 * @name nutriAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the nutriAppApp
 */


angular.module('nutriAppApp')
	.controller('MainCtrl', function() {

		var svgWidth = $(".svg-container").width();
		var svgHeight = 600;
		var margin = {
			top: 40,
			right: 40,
			bottom: 40,
			left: 40
		};

		var dataset = [{
			"id": 43218,
			"description": "Cereals ready-to-eat, ALPEN",
			"kcal": 352,
			"protein": 11.2,
			"carbohydrates": 75.7,
			"sugar": 20
		}, {
			"id": 8657,
			"description": "Cereals ready-to-eat, BARBARA'S PUFFINS, original",
			"kcal": 333,
			"protein": 7.41,
			"carbohydrates": 84,
			"sugar": 18.52
		}, {
			"id": 8681,
			"description": "Cereals ready-to-eat, CASCADIAN FARM, Cinnamon Crunch",
			"kcal": 407,
			"protein": 5.69,
			"carbohydrates": 81.59,
			"sugar": 31
		}, {
			"id": 8684,
			"description": "Cereals ready-to-eat, CASCADIAN FARM, Honey Nut O's",
			"kcal": 371,
			"protein": 8.3,
			"carbohydrates": 83.09,
			"sugar": 24.79
		}, {
			"id": 8683,
			"description": "Cereals ready-to-eat, CASCADIAN FARM, Multi-Grain Squares",
			"kcal": 387,
			"protein": 9.39,
			"carbohydrates": 83,
			"sugar": 13.19
		}, {
			"id": 8204,
			"description": "Cereals ready-to-eat, chocolate-flavored frosted puffed corn",
			"kcal": 405,
			"protein": 3.34,
			"carbohydrates": 87.2,
			"sugar": 43.7
		}, {
			"id": 43241,
			"description": "Cereals ready-to-eat, FAMILIA",
			"kcal": 388,
			"protein": 9.5,
			"carbohydrates": 73.8,
			"sugar": 23.2
		}, {
			"id": 42236,
			"description": "Cereals ready-to-eat, frosted oat cereal with marshmallows",
			"kcal": 400,
			"protein": 7.1,
			"carbohydrates": 84.7,
			"sugar": 36.13
		}, {
			"id": 8579,
			"description": "Cereals ready-to-eat, GENERAL MILLS, 25% Less Sugar CINNAMON TOAST CRUNCH",
			"kcal": 386,
			"protein": 5.09,
			"carbohydrates": 78.19,
			"sugar": 21.39
		}, {
			"id": 8586,
			"description": "Cereals ready-to-eat, GENERAL MILLS, 25% Less Sugar TRIX",
			"kcal": 383,
			"protein": 5.4,
			"carbohydrates": 85.5,
			"sugar": 25
		}, {
			"id": 8263,
			"description": "Cereals ready-to-eat, GENERAL MILLS, APPLE CINNAMON CHEERIOS",
			"kcal": 386,
			"protein": 8.3,
			"carbohydrates": 79.9,
			"sugar": 34.2
		}, {
			"id": 8678,
			"description": "Cereals ready-to-eat, GENERAL MILLS, Apple Cinnamon CHEX",
			"kcal": 408,
			"protein": 4.69,
			"carbohydrates": 82.8,
			"sugar": 26
		}, {
			"id": 8262,
			"description": "Cereals ready-to-eat, GENERAL MILLS, BASIC 4",
			"kcal": 358,
			"protein": 6.69,
			"carbohydrates": 79.09,
			"sugar": 22.5
		}, {
			"id": 8274,
			"description": "Cereals ready-to-eat, GENERAL MILLS, BERRY BERRY KIX",
			"kcal": 376,
			"protein": 6.19,
			"carbohydrates": 83.9,
			"sugar": 21
		}, {
			"id": 8239,
			"description": "Cereals ready-to-eat, GENERAL MILLS, Berry Burst CHEERIOS, Triple Berry",
			"kcal": 378,
			"protein": 8.8,
			"carbohydrates": 80.5,
			"sugar": 27
		}, {
			"id": 8273,
			"description": "Cereals ready-to-eat, GENERAL MILLS, BOO BERRY",
			"kcal": 386,
			"protein": 5.5,
			"carbohydrates": 85.4,
			"sugar": 27.29
		}, {
			"id": 8013,
			"description": "Cereals ready-to-eat, GENERAL MILLS, CHEERIOS",
			"kcal": 376,
			"protein": 12.09,
			"carbohydrates": 73.23,
			"sugar": 4.36
		}, {
			"id": 8592,
			"description": "Cereals ready-to-eat, GENERAL MILLS, CHEERIOS, Banana Nut",
			"kcal": 375,
			"protein": 5.5,
			"carbohydrates": 84.69,
			"sugar": 33.09
		}, {
			"id": 8593,
			"description": "Cereals ready-to-eat, GENERAL MILLS, CHEERIOS, Chocolate",
			"kcal": 380,
			"protein": 5.8,
			"carbohydrates": 83.5,
			"sugar": 34.09
		}, {
			"id": 8553,
			"description": "Cereals ready-to-eat, GENERAL MILLS, CHEERIOS, Yogurt Burst, strawberry",
			"kcal": 400,
			"protein": 6.67,
			"carbohydrates": 81.75,
			"sugar": 30
		}];


		var svg = d3.select(".svg-container").append("svg").attr({
			width: svgWidth,
			height: svgHeight
		});



		var radius = 4;
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
					return JSON.stringify(d);
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



		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});