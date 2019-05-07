<template>
    <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :style="pullstyle"
        id="vist-warning"
    >
        <div class="vist-warning flex flex-column" id="vist-warning-box">
            <div class="customer-distribution border-bottom">
                <div class="sub-title">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">客用户拜访覆盖</span>
                </div>
                <div style="margin:0px 15px 0px 15px">
                    <div style="min-height:60px;margin:10px 0px 0px 0px">
                        <my-progress
                            :data="progressData[0]"
                            barBgcolor_i="#1495EB"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#85a7ff"
                            title="分级客户覆盖率"
                        ></my-progress>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="战略"
                                :data="progressData[2]"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="潜力"
                                :data="progressData[4]"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="核心"
                                :data="progressData[3]"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="认证"
                                :data="progressData[5]"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:60px;margin:0px 0px 0px 0px">
                        <my-progress
                            :data="progressData[1]"
                            barBgcolor_i="#1495EB"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#85a7ff"
                            title="锁定用户覆盖率"
                        ></my-progress>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="战略"
                                :data="progressData[6]"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="潜力"
                                :data="progressData[8]"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:40px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="核心"
                                :data="progressData[7]"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconBgColor="#d2eaf5"
                                title="重要"
                                :data="progressData[9]"
                            ></my-horkpi>
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
                    <div
                        class="col-xs-6 col-sm-6 text-right padding-empty"
                        style="margin:5px 15px 0px 0px"
                    >
                        <my-actionsheet
                            defSelected="全部"
                            :data="['战略','核心','潜力','认证','全部']"
                            :myStyle="{background:'rgba(239, 239, 239, 0.5)' ,width: '70px'}"
                            @setScroll="setScrollStyleA"
                        ></my-actionsheet>
                    </div>
                </div>
                <div style="margin:15px 15px 20px 15px;min-height:200px">
                    <my-table orderBy="4|desc" :scrollY="163" :data="tableADataSet" :title="['客户', '销售', '类型']" v-if="tableADataSet"></my-table>
                </div>
            </div>
            <div class="uncovered-customer-detail border-bottom" v-show="true">
                <div class="sub-title">
                    <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                        <div class="sub-title-icon"></div>
                        <span class="sub-title-name">拜访未覆盖用户名单</span>
                    </div>
                    <div
                        class="col-xs-6 col-sm-6 padding-empty text-right"
                        style="margin:5px 15px 0px 0px"
                    >
                        <my-actionsheet
                            defSelected="全部"
                            :data="['战略','核心','市场','重要', '全部']"
                            :myStyle="{background:'rgba(239, 239, 239, 0.5)', width: '70px'}"
                            @setScroll="setScrollStyleB"
                        ></my-actionsheet>
                    </div>
                </div>
                <div style="margin:15px 15px 20px 15px;min-height:200px">
                    <my-table orderBy="4|desc" :scrollY="163" :data="tableBDataSet" :title="['用户', '销售', '类型']" v-if="tableBDataSet"></my-table>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import table from "./common/datatables";
import progress from "./common/progress";
import actionsheet from "./common/actionsheet";
import horkpi from "./common/horizontal-kpi-ext";
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
            asshow1: false,
            asshow2: false,
            ash1: "0px",
            ash2: "0px",
            scroll: "scroll !important",
            Aselected: "全部",
            Bselected: "全部",
        };
    },
    computed: {
        tableADataSet(){
            if(this.$store.state.visitWarningTableA.length>0){
                let response = this.$store.state.visitWarningTableA;
                let data = {
                    全部: [],
                    战略: [],
                    核心: [],
                    潜力: [],
                    认证: []
                };
                $.each(response,(i,v)=>{
                    var type = v[0].qText.substring(0, 2),
                        custName = v[1].qText,
                        salesman = v[2].qText,
                        bp = v[3].qNum;

                    var row = [custName, salesman, type, bp];
                    
                    data['全部'].push(row);

                    if(type === '战略') {
                        data['战略'].push(row);
                    }
                    else if(type === '核心') {
                        data['核心'].push(row);
                    }
                    else if(type === '潜力') {
                        data['潜力'].push(row);
                    }
                    else if(type === '认证') {
                        data['认证'].push(row);
                    }
                });

                data[this.Aselected].sort((a, b)=>{
                    return b[3] - a[3];
                });

                var result = [];
                data[this.Aselected].forEach(item => {
                    result.push(item.slice(0, 3));
                });
                return result;
            }
            return false;
        },
        tableBDataSet(){
            if(this.$store.state.visitWarningTableB.length>0){
                let response = this.$store.state.visitWarningTableB;
                let data = {
                    全部: [],
                    战略: [],
                    核心: [],
                    市场: [],
                    重要: []
                };
                $.each(response, (i,v)=>{
                     var type = v[0].qText.substring(0, 2),
                        custName = v[1].qText,
                        salesman = v[2].qText,
                        bp = v[3].qNum;

                    var row = [custName, salesman, type, bp];    

                    data['全部'].push(row);

                    if(type === '战略'){
                        data['战略'].push(row);
                    }
                    else if(type === '核心'){
                        data['核心'].push(row);
                    }
                    else if(type === '市场'){
                        data['市场'].push(row);
                    }
                    else if(type === '重要'){
                        data['重要'].push(row);
                    } 
                });

                data[this.Bselected].sort((a, b)=>{
                    return b[3] - a[3];
                });

                var result = [];
                data[this.Bselected].forEach(item => {
                    result.push(item.slice(0, 3));
                });
                return result;
            }
            return false;
        },
        progressData(){
            var result = [0,0,0,0,0,0,0,0,0,0];
            if(!this.$store.state.visitWarningKPI.length){
                return result;
            }
            
            this.$store.state.visitWarningKPI[0].forEach((kpi, index)=>{
                if(index<2) {
                    result.splice(index, 1, kpi.qNum==='NaN'?0:kpi.qNum.toFixed(0));
                }
                else {
                    result.splice(index, 1, [kpi.qText,((kpi.qText.split('/')[0]/kpi.qText.split('/')[1]*100).toFixed(0)+'%').replace('NaN','0')]);
                }
                
            })
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
