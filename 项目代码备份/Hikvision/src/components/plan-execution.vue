<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="plan-execution">
            <div class="plan-execution-rate border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon trend-icon"></div>
                    <span class="sub-title-name">近五周计划执行率</span>
                    <span class="sub-title-unit">单位(%)</span>
                </div>
                <easy-line :id="'plan-line-1'" :data="ElineDataCSet" v-if="ElineDataCSet"></easy-line>
            </div>
            <div class="curr-week-unexecution border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon plan-icon"></div>
                    <span class="sub-title-name">本周未执行计划</span>
                </div>
                <div class="content-box flex-11">
                    <vant-collapse
                        :id="'plan-collapse-1'"
                        :data="planData1"
                        :isDefaultTitle="false"
                    ></vant-collapse>
                </div>
            </div>
            <div class="last-week-unexecution border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon plan-icon"></div>
                    <span class="sub-title-name">上周未执行计划</span>
                </div>
                <div class="content-box flex-11">
                    <vant-collapse
                        :id="'plan-collapse-2'"
                        :data="planData2"
                        :isDefaultTitle="false"
                    ></vant-collapse>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import { Panel, PullRefresh, Popup } from "vant";
import easyLine from "./common/easy-echarts-line";
import vantCollapse from "./common/vant-collapse";
import { eLineData1, eLineData2 } from "./data/echarts-line-data";
import { planData1, planData2 } from "./data/collapseData.js";

export default {
    name: "overview",
    components: {
        [PullRefresh.name]: PullRefresh,
        [Panel.name]: Panel,
        [Popup.name]: Popup,
        easyLine,
        vantCollapse
    },
    data() {
        return {
            isLoading: false,
            eLineData1,
            planData1: planData1,
            planData2: planData2,
            popShow: false,
            popContext: ""
        };
    },
    mounted() {
        $(".view").css({ height: "calc(100% - 80px)" });
    },
    computed: {
        ElineDataCSet() {
            if (this.$store.state.planExecutionLine.length > 0) {
                let a = this.$store.state.planExecutionLine;
                let b = [];
                let c = [];
                $.each(a, (i, v) => {
                    b.push(v[0].qText);
                    c.push(Math.round(v[1].qNum));
                });
                let opt = {
                    config: {
                        legend: false
                    },
                    xData: b,
                    yData: [
                        {
                            name: "计划执行率",
                            value: c
                        }
                    ]
                };
                console.log("ElineDataCSet", opt);
                return opt;
            }
            return {};
        }
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
.plan-execution {
    width: 100%;
    height: calc(100% - 40px);
}

.plan-execution .sub-title-unit {
    font-family: PingFangSC-Light;
    color: #8e9091;
    font-size: 12px;
    letter-spacing: 1px;
}

.plan-execution .plan-execution-rate {
    min-height: 320px;
}

.plan-execution .curr-week-unexecution {
    min-height: 320px;
}

.plan-execution .last-week-unexecution {
    min-height: 320px;
}

.plan-execution .van-panel__header {
    background-color: #f7f7f7;
}
</style>
