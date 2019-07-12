<template>
<div id="app">
    <!-- 打开报表页面 -->
    <iframe id="reportIframe" class="reportIframe" src frameborder="0" v-show="reportPageOpenFlag"></iframe>

    <!-- 所有报表页面 -->
    <div class="reportbox flex flex-column flex-1">
        <van-collapse v-model="reportActiveName" accordion v-if="reportList&&pageActive==0&&!reportPageOpenFlag">
            <van-collapse-item v-for="(val,key) in reportList" :key="key" :title="val.label" :name="key+''">
                <div v-for="(childVal,clildKey) in reportList[key].children" :key="clildKey" :class="{report: true, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,val.id)">
                    <div class="flex flex-1 flex-justify-center flex-align-center">
                        <img width="15" src="./images/reportIcon.png" style="margin-left: 3px" />
                    </div>
                    <div class="reportName flex-7">{{childVal.label}}</div>
                    <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center" @click.stop="favoriteReport(childVal.label,key,clildKey)">
                        <van-loading size="23px" color="rgba(0,0,0,0.125)" v-if="!reportUrlList[reportIdList[childVal.label]]"></van-loading>
                        <img style="margin-right: 3px" src="./images/scTrue.png" width="18" v-show="reportUrlList[reportIdList[childVal.label]]?reportUrlList[reportIdList[childVal.label]].isFavorite:false" />
                        <img style="margin-right: 3px" src="./images/scFalse.png" width="18" v-show="reportUrlList[reportIdList[childVal.label]]?!reportUrlList[reportIdList[childVal.label]].isFavorite:false" />
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>

    <!-- 我的报表页面 -->
    <div class="reportbox flex flex-column flex-1 flex-align-center" style="margin-top: 2px" v-if="favoriteReportList.length > 0&&pageActive==1&&!reportPageOpenFlag">
        <div v-for="(childVal,clildKey) in favoriteReportList" :key="clildKey" :class="{report: true, flex:true, 'flex-justify-center':true, 'flex-align-center':true}" @click.enter="openReport(childVal.label,-1)">
            <div class="flex flex-1 flex-justify-center flex-align-center">
                <img width="15" src="./images/reportIcon.png" style="margin-left: 3px" />
            </div>
            <div class="reportName flex-7">{{childVal.label}}</div>
            <div class="reportFavorite flex flex-1 flex-justify-center flex-align-center" @click.stop="favoriteReport(childVal.label)">
                <van-loading size="23px" color="rgba(0,0,0,0.125)" v-if="!reportUrlList[reportIdList[childVal.label]]"></van-loading>
                <img style="margin-right: 3px" src="./images/scTrue.png" width="18" v-show="reportUrlList[reportIdList[childVal.label]]?reportUrlList[reportIdList[childVal.label]].isFavorite : false" />
                <img style="margin-right: 3px" src="./images/scFalse.png" width="18" v-show="reportUrlList[reportIdList[childVal.label]]?!reportUrlList[reportIdList[childVal.label]].isFavorite:false" />
            </div>
        </div>
    </div>
    <div class="flex flex-column flex-1 flex-align-center" v-show="!favoriteReportList.length > 0&&pageActive==1">
        <img width="220" src="./images/empty.png" style="margin-top: 8rem" />
        <div style="font-size: 0.9rem;color: #333333;font-family: 'PingFangSC-Regula'">还没有任何收藏</div>
    </div>
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
                <img style="margin-top: 1px" v-if="pageActive==0" src="./images/allReportTrue.png" width="16" slot="icon" />
                <img style="margin-top: 1px" v-if="!(pageActive==0)" src="./images/allReportFalse.png" width="16" slot="icon" />
                <span class="footerTitle">所有报表</span>
            </div>
        </van-tabbar-item>
        <van-tabbar-item>
            <div class="flex flex-column flex-align-center">
                <img style="margin-top: 1px" v-if="pageActive==1" src="./images/myReportTrue.png" width="16" slot="icon" />
                <img style="margin-top: 1px" v-if="!(pageActive==1)" src="./images/myReportFalse.png" width="16" slot="icon" />
                <span class="footerTitle">我的报表</span>
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
    Toast
} from "vant";

import Mobile from "./js/mobile";
import Tools from "./js/tools";
import demoData from "./js/demoData";

export default {
    name: "app",
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
        [Toast.name]: Toast
    },
    data() {
        return {
            msg: "",
            pageActive: localStorage.getItem('activeIndex') || 0,
            reportActiveName: "0",
            reportListActiveKey: 0,
            reportPageOpenFlag: false,
            Mobile: new Mobile({
                vueApp: this
            }),
            reportCount: 0,

            // 打包生产时放开下面3个注释

            reportIdList: {},
            reportUrlList: {},
            reportList: [],

            // 测试样式时放开下面3个注释

            // reportIdList: demoData[1],
            // reportUrlList: {},
            // reportList: demoData[0],

            isLoading: false,
            popShow: false,
            loadText: [],
            loadIdList: [],
            loadUrlList: [],
            favoriteReportList: []
        };
    },
    mounted() {
        let _this = this;
        this.createLangIcon();
        let lang = localStorage.lang;
        if (lang == "zh") {
            $("#MyHtmlTitle").text("报表");
        } else {
            $("#MyHtmlTitle").text("Report");
        }
        this.Mobile.init(rs => {
            if (rs) {
                let __this = _this;
                _this.Mobile.getDefault();
                _this.Mobile.getAllReportList();
            }
        });

        // 测试时放开下面的注释
        // setTimeout(() => {
        //   this.reportUrlList = demoData[2];
        // }, 2000);

    },
    watch: {
        pageActive: {
            deep: true,
            handler(nData, oData) {
                localStorage.setItem('activeIndex', nData);
            }
        },
    },
    computed: {

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
            let openJSONParam = {
                url: this.reportUrlList[this.reportIdList[reportName]].reportUrl,
                isHeader: true,
                isThirdH5: false
            };
            moa.openWebView(openJSONParam);
        },
        //收藏报表
        favoriteReport(reportName,key,childKey) {
            let id = this.reportIdList[reportName];
            let flag = this.reportUrlList[this.reportIdList[reportName]].isFavorite;
            this.$set(this.reportUrlList[this.reportIdList[reportName]], 'isFavorite', !flag);
            if (flag) {
                Toast({
                    message: "取消收藏",
                    duration: 1000
                });
                this.favoriteReportList.filter((v,i) => {
                    if(v.label == reportName) {
                        this.favoriteReportList.splice(i,1);
                    }
                });
                this.Mobile.removeFavorite(id);
            } else {
                Toast({
                    message: "收藏成功",
                    duration: 1000,
                    icon: "passed"
                });
                this.favoriteReportList.filter((v,i) => {
                    if(v.label == reportName) {
                        this.favoriteReportList.splice(i,1);
                    }
                });
                this.favoriteReportList.push(this.reportList[key].children[childKey]);
                this.Mobile.addFavorite(id);
            }
        },
        //设置语言
        createLangIcon() {
            moa.ready(function () {
                moa.setCustomNavigation({
                    type: "extend",
                    menuList: [{
                            text: "中文",
                            id: "setZH",
                            icon: ""
                        },
                        {
                            text: "EN",
                            id: "setEN",
                            icon: ""
                        }
                    ],
                    success: function (id) {
                        if (id == "setZH") {
                            localStorage.lang = "zh";
                            location.reload();
                        } else {
                            localStorage.lang = "en";
                            location.reload();
                        }
                    },
                    fail: function (error) {
                        alert("error");
                    }
                });
            });
        }
    }
};
</script>

<style>
@import "./css/common.css";

html,
body,
#app,
.nav-tabs {
    height: 100%;
    width: 100%;
    overflow: auto !important;
}

#app {
    font-family: "PingFangSC-Regula" !important;
    text-align: center;
    color: #333333;
}

.van-pull-refresh__head,
.van-loading__text {
    font-size: 0.9rem;
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
    height: 3.125rem;
    background: rgba(245, 245, 245, 0.8);
}

.footer .footerTitle {
    padding-top: 20px;
    font-size: 0.75rem !important;
    font-family: "PingFangSC-Regular";
}

.van-cell {
    font-family: "PingFangSC-Regular";
    height: 3.125rem;
    line-height: 3.125rem;
    font-size: 1rem;
    color: #333333;
    background: #ffffff;
    text-align: left;
    margin-left: 20px;
}

.van-cell__title {
    display: flex;
    align-items: center;
}

.van-cell__right-icon {
    line-height: 2.8rem;
    font-size: 0.9rem;
    color: #a3a3a3;
    margin-right: 1rem;
}

.van-collapse-item__content {
    margin: 0px;
    padding: 0px;
    max-height: 31.25rem;
    overflow-y: scroll !important;
}

.report {
    width: 100%;
    height: 3.125rem;
    line-height: 3.125rem;
    text-align: left;
    border-bottom: 2px solid rgba(9, 9, 9, 0.1);
    background: #fbfbfb;
    margin: 0px;
    padding: 0px;
}

.report .reportName {
    font-family: "PingFangSC-Light";
    margin-left: 20px;
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

.appPopstyle .van-popup {
    background-color: rgba(255, 255, 255, 0);
    overflow-y: hidden;
}

.van-toast {
    background: rgba(0, 0, 0, 0.8);
    width: 6rem;
    border-radius: 0.3rem;
}

.van-toast__text {
    height: 2.2rem;
    line-height: 2.2rem;
    font-size: 1rem;
    font-family: "PingFangSC-Regular";
    color: #ffffff;
}

.van-icon-passed {
    font-size: 2.5rem;
    margin-top: 0.7rem;
}

.reportbox {
    max-height: 38.125rem;
    overflow-x: hidden !important;
    overflow-y: scroll !important;
}
</style>
