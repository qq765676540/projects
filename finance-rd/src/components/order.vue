<template>
<div class="order flex flex-column">
    <div class="order-base border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">订单情况</span>
            <!-- <span class="sub-title-unit">单位(万)</span> -->
        </div>
        <div style="margin:0px 3px 0px 3px">
            <echarts-bar-line name="order-base" :data="baseData" id="order-base" v-if="baseData"></echarts-bar-line>
        </div>
    </div>
    <div class="order-structure border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name" v-if="orderTitle">{{orderTitle}}</span>
        </div>
        <div class="flex flex-column" style="margin:0px 3px 0px 3px">
            <echarts-pie name="order-structure" :data="structurePieData" id="order-structure" v-if="structurePieData"></echarts-pie>
            <div style="text-align: left;color: #888888;font-size: 14px;">注：此未清指有销售订单但未发货的情况</div>
        </div>
    </div>
    <div class="order-branch flex flex-column" v-if="orderBranchSubtitle!='T'">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">{{orderBranchSubtitle}}</span>
        </div>
        <div class="flex flex-column" style="margin:0px 3px 0px 3px">
            <echarts-bar-line name="order-branch" :data="branchData" id="order-branch" v-if="branchData"></echarts-bar-line>
            <div style="text-align: left;color: #888888;font-size: 14px;padding-top: 5px">注：此未清指有销售订单但未发货的情况</div>
        </div>
    </div>
    <div class="footer-empty"></div>
</div>
</template>

<script>
import ePie from "./common/echarts-pie";
import echartsBarLine from "./common/echarts-bar-line";
import echartsPie from "./common/echarts-pie";
import dataTable from "./common/datatables";
import demoData from "./data/demoData";

export default {
    name: "order",
    components: {
        ePie,
        dataTable,
        echartsBarLine,
        echartsPie
    },
    data() {
        return {

        };
    },
    beforeCreate() {},
    computed: {
        orderTitle() {
            if (this.$store.state['level'].length > 0) {
                let data = this.$store.state['level'][0];
                let orgManager = (data[1].qText == 'LV1' || (data[1].qText == 'LV2' && data[2].qText == 'Y')) ? 'Y' : 'N';
                return orgManager == 'Y' ? '业务部未清金额' : '产品线未清金额'
            }
            return false
        },
        orderBranchSubtitle() {
            let dataScope = this.$store.state['dataScope'];
            let orderBranchSubtitle = '';
            switch (dataScope) {
                case 'I':
                    orderBranchSubtitle = '业务中心未清金额';
                    break;
                case 'O':
                    orderBranchSubtitle = '销售办公室未清金额';
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
                dataArr.sort((a, b) => {
                    return a[0].qText / 1 - b[0].qText / 1;
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
                    data['R']['xAxisData'].push(v[0].qText.substr(2, 2) + '.' + v[0].qText.substr(4, 2));
                    data['R']['seriesData1'].push(v[1].qNum == 'NaN' ? '--' : v[1].qNum);
                    data['R']['seriesData2'].push(v[2].qNum == 'NaN' ? '--' : v[2].qNum);
                    data['R']['seriesData3'].push(v[3].qNum == 'NaN' ? '--' : v[3].qNum);
                    data['R']['seriesData4'].push(v[4].qNum == 'NaN' ? '--' : v[4].qNum);
                    data['U']['xAxisData'].push(v[0].qText.substr(2, 2) + '.' + v[0].qText.substr(4, 2));
                    data['U']['seriesData1'].push(v[5].qNum == 'NaN' ? '--' : v[5].qNum);
                    data['U']['seriesData2'].push(v[6].qNum == 'NaN' ? '--' : v[6].qNum);
                    data['U']['seriesData3'].push(v[3].qNum == 'NaN' ? '--' : v[3].qNum);
                    data['U']['seriesData4'].push(v[4].qNum == 'NaN' ? '--' : v[4].qNum);
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
                    Rtemp.value = v[1].qNum == 'NaN' ? '--' : v[1].qNum;
                    Rtemp.qty = v[2].qNum == 'NaN' ? '--' : v[2].qNum;
                    Utemp.name = v[0].qText;
                    Utemp.value = v[3].qNum == 'NaN' ? '--' : v[3].qNum;
                    Utemp.qty = v[2].qNum == 'NaN' ? '--' : v[2].qNum;
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
                    data['R']['seriesData1'].push(v[1].qNum == 'NaN' ? '--' : v[1].qNum);
                    data['U']['xAxisData'].push(v[0].qText);
                    data['U']['seriesData1'].push(v[2].qNum == 'NaN' ? '--' : v[2].qNum);
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

    }
};
</script>

<style scoped>
.order {
    width: 100%;
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
