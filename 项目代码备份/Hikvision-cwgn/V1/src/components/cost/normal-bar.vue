<template>
<div :id="id" class="normalBarCon"></div>
</template>

<script>
import echarts from "echarts";

export default {
    name: "normal-bar",
    components: {},
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
                return [{
                        value: 4154,
                        name: "汽车费用"
                    },
                    {
                        value: 3854,
                        name: "房租物业"
                    },
                    {
                        value: 3515,
                        name: "工程装修"
                    },
                    {
                        value: 3515,
                        name: "资产折旧"
                    },
                    {
                        value: 3054,
                        name: "室内交通"
                    },
                    {
                        value: 2515,
                        name: "办公费用"
                    },
                    {
                        value: 1515,
                        name: "其他费用"
                    }
                ];
            }
        }
    },
    beforeCreate() {},
    mounted() {
        this.echartsIns = echarts.init(document.getElementById(this.id));
        this.setOption();
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
                datas.forEach(element => {
                    names.push(element.name);
                    value.push(element.value);
                });
                var option = {
                    grid: {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "line",
                            lineStyle: {
                                opacity: 0
                            }
                        },
                    },
                    yAxis: {
                        type: "category",
                        data: names,
                        inverse: true
                    },
                    xAxis: {
                        type: "value",
                        show: false
                    },
                    series: [{
                        data: value,
                        type: "bar",
                        color: "rgba(20,149,235,1)",
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
.normalBarCon {
    min-width: 95%;
    min-height: 160px;
}
</style>
