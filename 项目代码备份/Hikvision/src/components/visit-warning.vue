<template>
    <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :style="{overflow: scroll}"
        id="vist-warning"
    >
        <div class="vist-warning flex flex-column" id="vist-warning-box">
            <div class="customer-distribution border-bottom" v-show="true" >
                <div class="sub-title">
                    <div class="pub-icon customer-distribution-icon"></div>
                    <span class="sub-title-name">客用户拜访覆盖</span>
                </div>
                <div style="margin:5px 15px 5px 15px">
                    <div style="min-height:60px;margin:15px 0px 15px 0px">
                        <my-progress
                            :data="progressData1"
                            barBgcolor_i="linear-gradient(to right,#594cff, #6bbbe5)"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#85a7ff"
                            title="客户覆盖"
                        ></my-progress>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#448dff"
                                title="战略客户"
                                data="8/17"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#741ce9"
                                title="潜力客户"
                                data="7/12"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#59d4ff"
                                title="核心客户"
                                data="7/13"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#e33d88"
                                title="重要客户"
                                data="5/12"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:60px;margin:0px 0px 15px 0px">
                        <my-progress
                            :data="progressData2"
                            barBgcolor_i="linear-gradient(to right,#c03288, #6a08e4)"
                            barWidth="100%"
                            barHeight="10px"
                            barRadius="7px 7px 7px 7px"
                            fontColor="#e8a1c5"
                            title="用户覆盖"
                        ></my-progress>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#448dff"
                                title="战略客户"
                                data="8/17"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#741ce9"
                                title="潜力客户"
                                data="7/12"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                    </div>
                    <div style="min-height:50px">
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#59d4ff"
                                title="核心客户"
                                data="7/13"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                        <div class="col-xs-6 col-sm-6 text-center">
                            <my-horkpi
                                iconSize="10px"
                                iconBgColor="#e33d88"
                                title="重要客户"
                                data="5/12"
                                :iconImgShow="true"
                            ></my-horkpi>
                        </div>
                    </div>
                </div>
            </div>
            <div class="covered-customer-detail border-bottom" v-show="true" >
                <div class="sub-title">
                    <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                        <div class="pub-icon covered-customer-detail-icon"></div>
                        <span class="sub-title-name">拜访未覆盖客户名单</span>
                    </div>
                    <div class="col-xs-6 col-sm-6 text-right">
                        <div>
                            <my-actionsheet
                                defSelected="其他"
                                :data="['战略','其他','测试']"
                                :myStyle="{background: '#efefef',width: '70px'}"
                                @setScroll="setScrollStyle"
                            ></my-actionsheet>
                        </div>
                    </div>
                </div>
                <div style="margin:5px 15px 5px 15px;min-height:200px">
                    <my-table orderBy="4|desc" :scrollY="163" :data="data1"></my-table>
                </div>
            </div>
            <div class="uncovered-customer-detail border-bottom" v-show="true">
                <div class="sub-title">
                    <div class="sub-title col-xs-6 col-sm-6 padding-empty">
                        <div class="pub-icon covered-customer-detail-icon"></div>
                        <span class="sub-title-name">拜访未覆盖客户名单</span>
                    </div>
                    <div class="col-xs-6 col-sm-6 text-right">
                        <div>
                            <my-actionsheet
                                defSelected="其他"
                                :data="['战略','其他','测试','战略','其他','测试','战略','其他','测试','其他','测试','战略','其他','测试','战略','其他','测试']"
                                :myStyle="{background: '#efefef',width: '70px'}"
                                @setScroll="setScrollStyle"
                            ></my-actionsheet>
                        </div>
                    </div>
                </div>
                <div style="margin:5px 15px 5px 15px;min-height:200px">
                    <my-table orderBy="5|desc" :scrollY="163" :data="data2" :title="tableTitle2"></my-table>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import table from "./common/datatables";
import progress from "./common/progress";
import actionsheet from "./common/actionsheet";
import horkpi from "./common/horizontal-kpi";
import { PullRefresh } from "vant";
export default {
    name: "visit-warning",
    components: {
        [PullRefresh.name]: PullRefresh,
        MyTable: table,
        MyProgress: progress,
        MyActionsheet: actionsheet,
        MyHorkpi: horkpi
    },
    data() {
        return {
            isLoading: false,
            progressData1: 0,
            progressData2: 0,
            asshow1: false,
            asshow2: false,
            ash1: "0px",
            ash2: "0px",
            data1: [
                ["NaN1", "NaN", "NaN", 20],
                ["NaN2", "NaN", "NaN", 25],
                ["NaN3", "NaN", "NaN", 30],
                ["NaN4", "NaN", "NaN", 19.1],
                ["NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", 30],
                ["NaN", "NaN", "NaN", 19.1],
                ["NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", 10.5]
            ],
            tableTitle2: [
                "用户名称",
                "子行业",
                "负责销售",
                "客户类型",
                "本年BP(万)"
            ],
            data2: [
                ["NaN", "NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", "NaN", 30],
                ["NaN", "NaN", "NaN", "NaN", 19.1],
                ["NaN", "NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", "NaN", 30],
                ["NaN", "NaN", "NaN", "NaN", 19.1],
                ["NaN", "NaN", "NaN", "NaN", 20],
                ["NaN", "NaN", "NaN", "NaN", 25],
                ["NaN", "NaN", "NaN", "NaN", 10.5]
            ],
            scroll: "scroll !important"
        };
    },
    mounted() {
        var self = this;
        this.progressData1 = 70;
        this.progressData2 = 20;
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
        setScrollStyle(style) {
            this.scroll = style;
        }
    },
    computed: {}
};
</script>

<style scoped>
.padding-empty {
    padding: 0px;
}
.van-pull-refresh {
    overflow-y: scroll !important;
}
.vist-warning {
    width: 100%;
    /* height: calc(100% - 5px); */
    overflow-y: scroll !important;
}
.pub-icon {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
/* .customer-distribution {
    min-height: 300px;
}

.covered-customer-detail {
    min-height: 200px;
}

.uncovered-customer-detail {
    min-height: 200px;
} */

.customer-distribution-icon {
    width: 17px;
    height: 17px;
    margin-bottom: 3px;
    background-image: url("../assets/image/notes.png");
}

.covered-customer-detail-icon {
    width: 17px;
    height: 17px;
    margin-bottom: 3px;
    background-image: url("../assets/image/notes.png");
}

.uncovered-customer-detail-icon {
    width: 17px;
    height: 17px;
    margin-bottom: 3px;
    background-image: url("../assets/image/notes.png");
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}
</style>
