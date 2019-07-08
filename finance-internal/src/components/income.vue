<template>
<div class="constitute">
    <div class="income-view border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">收入概览</span>
        </div>
        <div class="content-box flex flex-column flex-1 flex-align-center" style="margin-top: 5px">
            <my-progress v-if="incomeViewData" :data="incomeViewData['kpi_1']" barBgcolor_i="#1495EB" barHeight="10px" barRadius="7px 7px 7px 7px" fontColor="#1495EB" id="DsOaFaijf"></my-progress>
        </div>
        <div class="content-box flex flex-column flex-1 flex-align-center" style="margin-top: 5px">
            <my-progress v-if="incomeViewData" :data="incomeViewData['kpi_2']" barBgcolor_i="#59D4FF" barHeight="10px" barRadius="7px 7px 7px 7px" fontColor="#59D4FF" id="KdafsSIey"></my-progress>
        </div>
    </div>
    <div class="income-budget border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">全年预算进度</span>
        </div>
        <div class="content-box flex flex-column flex-1" style="margin-top: 5px" v-if="incomeYear">
            <div class="flex flex-1">
                <div class="flex flex-2">
                    <vant-pie :id="'pie-11'" :data="incomeYear[0]"></vant-pie>
                </div>
                <div class="flex flex-5 flex-column">
                    <div class="flex flex-1">
                        <div class="flex flex-1 flex-justify-left">
                            <div class="titleName flex flex-1 flex-align-center">总收入</div>
                            <div class="titleValue flex flex-3 flex-align-center">{{incomeYear[1]}}</div>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-justify-left">
                        <div class="flex flex-1 flex-justify-left">
                            <div class="subtitleName flex flex-1 flex-align-center">目标值&nbsp;&nbsp;{{incomeYear[2]}}</div>
                            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
                        </div>
                        <div class="flex flex-1 flex-justify-left">
                            <div class="subtitleName flex flex-1 flex-align-center">缺口值&nbsp;&nbsp;{{incomeYear[3]}}</div>
                            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-1">
                <div class="flex flex-2">
                    <vant-pie :id="'pie-11'" :data="incomeYear[4]"></vant-pie>
                </div>
                <div class="flex flex-5 flex-column">
                    <div class="flex flex-1">
                        <div class="flex flex-1 flex-justify-left">
                            <div class="titleName flex flex-1 flex-align-center">自有收入</div>
                            <div class="titleValue flex flex-3 flex-align-center">{{incomeYear[5]}}</div>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-justify-left">
                        <div class="flex flex-1 flex-justify-left">
                            <div class="subtitleName flex flex-1 flex-align-center">目标值&nbsp;&nbsp;{{incomeYear[6]}}</div>
                            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
                        </div>
                        <div class="flex flex-1 flex-justify-left">
                            <div class="subtitleName flex flex-1 flex-align-center">缺口值&nbsp;&nbsp;{{incomeYear[7]}}</div>
                            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="income-product border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">产品分类</span>
            <div class="flex flex-1 flex-justify-right">
                <van-tabs style="z-index: 0;width: 180px;margin-top: 3px" type="card" v-model="industryTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab title="总收入"></van-tab>
                    <van-tab title="自有收入"></van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content-box flex flex-1 flex-column" style="margin-top: 10px;margin-left: 5px">
            <my-datatable v-if="productData" id="productData" :data="productData[industryTabAtive]" :title="productData[2]" :scrollY="120"></my-datatable>
        </div>
    </div>
    <div class="income-industry border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">行业分类</span>
            <div class="flex flex-1 flex-justify-right">
                <van-tabs style="z-index: 0;width: 180px;margin-top: 3px" type="card" v-model="industryTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab title="总收入"></van-tab>
                    <van-tab title="自有收入"></van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content-box flex flex-1 flex-column" style="margin-top: 10px;margin-left: 5px">
            <my-datatable v-if="industryData" id="industryData" :data="industryData[industryTabAtive]" :title="industryData[2]"></my-datatable>
        </div>
    </div>
    <div class="income-city flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">各城市收入情况</span>
            <div class="flex flex-1 flex-justify-right">
                <van-tabs style="z-index: 0;width: 180px;margin-top: 3px" type="card" v-model="industryTabAtive" animated color="#0F8EE9" title-active-color="#FFFFFF" title-inactive-color="#0F8EE9">
                    <van-tab title="总收入"></van-tab>
                    <van-tab title="自有收入"></van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content-box flex flex-1 flex-column" style="margin-top: 10px;margin-left: 5px">
            <income-all :data="cityAll" v-if="industryTabAtive==0&&cityAll"></income-all>
            <income-self :data="citySelf" v-if="industryTabAtive==1&&citySelf"></income-self>
        </div>
    </div>

</div>
</template>

<script>
import {
    Tab,
    Tabs
} from "vant";
import vantPie from "./common/vant-pie";
import incomeAll from "./income/income-all";
import incomeSelf from "./income/income-self";
import myProgress from "./common/progress-s1";
import myDatatable from "./common/datatables";
import accounting from "accounting";
export default {
    components: {
        myProgress,
        myDatatable,
        vantPie,
        Tab,
        Tabs,
        incomeAll,
        incomeSelf
    },
    data() {
        return {
            active: 0,
            industryTabAtive: 0
        };
    },
    mounted() {},
    computed: {
        incomeViewData() {
            if (this.$store.state["income-view"].length > 0) {
                let dataArr = this.$store.state["income-view"][0];
                let data = {
                    kpi_1: [{
                        value: dataArr[2].qText
                    }, {
                        title: '总收入',
                        value: dataArr[1].qText
                    }, {
                        title: '目标值',
                        value: dataArr[3].qText
                    }, {
                        title: '缺口值',
                        value: dataArr[4].qText.replace(',','')/1<0?0:dataArr[4].qText
                    }, {
                        title: '同比',
                        value: dataArr[5].qText
                    }],
                    kpi_2: [{
                        value: dataArr[7].qText
                    }, {
                        title: '自有收入',
                        value: dataArr[6].qText
                    }, {
                        title: '目标值',
                        value: dataArr[8].qText
                    }, {
                        title: '缺口值',
                        value: dataArr[9].qText.replace(',','')/1<0?0:dataArr[9].qText
                    }, {
                        title: '同比',
                        value: dataArr[10].qText
                    }]
                };
                return data;
            }
            return false;
        },
        incomeYear() {
            if (this.$store.state["income-year"].length) {
                let data = this.$store.state["income-year"][0];
                let arr = [{
                        size: "60px",
                        rate: data[0].qText
                    },
                    data[1].qText,
                    data[2].qText,
                    data[3].qText.replace(',','')/1<0?0:data[3].qText,
                    {
                        size: "60px",
                        rate: data[4].qText
                    },
                    data[5].qText,
                    data[6].qText,
                    data[7].qText.replace(',','')/1<0?0:data[7].qText
                ];
                return arr;
            }
            return false;
        },
        industryData() {
            if (this.$store.state["income-industry"].length>0 && this.$store.state["income-industryTotal"].length>0) {
                let dataArr = this.$store.state["income-industryTotal"].concat(this.$store.state["income-industry"]);
                let data = {
                  0: [],
                  1: [],
                  2: ["分类","金额","占比","同比"]
                };
                dataArr.filter(v => {
                  data[0].push([v[0].qText,v[1].qText,v[2].qText,v[3].qText]);
                  data[1].push([v[0].qText,v[4].qText,v[5].qText,v[6].qText]);
                });
                return data;
            }
            return false;
        },
        productData() {
            if (this.$store.state["income-product"].length>0 && this.$store.state["income-productTotal"].length>0) {
                let dataArr = this.$store.state["income-productTotal"].concat(this.$store.state["income-product"]);
                let data = {
                  0: [],
                  1: [],
                  2: ["分类","金额","占比","同比"]
                };
                dataArr.filter(v => {
                  data[0].push([v[0].qText,v[1].qText,v[2].qText,v[3].qText]);
                  data[1].push([v[0].qText,v[4].qText,v[5].qText,v[6].qText]);
                });
                return data;
            }
            return false;
        },
        cityAll() {
            var arr = [];
            if (this.$store.state["income-cityz"].length>0) {
                var data = this.$store.state["income-cityz"];
                data.forEach(i => {
                    arr.push({
                        value: (i[1].qNum/10000).toFixed(0) ,
                        name: i[0].qText,
                        growth: (i[2].qNum * 100).toFixed(1),
                        rate: (i[3].qNum * 100).toFixed(1),
                        nameTrue: i[0].qText,
                        level: i[0].qText
                    });
                });
                return arr;
            }
            return false;
        },
        citySelf() {
            var arr = [];
            if (this.$store.state["income-cityzy"].length>0) {
                var data = this.$store.state["income-cityzy"];
                data.forEach(i => {
                    arr.push({
                        value: (i[1].qNum/10000).toFixed(0) ,
                        name: i[0].qText,
                        growth: (i[2].qNum * 100).toFixed(1),
                        rate: (i[3].qNum * 100).toFixed(1),
                        nameTrue: i[0].qText,
                        level: i[0].qText
                    });
                });
                return arr;
            }
            return false;
        }
    },
    methods: {}
};
</script>

<style scoped>
.constitute {
    width: 100%;
}

.income-view {
    min-height: 240px;
}

.income-budget {
    min-height: 240px;
}

.income-industry {
    min-height: 300px;
}

.income-product {
    min-height: 100px;
}

.income-city {
    min-height: 400px;
}

.titleName {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin-top: 3px;
}

.titleValue {
    font-size: 22px;
    font-weight: bold;
    color: #222222;
}

.subtitleName {
    font-size: 12px;
    color: #333333;
}

.subtitleValue {
    font-size: 14px;
    color: #222222;
}
</style>
