define([
  "./config",
  "./options/title",
  "./options/tooltip",
  "./options/legend",
  "./options/xAxis",
  "./options/yAxis",
  "./options/series"
], function(
  config,
  titleFun,
  tooltipFun,
  legendFun,
  xAxisFun,
  yAxisFun,
  seriesFun
) {
  return function(layout) {
    return {
      color: config.eChartsDefs.ColorDef,
      title: titleFun(layout),
      tooltip: tooltipFun(layout),
      legend: legendFun(layout),
      xAxis:
        eval("layout." + config.refDefs.generalJs[1].ref) === "v"
          ? xAxisFun(layout)
          : yAxisFun(layout),
      yAxis:
        eval("layout." + config.refDefs.generalJs[1].ref) === "v"
          ? yAxisFun(layout)
          : xAxisFun(layout),
      series: seriesFun(layout)
    };
  };
});
