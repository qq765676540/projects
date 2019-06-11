<template>
<div id="app">
    <div class="nav-bar-top flex">
        <div class="nav-bar-top_left fa fa-angle-left flex-1"></div>
        <div class="nav-bar-top_title flex-10">总体业绩</div>
        <div class="nav-bar-top_right flex-1"></div>
    </div>
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="6" title-active-color="#0066FF" title-inactive-color="black" :animated="true" :swipeable="false" :sticky="true" :line-width="50">
        <van-tab title="首页">
            <!-- <keep-alive> -->
            <router-view v-if="active==0" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="收入">
            <!-- <keep-alive> -->
            <router-view v-if="active==1" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="毛利">
            <!-- <keep-alive> -->
            <router-view v-if="active==2" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="费用">
            <!-- <keep-alive> -->
            <router-view v-if="active==3" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="扣费毛利">
            <!-- <keep-alive> -->
            <router-view v-if="active==4" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
    </van-tabs>
    <div class="main-selection flex flex-row">
        <!-- <i class="selection-btn flex-1" @click="showSelector"></i>
      <van-switch
        v-model="selectorFlag"
        active-color="#07c160"
        inactive-color="#f44"
        size="15px"
        class="selector-switch"
      /> -->
        <div class="selector-switch-box relative">
            <vue-switch id="switch-1" class="selector-switch" :open="switchIsOpen" :switch-style="switchStyle" @switch-to="switchTo"></vue-switch>
        </div>
        <div class="selected-bar flex flex-row flex-5">
            <ul class="selected-dim-date flex flex-row flex-4">
                <li class="name">时间:</li>
                <li class="values textStyle flex-2" v-text="selectedTime.name=='其他'
              ?(selectedTime.year+'年'+selectedTime.startMonth+'月至'+selectedTime.endMonth+'月')
              :selectedTime.name"></li>
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

    <waterMark :userName="userName" v-if="userName"></waterMark>
</div>
</template>

<script>
import {
    NavBar,
    Tab,
    Actionsheet
} from "vant";
import Tabs from "./components/common/vant-tabs/index";
import Cube from "./tools/cube.js";
import waterMark from "./components/common/water-mark";
import selector from "./components/sub-components/selector";
import vueSwitch from "./components/common/vue-switch";
import $ from "jquery";
// import Tools from "./tools/tools";
// var tool = new Tools();
// var cube = new Cube();

export default {
    name: "app",
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Actionsheet.name]: Actionsheet,
        waterMark,
        selector,
        vueSwitch
    },
    data() {
        return {
            active: 0,
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
                name: "本年",
                year: 2019,
                startMonth: 1,
                endMonth: 2
            },
            selectedOrg: "浙江",
            selectorFlag: false
        };
    },
    computed: {
        orgData() {
            if (this.$store.state["main-business-center"].length) {
                return this.$store.state["main-business-center"];
            }
            return false;
        },
        userName() {
            if (this.$store.state["main-persion"].length) {
                return this.$store.state["main-persion"][0][0].qText;
            }
            return false;
        }
    },
    mounted() {
        this.cubeInit();
    },
    methods: {
        onClickLeft() {},
        cancleSelect() {
            this.selectorFlag = false;
        },
        confirmSelect(data) {
            this.selectorFlag = false;
            this.selectedTime = data.time;
            this.selectedOrg = data.org;
            $(".selected-dim-org > .values").css({
                maxWidth: $(".selected-dim-org").width() - 40
            });
            this.switchIsOpen = false;
        },
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        switchTo() {
            this.selectorFlag = !this.selectorFlag;
            this.switchIsOpen = true;
        },
        cubeInit() {
            //当前操作人
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "main-persion"
                }
            });
            //业务中心
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "main-business-center"
                }
            });
            //首页总收入格
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "over-all-top"
                }
            });
            //首页费用格
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "over-all-btm"
                }
            });
            //首页进度
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "over-all-progress"
                }
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
            });
            //收入 收入概览
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-all"
                }
            });
            //收入 全年预算进度
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-year"
                }
            });
            //收入 行业总收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-hz"
                }
            });
            //收入 行业自有收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-hzy"
                }
            });
            //收入 产品总收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-cz"
                }
            });
            //收入 产品自有收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-czy"
                }
            });
            //收入 城市总收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-cityz"
                },
                orderType: -1,
                orderCol: 3
            });
            //收入 城市自有收入
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "income-cityzy"
                },
                orderType: -1,
                orderCol: 3
            });
            //毛利 毛利概览
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "margin-all"
                }
            });
            //毛利 各城市毛利额情况
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "margin-city"
                }
            });
            //费用 重点费用情况
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-main"
                }
            });
            //费用 费用结构
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-pie"
                }
            });
            //费用 人力成本
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-rlcb"
                }
            });
            //费用 广宣费用
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-gxfy"
                }
            });
            //费用 物流成本
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-wlcb"
                }
            });
            //费用 营销成本
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-yxcb"
                }
            });
            //费用 差旅费用
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-clfy"
                }
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
            });
            //费用 业务招待
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-ywzd"
                }
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
            });
            //费用 日常开支
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "cost-rckz"
                }
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
            });
            //扣费毛利 概览
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "de-margin-all"
                }
            });
            //扣费毛利 人均效能
            Cube.getData(parent.qApp, this, {
                formulaOpt: {
                    time: this.selectedTime,
                    org: this.selectedOrg,
                    name: "de-margin-per"
                }
            });
            setTimeout(() => {
                this.$store.dispatch("updateData", {
                    dataName: "isPopShow",
                    data: false
                });
            }, 3000);
        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            this.selBarFlag = pIndex == 1 ? false : true;
        },
        "selectedTime.name": function () {
            this.cubeInit();
            this.switchIsOpen = false;
        },
        "selectedTime.year": function () {
            this.cubeInit();
            this.switchIsOpen = false;
        },
        "selectedTime.startMonth": function () {
            this.cubeInit();
            this.switchIsOpen = false;
        },
        "selectedTime.endMonth": function () {
            this.cubeInit();
            this.switchIsOpen = false;
        },
        selectedOrg() {
            this.cubeInit();
            this.switchIsOpen = false;
        }
    }
};
</script>

<style>
@import "./assets/css/font-awesome.min.css";
@import "./assets/css/common.css";
@import "./components/common/vant-tabs/index.css";

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

html,
body,
body>div,
#app,
.nav-tabs,
.van-tabs__content {
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

.nav-bar-top {
    color: white;
    height: 40px;
    line-height: 40px;
    background-color: #1d71f0;
    font-size: 16px;
}

.nav-bar-top_left {
    font-size: 36px;
    padding-top: 2px;
}

.view-container {
    padding-top: 40px;
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
}

.main-title {
    min-height: 40px;
    border: 1px #ff0000 solid;
}

.main-selection {
    height: 40px;
    line-height: 40px;
    width: 100%;
    position: absolute;
    top: 80px;
    z-index: 100;
    background-color: #eeeff3;
    padding-left: 6px;
}

.main-selection .filter {
    font-size: 14px;
    color: #333333;
    cursor: pointer;
    background: white;
    border-top: 2px solid #f1f4fb;
    border-bottom: 4px solid #f1f4fb;
}

.van-tabs__nav--line {
    padding-bottom: 8px !important;
}

.sub-title {
    font-family: "PingFangSC-Medium";
    /* font-weight: bold; */
    color: black;
    font-size: 16px;
    -webkit-box-align: end;
    text-indent: 4px;
    width: 100%;
    max-height: 30px;
    line-height: 30px;
    margin-top: 3px;
    display: flex;
}

.textStyle {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.sub-title-icon {
    width: 3px;
    height: 16px;
    line-height: 30px;
    margin-left: 10px;
    margin-top: 8px;
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center;
    background-color: #1d71f0;
    border-radius: 1px;
}

.van-actionsheet {
    overflow-y: auto !important;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 240px;
    background-color: white;
    padding-top: 10px;
    padding-bottom: 30px;
}

.van-actionsheet__item {
    line-height: 40px;
    border-bottom: 2px solid rgba(182, 174, 174, 0.1);
}

.van-actionsheet__cancel {
    line-height: 40px;
    color: #1d71f0;
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
</style>
