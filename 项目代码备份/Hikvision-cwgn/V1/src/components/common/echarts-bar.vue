<template>
<div :id="id+'-box'" class="flex easy-line flex-1 relative">
    <div :id="id" class="flex-1"></div>
</div>
</template>

<script>
import echarts from "echarts";
import basicOption from '../eOption/bar-option'
import toolsBean from "../../tools/tools";

export default {
    name: "bar",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        data: {
            type: Object,
            default () {
                return new Object();
            }
        },
        sign: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            option: toolsBean.deepClone(basicOption)
        };
    },
    beforeCreate() {},
    mounted() {
        this.echartsIns = echarts.init(document.getElementById(this.id));
        this.setOption();
        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    this.data = nVal;
                    this.echartsIns.dispose();
                    this.echartsIns = echarts.init(document.getElementById(this.id));
                    this.setOption();
                }
            },
            deep: true
        }
    },
    methods: {
        setOption() {
            if (this.data) {
                this.option.xAxis[0].data = this.data.xData;
                this.option.series[0].data = this.data.yData;
                this.option.dataZoom[0].show = this.data.dataZoom.show;
                this.option.dataZoom[0].end = this.data.dataZoom.end;
                this.echartsIns.setOption(this.option);
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
