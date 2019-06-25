<template>
<div id="app" class="flex flex-column">
    <van-nav-bar class="nav-bar-top" title="标题" left-arrow>
        <div id="titleRight" slot="right">1111</div>
    </van-nav-bar>
    <div style="height:20%" v-if="reportList" v-text="reportList"></div>
</div>
</template>

<script>
import {
    NavBar
} from 'vant';

import Mobile from './js/mobile'

export default {
    name: 'app',
    components: {
        [NavBar.name]: NavBar
    },
    data() {
        return {
            Mobile: new Mobile({
                vueApp: this,
                closeView: function () {
                    moa.ready(function () {
                        moa.closeWebView();
                    });
                }
            }),
        };
    },
    mounted() {
        this.Mobile.init();
        // this.Mobile.setEvent();
    },
    computed: {
        reportList() {
            if (this.$store.state['reportListData'].length > 0) {
                let arr = this.$store.state['reportListData'];
                let reportGroup = [];
                arr.filter(v => {
                    reportGroup.push(v.label);
                });
                return reportGroup;
            }
            return false;
        }
    },
    methods: {
        closeView() {
            moa.ready(function () {
                moa.closeWebView();
            });
        }
    }
}
</script>

<style>
@import "./css/common.css";

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

.nav-bar-top {
    height: 100px;
    line-height: 100px;
    background-color: #f81414;
    color: #ffffff;
}

.van-nav-bar__title {
    color: white;
    font-size: 1.2rem;
}

.van-nav-bar .van-icon {
    color: white;
    font-size: 1.4rem;
}
</style>
