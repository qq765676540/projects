define(["./../config"], function(config) {
    return function(layout) {

      return {
        trigger: 'axis',
        axisPointer: {
            type: eval("layout."+config.refDefs.generalJs[14].ref)
        }
      };
  
    };
    
  });
  