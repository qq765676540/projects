<template>
<div id="app">
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="6" title-active-color="#0066FF" title-inactive-color="black" :animated="true" :swipeable="false" :sticky="true" :line-width="50">
        <van-tab title="首页"></van-tab>
        <van-tab title="收入"></van-tab>
        <van-tab title="毛利"></van-tab>
        <van-tab title="费用"></van-tab>
        <van-tab title="扣费毛利"></van-tab>
    </van-tabs>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="view-container" id="routerPage">
        <router-view />
    </van-pull-refresh>
    <div class="main-selection flex flex-row">
        <div class="selector-switch-box relative">
            <vue-switch id="switch-1" class="selector-switch" :open="switchIsOpen" :switch-style="switchStyle" @switch-to="switchTo"></vue-switch>
        </div>
        <div class="selected-bar flex flex-row flex-5">
            <ul class="selected-dim-date flex flex-row flex-4">
                <li class="name">时间:</li>
                <li class="values textStyle flex-2" v-text="selectedTime.name=='其他'?(selectedTime.year+'年'+selectedTime.startMonth+'月至'+selectedTime.endMonth+'月'):selectedTime.name"></li>
            </ul>
            <ul class="selected-dim-org flex flex-row flex-3">
                <li class="name">业务中心:</li>
                <li class="values textStyle flex-2" v-text="selectedOrg"></li>
            </ul>
            <ul class="flex flex-row flex-2">
                <li class="name">单位(万元)</li>
            </ul>
        </div>
    </div>
    <div class="selectCon flex flex-row">
        <selector v-show="selectorFlag" :show="selectorFlag" @cancle="cancleSelect" @confirm="confirmSelect" :selectedTime="selectedTime" :selectedOrg="selectedOrg" :orgData="orgData"></selector>
    </div>

    <div class="appPopstyle">
        <van-popup v-model="popShow" :close-on-click-overlay="false" v-if="popShow">
            <van-loading type="spinner" size="30px" color="white" />
        </van-popup>
    </div>

    <waterMark :userName="userName" v-if="userName"></waterMark>
</div>
</template>

<script>
import {
    PullRefresh,
    Tab,
    Tabs,
    Popup,
    Loading,
    Toast
} from "vant";

import Cube from "./tools/cube.js";
import waterMark from "./components/common/water-mark";
import selector from "./components/sub-components/selector";
import vueSwitch from "./components/common/vue-switch";

export default {
    name: "app",
    components: {
        [PullRefresh.name]: PullRefresh,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Popup.name]: Popup,
        [Loading.name]: Loading,
        [Toast.name]: Toast,
        waterMark,
        selector,
        vueSwitch
    },
    data() {
        return {
            myStartTime: new Date(),
            active: 0,
            cubeCount: 0,
            cubeStop: [5,8,2,12,2],
            switchIsOpen: false,
            switchStyle: {
                width: 54,
                height: 24,
                bgColor: "rgba(199, 199, 199, 0.68)",
                circleColor: "red"
            },
            pageMap: {
                0: "overallIndex",
                1: "income",
                2: "grossMargin",
                3: "cost",
                4: "deductionMargin"
            },
            time_bucket: [],
            curFilter: "current_month",
            selectedTime: {
                name: "本月",
                year: new Date().getFullYear(),
                startMonth: 1,
                endMonth: 1
            },
            selectedOrg: "浙江",
            selectorFlag: false
        };
    },
    beforeCreate() {},
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
        orgData() {
            if (this.$store.state["main-business-center"].length > 0) {
                return this.$store.state["main-business-center"];
            }
            return false;
        },
        userName() {
            if (this.$store.state["main-persion"].length > 0) {
                return this.$store.state["main-persion"][0][0].qText;
            }
            return false;
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
        cancleSelect() {
            this.selectorFlag = false;
        },
        confirmSelect(data) {
            this.cubeCount = 0;
            this.selectorFlag = false;
            this.selectedTime = data.time;
            this.selectedOrg = data.org;
            $(".selected-dim-org > .values").css({
                maxWidth: $(".selected-dim-org").width() - 40
            });
            this.switchIsOpen = false;
            this.myStartTime = new Date();
            this.cubeInit();
        },
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        switchTo() {
            this.selectorFlag = !this.selectorFlag;
            this.switchIsOpen = true;
        },
        cubeInit() {
            switch (this.active) {
                case 1:
                    //收入 收入概览
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-view"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //收入 全年预算进度
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-year"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //收入 行业总收入
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-industry"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-industryTotal"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //收入 产品总收入
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-product"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-productTotal"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //收入 城市总收入
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-cityz"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //收入 城市自有收入
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "income-cityzy"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 2:
                    //毛利 各城市毛利额情况
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "margin-city"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            // console.log('YCQ日志记录:标识->',rs);
                            this.cubeCount += 1;
                        });
                    //首页-总体情况
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "over-all-kpi"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 3:
                    //费用 重点费用情况
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-main"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 费用结构
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-pie"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 人力成本
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-rlcb"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 广宣费用
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-gxfy"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 物流成本
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-wlcb"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 营销成本
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-yxcb"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 差旅费用
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-clfy"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 差旅费用表格
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-clfy-chart"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 业务招待
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-ywzd"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 业务招待表格
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-ywzd-chart"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 日常开支
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-rckz"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //费用 日常开支图标
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "cost-rckz-chart"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                case 4:
                    //扣费毛利 人均效能
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "de-margin-per"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //首页-总体情况
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "over-all-kpi"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
                default:
                    //当前操作人
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "main-persion"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //业务中心
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "main-business-center"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //首页-总体情况
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "over-all-kpi"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //首页进度
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "over-all-progress"
                            }
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    //首页业绩排名
                    Cube.getData(parent.qApp, this, {
                            formulaOpt: {
                                time: this.selectedTime,
                                org: this.selectedOrg,
                                name: "over-all-ranking"
                            },
                            orderType: -1,
                            orderCol: 1
                        },
                        (rs) => {
                            this.cubeCount += 1;
                        });
                    break;
            }
        }
    },
    watch: {
        active(pIndex) {
            $("#routerPage").scrollTop(0);
            this.$router.push(this.pageMap[pIndex]);
            this.myStartTime = new Date();
            this.cubeCount = 0;
            setTimeout(() => {
                this.cubeInit();
            }, 300);
            // this.cubeInit();
        },
        selectedOrg() {
            this.switchIsOpen = false;
        },
        cubeCount(nVal) {
            if (nVal == this.cubeStop[this.active]) {
                let myEndTime = new Date();
                Toast({message: '本次查询耗时: '+((myEndTime-this.myStartTime)/1000).toFixed(2)+'秒',duration:1000});
            }
        }
    }
};
</script>

<style>
@import "./assets/css/common.css";

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

html,
body,
#app {
    height: 100%;
    width: 100%;
    overflow: hidden !important;
}

.values {
    text-align: left;
}

.selectCon {
    width: 100%;
    height: 100%;
}

.view-container {
    padding-top: 40px;
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.main-title {
    min-height: 40px;
    border: 1px #ff0000 solid;
}

.main-selection {
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

.textStyle {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.sub-title-icon {
    width: 3px;
    height: 14px;
    background: #1d71f0;
    margin-left: 10px;
    margin-top: 8px;
}

.filter_active {
    color: #1d71f0 !important;
}

.selection-btn {
    background: url("./assets/image/tools-and-utensils.png") center no-repeat;
    background-size: contain;
    min-width: 18px;
    max-width: 18px;
}

.selected-bar {
    align-items: center;
}

.selector-switch-box {
    width: 60px;
    height: 40px;
    margin-right: 5px;
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

.van-toast {
    height: 25px;
}
</style>
