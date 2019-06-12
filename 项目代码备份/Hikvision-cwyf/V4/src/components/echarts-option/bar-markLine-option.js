let option = {
    'income-structure': (data) => {
        return {
            color: ['#1495EB'],
            title:{
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            legend: {
                data: [
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
                    start: 30,
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
                    data: data.xAxis,
                    axisLabel: {
                        rotate: 45,
                        formatter: v => {
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
                },
                {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: {
                type: 'value',
                offset: -2,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [{
                name: '同比增长率',
                data: data.series,
                label: {
                    show: true,
                    position: 'top',
                    color: '#666666',
                    formatter: '{c}%'
                },
                type: 'bar'
            },
            {
                name: "平均增长率",
                type: "line",
                showSymbol: true,
                symbol: 'circle',
                symbolSize: 1,
                xAxisIndex: 1,
                label: {
                    show: true,
                    color: "red",
                    fontSize: 12,
                    offset: [15, 10],
                    formatter: param => {
                        if (param.dataIndex === (data.avg.length-1)) {
                            return param.value + '%';
                        } else {
                            return "";
                        }
                    }
                },
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
                data: data.avg
            }
            ]
        }
    },
    'income-structure-drill': (data) => {
        return {
            color: ['#1495EB'],
            title:{
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            legend: {
                data: [
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
                    start: 30,
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
                    data: data.xAxis,
                    axisLabel: {
                        rotate: 45,
                        color: '#333333',
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                },
                {
                    type: 'category',
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: {
                type: 'value',
                offset: -2,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                },
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [{
                name: '同比增长率',
                data: data.series,
                label: {
                    show: true,
                    position: 'top',
                    color: '#666666',
                    formatter: '{c}%'
                },
                type: 'bar'
            },
            {
                name: "平均增长率",
                type: "line",
                showSymbol: true,
                symbol: 'circle',
                symbolSize: 1,
                xAxisIndex: 1,
                label: {
                    show: true,
                    color: "red",
                    fontSize: 12,
                    offset: [15, 10],
                    formatter: param => {
                        if (param.dataIndex === (data.avg.length-1)) {
                            return param.value + '%';
                        } else {
                            return "";
                        }
                    }
                },
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
                data: data.avg
            }
            ]
        }
    }
}
let barMarkLineGetOption = (name,data) => {
    return option[name](data);
}



export default barMarkLineGetOption;