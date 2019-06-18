<template>
<div class="constitute">
    <div class="overview border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">整体情况</span>
        </div>
        <div class="content-box flex flex-column">
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_1" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_2" v-if="kpiData"></easy-kpi>
                </div>
            </div>
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_3" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_4" v-if="kpiData"></easy-kpi>
                </div>
            </div>
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_5" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_6" v-if="kpiData"></easy-kpi>
                </div>
            </div>
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_7" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_8" v-if="kpiData"></easy-kpi>
                </div>
            </div>
        </div>
    </div>
    <div class="overall-budget border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">全年预算进度</span>
        </div>
        <div class="content-box flex" style="margin-top: 5px">
            <div class="flex flex-1 flex-column flex-align-center">
                <vant-pie :id="'pie-1'" :data="pieData[0]" v-if="pieData"></vant-pie>
                <div class="pieDes">总收入</div>
            </div>
            <div class="flex flex-1 flex-column flex-align-center">
                <vant-pie :id="'pie-2'" :data="pieData[1]" v-if="pieData"></vant-pie>
                <div class="pieDes">自有收入</div>
            </div>
            <div class="flex flex-1 flex-column flex-align-center">
                <vant-pie :id="'pie-4'" :data="pieData[2]" v-if="pieData"></vant-pie>
                <div class="pieDes">费用</div>
            </div>
        </div>
    </div>
    <div class="overall-ranking flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">业绩排名</span>
        </div>
        <div class="content-box flex flex-column flex-1">
            <easybar name="overall-ranking" :id="'overall-ranking'" :data="chartData" v-if="chartData"></easybar>
        </div>
    </div>
</div>
</template>

<script>
import demoData from "./data/demoData";
import vantPie from "./common/vant-pie";
import easybar from "./common/echarts-bar-line";
import easyKpi from "./common/easy-kpi-ext";
import accounting from "accounting";
export default {
    components: {
        vantPie,
        easybar,
        easyKpi
    },
    data() {
        return {};
    },
    mounted() {},
    computed: {
        kpiData() {
            if (this.$store.state["over-all-kpi"].length > 0) {
                let dataArr = this.$store.state["over-all-kpi"][0];
                let kpiData = {
                    kpi_1: [
                        ['总收入', dataArr[1].qText, ''],
                        ['完成率', dataArr[2].qText, ''],
                        ['同比', dataArr[3].qText, '']
                    ],
                    kpi_2: [
                        ['自有收入', dataArr[4].qText, ''],
                        ['完成率', dataArr[5].qText, ''],
                        ['同比', dataArr[6].qText, '']
                    ],
                    kpi_3: [
                        ['毛利额', dataArr[7].qText, ''],
                        ['同比', dataArr[8].qText, ''],
                        ['', '', '']
                    ],
                    kpi_4: [
                        ['毛利率', dataArr[9].qText, ''],
                        ['上年同期', dataArr[10].qText, ''],
                        ['', '', '']
                    ],
                    kpi_5: [
                        ['费用', dataArr[11].qText, ''],
                        ['完成率', dataArr[12].qText, ''],
                        ['同比', dataArr[13].qText, '']
                    ],
                    kpi_6: [
                        ['费用率', dataArr[14].qText, ''],
                        ['上年同期', dataArr[15].qText, ''],
                        ['', '', '']
                    ],
                    kpi_7: [
                        ['扣费毛利', dataArr[16].qText, ''],
                        ['同比', dataArr[17].qText, ''],
                        ['', '', '']
                    ],
                    kpi_8: [
                        ['扣费毛利率', dataArr[18].qText, ''],
                        ['上年同期', dataArr[19].qText, ''],
                        ['', '', '']
                    ]
                };
                return kpiData;
            }
            return false;
            // return demoData.homeData.overview
        },
        pieData() {
            var arr = [];
            if (this.$store.state["over-all-progress"].length>0) {
                this.$store.state["over-all-progress"][0].forEach(i => {
                    if (i.qText == "-") {
                        arr.push({
                            size: "60px",
                            rate: 0
                        });
                    } else {
                        arr.push({
                            size: "60px",
                            rate: parseFloat((i.qText * 100).toFixed(1))
                        });
                    }
                });
                return arr;
            }
            return false;
        },
        chartData() {
            var obj = {
                x1: [],
                x2: [],
                x3: [],
                x4: [],
                y: []
            };
            if (this.$store.state["over-all-ranking"].length) {
                this.$store.state["over-all-ranking"].forEach(i => {
                    obj.y.push(i[0].qText);
                    obj.x1.push(i[1].qText == "-" ? 0 : parseInt(parseInt(i[1].qText) / 10000));
                    obj.x2.push(i[2].qText == "-" ? 0 : parseInt(parseInt(i[2].qText) / 10000));
                    obj.x3.push(
                        i[3].qText == "-" ? 0 : (parseFloat(i[3].qText) * 100).toFixed(1)
                    );
                    obj.x4.push(
                        i[4].qText == "-" ? 0 : (parseFloat(i[4].qText) * 100).toFixed(1)
                    );
                });
                return obj;
            }
            return false;
        }
    },
    methods: {}
};
</script>

<style scoped>
.constitute {
    width: 100%;
    overflow-y: scroll !important;
}

.overview {
    min-height: 575px;
}

.overall-budget {
    min-height: 140px;
}

.overall-ranking {
    min-height: 330px;
}

.pieDes {
    font-size: 14px;
    color: #222222;
    margin: 1px;
    font-weight: bold;
}
</style>
