<template>
<div class="flex flex-1 relative" :class="id+'-box'">
    <div class="flex-1" :id="id"></div>
</div>
</template>

<script>
import echarts from 'echarts';
import {
    option,
    labelShow
} from '../eOption/pie-option.js'
import Tools from '../../tools/tools';
var toolsBean = new Tools();

export default {
    name: 'pie',
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        eData: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },
    data() {
        return {
            eBean: null,
            option: toolsBean.deepClone(option)
        }
    },
    mounted() {
        this.eBean = echarts.init(document.getElementById(this.id));
        this.setOption();
    },
    watch: {
        eData: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    this.eBean.dispose();
                    this.eBean = echarts.init(document.getElementById(this.id));
                    this.setOption();
                }
            },
            deep: true
        }
    },
    methods: {
        setOption() {
            var data = Object.assign([], this.eData);
            var legend = [];
            var xData = [];
            data.forEach(item => {
                item.label = labelShow;
                legend.push(item[0].qText);
                xData.push({
                    value: item[1].qNum,
                    name: item[0].qText
                });
            });

            this.option.legend.data = Object.assign([], legend);
            this.option.series.data = Object.assign([], xData);
            this.eBean.setOption(this.option);
        },
        isDiff(nData, oData) {
            return JSON.stringify(nData) != JSON.stringify(oData);
        }
    },
    beforeDestroy() {
        this.eBean.clear();
        this.eBean.dispose();
        this.eBean = null;
    }
}
</script>

<style scoped>
</style>
