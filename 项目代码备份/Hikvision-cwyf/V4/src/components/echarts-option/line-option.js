let option = {
    'income-trend': (data) => {
        return {
            color: ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
            title: {
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
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
                    let str = v[0].name+'<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName+': '+v[i].value+'<br>'                        
                    }
                    return str;
                },
                extraCssText: 'text-align:left;'
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
            legend: {
                data: data.legend,
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                axisLabel: {
                    rotate: 45,
                    formatter: v => {
                        if(v.length>6) {
                            return v.substr(0,6)+'...';
                        }
                        return v;
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                }
            },
            series: data.series
        }
    },
    'gross-deduction': (data) => {
        return {
            color: ['#9fd3f7', '#1495EB', '#d391b8', '#ad4584'],
            title: {
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    let str = v[0].name+'<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName+': '+v[i].value+'%<br>'                        
                    }
                    return str;
                },
                extraCssText: 'text-align:left;'
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
            legend: {
                data: [
                    '上年毛利率',
                    '本年毛利率',
                    {
                        name: '上年扣费毛利率',
                        icon: "image://" + require("@/assets/images/main/dasheds2.png"),
                        itemHeight: 6
                    },
                    {
                        name: '本年扣费毛利率',
                        icon: "image://" + require("@/assets/images/main/dasheds3.png"),
                        itemHeight: 6
                    }
                ],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                axisLabel: {
                    rotate: 45,
                    formatter: v => {
                        if(v.length>6) {
                            return v.substr(0,6)+'...';
                        }
                        return v;
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                }
            },
            series: data.series
        }
    },
    'cost-trend': (data) => {
        return {
            color: ['#1495EB', '#751de2', '#ff6666'],
            title: {
                show: true,
                text: '',
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    let str = v[0].name+'<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName+': '+v[i].value+'<br>'                        
                    }
                    return str;
                },
                extraCssText: 'text-align:left;'
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 50,
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
            legend: {
                data: ['人均人力成本', '人均非人力成本', '人均成本'],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                axisLabel: {
                    rotate: 45,
                    formatter: v => {
                        if(v.length>6) {
                            return v.substr(0,6)+'...';
                        }
                        return v;
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#888888'
                    }
                }
            },
            series: data.series
        }
    },
}
let lineGetOption = (name, data) => {
    return option[name](data);
}
export default lineGetOption;