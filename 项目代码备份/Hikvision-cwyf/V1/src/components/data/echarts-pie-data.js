let eData1 ={
    xData:['客户名称1', '客户名称2', '客户名称3', '客户名称4', '客户名称5'],
    yData:[{
        name:'客户名称1',
        itemStyle:{
            color:"#448DFF"
        },
        value:10
    },{
        name:'客户名称2',
        itemStyle:{
            color:"#59D4FF"
        },
        value:40
    },{
        name:'客户名称3',
        itemStyle:{
            color:"#751DE2"
        },
        value:70
    },{
        name:'客户名称4',
        itemStyle:{
            color:"#BB2B79"
        },
        value:30
    },{
        name:'客户名称5',
        itemStyle:{
            color:"#DB479B"
        },
        value:50
    }].sort(function (a, b) { return a.value - b.value; }),
};
// ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"]
let eData2 ={
    config:{
        legend: false
    },
    xData:['客户名称1', '客户名称2', '客户名称3', '客户名称4', '客户名称5'],
    yData:[{
        name:'客户名称1',
        itemStyle:{
            color:"#448DFF"
        },
        value:20
    },{
        name:'客户名称2',
        itemStyle:{
            color:"#59D4FF"
        },
        value:90
    },{
        name:'客户名称3',
        itemStyle:{
            color:"#751DE2"
        },
        value:12
    },{
        name:'客户名称4',
        itemStyle:{
            color:"#BB2B79"
        },
        value:63
    },{
        name:'客户名称5',
        itemStyle:{
            color:"#DB479B"
        },
        value:30
    }].sort(function (a, b) { return a.value - b.value; }),
};

// "#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B"
let eData3 ={
    config:{
        legend: false
    },
    xData:['拜访', '内部事务', '外部活动', '外出', '电话'],
    yData:[{
        name:'外部活动',
        itemStyle:{
            color:"#448DFF"
        },
        value:44
    },{
        name:'拜访',
        itemStyle:{
            color:"#59D4FF",
        },
        value:20
    },{
        name:'内部事务',
        itemStyle:{
            color:"#751DE2",
        },
        value:20
    },{
        name:'外出',
        itemStyle:{
            color:"#BB2B79",
        },
        value:73
    },{
        name:'电话',
        itemStyle:{
            color:"#DB479B",
        },
        value:30
    }],
};

let eData4 ={
    config:{
        legend: false
    },
    xData:['客户名称1', '客户名称2', '客户名称3', '客户名称4', '客户名称5'],
    yData:[{
        name:'客户名称1',
        itemStyle:{
            color:"#448DFF"
        },
		customVal:40,
		visitVal:5
    },{
        name:'客户名称2',
        itemStyle:{
            color:"#59D4FF"
        },
		customVal:30,
		visitVal:25,
    },{
        name:'客户名称3',
        itemStyle:{
            color:"#751DE2"
        },
		customVal:20,
		visitVal:15,
    },{
        name:'客户名称4',
        itemStyle:{
            color:"#BB2B79"
        },
		customVal:10,
		visitVal:5,
    },{
        name:'客户名称5',
        itemStyle:{
            color:"#DB479B"
        },
		customVal:50,
		visitVal:5,
    }],
};

export {eData1, eData2, eData3, eData4};