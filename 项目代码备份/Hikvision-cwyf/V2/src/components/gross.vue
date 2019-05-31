<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="gross">
    <div class="gross flex flex-column" id="gross-box">
        <div class="gross-bp border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">毛利额BP达成率及增长情况</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="gross-bp" :data="bpData" id="gross-bp"></echarts-bar-line>
            </div>
        </div>
        <div class="gross-deduction border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">毛利率&扣费毛利率</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-line name="gross-deduction" :data="deductionData" id="gross-deduction"></echarts-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";
import demoData from "./data/demoData";
import echartsBarLine from "./common/echarts-bar-line";
import echartsLine from "./common/echarts-line";
export default {
    name: "gross",
    components: {
        [PullRefresh.name]: PullRefresh,
        echartsBarLine,
        echartsLine
    },
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        bpData() {
            return demoData.grossData.bp;
        },
        deductionData() {
            return demoData.grossData.deduction
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
            }, 500);
        }
    }
};
</script>

<style scoped>
.padding-empty {
    padding: 0px;
}

.gross {
    width: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.gross .gross-bp {
    min-height: 370px;
}

.gross .gross-deduction {
    min-height: 370px;
}

</style>
