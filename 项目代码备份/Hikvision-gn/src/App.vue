<template>
    <div id="app">
        <van-nav-bar
            class="nav-bar-top"
            title="工作计划与日志看板"
            left-text
            left-arrow
            @click-left="onClickLeft"
            :sticky="true"
        />
        <van-tabs
            v-model="active"
            class="nav-tabs"
            :color="'#29A6FF'"
            :swipe-threshold="5"
            title-active-color="#0066FF"
            title-inactive-color="black"
            :animated="true"
            :swipeable="true"
            :sticky="true"
        >
            <van-tab title="总体情况">
                <router-view v-if="active==0" class="view-container"/>
            </van-tab>
            <van-tab title="计划执行">
                <router-view v-if="active==1" class="view-container"/>
            </van-tab>
            <van-tab title="拜访预警">
                <router-view v-if="active==2" class="view-container"/>
            </van-tab>
            <van-tab title="拜访对象">
                <router-view v-if="active==3" class="view-container"/>
            </van-tab>
            <van-tab title="拜访构成">
                <router-view v-if="active==4" class="view-container"/>
            </van-tab>
        </van-tabs>
        <div v-show="selBarFlag" class="selection-tool flex flex-row">
            <div class="selector-switch-box relative">
                <vue-switch
                    id="switch-1"
                    class="selector-switch"
                    :open="switchIsOpen"
                    :switch-style="switchStyle"
                    @switch-to="switchTo"
                ></vue-switch>
            </div>
            <div class="selected-bar flex flex-row flex-5">
                <ul class="selected-dim-date flex flex-row flex-2">
                    <li class="name">时间:</li>
                    <li class="values flex-1" v-text="selectedTime"></li>
                </ul>
                <ul class="selected-dim-org flex flex-row flex-5">
                    <li class="name">组织:</li>
                    <li class="values flex-3" v-text="selectedOrg.toString()"></li>
                </ul>
            </div>
        </div>
        <selector
            v-show="selectorFlag"
            :show="selectorFlag"
            @cancle="cancleSelect"
            @confirm="confirmSelect"
            :selectedTime="selectedTime"
            :selectedOrg="selectedOrg"
        ></selector>
        <van-popup v-model="popShow" v-on:click-overlay="closePop()">
            <van-loading type="spinner" size="30px" color="white"/>
        </van-popup>
        <waterMark userName="王永刚"></waterMark>
    </div>
</template>

<script>
import { NavBar, Tab, Switch, Popup, Loading } from "vant";
import animate from "animate.css";

import Tabs from "./components/common/vant-tabs/index";

import vueSwitch from "./components/common/vue-switch";
import selector from "./components/common/selector";
import waterMark from "./components/common/water-mark";

import Tools from "./tools/tools";
var tool = new Tools();

import Cube from "./tools/cube";
var cube = new Cube();

export default {
    name: "App",
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Switch.name]: Switch,
        selector,
        [Popup.name]: Popup,
        [Loading.name]: Loading,
        waterMark,
        vueSwitch
    },
    data() {
        return {
            active: 0,
            lang: false,
            selBarFlag: true,
            pageMap: {
                0: "summary",
                1: "plan-execution",
                2: "visit-warning",
                3: "visit-customer",
                4: "customer-distribution"
            },
            selectorFlag: false,
            selectedTime: "本周",
            selectedOrg: [],
            popContext: "",
            switchStyle: {
                width: 54,
                height: 24,
                bgColor: "rgba(199, 199, 199, 0.68)",
                circleColor: "red"
            },
            switchIsOpen: false,
            qApp: null
        };
    },
    beforeCreate() {
        if(parent.qApp){

            parent.qApp.field('DimensionName').clear();
            parent.qApp.field('OADAccount').clear();
            
            parent.qApp.field('DimensionName').selectValues([{qText: '本周'}], true, false).then(()=>{
                parent.qApp.field('OADAccount').selectValues([{qText: 'LIRUI5'}], true, false).then(()=>{ 
                    this.cubeInit();
                    this.initOrganization(); 
                });
            });
        }
    },
    created() {
        // this.initOrganization();
    },
    mounted() {
        // this.cubeInit();
        
    },
    methods: {
        closePop() {
            this.$store.dispatch('updateData', {dataName:'isPopShow',data:false});
        },
        resultTreeData(data) {},
        onClickLeft() {},
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        cancleSelect(data) {
            this.selectorFlag = false;
        },
        confirmSelect(data) { 
            if(data.org.length>0){
                let selLevels = [];
                data.org.filter((v)=>{
                    selLevels.push(v.split(':')[1]);
                });
                selLevels = Array.from(new Set(selLevels.sort((a,b)=>{
                    return b-a;
                })));

                let fieldName = "DeptName_Lv"+selLevels[0];
                let values = [];
                let valuesDisplay = [];
                data.org.filter((va)=>{
                    if(selLevels[0] === va.split(':')[1]){
                        let tmp = {};
                        tmp.qText = va.split(':')[0];
                        valuesDisplay.push(va.split(':')[0]);
                        values.push(tmp);
                    }
                });
                // 执行org筛选
                parent.qApp.clearAll().then(()=>{
                    parent.qApp.field('OADAccount').selectValues([{qText: 'LIRUI5'}], true, false).then(()=>{
                        parent.qApp.field("DimensionName").selectValues([{ qText: data.time }], true, false).then(()=>{
                            parent.qApp.field(fieldName).selectValues(values, true, false).then(()=>{
                                this.$store.dispatch('updateData', {dataName:'isPopShow',data:false});
                            });
                        });
                    });
                });
                this.selectedOrg = valuesDisplay;
                this.$store.dispatch('updateData', {dataName:'isPopShow',data:true});

            }else{
                parent.qApp.clearAll().then(()=>{
                    parent.qApp.field('OADAccount').selectValues([{qText: 'LIRUI5'}], true, false).then(()=>{
                        parent.qApp.field("DimensionName").selectValues([{ qText: data.time }], true, false).then(()=>{
                                this.$store.dispatch('updateData', {dataName:'isPopShow',data:false});
                            });
                    });        
                });
                
                this.selectedOrg = [];
                this.$store.dispatch('updateData', {dataName:'isPopShow',data:true});
            }
        
            this.selectorFlag = false;
            this.selectedTime = data.time;
            
            console.log("confirmSelect: ", data.time, data.org);

            $(".selected-dim-org > .values").css({
                maxWidth: $(".selected-dim-org").width() - 40
            });
            this.switchIsOpen = false;
        },
        switchTo() {
            this.selectorFlag = !this.selectorFlag;
            this.switchIsOpen = true;
        },
        cubeInit() {
            //总体情况 - 销售日志 - 环形进图条
            cube.getData(parent.qApp,this,"summaryCircle",-1,0,"summaryCircle");
            //总体情况 - 销售日志 - 环形进图条 - 联动KPI
            cube.getData(parent.qApp,this,"summaryEasyKPI",-1,0,"summaryEasyKPI");
            // 总体情况 - 拜访次数周趋势
            cube.getData(parent.qApp, this, "summaryLineA",-1,0, "summaryLineA");
            //总体情况 - 拜访次数周趋势
            cube.getData(parent.qApp, this, "summaryLineB",-1,0, "summaryLineB");
            cube.getData(parent.qApp, this, "summaryOrgList",1,5, "summaryOrgList",false);

            //执行计划 - 近五周
            cube.getData(parent.qApp,this,"planExecutionLine",-1,0,"planExecutionLine");
            //执行计划 - Collapse
            cube.getData(parent.qApp,this,"planExecutionCollapseA",-1,0,"planExecutionCollapseA");
            cube.getData(parent.qApp,this,"planExecutionCollapseB",-1,0,"planExecutionCollapseB");

            //拜访预警 - KPI
            cube.getData(parent.qApp,this,"visitWarningKPI",-1,0,"visitWarningKPI");

        },
        initOrganization(){
            
            cube.getData(parent.qApp,this,"currentLevel",-1,0,"currentLevel");

            //app.vue  组织架构
            cube.getData(parent.qApp,this,"organization",-1,0,"organization",false);
            cube.getData(parent.qApp,this,"visitWarningKPI",-1,0,"visitWarningKPI");
            //拜访预警 - TableA & B
            cube.getData(parent.qApp,this,"visitWarningTableA",-1,3,"visitWarningTableA");
            cube.getData(parent.qApp,this,"visitWarningTableB",-1,3,"visitWarningTableB");

            //拜访对象
            cube.getData(parent.qApp, this, "visitCustomerA",-1,1, "visitCustomerA");
            cube.getData(parent.qApp, this, "visitCustomerB",-1,1, "visitCustomerB");

            //拜访构成
            cube.getData(parent.qApp, this, "customerDistribution",-1,1, "customerDistribution");
        }
    },
    computed: {
        popShow() {
            return this.$store.state.isPopShow;
        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            // this.selBarFlag = pIndex == 1 ? false : true;
        },
        selectedTime(nVal){
            this.$store.dispatch('updateData', {dataName: 'selectedTime',data: nVal});
        },
        popShow(nVal) {
            console.log('popShow',nVal);
        }
    }
};
</script>

<style>
@import "./assets/css/common.css";
@import "./components/common/vant-tabs/index.css";

/* * {
  touch-action: none;
} */
.van-pull-refresh {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

html,
body,
#app,
.nav-tabs {
    height: 100%;
    width: 100%;
    overflow: hidden !important;
}

.van-tabs__content,
.van-tab__pane {
    height: 100%;
}

.lang-switch {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
}

.view-container {
    padding-top: 40px;
    height: calc(100% - 20px);
    max-height: calc(100% -20px);
}

.view-container.no-padding {
    padding-top: 0 !important;
}

.nav-bar-top {
    height: 40px;
    line-height: 40px;
    /* background: url("./assets/image/top-tab-bg.png") center no-repeat; */
    /* background-size: 100%; */
    background-color: #1D71F0;
}

.van-nav-bar__title {
    color: white;
    font-size: 18px;
}

.van-nav-bar .van-icon {
    color: white;
}

.van-nav-bar__arrow {
    font-size: 32px;
}

.van-tabs__nav,
.van-tab {
    height: 40px;
    line-height: 40px;
}

.van-tabs__nav .van-ellipsis {
    font-size: 15px;
}

.selection-tool {
    position: absolute;
    top: 84px;
    height: 36px;
    line: 36px;
    width: 100vw;
    background-color: #eeeff3;
    padding-left: 6px;
}

.sub-title {
    font-family: "PingFangSC-Medium";
    color: black;
    font-size: 16px;
    -webkit-box-align: end;
    text-indent: 4px;
    height: 30px;
    line-height: 30px;
    margin-top: 3px;
    display: flex;
}

.sub-title-icon {
    width: 20px;
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center;
}

.sub-title-unit {
    color: #b4b6b7;
    font-size: 12px;
    text-align: left;
}

.selected-bar {
    align-items: center;
}

.selected-bar .name {
    text-indent: 8px;
}

.selected-bar .values {
    text-indent: 4px;
}

.selector-switch-box {
    width: 60px;
    height: 40px;
}

.selected-dim-date {
    min-width: 70px;
    min-width: 70px;
    padding-top: 2px;
}

.selected-dim-date > .values {
    display: flex;
    justify-content: flex-start;
}

.selected-dim-org {
    padding-top: 4px;
}

.selected-dim-org > .values {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
}

.selector-switch {
    position: absolute;
    top: 6px;
    left: 4px;
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}

.sales-icon {
    background-image: url("./assets/image/log.png");
}

.org-structure-icon {
    background-image: url("./assets/image/org-structure.png");
    background-position: 0 3px;
    margin-top: 1px;
}

.trend-icon {
    background-image: url("./assets/image/trend.png");
}

.plan-icon {
    background-image: url("./assets/image/notes.png");
    background-position: 0 3px;
    margin-top: 1px;
}

.pie-icon {
    background-image: url("./assets/image/pie.png");
    background-position: 0 4px;
    margin-top: 1px;
}

.van-popup {
    background-color: rgba(255,255,255,0);
    overflow-y: hidden;
}
</style>
