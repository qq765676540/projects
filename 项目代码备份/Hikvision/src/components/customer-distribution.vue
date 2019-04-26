<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="vist-distribution flex flex-column">
        <div class="task-distribution flex-1 flex-column">
            <div class="sub-title flex-1">
                <div class="sub-title-icon pie-icon"></div>
                <span class="sub-title-name">拜访任务类型占比</span>
            </div>
            <div class="task-distribution-middle flex flex-14 flex-row">
                <e-pie class="vist-e-pie flex" :id="'e-pie-1'" :pieConfig="pieConfig1" :data="eData3.yData" ></e-pie>
            </div>
            <div class="task-distribution-bottom">
                <data-table orderBy="1|desc" :scrollY="220" :isShowTitle="table.isShowTitle" :title="table.tableTitle" :data="table.tableData"></data-table>
            </div>
            <!-- <div class="task-distribution-middle flex flex-14 flex-row">
                <pie-table class="vist-e-pie flex" :id="'e-pie-table-1'" :pieConfig="pieConfig1" :pieData="eData4" ></pie-table>
            </div> -->
        </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh } from "vant";
import ePie from "./common/echarts-pie";
import { eData3 } from "./data/echarts-pie-data.js";
import dataTable from "./common/datatables";
// import pieTable from "./common/pie-datatables";

export default {
  name: "overview",
  components: {
    [PullRefresh.name]: PullRefresh,
    ePie,
    dataTable
  },
  data() {
    return {
      isLoading: false,
      eData3,
      pieConfig1: {
        title:"",
        imgUrl: "",
        size: "",
        labelShow: true,
        radius: ["30%", "50%"]
        // colorList:['black',"#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
      },
      table: {
        isShowTitle: false,
        tableTitle: ["1", "1", "1"],
        tableData: [
          { color: "#448DFF", value: ["外部活动", "23.5%", "45"] },
          { color: "#59D4FF", value: ["拜访", "10.7%", "22"]},
          { color: "#751DE2", value: ["内部事务", "10.7%", "43"]},
          { color: "#BB2B79", value: ["外出", "39%", "12"]},
          { color: "#DB479B", value: ["电话", "16%", "3"]},
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
.vist-distribution {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vist-distribution .task-distribution {
  min-height: 300px;
}

.task-distribution-middle {
  margin-left: -10px;
  min-height: 300px;
}

.task-distribution-bottom {
  min-height: 200px;
  margin: 0 40px 10px 40px;
}
</style>
