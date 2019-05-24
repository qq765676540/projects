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
                <echarts-bar-line name="income-bp" :data="bpData" :drilldown="bpDrillDownData"></echarts-bar-line>
            </div>
        </div>
        <div class="income-structure border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">收入构成情况</span>
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                <van-tabs style="z-index:0" type="card" v-model="structureTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
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
                <!-- <span class="sub-title-unit">单位(%)</span> -->
            </div>
            <div class="content-box flex flex-column flex-1">
                
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
        echartsPie
    },
    data() {
        return {
            isLoading: false,
            structureTabAtive: 0
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

.income .sub-title-unit {
    font-family: PingFangSC-Light;
    color: #8e9091;
    font-size: 12px;
    letter-spacing: 1px;
}

.income .income-bp {
    min-height: 370px;
}

.income .income-structure {
    min-height: 700px;
    max-height: 700px;
}

.income .income-branch {
    min-height: 370px;
}
</style>
