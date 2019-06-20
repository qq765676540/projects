<template>
<!-- 页面挂载入口 -->
<div id="app">
    <!-- <van-nav-bar class="nav-bar-top" title="研发财务看板" left-text left-arrow @click-left="onClickLeft" :sticky="true" /> -->
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="5" title-active-color="#0066FF" title-inactive-color="black" :animated="true" :swipeable="true" :sticky="true" :line-width="63" :line-height="2">
        <van-tab title="首页">
            <router-view v-if="active==0" class="view-container" />
        </van-tab>
        <van-tab title="收入">
            <router-view v-if="active==1" class="view-container" />
        </van-tab>
        <van-tab title="毛利">
            <router-view v-if="active==2" class="view-container" />
        </van-tab>
        <van-tab title="费用">
            <router-view v-if="active==3" class="view-container" />
        </van-tab>
        <van-tab title="订单">
            <router-view v-if="active==4" class="view-container" />
        </van-tab>
    </van-tabs>
    <div v-show="selBarFlag" class="selection-tool flex">
        <div class="flex flex-align-center flex-3">
            <div v-if="orgFlag=='N'" :class="{filterStyle:true,filterStyleActive:filterStyleActive==='整体'}" @click="filterStyleActive='整体'">整体</div>
            <div v-if="orgFlag=='N'" :class="{filterStyle:true,filterStyleActive:filterStyleActive==='国内'}" @click="filterStyleActive='国内'">国内</div>
            <div :class="{filterStyle:true,filterStyleActive:filterStyleActive==='海外'}" @click="filterStyleActive='海外'">海外</div>
        </div>
        <div class="selected-bar flex flex-2">
            <ul class="selected-dim-date flex flex-2">
                <li class="name">时间:</li>
                <li class="values flex-1" v-text="selectedTime"></li>
            </ul>
            <!-- 
            <ul class="selected-dim-org flex flex-row flex-5">
                <li class="name">组织:</li>
                <li class="values flex-3" v-text="selectedOrg.toString()"></li>
            </ul>
            -->
        </div>
        <div class="selector-switch-box relative">
            <vue-switch id="switch-1" class="selector-switch" :open="switchIsOpen" :switch-style="switchStyle" @switch-to="switchTo"></vue-switch>
        </div>
    </div>
    <selector v-show="selectorFlag" :show="selectorFlag" @cancle="cancleSelect" @confirm="confirmSelect" :selectedTime="selectedTime" :selectedOrg="selectedOrg"></selector>
    <div class="appPopstyle">
        <!-- v-on:click-overlay="closePop()" -->
        <van-popup v-model="popShow">
            <van-loading type="spinner" size="30px" color="white" />
        </van-popup>
    </div>
    <waterMark :userName="userName" v-if="userName"></waterMark>
</div>
</template>

<script>
import {
    NavBar,
    Tab,
    Switch,
    Popup,
    Loading
} from "vant";
import animate from "animate.css";

import Tabs from "./components/common/vant-tabs/index";

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
        waterMark,
        vueSwitch
    },
    data() {
        return {
            active: 0,
            cubeCount: 0,
            cubeStop: 16,
            lang: false,
            selBarFlag: true,
            pageMap: {
                0: "home",
                1: "income",
                2: "gross",
                3: "cost",
                4: "order"
            },
            selectorFlag: false,
            selectedTime: "本年",
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
            qApp: null,
            filterStyleActive: "整体",
            orgLevel: '',
            orgFlag: '',
            dataScope: ''
        };
    },
    beforeCreate() {},
    created() {},
    mounted() {
        // this.$store.dispatch('updateData', {
        //     dataName: 'isPopShow',
        //     data: true
        // });
        Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrgSetCube,
                    orgManager: "",
                    dataScope: "",
                    name: "level"
                },
                qWidth: 5,
                qHeight: 1,
                dataName: "level"
            },
            (rs) => {
                this.filterStyleActive = rs[0][2].qText == 'Y' ? '海外' : '整体';
                this.orgLevel = rs[0][1].qText;
                this.orgFlag = rs[0][2].qText;
                
                if (this.orgFlag == 'Y') {
                   this.dataScope = 'I';
                }else {
                   this.dataScope = 'T';
                }

                this.cubeInit(this.orgLevel, this.orgFlag, this.dataScope);
            });
    },
    methods: {
        closePop() {
            this.cubeCount = this.cubeStop;
        },
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        cancleSelect(data) {
            this.selectorFlag = false;
        },
        confirmSelect(data) {
            this.cubeCount = 0 ;
            if (data.org.length > 0) {
                this.selectedOrg = data.org;
                this.selectedOrgSetCube = data.org;
                this.$store.dispatch('updateData', {dataName: 'orgSelFlag',data: true});
            } else {
                this.selectedOrg = [];
                this.selectedOrgSetCube = [];
                this.$store.dispatch('updateData', {dataName: 'orgSelFlag',data: false});
            }

            this.selectorFlag = false;
            this.selectedTime = data.time.year ? (data.time.year + '年' + data.time.startMonth + '-' + data.time.endMonth + '月') : data.time;

            this.cubeInit(this.orgLevel, this.orgFlag, this.dataScope);

            $(".selected-dim-org > .values").css({
                maxWidth: $(".selected-dim-org").width() - 40
            });
            this.switchIsOpen = false;
        },
        switchTo() {
            this.selectorFlag = !this.selectorFlag;
            this.switchIsOpen = true;
        },
        cubeInit(orgLevel, orgFlag, dataScope) {
            let orgManager = (orgLevel == 'LV1' || (orgLevel == 'LV2' && orgFlag == 'Y')) ? 'Y' : 'N';
            //组织机构
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "org"
                    },
                    dataName: "org",
                    qWidth: 5,
                    qHeight: 30
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //首页
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "home-overview"
                    },
                    qWidth: 50,
                    qHeight: 10
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //收入-BP
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-bp"
                    },
                    qWidth: 7,
                    qHeight: 30,
                    orderType: -1,
                    orderCol: 2
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-bpDrill"
                    },
                    qWidth: 8,
                    qHeight: 600,
                    orderType: -1,
                    orderCol: 3
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //收入-构成
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-structure-bar"
                    },
                    qWidth: 5,
                    qHeight: 30,
                    orderType: -1,
                    orderCol: 1
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-structureDrill-bar"
                    },
                    qWidth: 6,
                    qHeight: 600,
                    orderType: -1,
                    orderCol: 2
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-structure-pie"
                    },
                    qWidth: 3,
                    qHeight: 30,
                    orderType: -1,
                    orderCol: 1
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-structureDrill-pie"
                    },
                    qWidth: 4,
                    qHeight: 600,
                    orderType: -1,
                    orderCol: 2
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //收入-分公司
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-branch"
                    },
                    qWidth: 8,
                    qHeight: 200,
                    orderType: -1,
                    orderCol: 2
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //收入-均价&数量
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "income-trend"
                    },
                    qWidth: 8,
                    qHeight: 1000
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //毛利-毛利额BP达成率及增长情况
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "gross-bp"
                    },
                    qWidth: 8,
                    qHeight: 200,
                    orderType: -1,
                    orderCol: 2
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //毛利-毛利率&扣费毛利率
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "gross-deduction"
                    },
                    qWidth: 8,
                    qHeight: 100
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //费用-费用增长
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "cost-rate"
                    },
                    qWidth: 6,
                    qHeight: 200
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "cost-rateTotal"
                    },
                    qWidth: 6,
                    qHeight: 15
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //费用-费用构成
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "cost-structure"
                    },
                    qWidth: 20,
                    qHeight: 1
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            //费用-人均费用情况
            Cube.getData(parent.qApp, this, {
                    formulaOpt: {
                        time: this.selectedTime,
                        org: this.selectedOrgSetCube,
                        orgManager: orgManager,
                        dataScope: dataScope,
                        name: "cost-trend"
                    },
                    qWidth: 4,
                    qHeight: 30
                },
                (rs) => {
                    this.cubeCount += 1;
                });
            // //订单-订单情况
            // Cube.getData(parent.qApp, this, {
            //         formulaOpt: {
            //             time: this.selectedTime,
            //             org: this.selectedOrgSetCube,
            //             orgManager: orgManager,
            //             dataScope: dataScope,
            //             name: "order-base"
            //         },
            //         qWidth: 8,
            //         qHeight: 30
            //     },
            //     (rs) => {
            //         this.cubeCount += 1;
            //     });
            // //订单-产品线未清情况
            // Cube.getData(parent.qApp, this, {
            //         formulaOpt: {
            //             time: this.selectedTime,
            //             org: this.selectedOrgSetCube,
            //             orgManager: orgManager,
            //             dataScope: dataScope,
            //             name: "order-structure"
            //         },
            //         qWidth: 4,
            //         qHeight: 100
            //     },
            //     (rs) => {
            //         this.cubeCount += 1;
            //     });
            // //订单-分公司未清情况
            // Cube.getData(parent.qApp, this, {
            //         formulaOpt: {
            //             time: this.selectedTime,
            //             org: this.selectedOrgSetCube,
            //             orgManager: orgManager,
            //             dataScope: dataScope,
            //             name: "order-branch"
            //         },
            //         qWidth: 3,
            //         qHeight: 100
            //     },
            //     (rs) => {
            //         this.cubeCount += 1;
            //     });
        }
    },
    computed: {
        popShow() {
            if (this.cubeCount==this.cubeStop) {
                return false;
            }
            return true;
        },
        userName() {
            if (this.$store.state.level.length > 0) {
                return this.$store.state.level[0][0].qText;
            }
            return false;
        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            this.$store.dispatch('updateData', {
                dataName: 'pageActive',
                data: pIndex
            });
        },
        filterStyleActive(nVal) {
            this.cubeCount = 0 ;
            this.filterStyleActive = nVal;
            switch (nVal) {
                case '整体':
                    this.$store.dispatch('updateData', {
                        dataName: 'dataScope',
                        data: 'T'
                    });
                    this.$store.dispatch('updateData', {
                        dataName: 'currency',
                        data: 'R'
                    });
                    this.dataScope = 'T';
                    break;
                case '国内':
                    this.$store.dispatch('updateData', {
                        dataName: 'dataScope',
                        data: 'I'
                    });
                    this.$store.dispatch('updateData', {
                        dataName: 'currency',
                        data: 'R'
                    });
                    this.dataScope = 'I';
                    break;
                case '海外':
                    this.$store.dispatch('updateData', {
                        dataName: 'dataScope',
                        data: 'O'
                    });
                    if (this.$store.state.pageActive != 3) {
                        this.$store.dispatch('updateData', {
                            dataName: 'currency',
                            data: 'U'
                        });
                    } else {
                        this.$store.dispatch('updateData', {
                            dataName: 'currency',
                            data: 'R'
                        });
                    }
                    this.dataScope = 'O';
                    break;
                default:
                    break;
            }
            this.cubeInit(this.orgLevel, this.orgFlag, this.dataScope);
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
    background: #1d71f0;
    margin-left: 10px;
    margin-top: 8px;
}

.sub-title-unit {
    color: #b4b6b7;
    font-size: 12px;
    text-align: left;
    margin-top: 1px;
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
    margin-right: 5px;
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

.appPopstyle .van-popup {
    background-color: rgba(255, 255, 255, 0);
    overflow-y: hidden;
}

.filterStyle {
    border-radius: 4px;
    border: 0.025rem solid rgba(128, 128, 128, 0.5);
    background-color: #fff;
    width: 60px;
    line-height: 25px;
    height: 25px;
    font-size: 12px;
    margin-right: 2px;
}

.filterStyleActive {
    background-color: #039ce3;
    color: white;
    border: none;
}
</style>
