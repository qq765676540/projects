<template>
<div id="app">
    <div class="nav-bar-top flex">
        <div class="nav-bar-top_left fa fa-angle-left flex-1"></div>
        <div class="nav-bar-top_title flex-10">商机统计分析</div>
        <div class="nav-bar-top_right flex-1"></div>
    </div>
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="6" title-active-color="#0066FF" title-inactive-color="black" :animated="true" :swipeable="false" :sticky="true" :line-width="50">
        <van-tab title="商机总览">
            <!-- <keep-alive> -->
                <router-view v-if="active==0" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="商机预警">
            <!-- <keep-alive> -->
                <router-view v-if="active==1" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="商机构成">
            <!-- <keep-alive> -->
                <router-view v-if="active==2" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
        <van-tab title="商机分布">
            <!-- <keep-alive> -->
                <router-view v-if="active==3" class="view-container flex-container" />
            <!-- </keep-alive> -->
        </van-tab>
    </van-tabs>
    <div class="main-selection flex flex-row">
        <div class="filter flex-1" @click="curFilter='filter_1', asShow=true">行业:{{selected.filter_1}}</div>
        <div class="filter flex-1" @click="curFilter='filter_2', asShow=true">区域:{{selected.filter_2}}</div>
        <div class="filter flex-1" @click="curFilter='filter_3', asShow=true">筛选3</div>
    </div>
    <div class="actionsheet absolute" v-show="asShow" @click.stop="asShow=false">
        <van-actionsheet v-model="asShow" :actions="selctions" :overlay="false" @select="onSelect" cancel-text="取消" />
    </div>
</div>
</template>

<script>
import {
    NavBar,
    Tab,
    Switch,
    Actionsheet
} from "vant";
import Tabs from "./components/common/vant-tabs/index";
// import Cube from "./tools/cube.js";

export default {
    name: "app",
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Switch.name]: Switch,
        [Actionsheet.name]: Actionsheet
    },
    data() {
        return {
            active: 0,
            pageMap: {
                0: "summary",
                1: "warning",
                2: "constitute",
                3: "distribution",
            },
            filter_1: [{
                name: '全部'
            },{
                name: '选项1'
            }, {
                name: '选项2',
            }, {
                name: '选项3'
            }, {
                name: '选项4',
            }, {
                name: '选项5'
            }],
            filter_2: [{
                name: '全部'
            },{
                name: '选项6',
            }, {
                name: '选项7'
            }, {
                name: '选项8',
            }, {
                name: '选项9'
            }, {
                name: '选项10',
            }],
            asShow: false,
            curFilter: 'filter_1',
            selected: {
                filter_1: '全部',
                filter_2: '全部'
            }
        }
    },
    mounted() {
        // Cube.getKpiData(window.qApp, this, {
        //     kpiName: "measure_1"
        // });
    },
    methods: {
        onClickLeft() {},
        onSelect(selected) {
            this.$set(this.selected, this.curFilter, selected.name);
            this.asShow = false;
            // console.log('this.selected: ', JSON.stringify(this.selected));
        }
    },
    computed: {
        selctions() {
            return this[this.curFilter];
        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            this.selBarFlag = pIndex == 1 ? false : true;
        },
        curFilter(selected) {
            if(selected=='filter_3') {
                window.qApp.field('City').selectValues([{qText: '门托'}], true, false)
            }
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
}

.main-selection .filter {
    font-size: 14px;
    color: #333333;
    cursor: pointer;
    background: white;
    border-top: 2px solid #F1F4FB;
    border-bottom: 4px solid #F1F4FB;
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

.actionsheet {
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
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
    color: #1D71F0;
}
</style>
