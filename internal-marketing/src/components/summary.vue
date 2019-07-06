<template>
<div class="summary">
    <div class="sales-plan border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">销售日志</span>
        </div>
        <div class="content-box flex flex-10 flex-column">
            <div class="flex flex-3 col-2-pie">
                <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                    <vant-pie :id="'pie-1'" :rate="pieData[0]" :size="pieSize"></vant-pie>
                </div>
                <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                    <vant-pie :id="'pie-2'" :rate="pieData[1]" :size="pieSize"></vant-pie>
                </div>
                <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                    <vant-pie :id="'pie-3'" :rate="pieData[2]" :size="pieSize"></vant-pie>
                </div>
                <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                    <vant-pie :id="'pie-4'" :rate="pieData[3]" :size="pieSize"></vant-pie>
                </div>
            </div>
            <div class="flex flex-1 flex-row">
                <div class="flex flex-1 flex-justify-center flex-align-center">
                    <button class="col-2-button" :class="btActive[0]" @click="changeActiveBt(0)">计划填写率</button>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center">
                    <button class="col-2-button" :class="btActive[1]" @click="changeActiveBt(1)">工作记录填写率</button>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center">
                    <button class="col-2-button" :class="btActive[2]" @click="changeActiveBt(2)">计划执行率</button>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center">
                    <button class="col-2-button" :class="btActive[3]" @click="changeActiveBt(3)">有效拜访率</button>
                </div>
            </div>
            <div class="col-2-kpi flex flex-justify-center flex-align-center">
                <div class="flex flex-1 flex-row flex-justify-center">
                    <div class="col-xs-7 col-sm-7 text-center">
                        <my-horkpi iconSize="4px" iconBgColor="#d2eaf5" :title="kpiName[btActiveNum][0]" :data="kpiDataSet[0]" :iconImgShow="false" v-if="kpiDataSet"></my-horkpi>
                    </div>
                    <div class="col-xs-5 col-sm-5 text-center" style="padding-right:0 !important;">
                        <my-horkpi iconSize="4px" iconBgColor="#d2eaf5" :title="kpiName[btActiveNum][1]" :data="kpiDataSet[1]" :iconImgShow="false" v-if="kpiDataSet"></my-horkpi>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="org-structure border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="flex flex-1 sub-title-name flex-justify-left">组织架构</span>
            <div class="flex flex-1 flex-justify-center col-2-right-title">
                <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[3]}">
                    <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[0]}"></div>
                    <span>有效拜访率<span :style="{'color': col2LegendColor[0]}">↑</span></span>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[3]}">
                    <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[1]}"></div>
                    <span>拜访数</span>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[3]}">
                    <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[2]}"></div>
                    <span>计划执行率</span>
                </div>
            </div>
        </div>
        <div class="content-box">
            <vant-collapse :id="'collapse-1'" :col2LegendColor="col2LegendColor" :data="orgListDataSet" :isDefaultTitle="true" v-if="orgListDataSet"></vant-collapse>
        </div>
    </div>
    <div class="vist-num-trend border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">拜访次数周趋势</span>
            <span class="sub-title-unit">单位(次数)</span>
        </div>
        <easy-line :id="'line-1'" :data="ElineDataASet" v-if="ElineDataASet"></easy-line>
    </div>
    <div class="vist-customer-trend flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">拜访客用户周趋势</span>
            <span class="sub-title-unit">单位(个数)</span>
            <div class="flex flex-1 flex-justify-right col-2-right-title">
                <div class="flex flex-justify-center flex-align-center" :style="{'color':col2LegendColor[3]}">
                    <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[1]}"></div>
                    <span>用户数</span>
                </div>
                <div class="flex flex-justify-center flex-align-center" :style="{'color':col2LegendColor[3]}">
                    <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[0]}"></div>
                    <span>客户数</span>
                </div>
            </div>
        </div>
        <easy-line :id="'line-2'" :data="ElineDataBSet" v-if="ElineDataBSet"></easy-line>
    </div>
    <div class="footer-empty">
    </div>
</div>
</template>

<script>
import {
    Button,
    Loading
} from "vant";
import vantPie from "./common/vant-pie";
import vantCollapse from "./common/org-vant-collapse";
import easyKpi from "./common/easy-kpi";
import easyLine from "./common/easy-echarts-line";
import {
    eLineData1,
    eLineData2
} from "./data/echarts-line-data";
import {
    orgData
} from "./data/collapseData.js";
import {
    constants
} from "crypto";
import horkpi from "./common/horizontal-kpi";

export default {
    name: "overview",
    components: {
        vantPie,
        easyKpi,
        easyLine,
        vantCollapse,
        [Button.name]: Button,
        [Loading.name]: Loading,
        MyHorkpi: horkpi
    },
    data() {
        return {
            active: 0,
            list: [],
            pieSize: "60px",
            eLineData1,
            eLineData2,
            col2LegendColor: ["#FF6D00", "#0f8ee9", "#333333", "#666666"],
            kpiName: [
                ["填写计划销售人数", "总销售人数"],
                ["填写工作记录人数", "总销售人数"],
                ["已执行工作计划数", "工作计划数"],
                ["有效拜访次数", "拜访次数"]
            ],
            btActive: ["active", "", "", ""],
            btActiveNum: 0,
            collapseData: orgData
        };
    },
    mounted() {
        window.addEventListener("resize", this.calcWidth, false);

    },
    computed: {
        pieData() {
            var data = [0, 0, 0, 0];
            if (this.$store.state.summaryCircle.length > 0) {
                let a = this.$store.state.summaryCircle;
                data.splice(0, 1, a[0][0].qNum === 'NaN' ? 0 : a[0][0].qNum);
                data.splice(1, 1, a[0][1].qNum === 'NaN' ? 0 : a[0][1].qNum);
                data.splice(2, 1, a[0][2].qNum === 'NaN' ? 0 : a[0][2].qNum);
                data.splice(3, 1, a[0][3].qNum === 'NaN' ? 0 : a[0][3].qNum);
                return data;
            }
            return data;
        },
        kpiDataSet() {
            if (this.$store.state.summaryEasyKPI.length > 0) {
                let d = this.$store.state.summaryEasyKPI;
                let a = [
                    [d[0][0].qNum, d[0][1].qNum],
                    [d[0][2].qNum, d[0][3].qNum],
                    [d[0][4].qNum, d[0][5].qNum],
                    [d[0][6].qNum, d[0][7].qNum]
                ];
                // console.log('KPI',a);
                return a[this.btActiveNum];
            }
            return false;
        },
        ElineDataASet() {
            if (this.$store.state.summaryLineA.length > 0) {
                let dataArr = this.$store.state.summaryLineA;
                let week = ['-4周', '-3周', '-2周', '上周', '本周'];
                let value = [0, 0, 0, 0, 0];
                week.filter((v, i) => {
                    dataArr.filter(data => {
                        if (data[0].qText == v) {
                            value.splice(i, 1, data[1].qNum.toFixed(0));
                        }
                    });

                });
                let opt = {
                    config: {
                        legend: false
                    },
                    xData: week,
                    yData: [{
                        name: "拜访次数",
                        value: value
                    }]
                };
                return opt;
            }
            return false;
        },
        ElineDataBSet() {
            if (this.$store.state.summaryLineB.length > 0) {
                let dataArr = this.$store.state.summaryLineB;
                let week = ['-4周', '-3周', '-2周', '上周', '本周'];
                let value1 = [0, 0, 0, 0, 0];
                let value2 = [0, 0, 0, 0, 0];
                week.filter((v, i) => {
                    dataArr.filter(data => {
                        if (data[0].qText == v) {
                            value1.splice(i, 1, data[1].qNum.toFixed(0));
                            value2.splice(i, 1, data[2].qNum.toFixed(0));
                        }
                    });

                });
                let opt = {
                    config: {
                        legend: false
                    },
                    xData: week,
                    yData: [{
                            name: "用户数",
                            value: value1
                        },
                        {
                            name: "客户数",
                            value: value2
                        }
                    ]
                };
                return opt;
            }
            return false;
        },
        orgListDataSet() {
            if (this.$store.state.summaryOrgListA.length > 0 && this.$store.state.summaryOrgListB.length > 0) {
                let arr1 = this.$store.state.summaryOrgListA[0];
                let arr2 = this.$store.state.summaryOrgListB;

                arr2.sort((a, b) => {
                    return a[2].qText / 1 - b[2].qText / 1;
                });

                let deptName = '';
                let deptNameArr = [];

                arr2.filter((v) => {
                    let temp = {};
                    if (deptName != v[3].qText) {
                        deptName = v[3].qText;
                        temp.id = v[0].qText;
                        temp.label = deptName;
                        temp.pid = v[1].qText;
                        temp.data = [Math.round((v[8].qNum === 'NaN' ? 0 : v[8].qNum) * 100) + '%', Math.round((v[9].qNum === 'NaN' ? 0 : v[9].qNum)), Math.round((v[10].qNum === 'NaN' ? 0 : v[10].qNum) * 100) + '%'];
                        temp.children = []
                        deptNameArr.push(temp);
                    }
                });

                //遍历销售人员
                deptNameArr.filter((vo) => {
                    arr2.filter((vi) => {
                        let temp = {};
                        if (vo.id == vi[0].qText) {
                            temp.id = vi[1].qText;
                            temp.label = vi[4].qText;
                            temp.data = [Math.round((vi[5].qNum === 'NaN' ? 0 : vi[5].qNum) * 100) + '%', Math.round((vi[6].qNum === 'NaN' ? 0 : vi[6].qNum)), Math.round((vi[7].qNum === 'NaN' ? 0 : vi[7].qNum) * 100) + '%'];
                            vo.children.push(temp);
                        }
                    });
                    vo.children.sort((first, next) => {
                        return first.data[0].replace('%', '') / 1 - next.data[0].replace('%', '') / 1;
                    });
                });

                // 递归组织架构
                let orgData = [];
                orgData = this.getOrgData(deptNameArr, arr1[1].qText);

                // 拼接数据
                let self = [{
                    name: arr1[0].qText,
                    title: arr1[0].qText,
                    data: [Math.round((arr1[2].qNum === 'NaN' ? 0 : arr1[2].qNum) * 100) + '%', Math.round((arr1[3].qNum === 'NaN' ? 0 : arr1[3].qNum)), Math.round((arr1[4].qNum === 'NaN' ? 0 : arr1[4].qNum) * 100) + '%'],
                    subData: []
                }];
                let others = [];
                orgData.filter(o => {
                    let temp = {};
                    temp.name = o.label;
                    temp.title = o.label;
                    temp.data = o.data;
                    temp.subData = [];
                    o.children.filter(i => {
                        let itemp = {};
                        itemp.subTitle = i.label;
                        itemp.data = i.data;
                        temp.subData.push(itemp);
                    });
                    others.push(temp);
                });
                let data = self.concat(others);
                // console.log('YCQ日志记录:标识->',data);
                return data;
            }
            return false;
        }
    },
    watch: {
        summarryIsLoading(nVal) {
            // console.log('summarryIsLoading------------->',nVal);
            this.summarryIsLoading = nVal;
        }
    },
    methods: {
        getOrgData(data, pid) {
            var result = [],
                temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].pid == pid) {
                    var obj = {
                        label: data[i].label,
                        id: data[i].id,
                        data: data[i].data,
                        children: data[i].children
                    };
                    temp = this.getOrgData(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = obj.children.concat(temp);
                        this.orgLevelNum += 1;
                    }
                    result.push(obj);
                }
            }
            return result;
        },
        calcWidth(arr) {
            let pop = $(".col-2-pie-param").height();
            let avg = (window.innerWidth - 30) / 4 - 10;
            if (pop < avg) {
                avg = pop;
            }
            avg += "px";
            this.pieSize = avg;
            // console.log('this.pieSize: ', this.pieSize);
        },
        changeActiveBt(index) {
            this.btActiveNum = index;
            $.each(this.btActive, (i, v) => {
                this.$set(this.btActive, i, "");
            });
            if (this.btActive[index] === "") {
                this.$set(this.btActive, index, "active");
            }
        },
        findKey(obj, value, compare = (a, b) => a === b) {
            return Object.keys(obj).find(k => compare(obj[k], value));
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.calcWidth, false);
    },
    destroyed() {}
};
</script>

<style scoped>
.summary {
    width: 100%;
    overflow-y: scroll !important;
}

.summary .sales-plan {
    min-height: 240px;
}

.summary .org-structure {
    min-height: 270px;
}

.summary .vist-num-trend {
    min-height: 320px;
}

.summary .vist-customer-trend {
    min-height: 320px;
}

.summary .col-2-pie-param {
    width: 100%;
    height: auto;
}

.summary .col-2-button {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #666666;
    background-color: #ffffff;
    text-align: center;
    line-height: 22px;
    border-radius: 15px;
    white-space: nowrap;
    max-width: 1160px;
}

.summary .active {
    background-color: #0f8ee9;
    border-radius: 15px;
    color: #ffffff;
}

.summary .col-2-kpi {
    /* font-size: 13px; */
    min-height: 50px;
}

.summary .col-2-kpi-icon {
    display: inline-block;
    line-height: 6px;
    text-align: center;
    color: #60cbc1;
    text-decoration: none;
    text-indent: 5px;
}

.summary .col-2-kpi-row {
    min-width: 150px;
    max-width: 260px;
}

.summary .col-2-right-title {
    font-size: 10px;
    white-space: nowrap;
    margin-right: 14px;
    max-width: 400px;
    font-weight: bold;
}

.summary .col-2-right-bg {
    width: 12px;
    height: 8px;
    border-radius: 0px;
    margin-left: 6px;
}

.summary .col-3 {
    height: auto;
}

.subtitle-name-icon {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    min-width: 6px;
    min-height: 6px;
}
</style>
