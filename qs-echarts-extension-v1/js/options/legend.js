define(["./../config"], function(config) {
  return function(layout) {
    var legendArr = [];

    for (
      var index = 0;
      index < layout.qHyperCube.qMeasureInfo.length;
      index++
    ) {
      legendArr.push(layout.qHyperCube.qMeasureInfo[index].qFallbackTitle);
    }

    return {
      show: eval("layout."+config.refDefs.generalJs[6].ref),
      orient: eval("layout."+config.refDefs.generalJs[3].ref),
      top: eval("layout."+config.refDefs.generalJs[4].ref),
      left: eval("layout."+config.refDefs.generalJs[5].ref),
      data: legendArr
    };

  };
  
});
