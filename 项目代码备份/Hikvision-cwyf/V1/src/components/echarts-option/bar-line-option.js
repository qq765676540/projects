let option = {
    'income-bp': (data) => {
        return {
            color: ['#e3e3e3', '#1495EB', '#FF6D00', '#fff'],
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
                ${'达成率: ' + (v[1].value / v[0].value * 100).toFixed(0) + '%'}<br>
                ${v[2].seriesName + ': ' + v[2].value + '%'}`;
                },
                extraCssText: 'text-align:left;'
            },
            legend: {
                data: ['实际值', '预算值', '增长率'],
                left: 'right',
                itemWidth: 16,
                itemHeight: 6
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
                    data: data.xAxisData,
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
    }
};

let barLineGetOption = (name,data) => {
    return option[name](data);
}


export default barLineGetOption;