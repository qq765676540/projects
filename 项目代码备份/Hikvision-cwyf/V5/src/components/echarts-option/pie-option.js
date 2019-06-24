let option = {
    'income-structure': (data) => {
        return {
            title: {
                show: true,
                text: 'TOP6占比',
                textStyle: {
                    color: '#777777',
                    fontSize: 12
                }
            },
            grid: {
                containLabel: true
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'click',
                formatter: v => {
                    return `${v.name}: ${v.value} (${v.percent.toFixed(0)}%)`;
                }
            },
            series: [
                {
                    name: '总体占比',
                    type: 'pie',
                    radius: ['25%', '50%'],
                    avoidLabelOverlap: true,
                    color: ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
                    label: {
                        formatter: (params) => {
                            return (
                                "{value|" + params.value + "} ({percent|" +
                                params.percent.toFixed(0) +
                                "%)}\n{hr|}\n{name|" +
                                params.name +
                                "}"
                            );
                        },
                        rich: {
                            name: {
                                color: "#666666",
                                fontSize: 12,
                                padding: [2, 2],
                                align: "center"
                            },
                            percent: {
                                align: "center",
                                fontSize: 12,
                                padding: [1, 1]
                            },
                            value: {
                                color: "#666666",
                                fontSize: 12,
                                padding: [1, 1],
                                align: "center"
                            },
                            hr: {
                                borderColor: "#666666",
                                width: "100%",
                                borderWidth: 1,
                                height: 0
                            }
                        }

                    },
                    labelLine: {
                        normal: {
                            length: 5,
                            length2: 10,
                            lineStyle: {
                                color: "#666666"
                            }
                        }
                    },
                    data: data
                }
            ]
        }
    },
    'order-structure': (data) => {
        return {
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
                trigger: 'item',
                triggerOn: 'click',
                formatter: v => {
                    // console.log('YCQ日志记录:标识->',v);
                    return `${v.name}<br>未清金额: ${v.value}<br>未清数量: ${v.data.qty}台<br>金额占比: ${v.percent.toFixed(0)}%`;
                },
                extraCssText: 'text-align:left;'
                // "{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '总体占比',
                    type: 'pie',
                    radius: ['25%', '50%'],
                    avoidLabelOverlap: true,
                    color: ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
                    label: {
                        formatter: (params) => {
                            return (
                                "{value|" + params.value + "} ({percent|" +
                                params.percent.toFixed(0) +
                                "%)}\n{hr|}\n{name|" +
                                params.name +
                                "}"
                            );
                        },
                        rich: {
                            name: {
                                color: "#666666",
                                fontSize: 12,
                                padding: [2, 2],
                                align: "center"
                            },
                            percent: {
                                align: "center",
                                fontSize: 12,
                                padding: [1, 1]
                            },
                            value: {
                                color: "#666666",
                                fontSize: 12,
                                padding: [1, 1],
                                align: "center"
                            },
                            hr: {
                                borderColor: "#666666",
                                width: "100%",
                                borderWidth: 1,
                                height: 0
                            }
                        }

                    },
                    labelLine: {
                        normal: {
                            length: 5,
                            length2: 10,
                            lineStyle: {
                                color: "#666666"
                            }
                        }
                    },
                    data: data.pie
                }
            ]
        }
    }
}
let pieGetOption = (name, data) => {
    return option[name](data);
}
export default pieGetOption;