define([], function() {
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
      data: legendArr
    };

  };
  
});
