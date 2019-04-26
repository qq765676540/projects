<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="vist-customer flex flex-column">
        <div class="partner-distribution border-bottom flex flex-1 flex-column">
            <div class="sub-title">
                <div class="sub-title-icon pie-icon"></div>
                <span class="sub-title-name">合作伙伴拜访情况</span>
            </div>
            <pie-table class="vist-pie-table flex" :id="'e-pietable-1'" :scrollY="163" :pieConfig="pieConfig" :pieData="eData4" :tableData="table.tableData" :title="table.tableTitle"></pie-table>
        </div>
        <div class="industry-distribution border-bottom flex-1">
            <div class="sub-title flex-1">
                <div class="sub-title-icon pie-icon"></div>
                <span class="sub-title-name">用户拜访情况</span>
            </div>
            <pie-table class="vist-pie-table flex" :id="'e-pietable-2'" :scrollY="163" :pieConfig="pieConfig" :pieData="eData4" :tableData="table.tableData" :title="table.tableTitle"></pie-table>
        </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh } from "vant";
import ePie from "./common/echarts-pie";
import { eData1, eData2, eData4 } from "./data/echarts-pie-data.js";
import pieTable from "./common/pie-datatables";

export default {
  name: "overview",
  components: {
    [PullRefresh.name]: PullRefresh,
    ePie,
    pieTable
  },
  data() {
    return {
      isLoading: false,
      eData1,
      eData2,
      eData4,
      pieConfig: {
        pieConfig1: {
          title: "拜访用户数",
          imgUrl: require("@/assets/image/pie-customer.png"),
          size: "45px",
          labelShow: false,
          radius: ["60%", "85%"]
        },
        pieConfig2: {
          title: "拜访次数占比",
          imgUrl: require("@/assets/image/pie-customer-percent.png"),
          size: "75px",
          labelShow: false,
          radius: ["60%", "85%"]
        }
      },
      table: {
        tableTitle: ["客户分级", "拜访客户数", "拜访次数"],
        tableData: [
          { color: "#448DFF", value: ["客户名称1", "45%", "45"] },
          { color: "#59D4FF", value: ["客户名称2", "35%", "22"] },
          { color: "#751DE2", value: ["客户名称3", "25%", "43"] },
          { color: "#BB2B79", value: ["客户名称4", "15%", "12"] },
          { color: "#DB479B", value: ["客户名称5", "45%", "3"] }
        ]
      }
    };
  },
  mounted() {
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
