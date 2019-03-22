define([
	"./js/config",
	"./js/properties",
	"qlik",
	"./lib/echarts.min",
	"./js/options/title",
	"./js/options/tooltip",
	"./js/options/legend",
	"./js/options/xAxis",
	"./js/options/yAxis",
	"./js/options/series",
	"./js/data"
  ], function(config, pDef, qlik, echarts, titleFun, tooltipFun, legendFun, xAxisFun, yAxisFun, seriesFun) {
	"use strict";
  
	var hCubeWidth = config.settings.maxDimensions + config.settings.maxMeasures;
	var hCubeInitialHeight = Math.floor(10000 / Math.min(10000, hCubeWidth));
  
	var runMain = {
	  initialProperties: {
		qHyperCubeDef: {
		  qDimensions: [],
		  qMeasures: [],
		  qInitialDataFetch: [
			{
			  qWidth: hCubeWidth,
			  qHeight: hCubeInitialHeight
			}
		  ]
		}
	  },
	  definition: pDef,
	  support: {
		snapshot: true,
		export: true,
		exportData: true
	  }
	};
  
	runMain.paint = function($element, layout) {

	  $element.html(""); //清空
  
	  $element.append('<div id="' + layout.qInfo.qId + '"></div>'); //绑定qId
  
	  $element.find("#" + layout.qInfo.qId).css({
		height: $element.height() + "px",
		width: $element.width() + "px"
	  }); //高宽自适应
  
	  console.log(layout);

	  var myChart = echarts.init(document.getElementById(layout.qInfo.qId));

	  var option = {
		color: config.eChartsDefs.ColorDef,
		title: titleFun(layout),
		tooltip: tooltipFun(layout),
		legend: legendFun(layout),
		xAxis: eval("layout."+config.refDefs.generalJs[1])==='v'?xAxisFun(layout):yAxisFun(layout),
		yAxis: eval("layout."+config.refDefs.generalJs[1])==='v'?yAxisFun(layout):xAxisFun(layout),
		series: seriesFun(layout)
	  };

	  myChart.setOption(option);
  
	  myChart.resize();
  
	  return qlik.Promise.resolve();
	};
  
	return runMain;
  });
  