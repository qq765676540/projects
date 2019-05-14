<template>
<div class="summary flex flex-column">
    <div class="row row-1 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">总览</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <div class="flex flex-3 flex-align-center">
                <simple-kpi name="战略覆盖" value="9/15"></simple-kpi>
                <simple-kpi name="核心覆盖" value="5/15"></simple-kpi>
                <simple-kpi name="重要锁定" value="11/25"></simple-kpi>
                <simple-kpi name="市场覆盖" value="7/21"></simple-kpi>
            </div>
            <div class="flex-1 text-left" style="margin-left:24px;">
                <font class="font-12">在途滞后商机占比 </font>
                <font class="font-16" style="color:#F38227;">90%</font>
            </div>
        </div>
    </div>
    <div class="row row-2 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">销售任务进度</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <process class="flex-1"></process>
            <process class="flex-1"></process>
            <process class="flex-1"></process>
        </div>
    </div>
    <div class="row row-3 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机下单出库情况</span>
        </div>
        <div class="sub-content flex flex-1">
            <bar-chart v-if="barData" class="flex-1" id="bar-1" :data="barData"></bar-chart>
        </div>
    </div>
    <div class="row row-4 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">过去五周新建商机趋势</span>
        </div>
        <div class="sub-content flex flex-1">
            <line-chart class="flex-1" id="line-1" :data="lineData"></line-chart>
        </div>
    </div>
</div>
</template>

<script>
import simpleKpi from './common/simple-kpi'
import process from './common/process'
import barChart from './common/echarts-bar'
import lineChart from './common/easy-echarts-line'

import lineData from './data/echarts-line-data.js'
import Cube from '../tools/cube'

export default {
    components: {
        simpleKpi,
        process,
        lineChart,
        barChart
    },
    data() {
        return {
            lineData
        }
    },
    mounted() {
        var hasLoad = this.$store.state.summaryState;
        if (!hasLoad) {
            Cube.getData(window.qApp, this, {
                kpiName: "measure_2",
                orderCol: 1,
                orderType: -1,
                qHeight: 14
            });
            this.$store.commit('setData',{dataName: 'summaryState', data: true});
        }
    },
    computed: {
        barData() {
            var rows = this.$store.state.measure_2;
            if (rows.length) {
                var result = this.getBarData(rows);
                return result;
            } else {
                return false;
            }
        }
    },
    methods: {
        getBarData(rows) {
            rows = rows || [];
            var xData = [],
                yData = [];

            rows.forEach(row => {
                var name = row[0].qText;
                var value = (row[1].qNum / 10000).toFixed(0);
                xData.push(name);
                yData.push(value);
            });

            var dataZoom = {
                show: rows.length > 4 ? true : false,
                end: Math.round(4 / rows.length * 100)
            };

            return {
                xData,
                yData,
                dataZoom
            }
        }
    }
}
</script>

<style scoped>
.summary {
    width: 100%;
    overflow-y: scroll !important;
}

.sub-title {
    width: 100%;
    margin-bottom: 8px;
}

.row-1 {
    min-height: 140px;
    max-height: 140px;
}

.row-2 {
    min-height: 310px;
    max-height: 310px;
}

.row-3 {
    min-height: 260px;
    max-height: 260px;
}

.row-4 {
    min-height: 260px;
    max-height: 260px;
}

.red {
    background: rgba(136, 16, 16, 0.089);
}
</style>
