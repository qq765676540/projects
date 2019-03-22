define(["./../data"], function() {
    return function(layout) {

      return {
        data: getData(layout.qHyperCube.qDataPages[0].qMatrix, 0, "dim")
      };
  
    };
    
  });
  