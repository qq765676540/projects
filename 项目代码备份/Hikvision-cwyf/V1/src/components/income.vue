<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="income">
        <div class="income-bp border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">收入BP达成率及增长情况</span>
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                <echarts-bar-line name="income-bp" :data="bpData" :drilldown="bpDrillDownData" id="income-bp"></echarts-bar-line>
            </div>
        </div>
        <div class="income-structure border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">收入构成情况</span>
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                <van-tabs class="structureTabs" type="card" v-model="structureTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab title="业务部-行业"></van-tab>
                    <van-tab title="行业-业务部"></van-tab>
                </van-tabs>
                <div style="margin-top: 10px">
                    <echarts-bar-markline name="income-structure" :data="structureBarData" id="structureBar" v-if="structureBarData"></echarts-bar-markline>
                </div>
                <div style="margin-top: 10px">
                    <echarts-pie name="income-structure" :data="structurePieData" id="structurePie" v-if="structurePieData"></echarts-pie>
                </div>
            </div>
        </div>
        <div class="income-branch border-bottom flex flex-column">
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
import { log } from 'util';

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
            trendTabAtive: 0
        };
    },
    mounted() {
        $(".view").css({
            height: "calc(100% - 80px)"
        });
    },
    computed: {
        bpData() {
            return demoData.incomeData.bp
        },
        bpDrillDownData() {
            return demoData.incomeData.bpDrillDown
        },
        structureBarData() {
            return demoData.incomeData.structure[this.structureTabAtive].bar
        },
        structurePieData() {
            return demoData.incomeData.structure[2]
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
