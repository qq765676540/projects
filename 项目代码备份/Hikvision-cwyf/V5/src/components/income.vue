<template>
<!-- 收入页面 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="income">
        <div class="income-bp border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">收入BP达成率及增长情况</span>
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                <echarts-bar-line name="income-bp" :data="bpData['bp']" :drilldown="bpData['drill']" id="income-bp" v-if="bpData"></echarts-bar-line>
            </div>
        </div>
        <div class="income-structure border-bottom flex flex-column" v-if="this.$store.state['dataScope']=='I'">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">收入构成情况</span>
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                <!-- <van-tabs class="structureTabs" type="card" v-model="structureTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab :title="structureTitle[0]" v-if="structureTitle"></van-tab>
                    <van-tab :title="structureTitle[1]" v-if="structureTitle"></van-tab>
                </van-tabs> -->
                <div style="margin-top: 10px">
                    <echarts-bar-markline name="income-structure" :data="structureBarData['bar']" :drilldown="structureBarData['drill']" @getDrillVal="getStructureDrillVal" id="structureBar" v-if="structureBarData"></echarts-bar-markline>
                </div>
                <div style="margin-top: 10px">
                    <echarts-pie name="income-structure" :data="structurePieData" id="structurePie" v-if="structurePieData"></echarts-pie>
                </div>
            </div>
        </div>
        <div class="income-branch border-bottom flex flex-column" v-if="incomeBranchSubtitle!='T'">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">{{ incomeBranchSubtitle }}</span>
                <span class="sub-title-unit">单位(万)</span>
            </div>
            <div class="content-box flex flex-column flex-1">
                <echarts-bar-line name="income-branch" :data="branchData" id="income-branch" v-if="branchData"></echarts-bar-line>
            </div>
        </div>
        <div class="income-trend flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">均价&数量趋势</span>
                <!-- <span class="sub-title-unit">单位(万)</span> -->
                <div class="flex flex-1 flex-justify-right">
                    <van-tabs class="trendTabs" type="card" v-model="trendTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                        <van-tab title="均价"></van-tab>
                        <van-tab title="数量"></van-tab>
                    </van-tabs>
                </div>
            </div>
            <div class="content-box flex flex-column flex-1">
                <echarts-line style="margin-top: 10px" name="income-trend" :data="trendData" id="income-trend" v-if="trendData"></echarts-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh,
    Tabs,
    Tab
} from "vant";
import echartsBarLine from "./common/echarts-bar-line";
import echartsBarMarkline from "./common/echarts-bar-markLine";
import echartsPie from "./common/echarts-pie";
import echartsLine from "./common/echarts-line";
import demoData from "./data/demoData";
import {
    log
} from 'util';

export default {
    name: "income",
    components: {
        [PullRefresh.name]: PullRefresh,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab,
        echartsBarLine,
        echartsBarMarkline,
        echartsPie,
        echartsLine
    },
    data() {
        return {
            isLoading: false,
            structureTabAtive: 0,
            trendTabAtive: 0,
            structureDrillVal: 'none'
        };
    },
    mounted() {
        $(".view").css({
            height: "calc(100% - 80px)"
        });
    },
    computed: {
        incomeBranchSubtitle() {
            let dataScope = this.$store.state['dataScope'];
            let incomeBranchSubtitle = '';
            switch (dataScope) {
                case 'I':
                    incomeBranchSubtitle = '业务中心情况';
                    break;
                case 'O':
                    incomeBranchSubtitle = '销售办公室情况';
                    break;
                default:
                    incomeBranchSubtitle = 'T';
                    break;
            }
            return incomeBranchSubtitle;
        },
        bpData() {
            if (this.$store.state['income-bp'].length > 0 && this.$store.state['income-bpDrill'].length > 0) {
                let dataArr1 = this.$store.state['income-bp'];
                let dataArr2 = this.$store.state['income-bpDrill'];
                let bpData = {
                    R: {
                        bp: {
                            xAxisData: [],
                            seriesData1: [],
                            seriesData2: [],
                            seriesData3: []
                        },
                        drill: {}

                    },
                    U: {
                        bp: {
                            xAxisData: [],
                            seriesData1: [],
                            seriesData2: [],
                            seriesData3: []
                        },
                        drill: {}
                    }

                };
                dataArr1.filter(v => {
                    bpData['R']['bp']['xAxisData'].push(v[0].qText);
                    bpData['R']['bp']['seriesData1'].push(v[1].qNum);
                    bpData['R']['bp']['seriesData2'].push(v[2].qNum);
                    bpData['R']['bp']['seriesData3'].push(v[3].qNum == 'NaN' ? 0 : v[3].qNum);
                    bpData['U']['bp']['xAxisData'].push(v[0].qText);
                    bpData['U']['bp']['seriesData1'].push(v[4].qNum);
                    bpData['U']['bp']['seriesData2'].push(v[5].qNum);
                    bpData['U']['bp']['seriesData3'].push(v[6].qNum == 'NaN' ? 0 : v[6].qNum);
                });
                let Rdrill = {};
                let Udrill = {};
                bpData['R']['bp']['xAxisData'].filter(vo => {
                    Rdrill[vo] = {};
                    Udrill[vo] = {};
                    Rdrill[vo]['xAxisData'] = [];
                    Rdrill[vo]['seriesData1'] = [];
                    Rdrill[vo]['seriesData2'] = [];
                    Rdrill[vo]['seriesData3'] = [];
                    Udrill[vo]['xAxisData'] = [];
                    Udrill[vo]['seriesData1'] = [];
                    Udrill[vo]['seriesData2'] = [];
                    Udrill[vo]['seriesData3'] = [];
                    dataArr2.filter(vi => {
                        if (vo == vi[0].qText) {
                            Rdrill[vo]['xAxisData'].push(vi[1].qText);
                            Rdrill[vo]['seriesData1'].push(vi[2].qNum);
                            Rdrill[vo]['seriesData2'].push(vi[3].qNum);
                            Rdrill[vo]['seriesData3'].push(vi[4].qNum == 'NaN' ? 0 : vi[4].qNum);
                            Udrill[vo]['xAxisData'].push(vi[1].qText);
                            Udrill[vo]['seriesData1'].push(vi[5].qNum);
                            Udrill[vo]['seriesData2'].push(vi[6].qNum);
                            Udrill[vo]['seriesData3'].push(vi[7].qNum == 'NaN' ? 0 : vi[7].qNum);
                        }
                    });
                });
                bpData['R']['drill'] = Rdrill;
                bpData['U']['drill'] = Udrill;
                return bpData[this.$store.state.currency];
            }
            return false;
            //demoData.incomeData.bp
        },
        structureBarData() {
            if (this.$store.state['income-structure-bar'].length > 0 && this.$store.state['income-structureDrill-bar'].length > 0) {
                let dataArr1 = this.$store.state['income-structure-bar'];
                let dataArr2 = this.$store.state['income-structureDrill-bar'];
                let data = {
                    R: {
                        bar: {
                            xAxis: [],
                            series: [],
                            avg: []
                        },
                        drill: {}
                    },
                    U: {
                        bar: {
                            xAxis: [],
                            series: [],
                            avg: []
                        },
                        drill: {}
                    }
                };
                dataArr1.filter(v => {
                    data['R']['bar']['xAxis'].push(v[0].qText);
                    data['R']['bar']['series'].push(v[1].qNum=='NaN'?0:v[1].qNum);
                    data['R']['bar']['avg'].push(v[2].qNum=='NaN'?0:v[2].qNum);
                    data['U']['bar']['xAxis'].push(v[0].qText);
                    data['U']['bar']['series'].push(v[3].qNum=='NaN'?0:v[3].qNum);
                    data['U']['bar']['avg'].push(v[4].qNum=='NaN'?0:v[4].qNum);
                });
                let Rdrill = {};
                let Udrill = {};
                data['R']['bar']['xAxis'].filter(vo => {
                    Rdrill[vo] = {};
                    Udrill[vo] = {};
                    Rdrill[vo]['xAxis'] = [];
                    Rdrill[vo]['series'] = [];
                    Rdrill[vo]['avg'] = [];
                    Udrill[vo]['xAxis'] = [];
                    Udrill[vo]['series'] = [];
                    Udrill[vo]['avg'] = [];
                    dataArr2.filter(vi => {
                        if (vo == vi[0].qText) {
                            Rdrill[vo]['xAxis'].push(vi[1].qText);
                            Rdrill[vo]['series'].push(vi[2].qNum=='NaN'?0:vi[2].qNum);
                            Rdrill[vo]['avg'].push(vi[3].qNum=='NaN'?0:vi[3].qNum);
                            Udrill[vo]['xAxis'].push(vi[1].qText);
                            Udrill[vo]['series'].push(vi[4].qNum=='NaN'?0:vi[4].qNum);
                            Udrill[vo]['avg'].push(vi[5].qNum=='NaN'?0:vi[5].qNum);
                        }
                    });
                });
                data['R']['drill'] = Rdrill;
                data['U']['drill'] = Udrill;
                return data[this.$store.state.currency];
            }
            return false;
        },
        structurePieData() {
            if (this.$store.state['income-structure-bar'].length > 0 && this.$store.state['income-structureDrill-bar'].length > 0) {
                let dataArr1 = this.$store.state['income-structure-pie'];
                let dataArr2 = this.$store.state['income-structureDrill-pie'];
                let data = {
                    xAxis: [],
                    R: {},
                    U: {}
                };
                let Rarr = [];
                let Uarr = [];
                dataArr1.filter(v => {
                    let Rtemp = {};
                    let Utemp = {};
                    Rtemp.name = v[0].qText;
                    Rtemp.value = v[1].qNum;
                    Utemp.name = v[0].qText;
                    Utemp.value = v[2].qNum;
                    Rarr.push(Rtemp);
                    Uarr.push(Utemp);
                    data['xAxis'].push(v[0].qText);
                });
                data['R']['none'] = Rarr;
                data['U']['none'] = Uarr;

                data['xAxis'].filter(vo => {
                    let Rarr = [];
                    let Uarr = [];
                    dataArr2.filter(vi => {
                        let Rtemp = {};
                        let Utemp = {};
                        if (vo == vi[0].qText) {
                            Rtemp.name = vi[1].qText;
                            Rtemp.value = vi[2].qNum;
                            Utemp.name = vi[1].qText;
                            Utemp.value = vi[3].qNum;
                            Rarr.push(Rtemp);
                            Uarr.push(Utemp);
                        }
                    });
                    data['R'][vo] = Rarr;
                    data['U'][vo] = Uarr;
                });
                return data[this.$store.state.currency][this.structureDrillVal];
            }
            return false;
        },
        branchData() {
            if (this.$store.state['income-branch'].length > 0) {
                let dataArr = this.$store.state['income-branch'];
                let data = {
                    R: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: []
                    },
                    U: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: []
                    }
                };
                dataArr.filter(v => {
                    data['R']['xAxisData'].push(v[0].qText);
                    data['R']['seriesData1'].push(v[1].qNum == '-' ? 0 : v[1].qNum);
                    data['R']['seriesData2'].push(v[2].qNum == '-' ? 0 : v[2].qNum);
                    data['R']['seriesData3'].push(v[3].qNum == '-' || v[3].qNum == 'NaN'? 0 : v[3].qNum);
                    data['U']['xAxisData'].push(v[0].qText);
                    data['U']['seriesData1'].push(v[4].qNum == '-' ? 0 : v[4].qNum);
                    data['U']['seriesData2'].push(v[5].qNum == '-' ? 0 : v[5].qNum);
                    data['U']['seriesData3'].push(v[6].qNum == '-' || v[6].qNum == 'NaN'? 0 : v[6].qNum);
                });
                return data[this.$store.state.currency];
            }
            return false;
            //demoData.incomeData.branch
        },
        trendData() {
            if (this.$store.state['income-trend'].length > 0) {
                let dataArr = this.$store.state['income-trend'];
                let legend = [];
                let legendDis = [];
                let xAxis = [];
                dataArr.filter(v => {
                    legend.push(v[2].qText+'|'+v[1].qText);
                    xAxis.push(v[0].qText);
                });
                legend = Array.from(new Set(legend));
                xAxis = Array.from(new Set(xAxis));
                legend = legend.sort((a,b) => {
                    return a.split('|')[0].charCodeAt() - b.split('|')[0].charCodeAt();
                });
                xAxis = xAxis.sort();
                legend.filter(v => {
                    legendDis.push(v.split('|')[1]);
                });
                let data = {
                    qtyR: {
                        legend: legendDis,
                        xAxis: xAxis,
                        series: []
                    },
                    qtyU: {
                        legend: legendDis,
                        xAxis: xAxis,
                        series: []
                    },
                    amountR: {
                        legend: legendDis,
                        xAxis: xAxis,
                        series: []
                    },
                    amountU: {
                        legend: legendDis,
                        xAxis: xAxis,
                        series: []
                    }
                };

                legendDis.filter(v => {
                    let qtyRtemp = {};
                    let qtyUtemp = {};
                    let amountRtemp = {};
                    let amountUtemp = {};
                    qtyRtemp.name = v;
                    qtyRtemp.type = 'line';
                    qtyRtemp.data = [];
                    qtyUtemp.name = v;
                    qtyUtemp.type = 'line';
                    qtyUtemp.data = [];
                    amountRtemp.name = v;
                    amountRtemp.type = 'line';
                    amountRtemp.data = [];
                    amountUtemp.name = v;
                    amountUtemp.type = 'line';
                    amountUtemp.data = [];
                    xAxis.filter(vo => {
                        dataArr.filter(vi => {
                            if (vi[0].qText == vo && vi[1].qText == v) {
                                qtyRtemp.data.push(vi[5].qNum == 0 ? '-' : vi[4].qNum);
                                qtyUtemp.data.push(vi[5].qNum == 0 ? '-' : vi[4].qNum);
                                amountRtemp.data.push(vi[3].qNum);
                                amountUtemp.data.push(vi[4].qNum);
                            }
                        });
                    });

                    data['qtyR']['series'].push(qtyRtemp);
                    data['qtyU']['series'].push(qtyUtemp);
                    data['amountR']['series'].push(amountRtemp);
                    data['amountU']['series'].push(amountUtemp);
                });

                // console.log('YCQ日志记录:标识->', data);
                return data[(this.trendTabAtive == 0 ? 'amount' : 'qty') + this.$store.state.currency];
            }
            return false;
            //demoData.incomeData.trend
        }
    },
    watch: {},
    methods: {
        getStructureDrillVal(val) {
            this.structureDrillVal = val;
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
            }, 300);
        }
    }
};
</script>

<style scoped>
.income {
    width: 100%;
    height: calc(100% - 20px);
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.income .income-bp {
    min-height: 370px;
}

.income .income-structure {
    min-height: 700px;
    max-height: 700px;
}

.income .income-structure .structureTabs {
    z-index: 0;
    width: 280px;
}

.income .income-branch {
    min-height: 390px;
}

.income .income-trend {
    min-height: 450px;
}

.income .income-trend .trendTabs {
    z-index: 0;
    width: 180px;
    margin-top: 3px;
}
</style>
