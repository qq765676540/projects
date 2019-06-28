<template>
<div id="app">
    <van-pull-refresh class="flex flex-column" v-model="isLoading" @refresh="onRefresh">
        <!-- <div style="height: 700px;width:500px">{{reportDetail}}</div> -->
        <!-- 打开报表页面 -->
        <iframe id="reportIframe" class="reportIframe" src="" frameborder="0" v-show="reportPageOpenFlag"></iframe>
        <!-- 头部标题 暂时不用-->
        <!-- <van-nav-bar v-on:click-left="closeView" class="nav-bar-top" title="标题" left-arrow>
                <div id="titleRight" slot="right">222</div>
            </van-nav-bar> -->

        <!-- 所有报表页面 -->
        <div class="flex flex-column flex-1">
            <van-collapse v-model="reportActiveName" accordion v-if="reportList&&pageActive==0&&!reportPageOpenFlag">
                <van-collapse-item v-for="(val,key) in reportList" :key="key" :title="val.reportGroupName" :name="key+''">
                    <div v-for="(childVal,clildKey) in reportList[key].reportDetail" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.reportName,childVal.reportUrl)">
                        <div class="reportImg flex-1"></div>
                        <div class="reportName flex-7">{{childVal.reportName}}</div>
                        <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center">
                            <van-icon name="star-o" :color="reportList[key].reportDetail[clildKey].isFavorite?'red':'#222'" size="25px" v-on:click.stop="favoriteReport(childVal.reportId,childVal.isFavorite,(key+1),clildKey)" />
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>

        <!-- 我的报表页面 -->
        <div class="flex flex-column flex-1 flex-align-center" style="margin-top: 10px" v-if="favoriteReportList&&pageActive==1&&!reportPageOpenFlag">
            <div v-for="(childVal,clildKey) in favoriteReportList" :key="clildKey" :class="{report: true, active:false, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.reportName,childVal.reportUrl)">
                <div class="reportImg flex-1"></div>
                <div class="reportName flex-7">{{childVal.reportName}}</div>
                <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center">
                    <van-icon name="star-o" :color="reportList[key].reportDetail[clildKey].isFavorite?'red':'#222'" size="25px" v-on:click.stop="favoriteReport(childVal.reportId,childVal.isFavorite,0,clildKey)" />
                </div>
            </div>
        </div>
        <div class="flex flex-column flex-1 flex-align-center" v-if="!favoriteReportList&&pageActive==1">
            <div class="empty" style="height:300px; width: 100%;margin-left: 47%"></div>
            <div style="font-size: 1.5rem;color: #666666">空空如也,快去收藏</div>
        </div>
        <!-- loading页面 -->
        <div class="appPopstyle">
            <van-popup v-model="popShow" :close-on-click-overlay="false">
                <van-loading text-size="20px" size="50px" color="#fff" vertical>加载中...</van-loading>
            </van-popup>
        </div>
    </van-pull-refresh>

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
    SidebarItem,
    Popup,
    Loading,
    PullRefresh
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
        [PullRefresh.name]: PullRefresh
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
            reportDetail: [],
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
                _this.Mobile.getAllReportList(rs => {
                    __this.reportDetail = rs;
                });
            }
        });
    },
    computed: {
        reportList() {
            if (this.reportDetail.length > 0) {
                let arr = Tools.deepClone(this.reportDetail);
                arr.splice(0, 1);
                return arr;
            }
            return false;
            // return demoData[0];
        },
        favoriteReportList() {
            if (this.reportDetail.length > 0) {
                let arr = Tools.deepClone(this.reportDetail);
                if (arr[0].reportDetail.length > 0) {
                    this.pageActive = 1;
                    return arr[0].reportDetail;
                } else {
                    return false;
                }
            }
            return false;
            // return demoData[0][0].children;
        },
        popShow() {
            if (this.reportDetail.length > 0) {
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
        openReport(name,url) {
            this.reportPageOpenFlag = true;
            $('#MyHtmlTitle').text(name);
            $('#reportIframe').attr('src', url);
        },
        //收藏报表
        favoriteReport(id, flag, key, childKey) {
            this.reportDetail[key].reportDetail[childKey].isFavorite = flag;
            if (flag) {
                this.Mobile.removeFavorite(id);
            } else {
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
</style>
