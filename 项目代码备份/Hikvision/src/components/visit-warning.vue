<template>
    <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :style="pullstyle"
        id="vist-warning"
    >
        <div class="vist-warning flex flex-column" id="vist-warning-box">
            <div class="customer-distribution border-bottom" v-if="KPI.length">
                <div class="sub-title">
                    <div class="sub-title-icon plan-icon"></div>
                    <span class="sub-title-name">客用户拜访覆盖</span>
                </div>
                <div style="margin:0px 15px 0px 15px">
                    <div style="min-height:60px;margin:10px 0px 0px 0px">
                        <my-progress
                            :data="progressData1"
                            barBgcolor_i="linear-gradient(to right,#594cff, #6bbbe5)"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#85a7ff"
                            title="分组客户覆盖率"
                        ></my-progress>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#5181FF"
                                title="战略"
                                :data="KPI[2]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#6700EA"
                                title="潜力"
                                :data="KPI[4]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#6FCEFF"
                                title="核心"
                                :data="KPI[3]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#CF3381"
                                title="重要"
                                :data="KPI[5]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:60px;margin:0px 0px 0px 0px">
                        <my-progress
                            :data="progressData2"
                            barBgcolor_i="linear-gradient(to right,#c03288, #6a08e4)"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#e8a1c5"
                            title="锁定用户覆盖率"
                        ></my-progress>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#5181FF"
                                title="战略"
                                :data="KPI[6]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#6700EA"
                                title="潜力"
                                :data="KPI[8]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#6FCEFF"
                                title="核心"
                                :data="KPI[7]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#CF3381"
                                title="重要"
                                :data="KPI[9]"
                                :iconImgShow="false"
                                v-if="KPI"
                            ></my-horkpi>
                        </div>
                    </div>
                </div>
            </div>
            <div class="covered-customer-detail border-bottom" v-show="true">
                <div class="sub-title">
                    <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                        <div class="sub-title-icon plan-icon"></div>
                        <span class="sub-title-name">拜访未覆盖客户名单</span>
                    </div>
                    <div
                        class="col-xs-6 col-sm-6 text-right padding-empty"
                        style="margin:5px 15px 0px 0px"
                    >
                        <my-actionsheet
                            defSelected="战略"
                            :data="['战略','核心','潜力','重要']"
                            :myStyle="{background: '#efefef',width: '70px'}"
                            @setScroll="setScrollStyleA"
                        ></my-actionsheet>
                    </div>
                </div>
                <div style="margin:15px 15px 20px 15px;min-height:200px">
                    <my-table orderBy="4|desc" :scrollY="163" :data="tableADataSet" :title="['名称', '负责销售', '类型', '本年自有BP(万)']" v-if="tableADataSet"></my-table>
                </div>
            </div>
            <div class="uncovered-customer-detail border-bottom" v-show="true">
                <div class="sub-title">
                    <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                        <div class="sub-title-icon plan-icon"></div>
                        <span class="sub-title-name">拜访未覆盖用户名单</span>
                    </div>
                    <div
                        class="col-xs-6 col-sm-6 padding-empty text-right"
                        style="margin:5px 15px 0px 0px"
                    >
                        <my-actionsheet
                            defSelected="战略"
                            :data="['战略','核心','市场','重要']"
                            :myStyle="{background: '#efefef',width: '70px'}"
                            @setScroll="setScrollStyleB"
                        ></my-actionsheet>
                    </div>
                </div>
                <div style="margin:15px 15px 20px 15px;min-height:200px">
                    <my-table orderBy="4|desc" :scrollY="163" :data="tableBDataSet" :title="['名称', '负责销售', '类型', '本年自有BP(万)']" v-if="tableBDataSet"></my-table>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import table from "./common/datatables";
import progress from "./common/progress";
import actionsheet from "./common/actionsheet";
import horkpi from "./common/horizontal-kpi";
import { PullRefresh } from "vant";
export default {
    name: "visit-warning",
    components: {
        [PullRefresh.name]: PullRefresh,
        MyTable: table,
        MyProgress: progress,
        MyActionsheet: actionsheet,
        MyHorkpi: horkpi
    },
    data() {
        return {
            isLoading: false,
            progressData1: 0,
            progressData2: 0,
            asshow1: false,
            asshow2: false,
            ash1: "0px",
            ash2: "0px",
            data1: [
                ["NaN1", "NaN1", "重要客户", 20],
                ["NaN2", "NaN", "重要客户", 25],
                ["NaN3", "NaN", "重要客户", 30],
                ["NaN4", "NaN5", "重要客户", 19.1],
                ["NaN1", "NaN", "重要客户", 20],
                ["NaN7", "NaN", "重要客户", 25],
                ["NaN", "NaN", "重要客户", 30],
                ["NaN10", "NaN", "重要客户", 19.1],
                ["NaN", "NaN7", "重要客户", 20],
                ["NaN", "NaN", "重要客户", 25],
                ["NaN", "NaN", "重要客户", 10.5]
            ],
            tableTitle2: [
                "用户名称",
                "子行业",
                "负责销售",
                "客户类型",
                "自有bp(万)"
            ],
            data2: [
                ["NaN1", "NaN", "NaN1", "NaN2", 20],
                ["NaN", "NaN2", "NaN3", "NaN", 25],
                ["NaN3", "NaN", "NaN", "NaN", 30],
                ["NaN", "NaN4", "NaN", "NaN", 19.1],
                ["NaN5", "NaN", "NaN5", "NaN", 20],
                ["NaN", "NaN", "NaN", "NaN4", 25],
                ["NaN", "NaN", "NaN", "NaN", 30],
                ["NaN", "NaN", "NaN", "NaN", 19.1],
                ["NaN", "NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", "NaN", 10.5]
            ],
            scroll: "scroll !important",
            Aselected: "战略",
            Bselected: "战略"
        };
    },
    mounted() {
        this.setKpi();     
    },
    computed: {
        tableADataSet(){
            if(this.$store.state.visitWarningTableA.length>0){
                let a = this.$store.state.visitWarningTableA;
                let b = {
                    战略:[],
                    核心:[],
                    潜力:[],
                    重要:[]
                };
                $.each(a,(i,v)=>{
                    if(v[0].qText==='战略客户'){
                        let d1 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['战略'].push(d1);
                    };
                    if(v[0].qText==='核心客户'){
                        let d2 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['核心'].push(d2);
                    };
                    if(v[0].qText==='潜力客户'){
                        let d3 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['潜力'].push(d3);
                    };
                    if(v[0].qText==='重要客户'){
                        let d4 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['重要'].push(d4);
                    };   
                });
                console.log('visitWarningTableA',b[this.Aselected]);
                return b[this.Aselected];
            }
            return false;
        },
        tableBDataSet(){
            if(this.$store.state.visitWarningTableB.length>0){
                let a = this.$store.state.visitWarningTableB;
                let b = {
                    战略:[],
                    核心:[],
                    市场:[],
                    重要:[]
                };
                $.each(a,(i,v)=>{
                    if(v[0].qText==='战略锁定'){
                        let d1 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['战略'].push(d1);
                    };
                    if(v[0].qText==='核心锁定'){
                        let d2 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['核心'].push(d2);
                    };
                    if(v[0].qText==='市场锁定'){
                        let d3 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['市场'].push(d3);
                    };
                    if(v[0].qText==='重要锁定'){
                        let d4 = [v[1].qText,v[2].qText,v[0].qText,Math.round(v[3].qNum/100)/10];
                        b['重要'].push(d4);
                    };   
                });
                console.log('visitWarningTableB',b[this.Bselected]);
                return b[this.Bselected];
            }
            return false;
        },
        KPI(){
            if(this.$store.state.visitWarningKPI.length>0){
                let a = this.$store.state.visitWarningKPI[0];
                let b = [];
                $.each(a,(i,v)=>{
                    if(i<2){
                        b.push(Math.round(v.qNum));
                    }else{
                        b.push(v.qText);
                    }
                    
                });
                console.log('visitWarningKPI',b);
                return b;
            }
            return false;
        },
        pullstyle(){
            return {
                'overflow-y': this.scroll
            }
        }
    },
    watch: {
        KPI(n){
            this.setKpi();
        }
    },
    methods: {
        setKpi(){
            this.progressData1 = Math.round(this.$store.state.visitWarningKPI[0][0].qNum);
            this.progressData2 = Math.round(this.$store.state.visitWarningKPI[0][1].qNum);
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
        },
        setScrollStyleA(style,selected) {
            this.scroll = style;
            this.Aselected = selected;
        },
        setScrollStyleB(style,selected) {
            this.scroll = style;
            this.Bselected = selected;
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
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}
</style>
