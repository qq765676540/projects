define(["./../config", "./../tools/data"], function(config) {
  return function(layout) {
    var meaArr = [];

    for (
      var index = 0;
      index < layout.qHyperCube.qMeasureInfo.length;
      index++
    ) {
      meaArr.push({
        name: layout.qHyperCube.qMeasureInfo[index].qFallbackTitle,
        type: "bar",
        barGap: eval("layout." + config.refDefs.generalJs[7].ref),
        label: {
          show: eval("layout." + config.refDefs.generalJs[15].ref),
          position: eval("layout." + config.refDefs.generalJs[16].ref),
          distance: 15,
          align: "left",
          verticalAlign: "middle",
          rotate: eval("layout." + config.refDefs.generalJs[17].ref),
          formatter: eval("layout." + config.refDefs.generalJs[20].ref),
          fontSize: eval("layout." + config.refDefs.generalJs[19].ref),
          color: eval("layout." + config.refDefs.generalJs[18].ref)
        },
        data: getData(layout.qHyperCube.qDataPages[0].qMatrix, index + 1, "mea")
      });
    }
    return meaArr;
  };
});
