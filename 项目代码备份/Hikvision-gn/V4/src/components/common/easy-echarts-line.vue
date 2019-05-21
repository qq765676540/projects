<template>
<div :id="id+'-box'" class="flex easy-line flex-1 relative">
    <div :id="id" class="flex-1"></div>
</div>
</template>

<script>
import accounting from "accounting";
import echarts from "echarts";
import {
    lineOption,
    baseSerie,
    colorStops,
    lineColor
} from "../eOption/line-option.js";
import Tools from "../../tools/tools";
var toolsBean = new Tools();

export default {
    name: "easy-line",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        data: {
            type: Object,
            default () {
                return {};
            }
        },
        sign: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            option: toolsBean.deepClone(lineOption)
        };
    },
    beforeCreate() {},
    mounted() {
        this.echartsIns = echarts.init(document.getElementById(this.id));
        this.setOption(this.option);
        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    this.data = nVal;
                    this.echartsIns.dispose();
                    this.echartsIns = echarts.init(document.getElementById(this.id));
                    this.setOption(this.option);
                }
            },
            deep: true
        }
    },
    methods: {
        setOption(_option) {
            if (this.data) {
                let _data = Object.assign([], this.data);
                let legend = [];
                let series = [];
                let maxmin = [];
                let i = 0;
                _data.yData.forEach(item => {
                    legend.push({
                        name: item.name,
                        icon: colorStops[i].icon
                    });
                    maxmin = maxmin.concat(item.value);
                    // legend.push(item.name);
                    var _serie = toolsBean.deepClone(baseSerie);
                    _serie.name = item.name;
                    _serie.data = item.value;
                    _serie.silent = true;
                    _serie.markPoint.itemStyle.color = lineColor[i];
                    _serie.lineStyle.color = lineColor[i];
                    _serie.areaStyle.color.colorStops = colorStops[i].color;
                    i++;
                    i = i > 1 ? 0 : i;
                    if(this.sign) {
                        _serie.markPoint.label = {
                            fontSize: 8,
                            color: 'white',
                            formatter(data) {
                                return data.value + '%'
                            }
                        }
                    }
                    series.push(_serie);
                });
                if (_data.config.legend) {
                    _option.legend.show = true;
                }
                _option.legend.data = legend;
                _option.series = series;
                _option.xAxis.data = _data.xData;
                _option.yAxis.max = Math.max.apply(null,maxmin);
                _option.yAxis.min = Math.min.apply(null,maxmin);
                if(this.sign) {
                    _option.yAxis.axisLabel = {
                        formatter: '{value}%'
                    }
                }

                this.echartsIns.setOption(_option);
            }
        },
        isDiff(nData, oData) {
            return JSON.stringify(nData) != JSON.stringify(oData);
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
.easy-line {
    font-size: 16px;
    width: 100%;
    height: auto;
}
</style>
