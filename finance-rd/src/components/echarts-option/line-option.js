import Tools from "../../tools/tools";
var toolsBean = new Tools();
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
                left: '1%',
                right: '5%',
                bottom: '1%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    let str = v[0].name + '<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName + ': ' + v[i].value + '<br>'
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
                data: data[0].legend,
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
            },
            xAxis: {
                type: 'category',
                data: data[0].xAxis,
                axisLabel: {
                    rotate: 45,
                    formatter: v => {
                        if (v.length > 6) {
                            return v.substr(0, 6) + '...';
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
                },
                axisLabel: {
                    rotate: 45,
                    formatter: v => {
                        if (data[1] == 'qty') {
                            if ((v + '').length > 4) {
                                return (v / 10000).toFixed(1) + '万台';
                            } else {
                                return v + '台';
                            }
                        }
                        return v;
                    }
                }
            },
            series: data[0].series
        }
    },
    'gross-deduction': (data) => {
        let arr = toolsBean.deepClone(data);
        $.each(arr.series, (i, v) => {
            $.each(v.data, (index, val) => {
                if (val == '--') {
                    arr.series[i].data.splice(index, 1, 50);
                }
            });
        });
        let temp = data.series.length > 2 ? (((arr.series[0].data).concat(arr.series[1].data)).concat(arr.series[2].data)).concat(arr.series[3].data) : (arr.series[0].data).concat(arr.series[1].data);
        let min = Math.min.apply(null, temp) - 10 < 0 ? 0 : Math.min.apply(null, temp) - 10;
        let max = Math.max.apply(null, temp) + 10;

        let myDate = new Date();
        myDate.setDate(myDate.getDate() - 1);
        let currMonth = myDate.getMonth() + 1;
        let zoomS = parseInt((currMonth - 6) / 12 * 100) < 0 ? 0 : parseInt((currMonth - 6) / 12 * 100);
        let zoomE = parseInt(currMonth / 12 * 100);

        let legend = data.series.length > 2 ? [
            '上年毛利率',
            '本年毛利率',
            {
                name: '上年扣费毛利率',
                icon: "image://" + require("@/assets/images/main/dasheds1.png"),
                itemHeight: 6
            },
            {
                name: '本年扣费毛利率',
                icon: "image://" + require("@/assets/images/main/dasheds3.png"),
                itemHeight: 6
            }
        ] : [
                '上年毛利率',
                '本年毛利率'
            ];
        return {
            color: ['#1495EB','#ad4584', '#9fd3f7', '#d391b8'],
            grid: {
                left: '9%',
                right: '5%'
                // containLabel: true
            },
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
                    let str = v[0].name + '<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName + ': ' + (v[i].value != '--' ? v[i].value.toFixed(1) : '--') + '%<br>'
                    }
                    return str;
                },
                extraCssText: 'text-align:left;'
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: zoomS,
                    end: zoomE
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
                data: legend,
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
                        if (v.length > 6) {
                            return v.substr(0, 6) + '...';
                        }
                        return v;
                    }
                }
            },
            yAxis: [{
                type: 'value',
                min: min,
                max: max,
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
                        return v.toFixed(0) + '%';
                    }
                }
            }],
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
            grid: {
                left: '1%',
                right: '5%',
                bottom: '1%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                triggerOn: 'click',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: v => {
                    let str = v[0].name + '<br>';
                    for (let i = 0; i < v.length; i++) {
                        str += v[i].seriesName + ': ' + v[i].value + '<br>'
                    }
                    return str;
                },
                extraCssText: 'text-align:left;'
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 75,
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
                        if (v.length > 6) {
                            return v.substr(0, 6) + '...';
                        }
                        return v;
                    }
                }
            },
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
                    rotate: 45,
                    formatter: v => {
                        return v;
                    }
                }
            }],
            series: data.series
        }
    },
}
let lineGetOption = (name, data) => {
    return option[name](data);
}
export default lineGetOption;