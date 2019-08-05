define(["qlik", "jquery", "./js/tools/cube", "./js/tools/tools", "./js/definition/index", "./js/config", "text!./EBI-TableExportExcel.ng.html", "css!./EBI-TableExportExcel.css"],
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
				this.$scope.help = eval(`layout.${config.refDefs['2-01'].ref}`);

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
					theadData.push(theadName[v * 1 - 1]);
				});
				this.$scope.theadData = theadData;


				//样式设置
				this.$scope.divbody = {
					"max-height": eval(`layout.${config.refDefs['4-01'].ref}`),
					"overflow": "scroll"
				};
				this.$scope.theadstyle = {
					"border": "0.5px solid #333333",
					"background": eval(`layout.${config.refDefs['4-02'].ref}`)
				};

				return qlik.Promise.resolve();

			},
			controller: ["$scope", "$element", function ($scope) {
				//显示数据
				$scope.displayExcel = function () {
					$scope.querying = "正在查询数据，请稍等...";
					let queryRef = eval(`$scope.layout.${config.refDefs['3-01'].ref}`);
					let theadSort = eval(`$scope.layout.${config.refDefs['2-02'].ref}.split('|')`);
					$scope.layout.queryArr = [];
					queryRef.filter((v, i) => {
						let dimArr = v.dim.split('|');
						let meaArr = v.mea;
						let opt = {
							formulaOpt: {
								qDimensions: [
									`='${v.sort == '&' ? ((i - 1) < 10 ? ('0' + (i - 1)) : (i - 1)) : (i < 10 ? ('0' + i) : i)}'&'|'&${v.group == '-' ? "'-'" : (v.sort == '&' ? (v.group + "&'追加'") : v.group)}&'|'&${v.sort == '-' ? "'-'" : v.sort}&'|'&'${v.colspan}'`
								],
								qMeasures: []
							}
						};
						dimArr.filter(v => {
							opt.formulaOpt.qDimensions.push('='+v);
						});
						meaArr.filter(v => {
							opt.formulaOpt.qMeasures.push('='+v.meaexp);
						});
						$scope.layout.queryArr.push(opt);
					});

					let dataArr = [];

					$scope.layout.queryArr.filter((v, i) => {
						cube(myapp, v, (rs) => {
							dataArr.push(rs.rows);
						});
					});
					
					let data = [];
					let tableData = [];

					let interval0 = setInterval(() => {
						if (queryRef.length == dataArr.length && dataArr.length > 0) {
							try {
								dataArr.filter(v => {
									data = data.concat(v);
								});
								data.sort((a, b) => {
									return a[0].qText.localeCompare(b[0].qText, 'zh-CN');
								});

								data.filter(v => {
									let temp = {
										colspan: v[0].qText.split('|')[3],
										arr: []
									};
									for (let index = 1; index < v.length; index++) {
										temp.arr.push(v[index].qText);	
									}
									
									let arrtemp = [];
									theadSort.filter(v => {
										arrtemp.push(temp.arr[v * 1 - 1]);
									});
									temp.arr = arrtemp;
									tableData.push(temp);
								});
								
								$scope.layout.tableDataExport = tableData;
								
								let displayData = todo('deepClone', tableData);
								$scope.tableData = displayData.slice(0, 30);
								// console.log(displayData);
								$scope.querying = "";
								
							} catch (error) {
								clearInterval(interval0);
							}
							clearInterval(interval0);
						}
					}, 100);

				}

				//导出Excel
				$scope.exportExcel = function () {

					let queryRef = eval(`$scope.layout.${config.refDefs['3-01'].ref}`);
					$scope.layout.queryArr = [];
					queryRef.filter((v, i) => {
						let dimArr = v.dim.split('|');
						let meaArr = v.mea;
						let opt = {
							formulaOpt: {
								qDimensions: [
									`='${v.sort == '&' ? ((i - 1) < 10 ? ('0' + (i - 1)) : (i - 1)) : (i < 10 ? ('0' + i) : i)}'&'|'&${v.group == '-' ? "'-'" : (v.sort == '&' ? (v.group + "&'追加'") : v.group)}&'|'&${v.sort == '-' ? "'-'" : v.sort}&'|'&'${v.colspan}'`
								],
								qMeasures: [
								]
							}
						};
						dimArr.filter(v => {
							opt.formulaOpt.qDimensions.push('='+v);
						});
						meaArr.filter(v => {
							opt.formulaOpt.qMeasures.push('='+v.meaexp);
						});
						$scope.layout.queryArr.push(opt);
					});
					//-----------------------------------------------------------------------
					let totalcount = eval(`$scope.layout.${config.refDefs['3-02'].ref}`);
					let dataArr = [];
					let data = [];
					let tableData = [];
					let count = 0;
					$scope.layout.queryArr.filter((v, i) => {
						$scope.layout.queryArr[i].qTop = 0;
						$scope.layout.queryArr[i].qHeight = 200;
						for (let index = 0; index < parseInt((totalcount < 200 ? 200 : totalcount) / 200); index++) {
							cube(myapp, v, (rs) => {
								dataArr.push(rs.rows);
							});
							setTimeout(() => { }, 300);
							count += 1;
							$scope.layout.queryArr[i].qTop += 200;
						}
					});

					let theadSort = eval(`$scope.layout.${config.refDefs['2-02'].ref}.split('|')`);
					let interval1 = setInterval(() => {
						if (count == dataArr.length) {
							try {
								dataArr.filter(v => {
									data = data.concat(v);
								});
								data.sort((a, b) => {
									return a[0].qText.localeCompare(b[0].qText, 'zh-CN');
								});
								data.filter(v => {
									let temp = {
										colspan: v[0].qText.split('|')[3],
										arr: []
									};
									for (let index = 1; index < v.length; index++) {
										temp.arr.push(v[index].qText);	
									}
									let arrtemp = [];
									theadSort.filter(v => {
										arrtemp.push(temp.arr[v * 1 - 1]);
									});
									temp.arr = arrtemp;
									tableData.push(temp);
								});
								$scope.tableDataExport = [];
								$scope.tableDataExport = tableData;
							} catch (error) {
								clearInterval(interval1);
							}
							clearInterval(interval1);
						}
					}, 100);

					$scope.loading = '正在加载导出的数据，请稍等......';
					let interval2 = setInterval(() => {
						if ($scope.tableDataExport.length >0 && $scope.tableDataExport.length == $('#' + $scope.layout.qInfo.qId + 'tableexport tr').length - 1) {
							try {
								let html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById($scope.layout.qInfo.qId + 'export').outerHTML + "</body></html>";
								let blob = new Blob([html], { type: "application/vnd.ms-excel" });
								window.open(URL.createObjectURL(blob));
								$scope.loading = '';
								$scope.tableDataExport = [];
							} catch (error) {
								clearInterval(interval2);
							}
							clearInterval(interval2);
						}
					}, 300);
				}
			}]
		};

	});
