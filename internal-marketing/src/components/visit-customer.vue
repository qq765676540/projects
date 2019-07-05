<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="vist-customer flex flex-column">
        <div class="partner-distribution border-bottom flex flex-1 flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">分级合作伙伴拜访情况</span>
            </div>
            <pie-tablea class="vist-pie-table flex" :config="configA" :dataRows="dataA" :thead="table.tHeadA" v-if="dataA"></pie-tablea>
        </div>
        <div class="industry-distribution flex-1">
            <div class="sub-title flex-1">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">锁定用户拜访情况</span>
            </div>
             <pie-tablea class="vist-pie-table flex" :config="configB" :dataRows="dataB" :thead="table.tHeadB" v-if="dataB"></pie-tablea>
        </div>
        <div class="footer-empty">
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";

import pieTablea from "./common/pie-datatablesA";

export default {
    name: "overview",
    components: {
        [PullRefresh.name]: PullRefresh,
        pieTablea
    },
    data() {
        return {
            isLoading: false,
            configA: {
                colorList: [
                    "#1495EB",
                    "#60CBC1",
                    "#F8DAB6",
                    "#F46950",
                    "#C28CC3",
                    "#AB5787",
                    "#2FC25B",
                    "#8543E0",
                    "#223273"
                ],
                params_1: {
                    title: "拜访客户数",
                    imgUrl: require("@/assets/image/pie-customer.png"),
                    size: "45px",
                    labelShow: false,
                    radius: ["60%", "85%"],
                    scrollY: 163,
                    
                },
                params_2: {
                    title: "拜访次数占比",
                    imgUrl: require("@/assets/image/pie-customer-percent.png"),
                    size: "75px",
                    labelShow: false,
                    radius: ["60%", "85%"],
                    scrollY: 163,
                }
            },
            configB: {
                colorList: [
                    "#1495EB",
                    "#60CBC1",
                    "#F8DAB6",
                    "#F46950",
                    "#C28CC3",
                    "#AB5787",
                    "#2FC25B",
                    "#8543E0",
                    "#223273"
                ],
                params_1: {
                    title: "拜访用户数",
                    imgUrl: require("@/assets/image/pie-customer.png"),
                    size: "45px",
                    labelShow: false,
                    radius: ["60%", "85%"],
                    scrollY: 163,
                    
                },
                params_2: {
                    title: "拜访次数占比",
                    imgUrl: require("@/assets/image/pie-customer-percent.png"),
                    size: "75px",
                    labelShow: false,
                    radius: ["60%", "85%"],
                    scrollY: 163,
                }
            },
            table: {
                tHeadA: ["客户类型", "拜访客户数", "拜访次数"],
                tHeadB: ["用户类型", "拜访用户数", "拜访次数"],
            },
            flag_1: false,
            flag_2: false
        }
    },
    beforeCreate() {
        
    },
    computed: {
        dataA() {
            if(this.$store.state.visitCustomerA.length>0){
                let arr = this.$store.state.visitCustomerA;
                let data = [
                    [{qText:'战略客户'},{qNum:0},{qNum:0}],
                    [{qText:'核心客户'},{qNum:0},{qNum:0}],
                    [{qText:'认证客户'},{qNum:0},{qNum:0}],
                    [{qText:'潜力客户'},{qNum:0},{qNum:0}],
                ];
                data.filter((v,i) => {
                    arr.filter(value => {
                        if(value[0].qText == v[0].qText) {
                            data[i][1].qNum = value[1].qNum;
                            data[i][2].qNum = value[2].qNum;
                        }
                    });
                });

                return data;
            }
            return false;
        },
        dataB() {
            if(this.$store.state.visitCustomerB.length>0){
                let arr = this.$store.state.visitCustomerB;
                let data = [
                    [{qText:'战略锁定'},{qNum:0},{qNum:0}],
                    [{qText:'核心锁定'},{qNum:0},{qNum:0}],
                    [{qText:'重要锁定'},{qNum:0},{qNum:0}],
                    [{qText:'市场锁定'},{qNum:0},{qNum:0}],
                ];
                data.filter((v,i) => {
                    arr.filter(value => {
                        if(value[0].qText == v[0].qText) {
                            data[i][1].qNum = value[1].qNum;
                            data[i][2].qNum = value[2].qNum;
                        }
                    });
                });
                return data;
            }
            return false;
        }
    },
    mounted() {},
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
.vist-customer {
    width: 100%;
    height: calc(100% - 10px);
    overflow: hidden;
}

.vist-customer .partner-distribution {
    min-height: 350px;
}

.vist-customer .industry-distribution {
    min-height: 350px;
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}
</style>
