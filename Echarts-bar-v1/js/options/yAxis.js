define(["./../config"], function(config) {
  return function(layout) {
    return {
      type: "value",
      axisLabel: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      splitLine: {
        show: eval("layout."+config.refDefs.generalJs[2].ref)
      }
    };
  };
});
