let colorStops = [
    [
        {
            offset: 0,
            color: "#675FEA" // 0% 处的颜色
        },
        {
            offset: 0.25,
            color: "#5A88F6" // 0% 处的颜色
        },
        {
            offset: 0.75,
            color: "#44AAE9" // 0% 处的颜色
        },
        {
            offset: 1,
            color: "#49C3E0" // 100% 处的颜色
        }
    ],
    [
        {
            offset: 0,
            color: "#EC4B8F" // 0% 处的颜色
        },
        {
            offset: 0.25,
            color: "#C741A8" // 0% 处的颜色
        },
        {
            offset: 0.75,
            color: "#A13FBB" // 0% 处的颜色
        },
        {
            offset: 1,
            color: "#8433D5" // 100% 处的颜色
        }
    ]
];

let baseSerie = {
    data: [],
    type: 'line',
    smooth: true,
    symbol: 'none',
    lineStyle: {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: colorStops[0],
            global: false // 缺省为 false
        }
    },
    animationDuration: 1500,
};

let lineOption = {
    legend: {
        data: [],
        show: false,
        left: 'right',
        icon : 'rect',
        itemHeight :2,
        top: 0
    },
    grid: {
        left: 50,
        top: 30,
        bottom: 50,
        right: 10
    },
    xAxis: {
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
        type: 'value',
        splitNumber: 3,
        axisLabel: {
            formatter: '{value}%'
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



export { lineOption, baseSerie,colorStops };