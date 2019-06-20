<template>
<!-- 费用页面 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" :style="{'overflow-y': scroll}">
    <div class="cost flex flex-column">
        <div class="cost-rate border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">费用增长</span>
                <div class="flex-1 flex-justify-right" style="margin:5px 15px 0px 0px;">
                    <my-actionsheet defSelected="费用合计" :data="rateData['title']" :myStyle="{background:'rgba(239, 239, 239, 0.5)' ,width: '140px'}" @setScroll="setRateScrollStyle" v-if="rateData"></my-actionsheet>
                </div>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="cost-rate" :data="rateData[rateScroll]" id="cost-rate" v-if="rateData"></echarts-bar-line>
            </div>
        </div>
        <div class="cost-structure border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">费用构成</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_1" v-if="structureData"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_2" v-if="structureData"></easy-kpi>
                    </div>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_3" v-if="structureData"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_4" v-if="structureData"></easy-kpi>
                    </div>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_5" v-if="structureData"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="structureData.kpi_6" v-if="structureData"></easy-kpi>
                    </div>
                </div>
            </div>
        </div>
        <div class="cost-trend flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">人均费用情况</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-line name="cost-trend" :data="trendData" id="cost-trend" v-if="trendData"></echarts-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script scoped>
import {
    PullRefresh
} from "vant";
import actionsheet from "./common/actionsheet";
import echartsBarLine from "./common/echarts-bar-line";
import easyKpi from "./common/easy-kpi";
import echartsLine from "./common/echarts-line";
import demoData from "./data/demoData";

export default {
    name: "cost",
    components: {
        [PullRefresh.name]: PullRefresh,
        MyActionsheet: actionsheet,
        echartsBarLine,
        easyKpi,
        echartsLine
    },
    data() {
        return {
            isLoading: false,
            scroll: "scroll !important",
            rateScroll: '费用合计'
        }
    },
    beforeCreate() {},
    computed: {
        rateData() {
            if (this.$store.state['cost-rate'].length > 0 && this.$store.state['cost-rateTotal'].length > 0) {
                let dataArr = this.$store.state['cost-rateTotal'].concat(this.$store.state['cost-rate']);
                let data = {};
                let costType = [];
                let monthList = [];
                dataArr.filter(v => {
                    costType.push(v[0].qText);
                    monthList.push(v[1].qText);
                });
                costType = Array.from(new Set(costType));
                monthList = Array.from(new Set(monthList));
                monthList = monthList.sort();
                data['title'] = costType;
                costType.filter(v => {
                    data[v] = {
                        xAxisData: monthList,
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: [],
                        seriesData4: []
                    };
                    monthList.filter(vo => {
                        dataArr.filter(vi => {
                            if (vi[0].qText == v && vi[1].qText == vo) {
                                data[v]['seriesData1'].push(vi[2].qNum);
                                data[v]['seriesData2'].push(vi[3].qNum);
                                data[v]['seriesData3'].push(vi[4].qNum==-100?'NaN':vi[4].qNum);
                                data[v]['seriesData4'].push(vi[5].qNum);
                            }
                        });
                    });
                });
                // console.log('YCQ日志记录:标识->', data);
                return data;
            }
            return false;
            // demoData.costData.rate
        },
        structureData() {
            if (this.$store.state['cost-structure'].length > 0) {
                let dataArr = this.$store.state['cost-structure'][0];
                let data = {
                    kpi_1: [
                        ['人力成本', dataArr[1].qText, ''],
                        ['预算消耗', dataArr[3].qText, ''],
                        ['同比', dataArr[2].qText, '']
                    ],
                    kpi_2: [
                        ['差旅费用', dataArr[4].qText, ''],
                        ['预算消耗', dataArr[6].qText, ''],
                        ['同比', dataArr[5].qText, '']
                    ],
                    kpi_3: [
                        ['检测认证', dataArr[7].qText, ''],
                        ['预算消耗', dataArr[9].qText, ''],
                        ['同比', dataArr[8].qText, '']
                    ],
                    kpi_4: [
                        ['研发领料', dataArr[10].qText, ''],
                        ['预算消耗', dataArr[12].qText, ''],
                        ['同比', dataArr[11].qText, '']
                    ],
                    kpi_5: [
                        ['退货拆解', dataArr[13].qText, ''],
                        ['预算消耗', dataArr[15].qText, ''],
                        ['同比', dataArr[14].qText, '']
                    ],
                    kpi_6: [
                        ['模具手板', dataArr[16].qText, ''],
                        ['预算消耗', dataArr[18].qText, ''],
                        ['同比', dataArr[17].qText, '']
                    ]
                };
                return data;
            }
            return false;
            // demoData.costData.structure;
        },
        trendData() {
            if (this.$store.state['cost-trend'].length > 0) {
                let dataArr = this.$store.state['cost-trend'];
                let data = {
                    xAxis: [],
                    series: [{
                            name: '人均人力成本',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '人均非人力成本',
                            type: 'line',
                            data: []
                        },
                        {
                            name: '人均成本',
                            type: 'line',
                            data: []
                        }
                    ]
                };
                dataArr.filter(v => {
                    data['xAxis'].push(v[0].qText);
                    data['series'][0]['data'].push(v[1].qNum);
                    data['series'][1]['data'].push(v[2].qNum);
                    data['series'][2]['data'].push(v[3].qNum);
                });
                data['xAxis'].sort();
                // console.log('YCQ日志记录:标识->',data);
                return data;
            }
            return false;
            // demoData.costData.trend;
        }
    },
    mounted() {},
    methods: {
        setRateScrollStyle(style, selected) {
            this.scroll = style;
            this.rateScroll = selected;
        },
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.$router.replace({
                    path: "/refresh",
                    query: {
                        t: Date.now()
                    }
                });
            }, 500);
        }
    }
};
</script>

<style scoped>
.cost {
    width: 100%;
    height: calc(100% - 120px);
    overflow: hidden;
}

.cost .cost-rate {
    min-height: 370px;
}

.cost .cost-structure {
    min-height: 450px;
}

.cost .cost-trend {
    min-height: 400px;
}
</style>
