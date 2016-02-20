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
			$scope.setSliders();
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

			var xDomainMin = $scope.slidersData[$scope.ingredientsToShow.selectedX.key].min;
			var xDomainMax = $scope.slidersData[$scope.ingredientsToShow.selectedX.key].max;

			var yDomainMin = $scope.slidersData[$scope.ingredientsToShow.selectedY.key].min;
			var yDomainMax = $scope.slidersData[$scope.ingredientsToShow.selectedY.key].max;

			//console.log($scope.slidersData[$scope.ingredientsToShow.selectedY.key]);

			var xScale = d3.scale.linear() //protein
				.domain([xDomainMin,xDomainMax])
				.range([margin.left, svgWidth - margin.right]);

			var yScale = d3.scale.linear() //sugar
				.domain([yDomainMax,yDomainMin])
				.range([margin.top, svgHeight - margin.bottom]);

			var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
			var yAxis = d3.svg.axis().scale(yScale).orient("left");



			var visualization = svg.selectAll("cirlce").data($scope.dataset);

      var tooltip;

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
				r: radius,
				fill: "#77C653"

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
          tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity",0);
          tooltip.transition()
            .duration(200)
            .style("opacity", .9)
            .style("background", "lightsteelblue");
          tooltip.html(d.description + "<br/>" + d.carbohydrates
              + "g of Carbohydrates <br/>" + d.protein + "g of Protein "
              + "<br/>" + d.sugar + "g of Sugar"
              + "<br/>" + d.kcal + " calories")
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
					// .text(function() {
					// 	return [d[$scope.ingredientsToShow.selectedX.key], d[$scope.ingredientsToShow.selectedY.key]];
					// })

			}).on("mouseout", function(d, i) {
				d3.select(this).attr({
					fill: "black",
					r: radius,
					fill: "#77C653"
				});
        tooltip.transition()
          .duration(500)
          .style("opacity", 0).remove();
				d3.select("#circleWithId" + d.id);
			});



		}

		$scope.setSliders = function() {

			$scope.slidersData = {};

			angular.forEach($scope.ingredientsToShow.availableOptions, function(value, key) {

				$scope.slidersData[value.key] = {};

				var max = $scope.dataset.reduce(function(m, k){ return k[value.key] > m ? k[value.key] : m }, -Infinity);

				$scope.slidersData[value.key].label = value.label;
				$scope.slidersData[value.key].options = {
					floor: 0,
					ceil: Math.floor(max),
					onChange: $scope.drawGraph
				};

				$scope.slidersData[value.key].min = 0;
				$scope.slidersData[value.key].max = $scope.slidersData[value.key].options.ceil;

			});

		}



		this.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
	});
