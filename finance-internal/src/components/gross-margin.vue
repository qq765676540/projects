<template>
<div class="constitute">
    <div class="gross-view border-bottom flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">毛利概览</span>
        </div>
        <div class="content-box flex flex-column flex-1">
            <div class="flex flex-1 flex-justify-center flex-align-center" style="margin-left: 5px">
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_3" v-if="kpiData"></easy-kpi>
                </div>
                <div class="flex-1">
                    <easy-kpi :data="kpiData.kpi_4" v-if="kpiData"></easy-kpi>
                </div>
            </div>
        </div>
    </div>
    <div class="gross-city flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">各城市毛利情况</span>
        </div>
        <div class="content-box flex flex-1 flex-column" style="margin-top: 10px;margin-left: 5px">
            <gross-margin-bar v-if="marginBar" :data="marginBar"></gross-margin-bar>
        </div>
    </div>
</div>
</template>

<script>
// import myProgress from "./common/progress-s1";
import easyKpi from "./common/easy-kpi-ext";
import grossMarginBar from "./grossMargin/gross-margin-bar";
import accounting from "accounting";
export default {
    components: {
        // myProgress,
        grossMarginBar,
        easyKpi
    },
    data() {
        return {};
    },
    mounted() {},
    computed: {
        kpiData() {
            if (this.$store.state["over-all-kpi"].length > 0) {
                let dataArr = this.$store.state["over-all-kpi"][0];
                let kpiData = {
                    kpi_3: [
                        ['毛利额', dataArr[7].qText, ''],
                        ['同比', dataArr[8].qText, ''],
                        ['', '', '']
                    ],
                    kpi_4: [
                        ['毛利率', dataArr[9].qText, ''],
                        ['上年同期', dataArr[10].qText, ''],
                        ['', '', '']
                    ]
                };
                return kpiData;
            }
            return false;
            // return demoData.homeData.overview
        },
        marginBar() {
            var arr = [];
            if (this.$store.state["margin-city"].length>0) {
                var data = this.$store.state["margin-city"];
                data.forEach(i => {
                    arr.push({
                        value: (i[1].qNum/10000).toFixed(0),
                        name: i[0].qText,
                        growth: (i[2].qNum*100).toFixed(1)
                    });
                });
                // console.log('YCQ日志记录:标识111->',arr);
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

.gross-view {
    min-height: 190px;
}

.gross-city {
    min-height: 400px;
}

</style>
