define(["./../config","./../tools/data"], function(config) {
    return function(layout) {

      return {
        axisLabel: {
          show: eval("layout."+config.refDefs.generalJs[11].ref)
        },
        axisTick: {
          show: eval("layout."+config.refDefs.generalJs[12].ref)
        },
        axisLine: {
          show: eval("layout."+config.refDefs.generalJs[13].ref)
        },
        data: getData(layout.qHyperCube.qDataPages[0].qMatrix, 0, "dim")
      };
  
    };
    
  });
  