<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<div class="vist-warning flex flex-column"  id="vist-warning">
    <div class="customer-distribution border-bottom">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">客用户拜访覆盖</span>
        </div>
        <div style="margin:0px 15px 0px 12px">
            <div style="min-height:60px;margin:10px 0px 0px 0px">
                <my-progress :data="progressData[0]" barBgcolor_i="#1495EB" barWidth="100%" barHeight="10px" barRadius="7px 7px 7px 7px" fontColor="#85a7ff" title="分级客户覆盖率"></my-progress>
            </div>
            <div style="min-height:40px;margin-left: -12px">
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="战略客户" :data="progressData[2]"></my-horkpi>
                </div>
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="核心客户" :data="progressData[3]"></my-horkpi>
                </div>
            </div>
            <div style="min-height:40px;margin-left: -12px">
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="认证客户" :data="progressData[5]"></my-horkpi>
                </div>
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="潜力客户" :data="progressData[4]"></my-horkpi>
                </div>
            </div>
            <div style="min-height:60px;margin:0px 0px 0px 0px">
                <my-progress :data="progressData[1]" barBgcolor_i="#1495EB" barWidth="100%" barHeight="10px" barRadius="7px 7px 7px 7px" fontColor="#85a7ff" title="锁定用户覆盖率"></my-progress>
            </div>
            <div style="min-height:40px;margin-left: -12px">
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="战略锁定" :data="progressData[6]"></my-horkpi>
                </div>
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="核心锁定" :data="progressData[7]"></my-horkpi>
                </div>
            </div>
            <div style="min-height:40px;margin-left: -12px">
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="重要锁定" :data="progressData[9]"></my-horkpi>
                </div>
                <div class="col-xs-6 col-sm-6 text-center">
                    <my-horkpi iconBgColor="#d2eaf5" title="市场锁定" :data="progressData[8]"></my-horkpi>
                </div>
            </div>
        </div>
    </div>
    <div class="covered-customer-detail border-bottom" v-show="true">
        <div class="sub-title">
            <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">拜访未覆盖客户名单</span>
            </div>
            <div class="flex flex-1 flex-justify-right">
                <button class="btn btn-default btn-xs" type="button" style="background: rgba(239, 239, 239, 0.5);width: 90px;margin-right: 10px;margin-top: 3px" @click="onClickA">
                    {{Aselected}}
                    <span class="caret" style="float: right;margin-top:8px"></span>
                </button>
            </div>
        </div>
        <div style="margin:15px 15px 20px 15px;min-height:200px">
            <vant-collapse :id="'plan-collapse-3'" :data="CollapseADataSet[Aselected]" :isDefaultTitle="false" v-if="CollapseADataSet"></vant-collapse>
        </div>
    </div>
    <div class="uncovered-customer-detail" v-show="true">
        <div class="sub-title">
            <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">拜访未覆盖用户名单</span>
            </div>
            <div class="flex flex-1 flex-justify-right">
                <button class="btn btn-default btn-xs" type="button" style="background: rgba(239, 239, 239, 0.5);width: 90px;margin-right: 10px;margin-top: 3px" @click="Ashow=true">
                    {{Bselected}}
                    <span class="caret" style="float: right;margin-top:8px"></span>
                </button>
            </div>
        </div>
        <div style="margin:15px 15px 20px 15px;min-height:200px">
            <vant-collapse :id="'plan-collapse-4'" :data="CollapseBDataSet[Bselected]" :isDefaultTitle="false" v-if="CollapseBDataSet"></vant-collapse>
        </div>
    </div>
    <div class="footer-empty">
    </div>

    <van-dialog v-model="Ashow" title="选项" id="ashow" :lock-scroll="true">
        <van-radio-group v-model="Aselected">
            <van-cell-group>
                <van-cell v-for="(item,index) in ['全部','战略客户','核心客户','认证客户','潜力客户']" :key="index" :title="item" clickable @click="Aselected = item">
                    <van-radio slot="right-icon" :name="item" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-dialog>
</div>
</van-pull-refresh>
</template>

<script>
import table from "./common/datatables";
import progress from "./common/progress";
import horkpi from "./common/horizontal-kpi-ext";
import {
    PullRefresh,
    Dialog,
    RadioGroup,
    Radio,
    CellGroup,
    Cell,
    Popup
} from "vant";
import vantCollapse from "./common/vant-collapse";
export default {
    name: "visit-warning",
    components: {
        [PullRefresh.name]: PullRefresh,
        [Dialog.Component.name]: Dialog.Component,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Popup.name]: Popup,
        MyTable: table,
        MyProgress: progress,
        MyHorkpi: horkpi,
        vantCollapse
    },
    data() {
        return {
            isLoading: false,
            Ashow: false,
            Aselected: "全部",
            Bselected: "全部"
        };
    },
    computed: {
        CollapseADataSet() {
            if (this.$store.state.visitWarningCollapseA1.length > 0) {
                let a1 = this.$store.state.visitWarningCollapseA1;
                let a2 = this.$store.state.visitWarningCollapseA2;
                let data = {
                    全部: [],
                    战略: [],
                    核心: [],
                    潜力: [],
                    认证: []
                };
                let dataIndex0 = this.getData(a1, a2, "全部");
                let dataIndex1 = this.getData(a1, a2, "战略客户");
                let dataIndex2 = this.getData(a1, a2, "核心客户");
                let dataIndex3 = this.getData(a1, a2, "潜力客户");
                let dataIndex4 = this.getData(a1, a2, "认证客户");

                if (this.Aselected === "全部") {
                    data[this.Aselected] = dataIndex0;
                } else if (this.Aselected === "战略客户") {
                    data[this.Aselected] = dataIndex1;
                } else if (this.Aselected === "核心客户") {
                    data[this.Aselected] = dataIndex2;
                } else if (this.Aselected === "潜力客户") {
                    data[this.Aselected] = dataIndex3;
                } else {
                    data[this.Aselected] = dataIndex4;
                }

                // console.log("2019-05-10 16:09:04->YCQ日志记录:", dataIndex0);
                return data;
            }
            return false;
        },
        CollapseBDataSet() {
            if (this.$store.state.visitWarningCollapseB1.length > 0) {
                let a1 = this.$store.state.visitWarningCollapseB1;
                let a2 = this.$store.state.visitWarningCollapseB2;
                let data = {
                    全部: [],
                    战略: [],
                    核心: [],
                    市场: [],
                    重要: []
                };
                let dataIndex0 = this.getData(a1, a2, "全部");
                let dataIndex1 = this.getData(a1, a2, "战略锁定");
                let dataIndex2 = this.getData(a1, a2, "核心锁定");
                let dataIndex3 = this.getData(a1, a2, "市场锁定");
                let dataIndex4 = this.getData(a1, a2, "重要锁定");

                if (this.Bselected === "全部") {
                    data[this.Bselected] = dataIndex0;
                } else if (this.Bselected === "战略锁定") {
                    data[this.Bselected] = dataIndex1;
                } else if (this.Bselected === "核心锁定") {
                    data[this.Bselected] = dataIndex2;
                } else if (this.Bselected === "市场锁定") {
                    data[this.Bselected] = dataIndex3;
                } else {
                    data[this.Bselected] = dataIndex4;
                }

                // console.log("2019-05-10 16:09:04->YCQ日志记录:", dataIndex0);
                return data;
            }
            return false;
        },
        progressData() {
            var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            if (!this.$store.state.visitWarningKPI.length) {
                return result;
            }

            this.$store.state.visitWarningKPI[0].forEach((kpi, index) => {
                if (index < 2) {
                    result.splice(
                        index,
                        1,
                        kpi.qNum === "NaN" ? 0 : kpi.qNum.toFixed(0)
                    );
                } else {
                    result.splice(index, 1, [
                        kpi.qText,
                        (
                            (kpi.qText.split("/")[1] === "0" ||
                                kpi.qText.split("/")[1] === "NaN" ?
                                0 :
                                (
                                    (kpi.qText.split("/")[0] /
                                        kpi.qText.split("/")[1]) *
                                    100
                                ).toFixed(0)) + "%"
                        ).replace("NaN", "0")
                    ]);
                }
            });
            return result;
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
        },
        onClickA() {
            this.Ashow = true;
            this.$nextTick(() => {
                let top = 30 + '%';
                console.log('YCQ日志记录:标识->',$("#routerPage"));
                $('#ashow.van-dialog').css('top', top);
            });
        },
        onASelect(selected) {
            this.Aselected = selected;
        },
        setScrollStyleB(style, selected) {
            this.scroll = style;
            this.Bselected = selected;
        },
        getData(a, b, c) {
            let data = [];
            let tempdb = "";
            a.filter(v => {
                let tmp = {};
                if (
                    tempdb != v[0].qText &&
                    (v[2].qText === c || c === "全部")
                ) {
                    tmp.name = v[0].qText;
                    tmp.title = v[0].qText;
                    tmp.type = v[1].qText;
                    tmp.data =
                        c === "全部" ?
                        v[4].qNum === "NaN" ?
                        0 :
                        v[4].qNum :
                        v[3].qNum === "NaN" ?
                        0 :
                        v[3].qNum;
                    tmp.subData = [];
                    tempdb = v[0].qText;
                    data.push(tmp);
                }
            });

            data.filter(vo => {
                let e = [];
                b.filter(vi => {
                    if (
                        vi[0].qText === vo.name &&
                        (vi[2].qText === c || c === "全部")
                    ) {
                        e.push([vi[1].qText, vi[2].qText, vi[3].qNum]);
                    }
                });
                let f = e.sort((a, b) => {
                    return b[2] - a[2];
                });
                let g = [];
                f.filter(v => {
                    g.push([v[0], v[1]]);
                });
                vo.subData = g;
            });

            return data;
        }
    }
};
</script>

<style scoped>
.padding-empty {
    padding: 0px;
}

.vist-warning {
    width: 100%;
    position: relative;
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}

.van-dialog {
    position: absolute;
    border-radius: 5px;
}

.van-cell__title {
    text-align: left;
}
</style>
