define(["qlik", "jquery", "./js/tools/cube", "./js/definition/index", "./js/config", "text!./EBI-TableExportExcel.ng.html", "css!./EBI-TableExportExcel.css"],
	function (qlik, $, cube, definition, config, template) {
		"use strict";
		let myapp = qlik.openApp('瓜子插件开发测试APP');
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
				this.$scope.title = eval(`layout.${config.refDefs['0-01'].ref}`);
				this.$scope.titleStyle = {
					'text-align': eval(`layout.${config.refDefs['0-02'].ref}`),
					'font-size': eval(`layout.${config.refDefs['0-03'].ref}`),
					'color': eval(`layout.${config.refDefs['0-04'].ref}`),
					'font-weight': eval(`layout.${config.refDefs['0-05'].ref}`)
				};
				this.$scope.selectorKeyStyle = {
					'width': '40%',
					'text-align': 'right',
					'font-size': eval(`layout.${config.refDefs['1-01'].ref}`),
					'color': eval(`layout.${config.refDefs['1-02'].ref}`),
					'font-weight': eval(`layout.${config.refDefs['1-03'].ref}`)
				};
				this.$scope.selectorValueStyle = {
					'width': '60%',
					'text-align': 'left',
					'font-size': eval(`layout.${config.refDefs['1-01'].ref}`),
					'color': eval(`layout.${config.refDefs['1-02'].ref}`),
					'font-weight': eval(`layout.${config.refDefs['1-03'].ref}`)
				};
				this.$scope.selectorData = eval(`layout.${config.refDefs['1-04'].ref}`);

				// console.log(eval(`layout.${config.refDefs['1-04'].ref}`));
				
				let id = layout.qInfo.qId;

				let opt = {
					formulaOpt: {
						qDimensions: ["=日期"],
						qMeasures: ["=Sum([本币-余额合计])"]
					}
				};

				cube(myapp, opt, (rs) => {
					this.$scope.data = rs;
					var interval = setInterval(() => {
						if (rs.length == $('#' + id + 'table tr').length) {
							$('#' + id + 'table tr:eq(0) > td:eq(0)').attr('colspan', '2');
							$('#' + id + 'table tr:eq(0) > td:eq(1)').remove();
							clearInterval(interval);
						}
					}, 300);
				});

				this.$scope.exportExcel = function () {
					let html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById(id).outerHTML + "</body></html>";
					let blob = new Blob([html], { type: "application/vnd.ms-excel" });
					window.open(URL.createObjectURL(blob));
				}

				return qlik.Promise.resolve();

			},
			controller: ["$scope", "$element", function ($scope) {

			}]
		};

	});
