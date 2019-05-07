<template>
    <div :id="id+'box'" class="pie-datatables flex flex-column">
        <div class="flex flex-11 flex-row col-pie">
            <e-pie
                class="flex flex-1"
                :id="id+'ePieA'"
                :title="config.params_1.title"
                :config="config.params_1"
                :data="eData_1"
            ></e-pie>
            <e-pie
                class="flex flex-1"
                :id="id+'ePieB'"
                :title="config.params_2.title"
                :config="config.params_2"
                :data="eData_2"
            ></e-pie>
        </div>
        <div class="col-bottom">
            <table class="display flex-3" style="width:100%" :id="id">
                <thead v-show="isShowTitle">
                    <tr>
                        <th v-for="(v,i) in thead" :key="i" class="table-title-row">{{v}}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="i in tableData.length" :key="i">
                        <td
                            v-for="(item,index) in (tableData[i-1].value?tableData[i-1].value:tableData[i-1])"
                            :key="index" :style="{'text-align':index>0?'center':'left'}"
                        >
                            <div v-if="index < 1" class="first-td flex flex-align-center">
                                <div class="col-xs-2 col-sm-2">
                                    <div
                                        v-if="tableData[i-1].color"
                                        class="title-name-icon"
                                        :style="{'background':tableData[i-1].color}"
                                    ></div>
                                </div>
                                <div
                                    class="col-xs-6 col-sm-6"
                                    :style="'white-space: nowrap;text-align: left;'"
                                >{{item}}</div>
                            </div>
                            <div v-if="index > 0" class="flex flex-justify-center">{{item}}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
require("datatables.net");
require("datatables.net-fixedheader");

import ePie from "../common/echarts-pie";

export default {
    name: "pie-table",
    components: {
        ePie
    },
    props: {
        id: {
            type: String,
            default() {
                return $.getRandomString(7);
            }
        },
        dataRows: {
            type: Object,
            default() {
                return {};
            }
        },
        thead: {
            type: Array,
            default() {
                return [];
            }
        },
        orderBy: {
            default: "1|desc"
        },
        isShowTitle: {
            type: Boolean,
            default: true
        },
        config: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            pieData: {},
            eData_1: [],
            eData_2: [],
            tableData: [],
            tabInstance: null
        };
    },
    created() {
        this.setPieData(this.dataRows);
    },
    mounted() {
        this.tabInstance = $("#" + this.id).DataTable({
            fixedHeader: true,
            scrollY: 163,
            paging: false,
            searching: false,
            info: false,
            columnDefs: [
                {
                    orderable: false,
                    targets: 0
                }
            ]
        });

        this.tabInstance
            .column("1:visible")
            .order("desc")
            .draw();

        $(".dataTables_wrapper.no-footer .dataTables_scrollBody").css(
            "border",
            "none"
        );
        this.tabInstance.on("order.dt", () => {
            this.init(1);
        });
    },
    methods: {
        init(a) {
            var _self = this;
            let tmpPieData = this.pieData.yData;

            _self.putData(tmpPieData);

            var order = this.tabInstance.order();

            let dOrder = order[0][1] === "asc" ? 1 : -1;

            if (order[0][0] === 1) {
                tmpPieData.sort((a, b) => {
                    return (a.customVal - b.customVal) * dOrder;
                });
                _self.putData(tmpPieData);
            }
            if (order[0][0] === 2) {
                tmpPieData.sort((a, b) => {
                    return (a.visitVal - b.visitVal) * dOrder;
                });
                _self.putData(tmpPieData);
            }
        },
        putData(_data) {
            let tmp1 = [],
                tmp2 = [];
            _data.forEach(item => {
                tmp1.push({
                    name: item.name,
                    itemStyle: {
                        color: item.itemStyle.color
                    },
                    value: item.customVal
                });
                tmp2.push({
                    name: item.name,
                    itemStyle: {
                        color: item.itemStyle.color
                    },
                    value: item.visitVal
                });
            });
            this.eData_1 = tmp1;
            this.eData_2 = tmp2;
        },
        setPieData(rows) {
            rows = rows || [];
            rows.sort((a, b) => {
                return b[1].qNum - a[1].qNum;
            });
            var ret = {
                xData: [],
                yData: []
            };
            this.tableData = [];
            rows.forEach((row, index) => {
                var col1 = row[0].qText,
                    col2 = row[1].qNum,
                    col3 = row[2].qNum;

                ret.xData.push(col1);

                ret.yData.push({
                    name: row[0].qText,
                    customVal: col2,
                    visitVal: col3,
                    itemStyle: {
                        color: this.config.colorList[index]
                    }
                });

                this.tableData.push({
                    value: [col1, col2, col3],
                    color: this.config.colorList[index]
                });
            });
            var _self = this;
            _self.putData(ret.yData);
            this.pieData = ret;
        },
        isDiff(nData, oData) {
            return JSON.stringify(nData) != JSON.stringify(oData);
        }
    },
    computed: {},
    watch: {
        dataRows: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    console.log("nVal", oVal);
                    this.setPieData(nVal);
                    $("#" + this.id)
                        .on("init.dt", function() {})
                        .dataTable();
                }
            },
            deep: true
        }
    },
    destroyed() {
        // $("#" + this.id + "_table").off("order.dt");
    }
};
</script>

<style scoped>
* {
    padding: 0;
}

@import "../../assets/css/jquery.dataTables.min.css";
@import "../../assets/css/fixedHeader.dataTables.min.css";

.pie-datatables >>> table.dataTable thead th,
.pie-datatables >>> table.dataTable thead td {
    border-bottom: none;
}

.pie-datatables >>> table.dataTable.stripe tbody tr.odd,
.pie-datatables >>> table.dataTable.display tbody tr.odd {
    background-color: #fbfbfb;
}

.pie-datatables >>> table.dataTable.row-border tbody th,
.pie-datatables >>> table.dataTable.row-border tbody td,
.pie-datatables >>> table.dataTable.display tbody th,
.pie-datatables >>> .pie-datatables table.dataTable.display tbody td {
    border-top: 0.025rem solid #e9e2e2 !important;
}

.pie-datatables >>> table.dataTable.display tbody tr.even > .sorting_1,
.pie-datatables
    >>> table.dataTable.order-column.stripe
    tbody
    tr.even
    > .sorting_1 {
    background-color: #ffffff;
}

.pie-datatables >>> table.dataTable.display tbody tr.odd > .sorting_1,
.pie-datatables
    >>> table.dataTable.order-column.stripe
    tbody
    tr.odd
    > .sorting_1 {
    background-color: #fbfbfb;
}

.pie-datatables .col-bottom {
    min-height: 200px;
    margin: 0 40px 10px 40px;
}

.pie-datatables .title-name-icon {
    width: 10px;
    height: 4px;
    border-radius: 3px;
}

.pie-datatables {
    margin-left: 20px;
}

.pie-datatables .table-title-row {
    text-align: center;
    white-space: nowrap;
    color: rgb(136, 136, 136);
}

.pie-datatables .col-pie {
    min-height: 200px;
}
</style>
