define(["./../data"], function() {
    return function(layout){

        var meaArr=[];
        
        for (var index = 0; index < layout.qHyperCube.qMeasureInfo.length; index++) {
            meaArr.push({
                name: layout.qHyperCube.qMeasureInfo[index].qFallbackTitle,
                type: "bar",
                barGap: "0.3",
                data: getData(layout.qHyperCube.qDataPages[0].qMatrix, index+1, "mea")
            });
                          
        }
        return meaArr;
    };   
});