<template>
<div id="app">
    <van-pull-refresh class="flex flex-column" v-model="isLoading" @refresh="onRefresh">
        <!-- 打开报表页面 -->
        <iframe id="reportIframe" class="reportIframe" src="" frameborder="0" v-show="reportPageOpenFlag"></iframe>
        <!-- 头部标题 -->
        <!-- <van-nav-bar v-on:click-left="closeView" class="nav-bar-top" title="标题" left-arrow>
                <div id="titleRight" slot="right">222</div>
            </van-nav-bar> -->

        <!-- 所有报表页面 -->
        <div class="flex flex-column flex-1">
            <van-collapse v-model="reportActiveName" accordion v-if="reportList&&pageActive==0&&!reportPageOpenFlag">
                <van-collapse-item v-for="(val,key) in reportList" :key="key" :title="val.label" :name="key+''">
                    <div v-for="(childVal,clildKey) in reportList[key].children" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,val.id)">
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <img src="./images/reportIcon.png" />
                        </div>
                        <div class="reportName flex-7">{{childVal.label}}</div>
                        <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center" @click.stop="favoriteReport(childVal.label)">
                            <img src="./images/scTrue.png" width="50%" v-show="reportUrlList[reportIdList[childVal.label]].isFavorite" />
                            <img src="./images/scFalse.png" width="50%" v-show="!reportUrlList[reportIdList[childVal.label]].isFavorite" />
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>

        <!-- 我的报表页面 -->
        <div class="flex flex-column flex-1 flex-align-center" style="margin-top: 2px" v-if="favoriteReportList&&pageActive==1&&!reportPageOpenFlag">
            <div v-for="(childVal,clildKey) in favoriteReportList" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,-1)">
                <div class="flex flex-1 flex-justify-center flex-align-center"><img src="./images/reportIcon.png" /></div>
                    <div class="reportName flex-7">{{childVal.label}}</div>
                    <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center" @click.stop="favoriteReport(childVal.label)">
                        <img src="./images/scTrue.png" width="50%" v-show="reportUrlList[reportIdList[childVal.label]].isFavorite" />
                        <img src="./images/scFalse.png" width="50%" v-show="!reportUrlList[reportIdList[childVal.label]].isFavorite" />
                </div>
                    </div>
                </div>
                <div class="flex flex-column flex-1 flex-align-center" v-if="!favoriteReportList&&pageActive==1">
                    <img src="./images/empty.png" sizes="" />
                    <div style="font-size: 1.3rem;color: #888888">空空如也,快去收藏</div>
                </div>
    </van-pull-refresh>
    <!-- loading页面 -->
    <div class="appPopstyle">
        <van-popup v-model="popShow" :close-on-click-overlay="false">
            <van-loading text-size="20px" size="50px" color="#fff" vertical>加载中...</van-loading>
        </van-popup>
    </div>
    <!-- 页面底部 -->
    <van-tabbar class="footer" v-model="pageActive" :safe-area-inset-bottom="true" active-color="#F02C38" inactive-color="#888888" v-if="!reportPageOpenFlag">
        <van-tabbar-item>
            <div class="flex flex-column flex-align-center">
                <img v-if="pageActive==0" src="./images/allReportTrue.png" width="50%" slot="icon">
                <img v-if="!pageActive==0" src="./images/allReportFalse.png" width="50%" slot="icon">
                <span style="padding-top:5px">所有报表</span>
            </div>
        </van-tabbar-item>
        <van-tabbar-item>
            <div class="flex flex-column flex-align-center">
                <img v-if="pageActive==1" src="./images/myReportTrue.png" width="50%" slot="icon">
                <img v-if="!pageActive==1" src="./images/myReportFalse.png" width="50%" slot="icon">
                <span style="padding-top:5px">我的报表</span>
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
    SidebarItem,
    Popup,
    Loading,
    PullRefresh,
    Toast
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
        [SidebarItem.name]: SidebarItem,
        [Popup.name]: Popup,
        [Loading.name]: Loading,
        [PullRefresh.name]: PullRefresh,
        [Toast.name]: Toast
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
            reportCount: 0,
            reportIdList: {},
            reportUrlList: {},
            // reportIdList: demoData[1],
            // reportUrlList: demoData[2],
            isLoading: false,
        };
    },
    created() {

    },
    mounted() {
        let _this = this;
        this.createLangIcon();
        this.Mobile.init(rs => {
            if (rs) {
                let __this = _this;
                _this.Mobile.getDefault();
                _this.Mobile.getAllReportList(count => {
                    __this.reportCount = count;
                });
            }
        });

        setTimeout(() => {
            this.reportIdList = Tools.deepClone(this.$store.state['reportIdData']);
            this.reportUrlList = Tools.deepClone(this.$store.state['reportUrlData']);
        }, 3000);

    },
    computed: {
        reportList() {
            if (this.$store.state['reportListData'].length > 0 &&
                Object.keys(this.reportIdList).length > 0 &&
                Object.keys(this.reportUrlList).length > 0) {
                let arr = Tools.deepClone(this.$store.state['reportListData']);
                arr.splice(0, 1);
                return arr;
            }
            return false;
            // return demoData[0];
        },
        favoriteReportList() {
            if (this.$store.state['reportListData'].length > 0 &&
                Object.keys(this.reportIdList).length > 0 &&
                Object.keys(this.reportUrlList).length > 0) {
                let arr = Tools.deepClone(this.$store.state['reportListData']);
                if (arr[0].children.length > 0) {
                    this.pageActive = 1;
                    return arr[0].children;
                } else {
                    return false;
                }
            }
            return false;
            // return demoData[0][1].children;
        },
        popShow() {
            if (Object.keys(this.reportUrlList).length > 0) {
                return false;
            }
            return true;
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
        openReport(reportName, groupId) {
            this.reportPageOpenFlag = true;
            let _this = this;
            $('#MyHtmlTitle').text(reportName);
            $('#reportIframe').attr('src', this.reportUrlList[this.reportIdList[reportName]].reportUrl);

        },
        //收藏报表
        favoriteReport(reportName) {
            let id = this.reportIdList[reportName];
            let flag = this.reportUrlList[this.reportIdList[reportName]].isFavorite;
            this.reportUrlList[this.reportIdList[reportName]].isFavorite = !flag;
            if (flag) {
                Toast({message: '取消收藏',duration:1000});
                this.Mobile.removeFavorite(id);
            } else {
                Toast({message: '收藏成功',duration:1000, icon: 'passed'});
                this.Mobile.addFavorite(id);
            }
        },
        //设置语言
        createLangIcon() {
            moa.ready(function () {
                moa.setCustomNavigation({
                    type: 'extend',
                    menuList: [{
                        text: '中文',
                        id: 'setZH',
                        icon: ''
                    }, {
                        text: '英文',
                        id: 'setEN',
                        icon: ''
                    }],
                    success: function (id) {
                        if (id == 'setZH') {
                            localStorage.lang = 'zh';
                            location.reload();
                        } else {
                            localStorage.lang = 'en';
                            location.reload();
                        }
                    },
                    fail: function (error) {
                        alert('error');
                    }
                });
            });

        },
        //刷新页面
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                location.reload();
            }, 500);
        }
    }
}
</script>

<style>
@import "./css/common.css";

html,
body,
#app,
.nav-tabs {
    height: 100%;
    width: 100%;
    overflow: hidden !important;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
}

.van-pull-refresh__track {
    min-height: 40rem;
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
    height: 3.5rem;
    background: rgba(245, 245, 245, 0.8);
}

.van-cell {
    font-family: 'PingFangSC-Regular';
    height: 100px;
    line-height: 90px;
    font-size: 1.2rem;
    color: #333333;
    background: #ffffff;
    text-align: left;
    margin-left: 20px;
}

.van-collapse-item__content {
    margin: 0px;
    padding: 0px;
    max-height: 700px;
    overflow-y: scroll !important;
}

.van-cell__right-icon {
    line-height: 90px;
    font-size: 1.2rem;
    color: #a3a3a3;
    margin-right: 20px;
}

.report {
    width: 100%;
    height: 100px;
    line-height: 90px;
    text-align: left;
    border-bottom: 2px solid rgba(9, 9, 9, 0.1);
    background: #FBFBFB;
    margin: 0px;
    padding: 0px;
}

.report.active {
    background: linear-gradient(#fefefe 0%, #f0f0f0 50%, #e6e6e6 51%);
}

.report .reportImg {
    width: 100%;
    height: 100%;
    background: url('./images/reportIcon.png') no-repeat;
}

.report .reportName {
    font-family: 'PingFangSC-Light';
    margin-left: 10px;
    color: #333333;
    font-size: 1rem;
}

.report .reportFavorite {
    margin-bottom: 2px;
}

.myReportPage {
    min-height: 40rem;
    margin-top: 10px;
}

.reportIframe {
    width: 100%;
    min-height: 42rem;
    overflow: hidden !important;
}

.empty {
    width: 100%;
    height: 100%;
    background: url('./images/empty.png') 2px no-repeat;
}

.appPopstyle .van-popup {
    background-color: rgba(255, 255, 255, 0);
    overflow-y: hidden;
}

.van-toast {
    width: 6rem;
    border-radius: 0.3rem;
}

.van-toast__text {
    height: 2rem;
    line-height: 2rem;
    font-size: 1rem;
}

.van-icon-passed {
    font-size: 3rem;
}
</style>
