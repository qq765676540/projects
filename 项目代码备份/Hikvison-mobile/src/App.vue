<template>
<div id="app" class="flex flex-column">
    <!-- 头部标题 -->
    <!-- <van-nav-bar v-on:click-left="closeView" class="nav-bar-top" title="标题" left-arrow>
        <div id="titleRight" slot="right">222</div>
    </van-nav-bar> -->
    <!-- <div>{{msg}}</div> -->

    <!-- 所有报表页面 -->
    <van-collapse v-model="reportActiveName" accordion v-if="reportList&&pageActive==0&&!reportPageOpenFlag">
        <van-collapse-item v-for="(val,key) in reportList" :key="key" :title="val.label" :name="key+''">
            <div v-for="(childVal,clildKey) in reportList[key].children" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,val.id)">
                <div class="reportImg flex-1"></div>
                <div class="reportName flex-7">{{childVal.label}}</div>
                <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center">
                    <van-icon name="star-o" color="#222" size="25px" v-on:click.stop="favoriteReport" />
                </div>
            </div>
        </van-collapse-item>
    </van-collapse>

    <!-- 我的报表页面 -->
    <div class="myReportPage flex flex-column flex-align-center" v-if="favoriteReportList&&pageActive==1&&!reportPageOpenFlag">
        <div v-for="(childVal,clildKey) in favoriteReportList" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,-1)">
            <div class="reportImg flex-1"></div>
            <div class="reportName flex-7">{{childVal.label}}</div>
            <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center">
                <van-icon name="star-o" color="#222" size="25px" v-on:click.stop="favoriteReport" />
            </div>
        </div>
    </div>

    <!-- 打开报表页面 -->
    <iframe id="reportIframe" class="reportIframe" src="" frameborder="0"></iframe>

    <!-- 页面底部 -->
    <van-tabbar class="footer" v-model="pageActive" :safe-area-inset-bottom="true" active-color="#05c060" inactive-color="#555555" v-if="!reportPageOpenFlag">
        <van-tabbar-item>
            <div class="flex flex-column">
                <van-icon name="wap-nav" size="30px" />
                <span>所有报表</span>
            </div>
        </van-tabbar-item>
        <van-tabbar-item>
            <div class="flex flex-column">
                <van-icon name="manager" size="30px" />
                <span>我的报表</span>
            </div>
        </van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import {
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Collapse,
    CollapseItem,
    Sidebar,
    SidebarItem
} from 'vant';

import Mobile from './js/mobile';
import Tools from './js/tools';
import demoData from './js/demoData';

export default {
    name: 'app',
    components: {
        [NavBar.name]: NavBar,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [Icon.name]: Icon,
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem,
        [Sidebar.name]: Sidebar,
        [SidebarItem.name]: SidebarItem
    },
    data() {
        return {
            msg: '',
            pageActive: 0,
            reportActiveName: '0',
            reportListActiveKey: 0,
            reportPageOpenFlag: false,
            Mobile: new Mobile({
                vueApp: this
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
                let arr = Tools.deepClone(this.$store.state['reportListData']);
                arr.splice(0, 1);
                return arr;
            }
            return false;
            // demoData.splice(0, 1);
            // return demoData;
        },
        favoriteReportList() {
            if (this.$store.state['reportListData'].length > 0) {
                let arr = Tools.deepClone(this.$store.state['reportListData']);
                return arr[0].children;
            }
            return false;
            // return demoData[0].children;
        },
    },
    methods: {  
        // 返回MOA
        closeView() {
            
            // moa.ready(function () {
            //     moa.closeWebView();
            // });
        },
        //打开报表
        openReport(reportName,groupId) {
            let _this = this;
            alert('123');
            $('#MyHtmlTitle').text(name);
            this.Mobile.getReportId(groupId,reportName,(rs) => {
                rs.filter(v => {
                    if(v.reportName == reportName) {
                        _this.Mobile.getReportUrl(v.reportId,(data) => {
                            $('#reportIframe').attr('src', data.reportUrl);
                        });
                    }
                });
            });
            this.reportPageOpenFlag = true;
            
            
        },
        //收藏报表
        favoriteReport() {
            alert('456');
            localStorage.lang = 'en';
            location.reload();
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

.footer {
    height: 3rem;
    background: rgba(245, 245, 245, 0.8);
}

.van-cell {
    height: 100px;
    line-height: 90px;
    font-size: 1.3rem;
    color: #ffffff;
    background: linear-gradient(#7899b4, #9fd3f7);
}

.van-collapse-item__content {
    margin-top: 10px;
    max-height: 700px;
    overflow-y: scroll !important;
}

.van-cell__right-icon {
    line-height: 90px;
    font-size: 1.3rem;
    color: #ffffff;
}

.report {
    width: 100%;
    height: 90px;
    line-height: 90px;
    border-radius: 5px;
    min-width: 110px;
    text-align: left;
    border: 2px solid rgba(9, 9, 9, 0.125);
    margin-bottom: 10px;
    background: linear-gradient(left, rgba(168, 168, 168, 0.5), rgba(168, 168, 168, 0) 50%, rgba(168, 168, 168, 0.5));
}

.report.active {
    background: linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6 51%);
}

.report .reportImg {
    width: 100%;
    height: 100%;
    background: url('./images/dblog.png') 2px no-repeat;
}

.report .reportName {
    margin-left: 10px;
    color: #222;
    font-size: 1rem;
    font-weight: bold;
}

.report .reportFavorite {
    margin-bottom: 2px;
}

.myReportPage {
    height: 100%;
    margin-top: 10px;
}

.reportIframe {
    width: 100%;
    height: 100%;
}
</style>
