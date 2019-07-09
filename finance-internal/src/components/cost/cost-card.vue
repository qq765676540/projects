<template>
<div :id="id+'-box'" class="costCard">
    <div :id="id" class="costCardCon"></div>
</div>
</template>

<script>
import echarts from "echarts";

export default {
    name: "cost-card",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
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
        this.$nextTick(() => {
            this.echartsIns = echarts.init(document.getElementById(this.id));
            this.setOption();
        });
        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data() {
            this.setOption();
        }
    },
    methods: {
        setOption() {
            if (this.data) {
                var datas = this.data;
                var rich = {
                    name: {
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
                        fontSize: 12,
                        align: "center",
                        padding: [1, 1]
                    },
                    hr: {
                        borderColor: "#666666",
                        width: "100%",
                        borderWidth: 1,
                        height: 0
                    }
                };
                var option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'click',
                        formatter: v => {
                            return `${v.name}<br>金额: ${v.value}<br>占比: ${v.percent.toFixed(1)}%`;
                        },
                        extraCssText: 'text-align:left;'
                    },
                    series: [{
                        name: "在线数量",
                        type: "pie",
                        radius: ["25%", "50%"],
                        startAngle: 135,
                        avoidLabelOverlap: true,
                        color: [
                            "#1495EB",
                            "#60CBC1",
                            "#F8DAB6",
                            "#F46950",
                            "#C28CC3",
                            "#AB5787",
                            "#2FC25B",
                            "#8543E0",
                            "#223273"
                        ],
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: function (params) {
                                    return (
                                        "{value|" + params.value + "} ({percent|" +
                                        params.percent.toFixed(1) +
                                        "%)}\n{hr|}\n{name|" +
                                        params.name +
                                        "}"
                                    );
                                },
                                rich: rich
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 7,
                                length2: 7,
                                lineStyle: {
                                    color: "#666666"
                                }
                            }
                        },
                        data: datas
                    }]
                };
                this.echartsIns.setOption(option);
            }
        },
        resizeEcharts() {
            setTimeout(() => {
                if (this.echartsIns) {
                    this.echartsIns.resize();
                }
            }, 100);
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
.costCard {
    margin-top: 10px;
}
.costCardCon {
    width: 95%;
    height: 260px;
}
</style>
