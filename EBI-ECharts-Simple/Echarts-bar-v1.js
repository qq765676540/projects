define([
  "qlik",
  "./js/config",
  "./js/properties",
  "./lib/echarts.min",
  "./js/option"
], function(qlik, config, pDef, echarts, optionFun) {
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

    myChart.setOption(optionFun(layout));

    myChart.resize(); //*

    return qlik.Promise.resolve();
  };

  return runMain;
});
