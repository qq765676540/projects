<template>
<div class="constitute">
    <div class="cost-view border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">重点费用情况</span>
        </div>
        <div class="content flex flex-column overall" style="padding: 0px 5px 0px 5px;">
            <div class="flex flex-1 flex-row">
                <div class="flex flex-1 flex-column con" v-if="costAll">
                    <div class="flex-1 conTitle">人力成本</div>
                    <div class="flex-1 conNum">{{costAll[0]}}</div>
                    <div class="flex-1 warning">{{costAll[1]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[2]}}%</div>
                </div>
                <div class="flex flex-1 flex-column con" v-if="costAll">
                    <div class="flex-1 conTitle">业务招待</div>
                    <div class="flex-1 conNum">{{costAll[3]}}</div>
                    <div class="flex-1 warning">{{costAll[4]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[5]}}%</div>
                </div>
                <div class="flex flex-1 flex-column con" v-if="costAll">
                    <div class="flex-1 conTitle">差旅支出</div>
                    <div class="flex-1 conNum">{{costAll[6]}}</div>
                    <div class="flex-1 warning">{{costAll[7]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[8]}}%</div>
                </div>
            </div>
            <div class="flex flex-1 flex-row" v-if="costAll">
                <div class="flex flex-1 flex-column con">
                    <div class="flex-1 conTitle">物流成本</div>
                    <div class="flex-1 conNum">{{costAll[9]}}</div>
                    <div class="flex-1 warning">{{costAll[10]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[11]}}%</div>
                </div>
                <div class="flex flex-1 flex-column con" v-if="costAll">
                    <div class="flex-1 conTitle">日常交通</div>
                    <div class="flex-1 conNum">{{costAll[12]}}</div>
                    <div class="flex-1 warning">{{costAll[13]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[14]}}%</div>
                </div>
                <div class="flex flex-1 flex-column con" v-if="costAll">
                    <div class="flex-1 conTitle">退货拆解</div>
                    <div class="flex-1 conNum">{{costAll[15]}}</div>
                    <div class="flex-1 warning">{{costAll[16]}}</div>
                    <div class="flex-1 conDesc">同&nbsp;&nbsp;&nbsp;比&nbsp;{{costAll[17]}}%</div>
                </div>
            </div>
        </div>
    </div>
    <div class="cost-structure border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">费用结构</span>
        </div>
        <div class="content">
            <cost-card id="cost-structure" :data="pieData" v-if="pieData"></cost-card>
        </div>
    </div>
    <div class="cost-detail flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">详情页</span>
            <div class="flex flex-1 flex-justify-right">
                <button class="btn btn-default btn-xs" type="button" style="background: rgba(239, 239, 239, 0.5);width: 90px;margin-right: 10px;margin-top: 3px" @click="selectedHandle">
                    {{selected}}
                    <span class="caret" style="float: right;margin-top:8px"></span>
                </button>
            </div>
        </div>
        <div class="content">
            <div v-if="selected == '人力成本'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-11'" :data="humanCost[0]" v-if="humanCost"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-12'" :data="humanCost[1]" v-if="humanCost"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                    <div class="flex flex-column flex-1">
                        <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="humanCost">
                            <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{humanCost[2]}}</div>
                        </div>
                        <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="humanCost">
                            <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{humanCost[4]}}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selected == '广宣费用'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-21'" :data="gxcb[0]" v-if="gxcb"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-22'" :data="gxcb[1]" v-if="gxcb"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                    <div class="flex flex-column flex-1">
                        <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="gxcb">
                            <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{gxcb[2]}}</div>
                        </div>
                        <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="gxcb">
                            <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{gxcb[4]}}%</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selected == '物流成本'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-31'" :data="wlcb[0]" v-if="wlcb"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-32'" :data="wlcb[1]" v-if="wlcb"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                <div class="flex flex-column flex-1">
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="wlcb">
                        <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{wlcb[2]}}</div>
                    </div>
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="wlcb">
                        <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{wlcb[4]}}%</div>
                    </div>
                </div>
                </div>
            </div>
            <div v-if="selected == '营销成本'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-41'" :data="yxcb[0]" v-if="yxcb"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-42'" :data="yxcb[1]" v-if="yxcb"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                <div class="flex flex-column flex-1">
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="yxcb">
                        <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{yxcb[2]}}</div>
                    </div>
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="yxcb">
                        <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{yxcb[4]}}%</div>
                    </div>
                </div>
                </div>
            </div>
            <div v-if="selected == '差旅费用'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-51'" :data="clfy[0]" v-if="clfy"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-52'" :data="clfy[1]" v-if="clfy"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                <div class="flex flex-column flex-1">
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="clfy">
                        <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{clfy[2]}}</div>
                    </div>
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="clfy">
                        <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{clfy[4]}}%</div>
                    </div>
                </div>
                </div>
                <div class="flex flex-1 flex-column" style="margin: 10px">
                    <my-datatable v-if="clfyTable" id="table1" :data="clfyTable.row" :title="clfyTable.title"></my-datatable>
                </div>
            </div>
            <div v-if="selected == '业务招待'" class="flex flex-column" style="margin-top:10px">
                <div class="flex flex-justify-center">
                    <div class="flex flex-column flex-1">
                        <vant-pie :id="'pie-61'" :data="ywzd[0]" v-if="ywzd"></vant-pie>
                        <div class="center">预算完成率</div>
                    </div>
                    <div class="flex flex-column flex-1" style="margin-right:20px">
                        <vant-pie :id="'pie-62'" :data="ywzd[1]" v-if="ywzd"></vant-pie>
                        <div class="center">全年预算进度</div>
                    </div>
                <div class="flex flex-column flex-1">
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="ywzd">
                        <div class="flex flex-justify-left">本期费用&nbsp;&nbsp;{{ywzd[2]}}</div>
                    </div>
                    <div class="flex flex-1 flex-justify-left flex-align-bottom" v-if="ywzd">
                        <div class="flex flex-justify-left" style="margin-left:1px">同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比&nbsp;&nbsp;{{ywzd[4]}}%</div>
                    </div>
                </div>
                </div>
                <div class="flex flex-1 flex-column" style="margin: 10px">
                    <my-datatable v-if="ywzdTable" id="table2" :data="ywzdTable.row" :title="ywzdTable.title"></my-datatable>
                </div>
            </div>
            <div v-if="selected == '日常开支'" class="flex flex-column" style="margin-top:10px">
                <div class="flex margin4">
                    <div class="flex flex-1" v-if="rckz">本年费用&nbsp;&nbsp;{{rckz[0]}}</div>
                    <div class="flex flex-1" v-if="rckz">完成率&nbsp;&nbsp;{{rckz[1]}}%</div>
                </div>
                <div class="flex margin4">
                    <div class="flex flex-1" v-if="rckz">同比增长&nbsp;&nbsp;{{rckz[2]}}%</div>
                    <div class="flex flex-1" v-if="rckz">全年预算进度&nbsp;&nbsp;{{rckz[3]}}%</div>
                </div>
                <div class="flex flex-justify-center">
                    <normal-bar style="padding-left: 20px" :update="update" :data="rckzTable" v-if="rckzTable"></normal-bar>
                </div>
            </div>
        </div>
    </div>
    <van-dialog v-model="dialogShow" title="选项">
        <van-radio-group v-model="selected">
            <template v-for="(item,index) in costList">
                <van-cell-group :key="index">
                    <van-cell :title="item" clickable @click="selected = item;update++">
                        <van-radio :name="item" />
                    </van-cell>
                </van-cell-group>
            </template>
        </van-radio-group>
    </van-dialog>
</div>
</template>

<script>
import costCard from "./cost/cost-card";
import normalBar from "./cost/normal-bar";
import vantPie from "./common/vant-pie";
import costTable from "./cost/cost-table";
import myDatatable from "./common/datatables";
import accounting from "accounting";
export default {
    components: {
        costCard,
        normalBar,
        vantPie,
        costTable,
        myDatatable
    },
    data() {
        return {
            travelTable: {
                title: [{
                        name: "人名",
                        style: {},
                        rowStyle: {}
                    },
                    {
                        name: "费用金额",
                        style: {},
                        rowStyle: {}
                    },
                    {
                        name: "占比",
                        style: {},
                        rowStyle: {}
                    }
                ],
                row: [
                    ["张三", 222, "20%"],
                    ["张三", 222, "20%"]
                ]
            },
            update: 0,
            dialogShow: false,
            selected: "人力成本",
            costList: [
                "人力成本",
                "广宣费用",
                "物流成本",
                "营销成本",
                "差旅费用",
                "业务招待",
                "日常开支"
            ]
        };
    },
    mounted() {},
    computed: {
        costAll() {
            var arr = [
                0,
                " ",
                0,
                0,
                " ",
                0,
                0,
                " ",
                0,
                0,
                " ",
                0,
                0,
                " ",
                0,
                0,
                " ",
                0
            ];
            if (this.$store.state["cost-main"].length) {
                var data = this.$store.state["cost-main"][0];
                arr = [
                    data[0].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[0].qText) / 10000),
                    data[1].qText == "-" || parseFloat(data[1].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[1].qText) * 100).toFixed() - 100) +
                    "%",
                    data[2].qText == "-" ?
                    0 :
                    (parseFloat(data[2].qText) * 100).toFixed(1),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" || parseFloat(data[4].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[4].qText) * 100).toFixed() - 100) +
                    "%",
                    data[5].qText == "-" ?
                    0 :
                    (parseFloat(data[5].qText) * 100).toFixed(1),
                    data[6].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[6].qText) / 10000),
                    data[7].qText == "-" || parseFloat(data[7].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[7].qText) * 100).toFixed() - 100) +
                    "%",
                    data[8].qText == "-" ?
                    0 :
                    (parseFloat(data[8].qText) * 100).toFixed(1),
                    data[9].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[9].qText) / 10000),
                    data[10].qText == "-" || parseFloat(data[10].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[10].qText) * 100).toFixed() - 100) +
                    "%",
                    data[11].qText == "-" ?
                    0 :
                    (parseFloat(data[11].qText) * 100).toFixed(1),
                    data[12].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[12].qText) / 10000),
                    data[13].qText == "-" || parseFloat(data[13].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[13].qText) * 100).toFixed() - 100) +
                    "%",
                    data[14].qText == "-" ?
                    0 :
                    (parseFloat(data[14].qText) * 100).toFixed(1),
                    data[15].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[15].qText) / 10000),
                    data[16].qText == "-" || parseFloat(data[16].qText) < 1 ?
                    "" :
                    "超预算 " +
                    ((parseFloat(data[16].qText) * 100).toFixed() - 100) +
                    "%",
                    data[17].qText == "-" ?
                    0 :
                    (parseFloat(data[17].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        pieData() {
            var arr = [];
            if (this.$store.state["cost-pie"].length>0) {
                var data = this.$store.state["cost-pie"];
                data.forEach(i => {
                    arr.push({
                        value: i[1].qText,
                        name: i[0].qText
                    });
                });
                return arr;
            }
            return false;
        },
        humanCost() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-rlcb"].length) {
                var data = this.$store.state["cost-rlcb"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        gxcb() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-gxfy"].length) {
                var data = this.$store.state["cost-gxfy"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        wlcb() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-wlcb"].length) {
                var data = this.$store.state["cost-wlcb"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        yxcb() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-yxcb"].length) {
                var data = this.$store.state["cost-yxcb"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        clfy() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-clfy"].length) {
                var data = this.$store.state["cost-clfy"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        clfyTable() {
            var table = {
                title: ["姓名", "金额TOP5", "占比"],
                row: []
            };
            if (this.$store.state["cost-clfy-chart"].length) {
                var data = this.$store.state["cost-clfy-chart"];
                data.forEach((i, index) => {
                    if (index < 5) {
                        table.row.push([
                            i[0].qText,
                            i[1].qText == "-" ?
                            0 :
                            (i[1].qNum / 10000).toFixed(1),
                            i[2].qText == "-" ? 0 : (parseFloat(i[2].qText) * 100).toFixed(1) + '%'
                        ]);
                    }
                });
                return table;
            }
            return false;
        },
        ywzd() {
            var arr = [{
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                0,
                0,
                0
            ];
            if (this.$store.state["cost-ywzd"].length) {
                var data = this.$store.state["cost-ywzd"][0];
                arr = [{
                        size: "60px",
                        rate: data[0].qText == "-" ?
                            0 : (parseFloat(data[0].qText) * 100).toFixed(1) - 0
                    },
                    {
                        size: "60px",
                        rate: data[1].qText == "-" ?
                            0 : (parseFloat(data[1].qText) * 100).toFixed(1) - 0
                    },
                    data[2].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[2].qText) / 10000),
                    data[3].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[3].qText) / 10000),
                    data[4].qText == "-" ?
                    0 :
                    (parseFloat(data[4].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        ywzdTable() {
            var table = {
                title: ["姓名", "金额TOP5", "占比"],
                row: []
            };
            if (this.$store.state["cost-ywzd-chart"].length) {
                var data = this.$store.state["cost-ywzd-chart"];
                data.forEach((i, index) => {
                    if (index < 5) {
                        table.row.push([
                            i[0].qText,
                            i[1].qText == "-" ?
                            0 :
                            (i[1].qNum / 10000).toFixed(1),
                            i[2].qText == "-" ? 0 : (parseFloat(i[2].qText) * 100).toFixed(1) + '%'
                        ]);
                    }
                });
                return table;
            }
            return false;
        },
        rckz() {
            var arr = [0, 0, 0, 0];
            if (this.$store.state["cost-rckz"].length) {
                var data = this.$store.state["cost-rckz"][0];
                arr = [
                    data[0].qText == "-" ?
                    0 :
                    accounting.formatNumber(parseInt(data[0].qText) / 10000),
                    data[1].qText == "-" ?
                    0 :
                    (parseFloat(data[1].qText) * 100).toFixed(1),
                    data[2].qText == "-" ?
                    0 :
                    (parseFloat(data[2].qText) * 100).toFixed(1),
                    data[3].qText == "-" ?
                    0 :
                    (parseFloat(data[3].qText) * 100).toFixed(1)
                ];
                return arr;
            }
            return false;
        },
        rckzTable() {
            var table = [];
            if (this.$store.state["cost-rckz-chart"].length) {
                var data = this.$store.state["cost-rckz-chart"];
                data.forEach(i => {
                    table.push({
                        name: i[0].qText,
                        value: i[1].qText == "-" ? 0 : parseInt(i[1].qText / 10000),
                    });
                });
                return table;
            }
            return false;
        }
    },
    methods: {
        selectedHandle() {
            this.dialogShow = true;
        },
        clickHandle(item) {
            this.selected = item;
        }
    }
};
</script>

<style scoped>
.constitute {
    width: 100%;
    overflow-y: scroll !important;
}

.cost-view {
    min-height: 240px;
}

.cost-structure {
    min-height: 220px;
}

.cost-detail {
    min-height: 190px;
}

.selection {
    width: 80px;
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

.conTitle {
    font-size: 14px;
    line-height: 30px;
    color: #333333;
}

.conNum {
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
}

.warning {
    font-size: 13px;
    line-height: 13px;
    color: #666666;
}

.conDesc {
    font-size: 13px;
    line-height: 20px;
    color: #666666;
}

.center {
    text-align: center;
    margin: 0 auto;
    vertical-align: middle;
}

.conDesci>i {
    font-style: normal;
    margin: 6px 4px;
}

.margin4 {
    margin-left: 40px;
    padding-bottom: 10px;
}

.con {
    border: 1px solid rgba(0, 0, 0, 0);
    margin: 5px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #e9e9e9, 2px 2px 5px #e9e9e9, 2px 2px 5px #e9e9e9, 2px 2px 10px #e9e9e9;
}

.con>div {
    width: 100%;
    text-align: center;
}

.van-cell__title {
    text-align: left;
}
</style>
