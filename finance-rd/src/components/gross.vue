<template>
<!-- 毛利页面 -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="gross">
    <div class="gross flex flex-column" id="gross-box">
        <div class="gross-bp border-bottom flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">毛利额BP达成率及增长情况</span>
            </div>
            <div style="margin:0px 3px 0px 3px">
                <echarts-bar-line name="gross-bp" :data="bpData" id="gross-bp" v-if="bpData"></echarts-bar-line>
            </div>
        </div>
        <div class="gross-deduction flex flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">毛利率&扣费毛利率</span>
            </div>
            <div style="margin:0px 3px 0px 3px">
                <echarts-line name="gross-deduction" :data="deductionData" id="gross-deduction" v-if="deductionData"></echarts-line>
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";
import demoData from "./data/demoData";
import echartsBarLine from "./common/echarts-bar-line";
import echartsLine from "./common/echarts-line";
export default {
    name: "gross",
    components: {
        [PullRefresh.name]: PullRefresh,
        echartsBarLine,
        echartsLine
    },
    data() {
        return {
            isLoading: false
        };
    },
    computed: {
        bpData() {
            if (this.$store.state['gross-bp'].length > 0) {
                let dataArr = this.$store.state['gross-bp'];
                let data = {
                    R: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: []
                    },
                    U: {
                        xAxisData: [],
                        seriesData1: [],
                        seriesData2: [],
                        seriesData3: []
                    }

                };
                dataArr.filter(v => {
                    data['R']['xAxisData'].push(v[0].qText);
                    data['R']['seriesData1'].push(v[1].qNum);
                    data['R']['seriesData2'].push(v[2].qNum);
                    data['R']['seriesData3'].push(v[3].qNum=='NaN'?0:v[3].qNum);
                    data['U']['xAxisData'].push(v[0].qText);
                    data['U']['seriesData1'].push(v[4].qNum);
                    data['U']['seriesData2'].push(v[5].qNum);
                    data['U']['seriesData3'].push(v[6].qNum=='NaN'?0:v[6].qNum);
                });
                return data[this.$store.state.currency];
            }
            return false;
            //demoData.grossData.bp;
        },
        deductionData() {
            if (this.$store.state['gross-deduction'].length > 0) {
                let dataArr = this.$store.state['gross-deduction'];
                dataArr = dataArr.sort((a,b) => {
                    return a[0].qText.replace('月','')/1 - b[0].qText.replace('月','')/1;
                });
                let flag = this.$store.state['level'][0][2].qText;
                let data = {
                    totalR: {
                        xAxis: [],
                        series: [{
                                name: '上年毛利率',
                                type: 'line',
                                data: []
                            },
                            {
                                name: '本年毛利率',
                                type: 'line',
                                data: []
                            },
                            {
                                name: '上年扣费毛利率',
                                type: 'line',
                                lineStyle: {
                                    type: 'dashed'
                                },
                                data: []
                            },
                            {
                                name: '本年扣费毛利率',
                                type: 'line',
                                lineStyle: {
                                    type: 'dashed'
                                },
                                data: []
                            }
                        ]
                    },
                    totalU: {
                        xAxis: [],
                        series: [{
                                name: '上年毛利率',
                                type: 'line',
                                data: []
                            },
                            {
                                name: '本年毛利率',
                                type: 'line',
                                data: []
                            }
                        ]
                    },
                    otherR: {
                        xAxis: [],
                        series: [{
                                name: '上年毛利率',
                                type: 'line',
                                data: []
                            },
                            {
                                name: '本年毛利率',
                                type: 'line',
                                data: []
                            }
                        ]
                    },
                    otherU: {
                        xAxis: [],
                        series: [{
                                name: '上年毛利率',
                                type: 'line',
                                data: []
                            },
                            {
                                name: '本年毛利率',
                                type: 'line',
                                data: []
                            }
                        ]
                    }
                };
                dataArr.filter(v => {
                    data['totalR']['xAxis'].push(v[0].qText);
                    data['totalR']['series'][0]['data'].push(v[1].qNum=='NaN'?'--':v[1].qNum);
                    data['totalR']['series'][1]['data'].push(v[2].qNum=='NaN'?'--':v[2].qNum);
                    data['totalR']['series'][2]['data'].push(v[3].qNum=='NaN'?'--':v[3].qNum);
                    data['totalR']['series'][3]['data'].push(v[4].qNum=='NaN'?'--':v[4].qNum);
                    data['totalU']['xAxis'].push(v[0].qText);
                    data['totalU']['series'][0]['data'].push(v[5].qNum=='NaN'?'--':v[5].qNum);
                    data['totalU']['series'][1]['data'].push(v[6].qNum=='NaN'?'--':v[6].qNum);
                    data['otherR']['xAxis'].push(v[0].qText);
                    data['otherR']['series'][0]['data'].push(v[1].qNum=='NaN'?'--':v[1].qNum);
                    data['otherR']['series'][1]['data'].push(v[2].qNum=='NaN'?'--':v[2].qNum);
                    data['otherU']['xAxis'].push(v[0].qText);
                    data['otherU']['series'][0]['data'].push(v[5].qNum=='NaN'?'--':v[5].qNum);
                    data['otherU']['series'][1]['data'].push(v[6].qNum=='NaN'?'--':v[6].qNum);
                });
                return data[(this.$store.state.dataScope=='T'||flag=='Y'?'total':'other')+this.$store.state.currency];
            }
            return false;
            // demoData.grossData.deduction
        }
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
        }
    }
};
</script>

<style scoped>
.padding-empty {
    padding: 0px;
}

.gross {
    width: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.gross .gross-bp {
    min-height: 370px;
}

.gross .gross-deduction {
    min-height: 370px;
}
</style>
