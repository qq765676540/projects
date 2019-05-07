let lineColor = ["#0f8ee9", "#FF6D00"];
let colorStops = [{
    icon: 'image://' + require('@/assets/image/rect-blue.png'),
    color:
        [
            {
                offset: 0,
                color: "#ACD5FF" // 0% 处的颜色
            },{
                offset: 1,
                color: "#D1E8FF" // 100% 处的颜色
            }
        ],
}, {
    icon: 'image://' + require('@/assets/image/rect-red.png'),
    color:
        [
            {
                offset: 0,
                color: "#EC4B8F" // 0% 处的颜色
            },
            {
                offset: 1,
                color: "#fbd2e3" // 100% 处的颜色
            }
        ]
}
];

let baseSerie = {
    data: [],
    type: 'line',
    smooth: false,
    symbol: 'circle',
    showSymbol: .1,
    // showSymbol: false,
    markPoint: {
        label: {
            fontSize: 8,
            color: 'white'
        },
        symbolSize: 30,
        symbol: 'pin',
        data: [{
            type: 'min'
        }, {
            type: 'max'
        }],
        itemStyle: {
            color: lineColor[0]
            // color: {
            //     type: 'linear',
            //     x: 0,
            //     y: 0,
            //     x2: 0,
            //     y2: 1,
            //     colorStops: colorStops[0].color,
            //     global: false // 缺省为 false
            // }
        }
    },
    lineStyle: {
        color: lineColor[0],
        // color: {
        //     type: 'linear',
        //     x: 0,
        //     y: 0,
        //     x2: 0,
        //     y2: 1,
        //     colorStops: colorStops[0].color,
        //     global: false // 缺省为 false
        // },
        opacity: .7
    },
    areaStyle: {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: colorStops[0].color,
            global: false // 缺省为 false
        },
        opacity: .2
    },
    itemStyle: {
        show: false,
        opacity: 0
    },
    label: {
        // show:true,
        color: 'blue',
        opacity: 1
    },
    animationDuration: 1000,
};

let lineOption = {
    legend: {
        data: [],
        show: false,
        left: 'center',
        // icon:'rect',
        itemHeight: 2,
        // itemWidth: 22,
        top: 0
    },
    grid: {
        left: 20,
        top: 30,
        bottom: 40,
        right: -10
    },
    xAxis: {
        // offset:-20,
        type: 'category',
        data: [],
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        }
    },
    tooltip: {
        show: true,
        formatter: "{c}%"
    },
    yAxis: {
        axisLabel: {
            showMaxLabel: true
        },
        offset: -20,
        type: 'value',
        splitNumber: 3,
        axisLabel: {
            formatter: '{value}'
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            lineStyle: {
                opacity: 0.3,
                type: 'dashed'
            }
        }
    },
    series: []
};



export { lineOption, baseSerie, colorStops, lineColor };