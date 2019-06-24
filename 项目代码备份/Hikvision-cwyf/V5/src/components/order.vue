<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="order flex flex-column">
        <div class="order-base border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">订单情况</span>
                <!-- <span class="sub-title-unit">单位(万)</span> -->
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="order-base" :data="baseData" id="order-base" v-if="baseData"></echarts-bar-line>
            </div>
        </div>
        <div class="order-structure border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name" v-if="orderTitle">{{orderTitle}}</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-pie name="order-structure" :data="structurePieData" id="order-structure" v-if="structurePieData"></echarts-pie>
            </div>
        </div>
        <div class="order-branch flex flex-column" v-if="orderBranchSubtitle!='T'">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">{{orderBranchSubtitle}}</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
                <echarts-bar-line name="order-branch" :data="branchData" id="order-branch" v-if="branchData"></echarts-bar-line>
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
        orderTitle() {
            if (this.$store.state['level'].length > 0) {
                let data = this.$store.state['level'][0];
                let orgManager = (data[1].qText == 'LV1' || (data[1].qText == 'LV2' && data[2].qText == 'Y')) ? 'Y' : 'N';
                return orgManager == 'Y' ? '业务部未清情况':'产品线未清情况'
            }
            return false
        },
        orderBranchSubtitle() {
            let dataScope = this.$store.state['dataScope'];
            let orderBranchSubtitle = '';
            switch (dataScope) {
                case 'I':
                    orderBranchSubtitle = '业务中心未清情况';
                    break;
                case 'O':
                    orderBranchSubtitle = '销售办公室未清情况';
                    break;
                default:
                    orderBranchSubtitle = 'T';
                    break;
            }
            return orderBranchSubtitle;
        },
        baseData() {
            if (this.$store.state['order-base'].length > 0) {
                let dataArr = this.$store.state['order-base'];
                dataArr.sort((a,b) => {
                    return a[0].qText/1 - b[0].qText/1;
                });
                let data = {
                    R: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: [],
                        seriesData4: []
                    },
                    U: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: [],
                        seriesData4: []
                    }
                };
                dataArr.filter(v => {
                    data['R']['xAxisData'].push(v[0].qText);
                    data['R']['seriesData1'].push(v[1].qNum);
                    data['R']['seriesData2'].push(v[2].qNum);
                    data['R']['seriesData3'].push(v[3].qNum);
                    data['R']['seriesData4'].push(v[4].qNum);
                    data['U']['xAxisData'].push(v[0].qText);
                    data['U']['seriesData1'].push(v[5].qNum);
                    data['U']['seriesData2'].push(v[6].qNum);
                    data['U']['seriesData3'].push(v[3].qNum);
                    data['U']['seriesData4'].push(v[4].qNum);
                });
                // console.log('YCQ日志记录:标识->',data);
                return data[this.$store.state['currency']];
                // return demoData.orderData.base
            }
            return false;
            // return demoData.orderData.base
        },
        structurePieData() {
            if (this.$store.state['order-structure'].length > 0) {
                let dataArr = this.$store.state['order-structure'];
                let data = {
                    R: {
                        pie: []
                    },
                    U: {
                        pie: []
                    }
                };
                dataArr.filter(v => {
                    let Rtemp = {};
                    let Utemp = {};
                    Rtemp.name = v[0].qText;
                    Rtemp.value = v[1].qNum;
                    Rtemp.qty = v[2].qNum;
                    Utemp.name = v[0].qText;
                    Utemp.value = v[3].qNum;
                    Utemp.qty = v[2].qNum;
                    data['R']['pie'].push(Rtemp);
                    data['U']['pie'].push(Utemp);
                    
                });
                // console.log('YCQ日志记录:标识->',data);
                return data[this.$store.state['currency']];
                // return demoData.orderData.structure
            }
            return false;
            // return demoData.orderData.structure
        },
        branchData() {
            if (this.$store.state['order-branch'].length > 0) {
                let dataArr = this.$store.state['order-branch'];
                let data = {
                    R: {
                        xAxisData: [],
                        seriesData1: []
                    },
                    U: {
                        xAxisData: [],
                        seriesData1: []
                    }
                };
                dataArr.filter(v => {
                    data['R']['xAxisData'].push(v[0].qText);
                    data['R']['seriesData1'].push(v[1].qNum);
                    data['U']['xAxisData'].push(v[0].qText);
                    data['U']['seriesData1'].push(v[2].qNum);
                });
                // console.log('YCQ日志记录:标识->',data);
                return data[this.$store.state['currency']];
                // return demoData.orderData.branch
            }
            return false;
            // return demoData.orderData.branch
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
