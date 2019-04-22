let eLineData1 ={
    config:{
        legend: false
    },
    xData:['1周', '2周', '3周', '4周', '5周'],
    yData:[{
        name:'客户数量',
        value:[10, 40, 70, 30, 50]
    }],
};

let eLineData2 ={
    config:{
        legend: true
    },
    xData:['1周', '2周', '3周', '4周', '5周'],
    yData:[{
        name:'客户数量',
        value:[10, 40, 70, 30, 50]
    },{
        name:'用户数量',
        value:[20, 70, 50, 30, 30]
    }],
};

export {eLineData1, eLineData2};