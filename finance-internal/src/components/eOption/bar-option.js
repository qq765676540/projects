export default {
    // backgroundColor:'#111c4e',
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                opacity: 0
            }
        }
    },
    grid: {
        left: '4%',
        right: '4%',
        bottom: '5%',
        top: '7%',
        height: '85%',
        containLabel: true,
        z: 22
    },
    dataZoom: [{
        show: true,
        height: 4,
        xAxisIndex: [
            0
        ],
        bottom: '4%',
        start: 0,
        end: 15,
        zoomLock: true,
        handleSize: '12',
        handleStyle: {
            color: '#1E90FF',
        },
        textStyle: {
            color: '#fff'
        },
        borderColor: 'rgb(232,232,232)'
    },{
        type: 'inside',
        zoomLock: true
    }],
    xAxis: [{
        type: 'category',
        gridIndex: 0,
        data: [],
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisLabel: {
            color: 'rgb(170,170,170)',
            interval: 0
        },
        interval: 1
    }],
    yAxis: [{
        type: 'value',
        gridIndex: 0,
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            color: 'rgb(170,170,170)',
            formatter: '{value}'
        }
    },
    {
        type: 'value',
        gridIndex: 0,
        splitNumber: 12,
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
        }
    }
    ],
    series: [{
        // name: '合格率',
        type: 'bar',
        barWidth: 15,
        xAxisIndex: 0,
        yAxisIndex: 0,
        label: {
            normal: {
                show: true,
                position: 'top',
                textStyle: {
                    color: 'black',
                    fontSize: 12
                }
            }
        },
        itemStyle: {
            normal: {
                barBorderRadius: 0,
                color: '#1495EB'
            }
        },
        data: [],
        zlevel: 11

    }

    ]
};

