<template>
<div id="app">
    <!-- <van-nav-bar class="nav-bar-top" title="工作计划与日志看板" left-text="" left-arrow @click-left="onClickLeft"/> -->
    <van-tabs v-model="active" class="nav-tabs" :color="'#29A6FF'" :swipe-threshold="5" title-active-color="#0066FF" title-inactive-color="black" :swipeable="true" :sticky="true" :animated="true">
        <van-tab :title="$t('message.home') "></van-tab>
        <van-tab :title="$t('message.income')"></van-tab>
        <van-tab :title="$t('message.margin')"></van-tab>
        <van-tab :title="$t('message.cost') "></van-tab>
        <van-tab :title="$t('message.grossMargin') "></van-tab>
    </van-tabs>
    <div v-show="selBarFlag" class="selection-tool flex flex-row">
        <i class="selection-btn flex-1" @click="showSelector"></i>
        <van-switch v-model="selectorFlag" active-color="#07c160" inactive-color="#f44" size="15px" class="selector-switch" />
        <selector v-show="selectorFlag" @cancle="cancleSelect" @confirm="confirmSelect"></selector>
        <div class="selected-bar flex flex-row flex-5">
            <ul class="selected-dim-date flex flex-row flex-2">
                <li class="name">时间:</li>
                <li class="values flex-1" v-text="selectedTime"></li>
            </ul>
            <ul class="selected-dim-org flex flex-row flex-5">
                <li class="name">组织:</li>
                <li class="values flex-3" v-text="selectedOrg"></li>
            </ul>
        </div>
    </div>
    <!-- <van-switch v-model="lang" active-color="#07c160" inactive-color="#f44" size="15px" class="lang-switch"/> -->
    <router-view class="view" />
</div>
</template>

<script>
import {
    NavBar,
    Tab,
    Tabs,
    Switch
} from 'vant';

import selector from './components/sub-components/selector'
// import Cube from './tools/cube';
// var cube = new Cube();

export default {
    name: 'App',
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Switch.name]: Switch,
        selector
    },
    data() {
        return {
            active: 1,
            lang: true,
            selBarFlag: true,
            pageMap: {
                0: 'summary',
                1: 'plan-execution',
                2: 'visit-warning',
                3: 'visit-customer',
                4: 'customer-distribution'
            },
            selectorFlag: false,
            selectedTime: '本周',
            selectedOrg: ''
        }
    },
    mounted() {
        /**
         * qApp: sense app 对象
         * this: vue 对象
         * rankByCustomer: 对象config中KPI公式
         * page2: store中参数名称
         */
        // cube.getData(qApp, this, 'rankByCustomer', 'customerData');
    },
    methods: {
        onClickLeft() {
            console.log('onClickLeft');
        },
        showSelector() {
            this.selectorFlag = this.selectorFlag ? false : true;
        },
        cancleSelect() {
            this.selectorFlag = false;
        },
        confirmSelect(data) {
            console.log('data: ', data);
            this.selectorFlag = false;
            this.selectedTime = data.time;
            this.selectedOrg = data.org.toString();

        }
    },
    watch: {
        active(pIndex) {
            this.$router.push(this.pageMap[pIndex]);
            this.selBarFlag = pIndex == 1 ? false : true;
        },
        lang(lang) {
            if (!lang) {
                this.$i18n.locale = 'zhCHS';
                this.$Local('zhCHS');
            } else {
                this.$i18n.locale = 'en';
                this.$Local('en');
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
}

.lang-switch {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.view {
  height: calc(100% - 80px);
  overflow-y: auto;
}

.nav-bar-top {
  height: 40px;
  line-height: 40px;
  background-color: #1d71f0;
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
    height: 40px;
    width: 100vw;
    background-color: #EEEFF3;
    padding-left: 6px;
}

.sub-title {
  font-family: "PingFangSC-Medium";
  color: black;
  font-size: 16px;
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
  text-indent: 4px;
  min-height: 30px;
}

.sub-title-icon {
  width: 4px;
  height: 15px;
  margin-left: 10px;
  background-color: #1d71f0;
  border-radius: 1px;
  margin-top: 2px;
}

.sub-title-unit {
  color: #b4b6b7;
  font-size: 12px;
  text-align: left;
  display: flex;
}

.selection-btn {
    background: url('./assets/image/tools-and-utensils.png') center no-repeat;
    background-size: contain;
    min-width: 18px;
    max-width: 18px;
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
    min-width: calc(100% - 180px);
    max-width: calc(100% - 180px);
}

.selector-switch {
    min-width: 30px;
    max-width: 30px;
    margin-top: 10px;
    margin-left: 4px;
}
</style>
