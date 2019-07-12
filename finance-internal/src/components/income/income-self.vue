<template>
<div :id="id+'-box'" class="normalBar">
    <div :id="id" class="normalBarCon"></div>
    <div class="flex flex-column desc">
        <div class="flex flex-row flex-1 title">{{this.selectedMsg.city}}详情</div>
        <!-- <div class="flex flex-row flex-1 content">
            <div class="flex flex-1">城市</div>
            <div class="flex flex-3">{{this.selectedMsg.city}}</div>
        </div> -->
        <div class="flex flex-row flex-1 content">
            <div class="flex flex-1">收入</div>
            <div class="flex flex-3">{{this.selectedMsg.grossMargin}}</div>
        </div>
        <div class="flex flex-row flex-1 content">
            <div class="flex flex-1">完成率</div>
            <div class="flex flex-3">{{this.selectedMsg.rate == 'NaN'?'-':(this.selectedMsg.rate+'%')}}</div>
        </div>
        <div class="flex flex-row flex-1 content">
            <div class="flex flex-1">同比</div>
            <div class="flex flex-3">{{this.selectedMsg.growth == 'NaN'?'-':(this.selectedMsg.growth+'%')}}</div>
        </div>
    </div>
</div>
</template>

<script>
import echarts from "echarts";
import { log } from 'util';

export default {
    name: "income-self",
    components: {},
    data() {
        return {
            selectedMsg: {
                city: "杭州",
                grossMargin: 1200,
                growth: 80,
                nameTrue: "杭州",
                rate: 0,
                level: "A"
            }
        };
    },
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        update: {
            type: Number,
            default: 0
        },
        data: {
            type: Array,
            default () {
                return [];
            }
        }
    },
    beforeCreate() {},
    mounted() {
        this.echartsIns = echarts.init(document.getElementById(this.id));
        this.setOption();
        this.selectedMsg.city = this.data[0] ? this.data[0].name : "";
        this.selectedMsg.grossMargin = this.data[0] ? this.data[0].value : "";
        this.selectedMsg.growth = this.data[0] ? this.data[0].growth : "";
        this.selectedMsg.rate = this.data[0] ? this.data[0].rate : "";
        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data() {
            this.setOption();
        },
        update() {
            this.resizeEcharts();
        }
    },
    methods: {
        setOption() {
            if (this.data) {
                var datas = this.data;
                var names = [];
                var value = [];
                var growth = [];
                var nameTrue = [];
                var rate = [];
                var level = [];
                datas.forEach(element => {
                    names.push(element.name);
                    value.push(element.value);
                    growth.push(element.growth);
                    nameTrue.push(element.nameTrue);
                    rate.push(element.rate);
                    level.push(element.level);
                });
                //选中状态改变颜色，加阴影
                var itemStyle = {
                    normal: {},
                    emphasis: {
                        color: "rgba(20,149,235,1)",
                        barBorderWidth: 1,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: "rgba(0,0,0,0.5)"
                    }
                };
                let zoomNum = parseInt(8/names.length*100);
                var option = {
                    grid: {
                        left: 0,
                        top: "20%",
                        right: 0,
                        bottom: 0,
                        containLabel: true
                    },
                    // tooltip: {
                    //     trigger: 'axis',
                    //     triggerOn: 'click',
                    //     axisPointer: {
                    //         type: 'none'
                    //     },
                    //     formatter: v => {
                    //         return ``;
                    //     },
                    //     extraCssText: 'background: rgba(1,1,1,0)'
                    // },
                    legend: {
                        data: ["金额", "同比"],
                        right: 5,
                        itemWidth: 16,
                        itemHeight: 6,
                        selectedMode: false
                    },
                    dataZoom: [{
                            type: "inside",
                            xAxisIndex: [0],
                            start: 0,
                            end: zoomNum
                        },
                        {
                            type: "slider",
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
                            bottom: 30,
                            handleStyle: {
                                color: "",
                                opacity: 0
                            },
                            borderColor: "rgba(0,0,0,0)"
                        }
                    ],
                    xAxis: {
                        type: "category",
                        boundaryGap: true,
                        data: names,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            rotate: 45,
                            formatter: v => {
                                if (v.length > 5) {
                                    return v.substr(0, 5) + '...';
                                }
                                return v;
                            }
                        }
                    },
                    yAxis: [{
                            type: "value",
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                rotate: 45,
                                color: '#888888',
                                fontSize: 10
                            }
                        },
                        {
                            type: "value",
                            axisLabel: {
                                formatter: '{value}%'
                            },
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            axisLabel: {
                                rotate: 45,
                                color: '#888888',
                                fontSize: 10
                            }
                        }
                    ],
                    series: [{
                            name: "金额",
                            type: "bar",
                            data: value,
                            color: "rgba(20,149,235,0.6)",
                            itemStyle: itemStyle,
                            barWidth: '25px'
                        },
                        {
                            name: "同比",
                            type: "line",
                            yAxisIndex: 1,
                            color: "orange",
                            data: growth
                        }
                    ]
                };
                this.echartsIns.setOption(option, true);
                var _this = this;
                this.echartsIns.on("click", function (params) {
                    _this.selectedMsg.city = names[params.dataIndex];
                    _this.selectedMsg.grossMargin = value[params.dataIndex];
                    _this.selectedMsg.growth = growth[params.dataIndex];
                    _this.selectedMsg.rate = rate[params.dataIndex];
                });

                this.selectedMsg.city = this.data[0] ? this.data[0].name : "";
                this.selectedMsg.grossMargin = this.data[0] ? this.data[0].value : "";
                this.selectedMsg.growth = this.data[0] ? this.data[0].growth : "";
                this.selectedMsg.rate = this.data[0] ? this.data[0].rate : "";
            }
        },
        resizeEcharts() {
            setTimeout(() => {
                if (this.echartsIns) {
                    this.echartsIns.resize();
                }
            }, 300);
        }
    },
    destroyed() {
        this.echartsIns.clear();
        this.echartsIns.dispose();
        this.option = null;
        this.echartsIns = null;
        window.removeEventListener("resize", this.resizeEcharts, false);
    }
};
</script>

<style scoped>
.normalBar {
    margin: 10px;
}

.normalBarCon {
    min-height: 240px;
    min-width: calc(100% - 20px);
    padding: 4px;
    box-shadow: 3px 3px 8px #888888;
}

.desc {
    border: 1px solid #dddddd;
    background-color: #dddddd;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 4px;
    padding: 10px;
    box-shadow: 3px 3px 8px #888888;
}

.title {
    font-size: 14px;
    margin: 4px 0;
    color: #333333;
}

.content {
    font-size: 12px;
    color: #555555;
}
</style>
