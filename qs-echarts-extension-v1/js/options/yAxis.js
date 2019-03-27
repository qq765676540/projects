define(["./../config"], function(config) {
  return function(layout) {
    return {
      type: "value",
      axisLabel: {
        show: eval("layout."+config.refDefs.generalJs[8].ref)
      },
      axisTick: {
        show: eval("layout."+config.refDefs.generalJs[9].ref)
      },
      axisLine: {
        show: eval("layout."+config.refDefs.generalJs[10].ref)
      },
      splitLine: {
        show: eval("layout."+config.refDefs.generalJs[2].ref)
      }
    };
  };
});
