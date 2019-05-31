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
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                }
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
                    rotate: 45

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
            color: ['#1495EB', '#1495EB', '#ff6666', '#ff6666'],
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
                }
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
                    {
                        name: '上年毛利率',
                        icon: "image://" + require("@/assets/images/main/dasheds1.jpg"),
                        itemHeight: 6
                    },
                    '本年毛利率',
                    {
                        name: '上年扣费毛利率',
                        icon: "image://" + require("@/assets/images/main/dashed.png"),
                        itemHeight: 6
                    },
                    '本年扣费毛利率'
                ],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                axisLabel: {
                    rotate: 45
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
    }
}
let lineGetOption = (name, data) => {
    return option[name](data);
}
export default lineGetOption;