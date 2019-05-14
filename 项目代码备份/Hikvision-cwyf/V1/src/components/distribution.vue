<template>
<div class="distribution flex flex-column">
    <div class="row row-1">
        <div class="distribution-selection flex flex-row">
            <div class="selection flex-1" :class="{selected: isSelected['行业']}" @click="select('行业')">行业</div>
            <div class="selection flex-1" :class="{selected: isSelected['区域']}" @click="select('区域')">区域</div>
            <div class="selection flex-1" :class="{selected: isSelected['子行业']}" @click="select('子行业')">子行业</div>
        </div>
    </div>
    <div class="row row-2 flex flex-column flex-1">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机个数</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <bar-chart v-if="barData_1" class="flex-1" id="bar-2" :data="barData_1"></bar-chart>
        </div>
    </div>
    <div class="row row-3 flex flex-column flex-1">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机金额</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <bar-chart v-if="barData_2" class="flex-1" id="bar-3" :data="barData_2"></bar-chart>
        </div>
    </div>
</div>
</template>

<script>
import barChart from './common/echarts-bar'
import Cube from '../tools/cube'

export default {
    components: {
        barChart
    },
    data() {
        return {
            isSelected: {
                行业: true,
                区域: false,
                子行业: false
            },
            selected: '行业',
            //testing
            testMap: {
                行业: 'City',
                区域: 'Country',
                子行业: 'Product Type Desc'
            }
        }
    },
    mounted() {
        var hasLoad = this.$store.state.constituteState;
        if (!hasLoad) {
            this.setData();
            this.$store.commit('setData',{dataName: 'constituteState', data: true});
        }
    },
    computed: {
        barData_1() {
            var rows = this.$store.state.measure_3;
            if (rows.length) {
                var result = this.getBarData(rows);
                return result;
            } else {
                return false;
            }
        },
        barData_2() {
            var rows = this.$store.state.measure_4;
            if (rows.length) {
                var result = this.getBarData(rows);
                return result;
            } else {
                return false;
            }
        }
    },
    watch: {
        selected() {
            this.setData();
        }
    },
    methods: {
        setData() {
            Cube.getData(window.qApp, this, {
                kpiName: "measure_3",
                kpiParams: [this.testMap[this.selected]], //testing
                orderCol: 1,
                orderType: -1,
                qHeight: 14
            });
            Cube.getData(window.qApp, this, {
                kpiName: "measure_4",
                kpiParams: [this.testMap[this.selected]], //testing
                orderCol: 1,
                orderType: -1,
                qHeight: 4
            });
        },
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
        },
        select(value) {
            Object.keys(this.isSelected).forEach(key => {
                if (key === value) {
                    this.isSelected[value] = true;
                } else {
                    this.isSelected[key] = false;
                }
            });

            //testing
            this.selected = value;
        }
    }
}
</script>

<style scoped>
.distribution {
    width: 100%;
    overflow-y: hidden !important;
}

.sub-title {
    width: 100%;
    margin-bottom: 8px;
}

.row-1 {
    height: 40px;
    background-color: #F1F4FB;
}

.row-2 {
    min-height: 140px;
}

.row-3 {
    min-height: 140px;
}

.distribution-selection {
    line-height: 40px;
    margin-top: 8px;
    margin-left: calc(50% - 100px);
    width: 200px;
}

.selection {
    line-height: 24px;
    height: 24px;
    border: #0F8EE9 1px solid;
    color: #0F8EE9;
}

.selection.selected {
    background-color: #0F8EE9;
    color: white;
}

.selection:nth-child(1) {
    border-radius: 6px 0 0 6px;
}

.selection:nth-child(2) {
    border-left: none;
    border-right: none;
}

.selection:nth-child(3) {
    border-radius: 0 6px 6px 0;
}
</style>
