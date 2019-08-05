define(["qlik", "jquery", "./js/tools/cube", "./js/tools/tools", "./js/definition/index", "./js/config", "text!./EBI-QS-SimpleTemplate.html", "css!./EBI-QS-SimpleTemplate.css"],
	function (qlik, $, cube, todo, definition, config, template) {
		"use strict";
		let myapp = qlik.currApp();
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 3,
						qHeight: 20
					}]
				}
			},
			definition: definition,
			support: {
				snapshot: true,
				export: false,
				exportData: true
			},
			paint: function ($element, layout) {
				

				return qlik.Promise.resolve();

			},
			controller: ["$scope", "$element", function ($scope) {
				
			}]
		};

	});
