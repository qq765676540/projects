define(["qlik", "jquery", "./js/tools/cube", "./js/definition/index", "./js/config", "text!./EBI-TableExportExcel.ng.html", "css!./EBI-TableExportExcel.css"],
	function (qlik, $, cube, definition, config, template) {
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
				let myapp = qlik.openApp('瓜子插件开发测试APP');
				let id = layout.qInfo.qId;
				//标题设置
				this.$scope.title = eval(`layout.${config.refDefs['0-01'].ref}`);
				this.$scope.titleStyle = {
					'text-align': eval(`layout.${config.refDefs['0-02'].ref}`),
					'font-size': eval(`layout.${config.refDefs['0-03'].ref}`),
					'color': eval(`layout.${config.refDefs['0-04'].ref}`),
					'font-weight': eval(`layout.${config.refDefs['0-05'].ref}`)
				};
				//筛选设置
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
				//表头设置
				let theadName = eval(`layout.${config.refDefs['2-01'].ref}.split('|')`);
				let theadSort = eval(`layout.${config.refDefs['2-02'].ref}.split('|')`);
				let theadData = [];
				theadSort.filter(v => {
					theadData.push(theadName[v*1-1]);
				});
				this.$scope.theadData = theadData;
				//查询
				let queryRef = eval(`layout.${config.refDefs['3-01'].ref}`);
				let queryArr = [];
				queryRef.filter((v,i) => {
					let opt = {
						formulaOpt: {
							qDimensions: [
								`='${v.sort=='&'?((i-1)<10?('0'+(i-1)):(i-1)):(i<10?('0'+i):i)}'&'|'&${v.group=='-'?"'-'":(v.sort=='&'?(v.group+"&'追加'"):v.group)}&'|'&${v.sort=='-'?"'-'":v.sort}&'|'&'${v.colspan}'`,
								`${v.dim}`
							],
							qMeasures: [
								`${v.mea}`
							]
						}
					};
					queryArr.push(opt);
				});
				
				let dataArr = [];
				
				queryArr.filter((v,i) => {
					cube(myapp, v, (rs) => {
						dataArr.push(rs);
					});
				});
				
				let data = [];
				let tableData = [];
				let interval = setInterval(() => {
					if (queryRef.length == dataArr.length) {
						dataArr.filter(v => {
							data = data.concat(v);
						});
						data.sort((a,b) => {
							return a[0].qText.localeCompare(b[0].qText,'zh-CN');
						});

						data.filter(v => {
							let temp = {
								colspan: v[0].qText.split('|')[3],
								arr: (v[1].qText + '|' + v[2].qText).split('|')	
							};
							let arrtemp = [];
							theadSort.filter(v => {
								arrtemp.push(temp.arr[v*1-1]);
							});
							temp.arr = arrtemp;
							tableData.push(temp);
						});
						
						this.$scope.tableData = tableData;
						clearInterval(interval);
					}
				}, 300);
				
				
				

				// var interval = setInterval(() => {
				// 	if (rs.length == $('#' + id + 'tbody tr').length) {
				// 		$('#' + id + 'tbody tr:eq(1) > td:eq(0)').attr('colspan', '2');
				// 		$('#' + id + 'tbody tr:eq(1) > td:eq(1)').remove();
				// 		clearInterval(interval);
				// 	}
				// }, 300);

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
