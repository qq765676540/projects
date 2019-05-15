<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="vist-customer flex flex-column">
        <div class="partner-distribution border-bottom flex flex-1 flex-column">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">分级合作伙伴拜访情况</span>
            </div>
            <pie-table class="vist-pie-table flex" :config="configA" :dataRows="dataA" :thead="table.tHeadA" v-if="dataA"></pie-table>
        </div>
        <div class="industry-distribution border-bottom flex-1">
            <div class="sub-title flex-1">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">锁定用户拜访情况</span>
            </div>
             <pie-table class="vist-pie-table flex" :config="configB" :dataRows="dataB" :thead="table.tHeadB" v-if="dataB"></pie-table>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import {
    PullRefresh
} from "vant";

import pieTable from "./common/pie-datatables";

export default {
    name: "overview",
    components: {
        [PullRefresh.name]: PullRefresh,
        pieTable
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
                let a = this.$store.state.visitCustomerA;
                // console.log('visitCustomerA',a);
                return a;
            }
            return false;
        },
        dataB() {
            if(this.$store.state.visitCustomerB.length>0){
                let a = this.$store.state.visitCustomerB;
                // console.log('visitCustomerB',a);
                return a;
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
    height: calc(100% - 120px);
    overflow: hidden;
}

.vist-customer .partner-distribution {
    min-height: 350px;
}

.vist-customer .partner-distribution-icon {
    background-image: url("../assets/image/vist-customer-icon.png");
}

.vist-customer .industry-distribution {
    min-height: 350px;
}

.vist-customer-middle {
    min-height: 200px;
}

.vist-customer-bottom {
    min-height: 200px;
    margin: 0 10px 10px 10px;
}
</style>
