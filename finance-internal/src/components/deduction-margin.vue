<template>
<div class="constitute">
    <div class="margin-view border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">扣费毛利概览</span>
        </div>
        <div class="content-box flex flex-column flex-1">
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin-left: 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_7" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_8" v-if="kpiData"></easy-kpi>
                </div>
            </div>
        </div>
    </div>
    <div class="margin-avg flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">人均效能</span>
            <div class="flex flex-1 flex-justify-right">
                <button class="btn btn-default btn-xs" type="button" style="background: rgba(239, 239, 239, 0.5);width: 140px;margin-right: 10px;margin-top: 3px" @click="selectedHandle">
                    {{selected}}
                    <span class="caret" style="float: right;margin-top:8px"></span>
                </button>
            </div>
        </div>
        <div class="content">
            <div v-if="selected == '人均收入'" class="flex flex-column">
                <per-recive :update="update" :data="chartsData.perRecive" v-if="chartsData"></per-recive>
            </div>
            <div v-if="selected == '人均费用'" class="flex flex-column">
                <per-cost :update="update" :data="chartsData.perCost" v-if="chartsData"></per-cost>
            </div>
            <div v-if="selected == '人均扣费毛利'" class="flex flex-column">
                <deduction-margin-per :update="update" :data="chartsData.deMarginPer" v-if="chartsData"></deduction-margin-per>
            </div>
            <div v-if="selected == '扣费毛利/人力成本'" class="flex flex-column">
                <deduction-margin-cost :update="update" :data="chartsData.deMarginCost" v-if="chartsData"></deduction-margin-cost>
            </div>
        </div>
    </div>
    <van-dialog v-model="dialogShow" title="选项">
        <van-radio-group v-model="selected">
            <van-cell-group>
                <van-cell v-for="(item,index) in costList" :key="index" :title="item" clickable @click="selected = item;update++">
                    <van-radio slot="right-icon" :name="item" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</div>
</template>

<script>
import {
    Dialog,
    RadioGroup,
    Radio,
    CellGroup,
    Cell
} from "vant";
import easyKpi from "./common/easy-kpi-ext";
import deductionMarginPer from "./deductionMargin/deduction-margin-per";
import deductionMarginCost from "./deductionMargin/deduction-margin-cost";
import perCost from "./deductionMargin/per-cost";
import perRecive from "./deductionMargin/per-recive";
import accounting from "accounting";
export default {
    components: {
        [Dialog.Component.name]: Dialog.Component,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        easyKpi,
        deductionMarginPer,
        deductionMarginCost,
        perCost,
        perRecive
    },
    data() {
        return {
            update: 0,
            dialogShow: false,
            selected: "人均收入",
            costList: ["人均收入", "人均费用", "人均扣费毛利", "扣费毛利/人力成本"],
            active: 0
        };
    },
    mounted() {},
    computed: {
        kpiData() {
            if (this.$store.state["over-all-kpi"].length > 0) {
                let dataArr = this.$store.state["over-all-kpi"][0];
                let kpiData = {
                    kpi_7: [
                        ['扣费毛利', dataArr[16].qText, ''],
                        ['同比', dataArr[17].qText, ''],
                        ['', '', '']
                    ],
                    kpi_8: [
                        ['扣费毛利率', dataArr[18].qText, ''],
                        ['上年同期', dataArr[19].qText, ''],
                        ['', '', '']
                    ]
                };
                return kpiData;
            }
            return false;
            // return demoData.homeData.overview
        },
        chartsData() {
            if (this.$store.state["de-margin-per"].length > 0) {
                var data = this.$store.state["de-margin-per"];
                data = data.sort((a, b) => {
                    return a[0].qText - b[0].qText;
                });
                var obj = {
                    perRecive: [],
                    perCost: [],
                    deMarginPer: [],
                    deMarginCost: []
                };
                data.forEach((i, index) => {
                    obj.perRecive[index] = {};
                    obj.perRecive[index].name = i[0].qText;
                    obj.perRecive[index].value =
                        i[1].qText == "-" ? 0 : parseFloat(i[1].qText / 10000).toFixed(1) - 0;

                    obj.perCost[index] = {};
                    obj.perCost[index].name = i[0].qText;
                    obj.perCost[index].value =
                        i[2].qText == "-" ? 0 : parseFloat(i[2].qText / 10000).toFixed(1) - 0;

                    obj.deMarginPer[index] = {};
                    obj.deMarginPer[index].name = i[0].qText;
                    obj.deMarginPer[index].value =
                        i[3].qText == "-" ? 0 : parseFloat(i[3].qText / 10000).toFixed(1) - 0;

                    obj.deMarginCost[index] = {};
                    obj.deMarginCost[index].name = i[0].qText;
                    obj.deMarginCost[index].value =
                        i[4].qText == "-" ? 0 : parseFloat(i[4].qText).toFixed(1) - 0;

                });
                return obj;
            }
            return false;
        }
    },
    methods: {
        selectedHandle() {
            this.dialogShow = true;
        }
    }
};
</script>

<style scoped>
.constitute {
    width: 100%;
    position: relative;
}

.margin-view {
    min-height: 190px;
}

.margin-avg {
    min-height: 330px;
}

.selection {
    width: 120px;
    height: 27px;
    border: 1px solid #29a6ff;
    background-color: #29a6ff;
    color: #ffffff;
    border-radius: 4px;
    font-size: 12px;
    line-height: 27px;
    text-align: center;
    margin-right: 8px;
    margin-top: 2px;
}

.desc {
    font-style: normal;
    text-align: left;
    color: #999999;
}

.num {
    font-style: normal;
    color: #666666;
    padding-left: 4px;
}

.height .num {
    line-height: 52px;
}

.height .desc {
    line-height: 52px;
}

.barDesc {
    position: relative;
    top: -7px;
    left: 7px;
}

.margin10 {
    margin: 10px;
}

.mainnum {
    font-size: 40px;
    font-style: normal;
    line-height: 52px;
}

.van-dialog {
    position: absolute;
    border-radius: 5px;
}

.van-cell__title {
    text-align: left;
}
</style>
