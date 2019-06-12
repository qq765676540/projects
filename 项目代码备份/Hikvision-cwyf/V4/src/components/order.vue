<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="order flex flex-column">
        <div class="order-base border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">订单情况</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="order-base" :data="baseData" id="order-base"></echarts-bar-line>
            </div>
        </div>
        <div class="order-structure border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">产品线未清情况</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-pie name="order-structure" :data="structurePieData" id="order-structure" v-if="structurePieData"></echarts-pie>
            </div>
        </div>
        <div class="order-branch flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">分公司未清情况</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="order-branch" :data="branchData" id="order-branch"></echarts-bar-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";

import ePie from "./common/echarts-pie";
import echartsBarLine from "./common/echarts-bar-line";
import echartsPie from "./common/echarts-pie";
import dataTable from "./common/datatables";
import demoData from "./data/demoData";

export default {
    name: "order",
    components: {
        [PullRefresh.name]: PullRefresh,
        ePie,
        dataTable,
        echartsBarLine,
        echartsPie
    },
    data() {
        return {
            isLoading: false
        };
    },
    beforeCreate() {},
    computed: {
        baseData() {
            return demoData.orderData.base
        },
        structurePieData() {
            return demoData.orderData.structure
        },
        branchData() {
            return demoData.orderData.branch
        },
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
.order {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.order .order-base {
    min-height: 350px;
}

.order .order-structure {
    min-height: 350px;
}

.order .order-branch {
    min-height: 350px;
}
</style>
