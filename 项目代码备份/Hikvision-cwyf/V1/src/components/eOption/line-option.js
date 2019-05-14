let colorStops = [{
    icon: 'image://' + require('@/assets/image/rect-blue.png'),
    color:
        [
            {
                offset: 0,
                color: "#675FEA" // 0% 处的颜色
            }, {
                offset: 0.25,
                color: "#5A88F6" // 0% 处的颜色
            }, {
                offset: 0.75,
                color: "#44AAE9" // 0% 处的颜色
            }, {
                offset: 1,
                color: "#49C3E0" // 100% 处的颜色
            }
        ],
}, {
    icon: 'image://' + require('@/assets/image/rect-red.png'),
    color:
        [
            {
                offset: 0,
                color: "#EC4B8F" // 0% 处的颜色
            }, {
                offset: 0.25,
                color: "rgba(199, 65, 168, 0.4)" // 0% 处的颜色
            }, {
                offset: 0.75,
                color: "#A13FBB" // 0% 处的颜色
            }, {
                offset: 1,
                color: "rgba(132, 51, 213, 0.4)" // 100% 处的颜色
            }
        ]
}
];

let baseSerie = {
    data: [],
    type: 'line',
    smooth: true,
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
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: colorStops[0].color,
                global: false // 缺省为 false
            }
        }
    },
    lineStyle: {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: colorStops[0].color,
            global: false // 缺省为 false
        },
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



export { lineOption, baseSerie, colorStops };