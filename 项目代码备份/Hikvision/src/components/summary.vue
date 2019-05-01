<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="summary">
            <div class="sales-plan border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon sales-icon"></div>
                    <span class="sub-title-name">销售日志</span>
                </div>
                <div class="content-box flex flex-10 flex-column">
                    <div class="flex flex-3 col-2-pie">
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-1'" :data="pieData[0]" v-if="pieDataSet"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-2'" :data="pieData[1]" v-if="pieDataSet"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-3'" :data="pieData[2]" v-if="pieDataSet"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-4'" :data="pieData[3]" v-if="pieDataSet"></vant-pie>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-row">
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button
                                class="col-2-button"
                                :class="btActive[0]"
                                @click="changeActiveBt(0)"
                            >填写计划率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button
                                class="col-2-button"
                                :class="btActive[1]"
                                @click="changeActiveBt(1)"
                            >工作记录填写率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button
                                class="col-2-button"
                                :class="btActive[2]"
                                @click="changeActiveBt(2)"
                            >计划执行率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button
                                class="col-2-button"
                                :class="btActive[3]"
                                @click="changeActiveBt(3)"
                            >有效拜访率</button>
                        </div>
                    </div>
                    <div class="col-2-kpi flex flex-justify-center flex-align-center">
                        <div class="flex flex-1 flex-row flex-justify-center">
                            <div class="col-xs-7 col-sm-7 text-center">
                                <my-horkpi
                                    iconSize="8px"
                                    iconBgColor="#e6e6e6"
                                    :title="kpiName[btActiveNum][0]"
                                    :data="kpiDataSet[0]"
                                    fontColor="#5181FF"
                                    :iconImgShow="false"
                                    v-if="kpiDataSet"
                                ></my-horkpi>
                            </div>
                            <div class="col-xs-5 col-sm-5 text-center">
                                <my-horkpi
                                    iconSize="8px"
                                    iconBgColor="#e6e6e6"
                                    :title="kpiName[btActiveNum][1]"
                                    :data="kpiDataSet[1]"
                                    fontColor="#6FCEFF"
                                    :iconImgShow="false"
                                    v-if="kpiDataSet"
                                ></my-horkpi>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="org-structure border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon org-structure-icon"></div>
                    <span class="flex flex-1 sub-title-name flex-justify-left">组织架构</span>
                    <div class="flex flex-1 flex-justify-center col-2-right-title">
                        <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[1]}">
                            <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[1]}"></div>
                            <span>有效拜访率</span>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[0]}">
                            <div class="col-2-right-bg" :style="{'background-color': col2LegendColor[0]}"></div>
                            <span>拜访数</span>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center" :style="{'color':col2LegendColor[2]}">
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
                    <div class="sub-title-icon trend-icon"></div>
                    <span class="sub-title-name">拜访次数周趋势</span>
                    <span class="sub-title-unit">单位(千)</span>
                </div>
                <easy-line :id="'line-1'" :data="ElineDataASet" v-if="ElineDataASet"></easy-line>
            </div>
            <div class="vist-customer-trend border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon trend-icon"></div>
                    <span class="sub-title-name">拜访客用户周趋势</span>
                    <span class="sub-title-unit">单位(千)</span>
                </div>
                <easy-line :id="'line-2'" :data="ElineDataBSet" v-if="ElineDataBSet"></easy-line>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import { Button, PullRefresh } from "vant";
import vantPie from "./common/vant-pie";
import vantCollapse from "./common/org-vant-collapse";
import easyKpi from "./common/easy-kpi";
import easyLine from "./common/easy-echarts-line";
import { eLineData1, eLineData2 } from "./data/echarts-line-data";
import { orgData } from "./data/collapseData.js";
import { constants } from "crypto";
import horkpi from "./common/horizontal-kpi";

export default {
    name: "overview",
    components: {
        vantPie,
        easyKpi,
        easyLine,
        vantCollapse,
        [Button.name]: Button,
        [PullRefresh.name]: PullRefresh,
        MyHorkpi: horkpi
    },
    data() {
        return {
            active: 0,
            list: [],
            eLineData1,
            eLineData2,
            col2LegendColor:["#6b6b6b", "#0f8ee9", "#FF6D00"],
            kpiName: [
                ["填写计划销售人数", "总销售人数"],
                ["填写工作记录人数", "总销售人数"],
                ["已执行工作计划数", "工作计划数"],
                ["有效拜访次数", "拜访次数"]
            ],
            pieData: [
                {
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                },
                {
                    size: "60px",
                    rate: 0
                }
            ],
            btActive: ["active", "", "", ""],
            btActiveNum: 0,
            isLoading: false,
            collapseData: orgData
        };
    },
    mounted() {
        // window.addEventListener("resize", this.calcWidth(this.pieData), false);
    },
    computed: {
        pieDataSet() {
            if (this.$store.state.summaryCircle.length > 0) {
                var arr = [
                    {
                        size: "60px",
                        rate: this.$store.state.summaryCircle[0][0].qNum
                    },
                    {
                        size: "60px",
                        rate: this.$store.state.summaryCircle[0][1].qNum
                    },
                    {
                        size: "60px",
                        rate: this.$store.state.summaryCircle[0][2].qNum
                    },
                    {
                        size: "60px",
                        rate: this.$store.state.summaryCircle[0][3].qNum
                    }
                ];
                console.log("pieDataSet", arr);
                this.calcWidth(arr);
                return arr;
            }
            return false;
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
                console.log("kpiDataSet", a[this.btActiveNum]);
                return a[this.btActiveNum];
            }
            return false;
        },
        ElineDataASet() {
            if (this.$store.state.summaryLineA.length > 0) {
                let a = this.$store.state.summaryLineA;
                let b = [];
                let c = [];
                $.each(a, (i, v) => {
                    b.push(v[0].qText);
                    c.push(Math.floor(v[1].qNum/1000));
                });
                let opt = {
                    config: {
                        legend: false
                    },
                    xData: b,
                    yData: [
                        {
                            name: "拜访次数",
                            value: c
                        }
                    ]
                };
                console.log('ElineDataASet',opt);
                return opt;
            }
            return false;
        },
        ElineDataBSet() {
            if (this.$store.state.summaryLineB.length > 0) {
                let a = this.$store.state.summaryLineB;
                let b = [];
                let c = [];
                let d = [];
                $.each(a, (i, v) => {
                    b.push(v[0].qText);
                    c.push(Math.floor(v[1].qNum/1000));
                    d.push(Math.floor(v[2].qNum/1000));
                });
                let opt = {
                    config: {
                        legend: true
                    },
                    xData: b,
                    yData: [
                        {
                            name: "用户数",
                            value: c
                        },
                        {
                            name: "客户数",
                            value: d
                        }
                    ]
                };
                console.log('ElineDataBSet',opt);
                return opt;
            }
            return false;
        },
        orgListDataSet() {
            if(this.$store.state.summaryOrgList.length>0){
                let a = this.$store.state.summaryOrgList;
                let b = [];
                $.each(a,(i,v)=>{
                    let tmp = {};
                    if(v[0].qText!='-'){
                        tmp.name = v[0].qText;
                        tmp.title = v[0].qText;
                        tmp.data = [Math.round(v[5].qNum*100)+'%',Math.round(v[6].qNum),Math.round(v[7].qNum*100)+'%'];
                        tmp.subData_subTitle = v[1].qText;
                        tmp.subData_data = [Math.round(v[2].qNum*100)+'%',Math.round(v[3].qNum),Math.round(v[4].qNum*100)+'%'];
                        b.push(tmp);
                    }    
                });
                let c = '';
                let d = [];
                
                b.filter((v)=>{
                    let tmp = {};
                    if(c!=v.name) {
                        tmp.name = v.name;
                        tmp.title = v.title;
                        tmp.data = v.data;
                        c = v.name;
                        d.push(tmp);
                    }
                });

                d.filter((vo)=>{
                    let e = [];
                    b.filter((vi)=>{
                        let f = {};
                        if(vi.name === vo.name && vi.subData_subTitle!='-'){
                            f.subTitle = vi.subData_subTitle;
                            f.data = vi.subData_data
                            e.push(f);
                        }
                    });
                    vo.subData = e.sort((first,next)=>{
                        return first.data.split('%')[0]-next.data.split('%')[0]
                    });
                });
                console.log("orgListDataSet",d);
                return d;
            }
            return false;
        }
    },
    watch: {},
    methods: {
        calcWidth(arr) {
            // console.log('我被执行了');
            let pop = $(".col-2-pie-param").height();
            let avg = (window.innerWidth - 30) / 4 - 10;
            if (pop < avg) {
                avg = pop;
            }
            avg += "px";
            this.pieData[0].size = avg;
            this.pieData[0].rate = arr[0].rate;
            this.pieData[1].size = avg;
            this.pieData[1].rate = arr[1].rate;
            this.pieData[2].size = avg;
            this.pieData[2].rate = arr[2].rate;
            this.pieData[3].size = avg;
            this.pieData[3].rate = arr[3].rate;
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
            }, 300);
        }
    },
    beforeDestroy() {
        // window.removeEventListener("resize", this.calcWidth, false);
    },
    destroyed() {
    }
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
    color: #9b9b9b;
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

.summary .col-2-right-title{
    font-size: 10px;
    white-space: nowrap;
    margin-right: 14px;
    max-width: 400px;
    font-weight: bold;
}

.summary .col-2-right-bg{
    width: 10px;
    height: 4px;
    border-radius: 3px;
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
