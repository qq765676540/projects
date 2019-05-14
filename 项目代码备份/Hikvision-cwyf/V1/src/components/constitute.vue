<template>
<div class="constitute flex flex-column">
    <div class="row row-1 flex flex-column flex-1">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机金额分档占比</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <pie-chart id="pie-1"></pie-chart>
        </div>
    </div>
    <div class="row row-2 flex flex-column flex-1">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机阶段占比</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <pie-chart id="pie-2"></pie-chart>
        </div>
    </div>
    <div class="row row-3 flex flex-column flex-1">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机用户占比</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <pie-chart id="pie-3"></pie-chart>
        </div>
    </div>
</div>
</template>

<script>
import Cube from '../tools/cube'
import pieChart from './common/echarts-pie'

export default {
    components: {
        pieChart
    },
    data() {
        return {
        }
    },
    mounted() {
        var hasLoad = this.$store.state.constituteState;
        if (!hasLoad) {
            Cube.getData(window.qApp, this, {
            kpiName: "measure_2",
            orderCol: 1,
            orderType: -1,
            qHeight: 4
        });
            this.$store.commit('setData',{dataName: 'constituteState', data: true});
        }
    },
    computed: {
        barData_1() {
            var rows = this.$store.state.measure_2;
            if(rows) {
                var result = this.getBarData(rows);
                return result;
            }
            else {
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
                show: rows.length>4 ? true : false,
                end: Math.round(4/rows.length*100)
            };

            return {xData, yData, dataZoom}
        }
    }
}
</script>

<style scoped>
.constitute {
    width: 100%;
    overflow-y: scroll !important;
}

.row-1 {
    min-height: 310px;
    max-height: 310px;
}

.row-2 {
    min-height: 310px;
    max-height: 310px;
}

.row-3 {
    min-height: 310px;
    max-height: 310px;
}
</style>
