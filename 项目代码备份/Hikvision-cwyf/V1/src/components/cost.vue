<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" :style="{'overflow-y': scroll}">
    <div class="cost flex flex-column">
        <div class="cost-rate border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">费用增长</span>
                <div class="flex-1 flex-justify-right" style="margin:5px 15px 0px 0px;">
                    <my-actionsheet defSelected="费用合计" :data="['费用合计','费用XXA','费用XXB','费用XXC','费用XXD']" :myStyle="{background:'rgba(239, 239, 239, 0.5)' ,width: '70px'}" @setScroll="setRateScrollStyle"></my-actionsheet>
                </div>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="cost-rate" :data="rateData" id="cost-rate"></echarts-bar-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script scoped>
import {PullRefresh} from "vant";
import actionsheet from "./common/actionsheet";
import echartsBarLine from "./common/echarts-bar-line";
import demoData from "./data/demoData";

export default {
    name: "cost",
    components: {
        [PullRefresh.name]: PullRefresh,
        MyActionsheet: actionsheet,
        echartsBarLine
    },
    data() {
        return {
            isLoading: false,
            scroll: "scroll !important",
            rateScroll: '费用合计'
        }
    },
    beforeCreate() {
        
    },
    computed: {
        rateData() {
            return demoData.cost.rate
        },
    },
    mounted() {},
    methods: {
        setRateScrollStyle(style,selected) {
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


.cost-bottom {
    min-height: 200px;
    margin: 0 10px 10px 10px;
}
</style>
