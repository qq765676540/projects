let option = {
    'overall-ranking': (data) => {
        return {
            color: ['#c4f0ff', '#1495EB', 'orange', '#ff6666'],
            title: {
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            grid: {
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'none'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}<br>
                ${v[3].seriesName + ': ' + v[3].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: [
                    '总收入',
                    '预算值',
                    '完成率',
                    {
                        name: '平均完成率',
                        icon: "image://" + require("@/assets/images/main/dashed.png"),
                        itemHeight: 6
                    }
                ],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6,
                selectedMode: false
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 0,
                    end: 70
                },
                {
                    type: 'slider',
                    xAxisIndex: [0],
                    zoomLock: true,
                    showDetail: false,
                    dataBackground: {
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            opacity: 0
                        }
                    },
                    height: 5,
                    bottom: 55,
                    handleStyle: {
                        color: "",
                        opacity: 0
                    },
                    borderColor: "rgba(0,0,0,0)"
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    triggerEvent: true,
                    data: data.y,
                    axisLabel: {
                        rotate: 45,
                        formatter: v => {
                            if (v.length > 5) {
                                return v.substr(0, 5) + '...';
                            }
                            return v;
                        },
                        color: '#333333',
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                }
            ],
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                // min: Math.min.apply(null, data.seriesData3),
                // max: Math.max.apply(null, data.seriesData3),
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            }],
            series: [{
                name: '预算值',
                data: data.x2,
                type: 'bar'
            }, {
                name: '总收入',
                data: data.x1,
                barGap: '-100%',
                type: 'bar'
            }, {
                name: '完成率',
                data: data.x3,
                type: 'line',
                yAxisIndex: 1
            }, {
                name: "平均完成率",
                type: "line",
                showSymbol: true,
                symbol: 'circle',
                symbolSize: 1,
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        barBorderColor: "rgba(0,0,0,0)",
                        color: "#ff6666"
                    },
                    emphasis: {
                        barBorderColor: "rgba(0,0,0,0)",
                        color: "rgba(0,0,0,0)"
                    }
                },
                lineStyle: {
                    width: 1,
                    type: 'dashed'
                },
                data: data.x4
            }
            ]
        }
    },
}
let barLineGetOption = (name, data) => {
    return option[name](data);
}



export default barLineGetOption;