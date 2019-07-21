define(["qlik", "jquery", "./js/tools/cube", "./js/definition/index", "./js/config", "text!./EBI-TableExportExcel.ng.html", "css!./EBI-TableExportExcel.css"],
	function (qlik, $, cube, definition, config ,template) {
		"use strict";
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 3,
						qHeight: 500
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
				let id = $scope.layout.qInfo.qId;
				let myapp = qlik.openApp('瓜子插件开发测试APP');
				let opt = {
					formulaOpt: {
						qDimensions: ["=日期"],
						qMeasures: ["=Sum([本币-余额合计])"]
					}
				};
				cube(myapp, opt, (rs) => {
					$scope.data = rs;
					var interval = setInterval(() => {
						if (rs.length == $('#'+id+'table tr').length) {
							$('#'+id+'table tr:eq(0) > td:eq(0)').attr('colspan', '2');
							$('#'+id+'table tr:eq(0) > td:eq(1)').remove();
							clearInterval(interval);
						}
					}, 300);
				});

				$scope.exportExcel = function () {
					let html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById(id).outerHTML + "</body></html>";
					let blob = new Blob([html], { type: "application/vnd.ms-excel" });
					window.open(URL.createObjectURL(blob));

				}


			}]
		};

	});
