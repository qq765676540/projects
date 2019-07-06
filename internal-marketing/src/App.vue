<template>
<div id="app">
    <!-- <van-nav-bar class="nav-bar-top" title="工作计划与日志看板" left-text left-arrow @click-left="onClickLeft" :sticky="true" /> -->
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="5" title-active-color="#0066FF" title-inactive-color="black" :animated="true" :swipeable="true" :sticky="true" line-width="63" line-height="2">
        <van-tab title="总体情况">
            <router-view v-if="active==0" class="view-container" />
        </van-tab>
        <van-tab title="计划执行">
            <router-view v-if="active==1" class="view-container" />
        </van-tab>
        <van-tab title="拜访预警">
            <router-view v-if="active==2" class="view-container" />
        </van-tab>
        <van-tab title="拜访对象">
            <router-view v-if="active==3" class="view-container" />
        </van-tab>
        <van-tab title="拜访构成">
            <router-view v-if="active==4" class="view-container" />
        </van-tab>
    </van-tabs>
    <div v-show="selBarFlag" class="selection-tool flex flex-row">
        <div class="selector-switch-box relative">
            <vue-switch id="switch-1" class="selector-switch" :open="switchIsOpen" :switch-style="switchStyle" @switch-to="switchTo"></vue-switch>
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
    <selector v-show="selectorFlag" :show="selectorFlag" @cancle="cancleSelect" @confirm="confirmSelect" :selectedTime="selectedTime" :selectedOrg="selectedOrg"></selector>
    <!-- <div class="appPopstyle">
        <van-popup v-model="popShow" :close-on-click-overlay="false">
            <van-loading type="spinner" size="30px" color="white" />
        </van-popup>
    </div>
    <waterMark :userName="userName" v-if="userName"></waterMark> -->
</div>
</template>

<script>
import {
    NavBar,
    Tab,
    Tabs,
    Switch,
    Popup,
    Loading,
    Toast
} from "vant";
import animate from "animate.css";
import vueSwitch from "./components/common/vue-switch";
import selector from "./components/common/selector";
import waterMark from "./components/common/water-mark";

import Tools from "./tools/tools";
var tool = new Tools();

import Cube from "./tools/cube";

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
        [Toast.name]: Toast,
        waterMark,
        vueSwitch
    },
    data() {
        return {
            myStartTime: new Date(),
            active: 0,
            lang: false,
            cubeCount: 0,
            cubeStop: [6, 3, 5, 2, 1],
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
            selectedOrgSetCube: [],
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
    beforeCreate() {},
    created() {
        //筛选：组织机构树
        Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrgSetCube,
                    name: "currentLevel"
                },
                qWidth: 10,
                qHeight: 1
            },
            (rs) => {
                // this.cubeCount += 1;
            });
        Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrgSetCube,
                    name: "organization"
                },
                qWidth: 10,
                qHeight: 1000
            },
            (rs) => {
                // this.cubeCount += 1;
            });
    },
    mounted() {
        this.cubeCount = 0;
        this.cubeInit();
    },
    computed: {
        popShow() {
            if (this.cubeCount == this.cubeStop[this.active]) {
                return false;
            }
            return true;
        },
        userName() {
            if (this.$store.state.currentLevel.length > 0) {
                let a = this.$store.state.currentLevel;
                return a[0][3].qText;
            }
            return false
        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            this.myStartTime = new Date();
            this.cubeCount = 0;
            setTimeout(() => {
                this.cubeInit();
            }, 500);
            // this.cubeInit();
        },
        cubeCount(nVal) {
            if (nVal == this.cubeStop[this.active]) {
                let myEndTime = new Date();
                Toast({
                    message: '本次查询耗时: ' + ((myEndTime - this.myStartTime) / 1000).toFixed(2) + '秒',
                    duration: 1000
                });
            }
        }
    },
    methods: {
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        cancleSelect(data) {
            this.selectorFlag = false;
        },
        confirmSelect(data) {
            this.cubeCount = 0;
            if (data.org.length > 0) {

                let selectValues = [];
                let displayValues = [];

                data.org.filter((v) => {
                    selectValues.push(v.split(':')[0]);
                    displayValues.push(v.split(':')[1]);
                });

                this.selectedOrg = displayValues;
                this.selectedOrgSetCube = selectValues;
            } else {
                this.selectedOrg = [];
                this.selectedOrgSetCube = [];
            }

            this.selectorFlag = false;
            this.selectedTime = data.time;

            $(".selected-dim-org > .values").css({
                maxWidth: $(".selected-dim-org").width() - 40
            });
            this.switchIsOpen = false;
            this.myStartTime = new Date();
            this.cubeInit();
        },
        switchTo() {
            this.selectorFlag = !this.selectorFlag;
            this.switchIsOpen = true;
        },
        cubeInit() {
            switch (this.active) {
                case 1:
                    //执行计划 - 近五周
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "planExecutionLine"
                            },
                            qWidth: 5,
                            qHeight: 10
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //执行计划 - Collapse
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "planExecutionCollapseA"
                            },
                            qWidth: 10,
                            qHeight: 1000,
                            orderType: -1,
                            orderCol: 6
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "planExecutionCollapseB"
                            },
                            qWidth: 10,
                            qHeight: 1000,
                            orderType: -1,
                            orderCol: 6
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 2:
                    //拜访预警 - 客用户拜访覆盖
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitWarningKPI"
                            },
                            qWidth: 10,
                            qHeight: 10
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //拜访预警 - 未覆盖客用户
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitWarningCollapseA1"
                            },
                            qWidth: 5,
                            qHeight: 2000,
                            orderType: -1,
                            orderCol: 4
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitWarningCollapseA2"
                            },
                            qWidth: 5,
                            qHeight: 2000,
                            orderType: -1,
                            orderCol: 4
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitWarningCollapseB1"
                            },
                            qWidth: 5,
                            qHeight: 2000,
                            orderType: -1,
                            orderCol: 4
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitWarningCollapseB2"
                            },
                            qWidth: 5,
                            qHeight: 2000,
                            orderType: -1,
                            orderCol: 4
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 3:
                    //拜访对象
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitCustomerA"
                            },
                            qWidth: 5,
                            qHeight: 100
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "visitCustomerB"
                            },
                            qWidth: 5,
                            qHeight: 100
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 4:
                    //拜访构成
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "customerDistribution"
                            },
                            qWidth: 5,
                            qHeight: 100,
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                default:
                    //总体情况 - 销售日志 - 环形进图条 - 联动KPI
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryCircle"
                            },
                            qWidth: 15,
                            qHeight: 100
                        },
                        (rs) => {
                            // console.log('YCQ日志记录:标识->',rs);
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryEasyKPI"
                            },
                            qWidth: 10,
                            qHeight: 100
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //总体情况 - 组织架构
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryOrgListA"
                            },
                            qWidth: 8,
                            qHeight: 300
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryOrgListB"
                            },
                            qWidth: 11,
                            qHeight: 900,
                            filtNull: false
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //总体情况 - 拜访次数周趋势
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryLineA"
                            },
                            qWidth: 5,
                            qHeight: 10
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //总体情况 - 拜访客用户周趋势
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrgSetCube,
                                name: "summaryLineB"
                            },
                            qWidth: 5,
                            qHeight: 10
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
            }
        }
    }
};
</script>

<style>
@import "./assets/css/common.css";

/* * {
  touch-action: none;
} */
/* .van-pull-refresh {
    overflow-y: scroll !important;
    overflow-x: hidden !important;
} */

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
    background-color: #3876cd;
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
    top: 44px;
    height: 36px;
    line-height: 36px;
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
    min-height: 30px;
}

.sub-title-name {
    color: #333333;
}

.sub-title-icon {
    width: 3px;
    height: 14px;
    background: #1D71F0;
    margin-left: 10px;
    margin-top: 8px;
    /* 
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center; 
    */
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

.selected-dim-date>.values {
    display: flex;
    justify-content: flex-start;
}

.selected-dim-org {
    padding-top: 4px;
}

.selected-dim-org>.values {
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

.appPopstyle .van-popup {
    background-color: rgba(255, 255, 255, 0);
    overflow-y: hidden;
}

.footer-empty {
    min-height: 100px;
}

.van-toast {
    height: 25px;
}
</style>
