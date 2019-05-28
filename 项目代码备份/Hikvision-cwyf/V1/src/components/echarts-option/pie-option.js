let option = {
    'income-structure': (data) => {
        return {
            title:{
                show: true,
                text: data.text,
                textStyle: {
                    color: '#777777',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'click',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name: '总体占比',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    avoidLabelOverlap: false,
                    color: ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
                    label: {
                        formatter: '{d}%\n{hr|}\n{padding|{b}}\n{c}',
                        rich: {
                            name: {
                                color: "#666666",
                                fontSize: 12,
                                padding: [5, 2],
                                align: "center"
                            },
                            padding: {
                                padding: [3, 2]
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
                            length: 15,
                            length2: 25,
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
let pieGetOption = (name,data) => {
    return option[name](data);
}
export default pieGetOption;