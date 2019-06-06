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
        <div class="income-structure border-bottom flex flex-column">
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
        <div class="income-branch border-bottom flex flex-column" v-if="this.$store.state.dataScope!='T'">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">分公司情况</span>
                <span class="sub-title-unit">单位(万)</span>
            </div>
            <div class="content-box flex flex-column flex-1">
                <echarts-bar-line name="income-branch" :data="branchData" id="income-branch"></echarts-bar-line>
            </div>
        </div>
        <div class="income-trend border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">均价&数量趋势</span>
                <span class="sub-title-unit">单位(万)</span>
            </div>
            <div class="content-box flex flex-column flex-1">
                <van-tabs class="trendTabs" type="card" v-model="trendTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab title="均价"></van-tab>
                    <van-tab title="数量"></van-tab>
                </van-tabs>
                <echarts-line name="income-trend" :data="trendData" id="income-trend"></echarts-line>
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
        bpData() {
            if (this.$store.state['income-bp'].length > 0) {
                let dataArr = this.$store.state['income-bp'];
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
                let orgName = '';
                dataArr.filter(v => {
                    if (v[0].qText != orgName) {
                        bpData['R']['bp']['xAxisData'].push(v[0].qText);
                        bpData['R']['bp']['seriesData1'].push(v[8].qNum);
                        bpData['R']['bp']['seriesData2'].push(v[9].qNum);
                        bpData['R']['bp']['seriesData3'].push(v[10].qNum);
                        bpData['U']['bp']['xAxisData'].push(v[0].qText);
                        bpData['U']['bp']['seriesData1'].push(v[11].qNum);
                        bpData['U']['bp']['seriesData2'].push(v[12].qNum);
                        bpData['U']['bp']['seriesData3'].push(v[13].qNum);
                        orgName = v[0].qText;
                    }
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
                    dataArr.filter(vi => {
                        if (vo == vi[0].qText) {
                            Rdrill[vo]['xAxisData'].push(vi[1].qText);
                            Rdrill[vo]['seriesData1'].push(vi[2].qNum);
                            Rdrill[vo]['seriesData2'].push(vi[3].qNum);
                            Rdrill[vo]['seriesData3'].push(vi[4].qNum);
                            Udrill[vo]['xAxisData'].push(vi[1].qText);
                            Udrill[vo]['seriesData1'].push(vi[5].qNum);
                            Udrill[vo]['seriesData2'].push(vi[6].qNum);
                            Udrill[vo]['seriesData3'].push(vi[7].qNum);
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
        // structureTitle() {
        //     if (this.$store.state['level'].length > 0) {
        //         let dataArr = this.$store.state['level'][0];
        //         let title;
        //         if (dataArr[1].qText == 'LV1' || dataArr[2].qText == 'Y') {
        //             title = ['业务部-行业', '行业-业务部'];
        //         } else {
        //             title = ['产品线-行业', '行业-产品线'];
        //         }
        //         return title;
        //     }
        //     return false;
        // },
        structureBarData() {
            if (this.$store.state['income-structure-bar'].length > 0) {
                let dataArr = this.$store.state['income-structure-bar'];
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
                let orgName = '';
                dataArr.filter(v => {
                    if (v[0].qText != orgName) {
                        data['R']['bar']['xAxis'].push(v[0].qText);
                        data['R']['bar']['series'].push(v[6].qNum);
                        data['R']['bar']['avg'].push(v[7].qNum);
                        data['U']['bar']['xAxis'].push(v[0].qText);
                        data['U']['bar']['series'].push(v[8].qNum);
                        data['U']['bar']['avg'].push(v[9].qNum);
                        orgName = v[0].qText;
                    }
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
                    dataArr.filter(vi => {
                        if (vo == vi[0].qText) {
                            Rdrill[vo]['xAxis'].push(vi[1].qText);
                            Rdrill[vo]['series'].push(vi[2].qNum);
                            Rdrill[vo]['avg'].push(vi[3].qNum);
                            Udrill[vo]['xAxis'].push(vi[1].qText);
                            Udrill[vo]['series'].push(vi[4].qNum);
                            Udrill[vo]['avg'].push(vi[5].qNum);
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
            if (this.$store.state['income-structure-bar'].length > 0) {
                let dataArr = this.$store.state['income-structure-bar'];
                let data = {
                    xAxis: [],
                    R: {},
                    U: {}
                };
                let orgName = '';
                let Rarr = [];
                let Uarr = [];
                dataArr.filter(v => {
                    let Rtemp = {};
                    let Utemp = {};
                    if (v[0].qText != orgName) {
                        Rtemp.name = v[0].qText;
                        Rtemp.value = v[12].qNum;
                        Utemp.name = v[0].qText;
                        Utemp.value = v[13].qNum;
                        Rarr.push(Rtemp);
                        Uarr.push(Utemp);
                        data['xAxis'].push(v[0].qText);
                        orgName = v[0].qText;
                    }
                });
                data['R']['none'] = Rarr;
                data['U']['none'] = Uarr;

                data['xAxis'].filter(vo => {
                    let Rarr = [];
                    let Uarr = [];
                    dataArr.filter(vi => {
                        let Rtemp = {};
                        let Utemp = {};
                        if (vo == vi[0].qText) {
                            Rtemp.name = vi[1].qText;
                            Rtemp.value = vi[10].qNum;
                            Utemp.name = vi[1].qText;
                            Utemp.value = vi[11].qNum;
                            Rarr.push(Rtemp);
                            Uarr.push(Utemp);
                        }
                    });
                    data['R'][vo] = Rarr;
                    data['U'][vo] = Uarr;
                });

                // console.log('YCQ日志记录:structurePieData->', data);
                return data[this.$store.state.currency][this.structureDrillVal];
            }
            return false;
        },
        branchData() {
            return demoData.incomeData.branch
        },
        trendData() {
            return demoData.incomeData.trend
        }
    },
    watch: {

    },
    methods: {
        getStructureDrillVal(val) {
            this.structureDrillVal = val;
            console.log('YCQ日志记录:Drill->', val);
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
}
</style>
