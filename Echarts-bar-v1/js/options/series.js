define(["./../config","./../tools/data"], function(config) {
    return function(layout){

        var meaArr=[];
        
        for (var index = 0; index < layout.qHyperCube.qMeasureInfo.length; index++) {
            meaArr.push({
                name: layout.qHyperCube.qMeasureInfo[index].qFallbackTitle,
                type: "bar",
                barGap: eval("layout."+config.refDefs.generalJs[7].ref),
                data: getData(layout.qHyperCube.qDataPages[0].qMatrix, index+1, "mea")
            });
                          
        }
        return meaArr;
    };   
});