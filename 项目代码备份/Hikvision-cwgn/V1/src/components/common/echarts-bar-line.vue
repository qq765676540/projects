<template>
<div>
    <div :id="id" class="barLineStyle"></div>
</div>
</template>

<script>
import echarts from "echarts";
import barLineGetOption from "../eOption/bar-line-option.js";

import Tools from "../../tools/tools";
var toolsBean = new Tools();

export default {
    name: "echarts-pie",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        name: '',
        data: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {
            option: toolsBean.deepClone(barLineGetOption(this.name,this.data))
        };
    },
    beforeCreate() {},
    mounted() {
        var _self = this;
        this.$nextTick(() => {
            this.echartsIns = echarts.init(document.getElementById(this.id));
            this.setOption(this.option);
        });
        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    this.option=toolsBean.deepClone(barLineGetOption(this.name,nVal));
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
            this.echartsIns.setOption(_option);
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
.barLineStyle {
    width: 98%;
    min-height: 320px;
}
</style>
