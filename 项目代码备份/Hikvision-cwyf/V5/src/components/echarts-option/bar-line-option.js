let option = {
    'income-bp': (data) => {
        let zoomNum = parseInt(6/data.xAxisData.length*100);
        return {
            color: ['#e3e3e3', '#1495EB', '#ff6666'],
            grid: {
                containLabel: false,
                left: '12%'
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
                ${'达成率: ' + (v[0].value==0?0:(v[1].value / v[0].value * 100).toFixed(0)) + '%'}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: ['实际值', '预算值', '增长率'],
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
                    end: zoomNum
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
                    bottom: '18%',
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        formatter: v => {
                            if(v.length>5) {
                                return `{name|${v.substr(0,5)+'...'}}`;
                            }
                            return `{name|${v}}`;
                        },
                        color: '#333333',
                        rich: {
                            name: {
                                textBorderColor: '#7cc4f3'
                            }
                        },
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                        rotate: 45,
                        formatter: v => {
                            if(v.length > 4) {
                                return (v/10000).toFixed(1) + '亿';
                            }
                            return v;
                        }
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
                }
            ],
            series: [
                {
                    name: '预算值',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '实际值',
                    type: 'bar',
                    barGap: '-100%',
                    data: data.seriesData2
                },
                {
                    name: '增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                }
            ]
        }
    },
    'income-bp-drill': (data) => {
        let zoomNum = parseInt(6/data.xAxisData.length*100);
        return {
            color: ['#e3e3e3', '#1495EB', '#ff6666'],
            grid: {
                left: '13%'
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${'达成率: ' + (v[0].value==0?0:(v[1].value / v[0].value * 100).toFixed(0)) + '%'}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: ['实际值', '预算值', '增长率'],
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
                    end: zoomNum
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
                    bottom: '18%',
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                        rotate: 45,
                        formatter: v => {
                            if(v.length > 4) {
                                return (v/10000).toFixed(1) + '亿';
                            }
                            return v;
                        }
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
                }
            ],
            series: [
                {
                    name: '预算值',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '实际值',
                    type: 'bar',
                    barGap: '-100%',
                    data: data.seriesData2
                },
                {
                    name: '增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                }
            ]
        }
    },
    'income-branch': (data) => {
        return {
            color: ['#addaf8', '#1495EB', '#ff6666'],
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: ['上年业绩', '本年业绩', '增长率'],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6,
                selectedMode: false
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: data.dataZoom,
                    end: 100
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                }
            ],
            series: [
                {
                    name: '上年业绩',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '本年业绩',
                    type: 'bar',
                    barGap: '0%',
                    data: data.seriesData2
                },
                {
                    name: '增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                }
            ]
        }
    },
    'gross-bp': (data) => {
        return {
            color: ['#e3e3e3', '#1495EB', '#ff6666'],
            grid: {
                left: '13%'
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${'达成率: ' + (v[1].value / v[0].value * 100).toFixed(0) + '%'}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: ['实际值', '预算值', '增长率'],
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
                    end: 100
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                }
            ],
            series: [
                {
                    name: '预算值',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '实际值',
                    type: 'bar',
                    barGap: '-100%',
                    data: data.seriesData2
                },
                {
                    name: '增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                }
            ]
        }
    },
    'cost-rate': (data) => {
        return {
            color: ['#addaf8', '#1495EB', 'orange', '#ff6666'],
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}<br>
                ${v[3].seriesName + ': ' + v[3].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: [
                    '上年费用', 
                    '本年费用', 
                    '同比增长率', 
                    {
                        name: '平均增长率',
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
                    end: 100
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                }
            ],
            series: [
                {
                    name: '上年费用',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '本年费用',
                    type: 'bar',
                    barGap: '0%',
                    data: data.seriesData2
                },
                {
                    name: '同比增长率',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                },
                {
                    name: "平均增长率",
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
                    data: data.seriesData4
                }
            ]
        }
    },
    'order-base': (data) => {
        return {
            color: ['#59D4FF', '#448DFF', '#751DE2', '#D391B8'],
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[0].seriesName + ': ' + v[0].value}<br>
                ${v[1].seriesName + ': ' + v[1].value}<br>
                ${v[2].seriesName + ': ' + v[2].value}<br>
                ${v[3].seriesName + ': ' + v[3].value}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: [
                    '订单金额', 
                    '出货金额', 
                    '订单数量', 
                    '出货数量'
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
                    end: 100
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                        formatter: '{value}'
                    }
                }
            ],
            series: [
                {
                    name: '订单金额',
                    type: 'bar',
                    data: data.seriesData1
                },
                {
                    name: '出货金额',
                    type: 'bar',
                    barGap: '0%',
                    data: data.seriesData2
                },
                {
                    name: '订单数量',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData3
                },
                {
                    name: '出货数量',
                    type: 'line',
                    yAxisIndex: 1,
                    data: data.seriesData4
                }
            ]
        }
    },
    'order-branch': (data) => {
        return {
            color: ['#1495EB'],
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    return `${v[0].name} <br>
                ${v[0].seriesName + ': ' + v[0].value}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: [
                    '未清金额'
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
                    start: data.dataZoom,
                    end: 100
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
                    data: data.xAxisData,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        formatter: v => {
                            if(v.length>5) {
                                return v.substr(0,5)+'...';
                            }
                            return v;
                        }
                    }
                }
            ],
            yAxis: [
                {
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
                }
            ],
            series: [
                {
                    name: '未清金额',
                    type: 'bar',
                    data: data.seriesData1
                }
            ]
        }
    }
};

let barLineGetOption = (name,data) => {
    return option[name](data);
}


export default barLineGetOption;