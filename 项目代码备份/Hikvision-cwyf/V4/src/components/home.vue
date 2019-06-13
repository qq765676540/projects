<template>
<!-- 首页 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="home">
        <div class="overview flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">整体销售情况</span>
            </div>
            <div class="content-box flex flex-column">
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_1" v-if="kpiData&&kpiData.kpi_1[0][2]!='none'"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_2" v-if="kpiData&&kpiData.kpi_2[0][2]!='none'"></easy-kpi>
                    </div>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_3" v-if="kpiData&&kpiData.kpi_3[0][2]!='none'"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_4" v-if="kpiData&&kpiData.kpi_4[0][2]!='none'"></easy-kpi>
                    </div>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_5" v-if="kpiData&&kpiData.kpi_5[0][2]!='none'"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_6" v-if="kpiData&&kpiData.kpi_6[0][2]!='none'"></easy-kpi>
                    </div>
                </div>
                <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_7" v-if="kpiData&&kpiData.kpi_7[0][2]!='none'"></easy-kpi>
                    </div>
                    <div class="flex-1">
                        <easy-kpi :data="kpiData.kpi_8" v-if="kpiData&&kpiData.kpi_8[0][2]!='none'"></easy-kpi>
                    </div>
                </div>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";

import easyKpi from "./common/easy-kpi";
import demoData from "./data/demoData";

export default {
    name: "home",
    components: {
        easyKpi,
        [PullRefresh.name]: PullRefresh
    },
    data() {
        return {
            isLoading: false
        };
    },
    mounted() {

    },
    computed: {
        kpiData() {
            if (this.$store.state['home-overview'].length > 0) {
                let orgFlag = this.$store.state['level'][0][2].qText;
                let dataArr = this.$store.state['home-overview'][0];
                let kpiData = {
                    R: {},
                    U: {}
                };
                switch (this.$store.state.dataScope) {
                    case 'T':
                        kpiData['R']['kpi_1'] = [
                            ['总收入', dataArr[1].qText, ''],
                            ['完成率', dataArr[2].qText, ''],
                            ['同比', dataArr[3].qText, '']
                        ];
                        kpiData['R']['kpi_2'] = [
                            ['战略产品', dataArr[4].qText, '台'],
                            ['完成率', dataArr[5].qText, ''],
                            ['同比', dataArr[6].qText, '']
                        ];
                        kpiData['R']['kpi_3'] = [
                            ['毛利额', dataArr[7].qText, ''],
                            ['完成率', dataArr[8].qText, ''],
                            ['同比', dataArr[9].qText, '']
                        ];
                        kpiData['R']['kpi_4'] = [
                            ['毛利率', dataArr[10].qText, ''],
                            ['去年同期', dataArr[11].qText, ''],
                            ['同比', dataArr[12].qText, '']
                        ];
                        kpiData['R']['kpi_5'] = [
                            ['扣费毛利', dataArr[13].qText, ''],
                            ['完成率', dataArr[14].qText, ''],
                            ['同比', dataArr[15].qText, '']
                        ];
                        kpiData['R']['kpi_6'] = [
                            ['扣费毛利率', dataArr[16].qText, ''],
                            ['去年同期', dataArr[17].qText, ''],
                            ['同比', dataArr[18].qText, '']
                        ];
                        kpiData['R']['kpi_7'] = [
                            ['人均销售额', dataArr[19].qText, '万元/人'],
                            ['去年同期', dataArr[20].qText, '万元/人'],
                            ['同比', dataArr[21].qText, '']
                        ];
                        kpiData['R']['kpi_8'] = [
                            ['人均扣费毛利', dataArr[22].qText, '万元/人'],
                            ['去年同期', dataArr[23].qText, '万元/人'],
                            ['同比', dataArr[24].qText, '']
                        ];
                        kpiData['U']['kpi_1'] = [
                            ['总收入', dataArr[25].qText, ''],
                            ['完成率', dataArr[26].qText, ''],
                            ['同比', dataArr[27].qText, '']
                        ];
                        kpiData['U']['kpi_2'] = [
                            ['战略产品', dataArr[28].qText, '台'],
                            ['完成率', dataArr[29].qText, ''],
                            ['同比', dataArr[30].qText, '']
                        ];
                        kpiData['U']['kpi_3'] = [
                            ['毛利额', dataArr[31].qText, ''],
                            ['完成率', dataArr[32].qText, ''],
                            ['同比', dataArr[33].qText, '']
                        ];
                        kpiData['U']['kpi_4'] = [
                            ['毛利率', dataArr[34].qText, ''],
                            ['去年同期', dataArr[35].qText, ''],
                            ['同比', dataArr[36].qText, '']
                        ];
                        kpiData['U']['kpi_5'] = [
                            ['扣费毛利', '', ''],
                            ['完成率', '', ''],
                            ['同比', '', '']
                        ];
                        kpiData['U']['kpi_6'] = [
                            ['扣费毛利率', '', ''],
                            ['去年同期', '', ''],
                            ['同比', '', '']
                        ];
                        kpiData['U']['kpi_7'] = [
                            ['人均销售额', dataArr[43].qText, '万美元/人'],
                            ['去年同期', dataArr[44].qText, '万美元/人'],
                            ['同比', dataArr[45].qText, '']
                        ];
                        kpiData['U']['kpi_8'] = [
                            ['人均扣费毛利', '', ''],
                            ['去年同期', '', ''],
                            ['同比', '', '']
                        ];
                        break;
                    case 'I':
                        kpiData['R']['kpi_1'] = [
                            ['总收入', dataArr[1].qText, ''],
                            ['完成率', dataArr[2].qText, ''],
                            ['同比', dataArr[3].qText, '']
                        ];
                        kpiData['R']['kpi_2'] = [
                            ['毛利额', dataArr[7].qText, ''],
                            ['完成率', dataArr[8].qText, ''],
                            ['同比', dataArr[9].qText, '']
                        ];
                        kpiData['R']['kpi_3'] = [
                            ['毛利率', dataArr[10].qText, ''],
                            ['去年同期', dataArr[11].qText, ''],
                            ['同比', dataArr[12].qText, '']
                        ];
                        kpiData['R']['kpi_4'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['R']['kpi_5'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['R']['kpi_6'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['R']['kpi_7'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['R']['kpi_8'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['U']['kpi_1'] = [
                            ['总收入', dataArr[25].qText, ''],
                            ['完成率', dataArr[26].qText, ''],
                            ['同比', dataArr[27].qText, '']
                        ];
                        kpiData['U']['kpi_2'] = [
                            ['毛利额', dataArr[28].qText, ''],
                            ['完成率', dataArr[29].qText, ''],
                            ['同比', dataArr[30].qText, '']
                        ];
                        kpiData['U']['kpi_3'] = [
                            ['毛利率', dataArr[31].qText, ''],
                            ['去年同期', dataArr[32].qText, ''],
                            ['同比', dataArr[33].qText, '']
                        ];
                        kpiData['U']['kpi_4'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['U']['kpi_5'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['U']['kpi_6'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['U']['kpi_7'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        kpiData['U']['kpi_8'] = [
                            ['', '', 'none'],
                            ['', '', ''],
                            ['', '', '']
                        ];
                        break;
                    case 'O':
                        if (orgFlag == 'Y') {
                            kpiData['R']['kpi_1'] = [
                                ['总收入', dataArr[1].qText, ''],
                                ['完成率', dataArr[2].qText, ''],
                                ['同比', dataArr[3].qText, '']
                            ];
                            kpiData['R']['kpi_2'] = [
                                ['战略产品', dataArr[4].qText, '台'],
                                ['完成率', dataArr[5].qText, ''],
                                ['同比', dataArr[6].qText, '']
                            ];
                            kpiData['R']['kpi_3'] = [
                                ['毛利额', dataArr[7].qText, ''],
                                ['完成率', dataArr[8].qText, ''],
                                ['同比', dataArr[9].qText, '']
                            ];
                            kpiData['R']['kpi_4'] = [
                                ['毛利率', dataArr[10].qText, ''],
                                ['去年同期', dataArr[11].qText, ''],
                                ['同比', dataArr[12].qText, '']
                            ];
                            kpiData['R']['kpi_5'] = [
                                ['扣费毛利', dataArr[13].qText, ''],
                                ['完成率', dataArr[14].qText, ''],
                                ['同比', dataArr[15].qText, '']
                            ];
                            kpiData['R']['kpi_6'] = [
                                ['扣费毛利率', dataArr[16].qText, ''],
                                ['去年同期', dataArr[17].qText, ''],
                                ['同比', dataArr[18].qText, '']
                            ];
                            kpiData['R']['kpi_7'] = [
                                ['人均销售额', dataArr[19].qText, '万元/人'],
                                ['去年同期', dataArr[20].qText, '万元/人'],
                                ['同比', dataArr[21].qText, '']
                            ];
                            kpiData['R']['kpi_8'] = [
                                ['人均扣费毛利', dataArr[22].qText, '万元/人'],
                                ['去年同期', dataArr[23].qText, '万元/人'],
                                ['同比', dataArr[24].qText, '']
                            ];
                            kpiData['U']['kpi_1'] = [
                                ['总收入', dataArr[25].qText, ''],
                                ['完成率', dataArr[26].qText, ''],
                                ['同比', dataArr[27].qText, '']
                            ];
                            kpiData['U']['kpi_2'] = [
                                ['战略产品', dataArr[28].qText, '台'],
                                ['完成率', dataArr[29].qText, ''],
                                ['同比', dataArr[30].qText, '']
                            ];
                            kpiData['U']['kpi_3'] = [
                                ['毛利额', dataArr[31].qText, ''],
                                ['完成率', dataArr[32].qText, ''],
                                ['同比', dataArr[33].qText, '']
                            ];
                            kpiData['U']['kpi_4'] = [
                                ['毛利率', dataArr[34].qText, ''],
                                ['去年同期', dataArr[35].qText, ''],
                                ['同比', dataArr[36].qText, '']
                            ];
                            kpiData['U']['kpi_5'] = [
                                ['人均销售额', dataArr[43].qText, '万美元/人'],
                                ['去年同期', dataArr[44].qText, '万美元/人'],
                                ['同比', dataArr[45].qText, '']
                            ];
                            kpiData['U']['kpi_6'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_7'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_8'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                        } else {
                            kpiData['R']['kpi_1'] = [
                                ['总收入', dataArr[1].qText, ''],
                                ['完成率', dataArr[2].qText, ''],
                                ['同比', dataArr[3].qText, '']
                            ];
                            kpiData['R']['kpi_2'] = [
                                ['毛利额', dataArr[7].qText, ''],
                                ['完成率', dataArr[8].qText, ''],
                                ['同比', dataArr[9].qText, '']
                            ];
                            kpiData['R']['kpi_3'] = [
                                ['毛利率', dataArr[10].qText, ''],
                                ['去年同期', dataArr[11].qText, ''],
                                ['同比', dataArr[12].qText, '']
                            ];
                            kpiData['R']['kpi_4'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['R']['kpi_5'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['R']['kpi_6'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['R']['kpi_7'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['R']['kpi_8'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_1'] = [
                                ['总收入', dataArr[25].qText, ''],
                                ['完成率', dataArr[26].qText, ''],
                                ['同比', dataArr[27].qText, '']
                            ];
                            kpiData['U']['kpi_2'] = [
                                ['毛利额', dataArr[28].qText, ''],
                                ['完成率', dataArr[29].qText, ''],
                                ['同比', dataArr[30].qText, '']
                            ];
                            kpiData['U']['kpi_3'] = [
                                ['毛利率', dataArr[31].qText, ''],
                                ['去年同期', dataArr[32].qText, ''],
                                ['同比', dataArr[33].qText, '']
                            ];
                            kpiData['U']['kpi_4'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_5'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_6'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_7'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                            kpiData['U']['kpi_8'] = [
                                ['', '', 'none'],
                                ['', '', ''],
                                ['', '', '']
                            ];
                        }
                        break;
                    default:
                        break;
                }

                return kpiData[this.$store.state.currency];
            }
            return false;
            //demoData.homeData.overview
        }
    },
    watch: {

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
            }, 300);
        }
    },
    beforeDestroy() {},
    destroyed() {}
};
</script>

<style scoped>
.home {
    width: 100%;
    overflow-y: scroll !important;
}

.overview {
    min-height: 575px;
}
</style>
