<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="home">
            <div class="overview border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">整体销售情况</span>
                </div>
                <div class="content-box flex flex-column">
                    <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_1"></easy-kpi></div>
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_2"></easy-kpi></div>
                    </div>
                    <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_3"></easy-kpi></div>
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_4"></easy-kpi></div>
                    </div>
                    <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_5"></easy-kpi></div>
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_6"></easy-kpi></div>
                    </div>
                    <div class="flex flex-1 flex-justify-center flex-align-center" style="margin: 5px 0px 0px 5px">
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_7"></easy-kpi></div>
                        <div class="flex-1"><easy-kpi :data="kpiData.kpi_8"></easy-kpi></div>
                    </div>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import { PullRefresh } from "vant";

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
            return demoData.homeData.overview;
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
    beforeDestroy() {
    },
    destroyed() {
    }
};
</script>

<style scoped>
.home {
    width: 100%;
    overflow-y: scroll !important;
}

.home .overview {
    min-height: 575px;
}

.home .org-structure {
    min-height: 270px;
}

.home .vist-num-trend {
    min-height: 320px;
}

.home .vist-customer-trend {
    min-height: 320px;
}

.home .col-2-pie-param {
    width: 100%;
    height: auto;
}

.home .col-2-button {
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #666666;
    background-color: #ffffff;
    text-align: center;
    line-height: 22px;
    border-radius: 15px;
    white-space: nowrap;
    max-width: 1160px;
}
.home .active {
    background-color: #0f8ee9;
    border-radius: 15px;
    color: #ffffff;
}

.home .col-2-kpi {
    /* font-size: 13px; */
    min-height: 50px;
}

.home .col-2-kpi-icon {
    display: inline-block;
    line-height: 6px;
    text-align: center;
    color: #60cbc1;
    text-decoration: none;
    text-indent: 5px;
}

.home .col-2-kpi-row {
    min-width: 150px;
    max-width: 260px;
}

.home .col-2-right-title{
    font-size: 10px;
    white-space: nowrap;
    margin-right: 14px;
    max-width: 400px;
    font-weight: bold;
}

.home .col-2-right-bg{
    width: 12px;
    height: 8px;
    border-radius: 0px;
    margin-left: 6px;
}

.home .col-3 {
    height: auto;
}

.subtitle-name-icon {
  border-radius: 50%;
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
}

</style>
