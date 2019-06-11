<template>
  <div class="constitute">
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>扣费毛利概览</b>
        </div>
      </div>
      <div class="content">
        <div class="contentDesc">扣费毛利</div>
        <easy-kpi :data="deMarginAll[0]"></easy-kpi>
        <div class="flex flex-row">
          <Progress class="flex flex-9" :percentage="deMarginAll[1]" :show-pivot="false"></Progress>
          <div class="flex flex-1 barDesc">{{deMarginAll[1]}}%</div>
        </div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="desc">同比</i>
            <b class="num">{{deMarginAll[2]}}%</b>
          </div>
        </div>
        <!-- 扣费毛利率 -->
        <div class="contentDesc">扣费毛利率</div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="mainnum">{{deMarginAll[3]}}%</i>
          </div>
          <div class="flex flex-1 height">
            <i class="desc">上年同期</i>
            <b class="num">{{deMarginAll[4]}}%</b>
          </div>
        </div>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>人均效能</b>
          <div class="selection" @click="selectedHandle">{{selected}}</div>
        </div>
      </div>
      <div class="content">
        <div v-show="selected == '人均收入'" class="flex flex-column">
          <per-recive :update="update" :data="chartsData.perRecive"></per-recive>
        </div>
        <div v-show="selected == '人均费用'" class="flex flex-column">
          <per-cost :update="update" :data="chartsData.perCost"></per-cost>
        </div>
        <div v-show="selected == '人均扣费毛利'" class="flex flex-column">
          <deduction-margin-per :update="update" :data="chartsData.deMarginPer"></deduction-margin-per>
        </div>
        <div v-show="selected == '扣费毛利/人力成本'" class="flex flex-column">
          <deduction-margin-cost :update="update" :data="chartsData.deMarginCost"></deduction-margin-cost>
        </div>
      </div>
    </div>
    <van-dialog v-model="dialogShow" title="选择细分成本">
      <van-radio-group v-model="selected">
        <template v-for="(item,index) in costList">
          <van-cell-group :key="index">
            <van-cell :title="item" clickable @click="selected = item;update++">
              <van-radio :name="item"/>
            </van-cell>
          </van-cell-group>
        </template>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import easyKpi from "./common/easy-kpi";
import deductionMarginPer from "./deductionMargin/deduction-margin-per";
import deductionMarginCost from "./deductionMargin/deduction-margin-cost";
import perCost from "./deductionMargin/per-cost";
import perRecive from "./deductionMargin/per-recive";
import { Progress } from "vant";
import accounting from "accounting";
export default {
  components: {
    easyKpi,
    deductionMarginPer,
    deductionMarginCost,
    perCost,
    perRecive,
    Progress
  },
  data() {
    return {
      update: 0,
      dialogShow: false,
      selected: "人均收入",
      costList: ["人均收入", "人均费用", "人均扣费毛利", "扣费毛利/人力成本"],
      active: 0
    };
  },
  mounted() {},
  computed: {
    deMarginAll() {
      var arr = [{ color: "#666666", size: "32px", value: 0 }, 0, 0, 0, 0];
      if (this.$store.state["de-margin-all"].length) {
        var data = this.$store.state["de-margin-all"][0];
        arr = [
          {
            color: "#666666",
            size: "40px",
            value: data[0].qText == "-" ? 0 : parseInt(data[0].qText / 10000)
          },
          data[1].qText == "-" || parseFloat(data[1].qText) < 0
            ? 0
            : (parseFloat(data[1].qText) * 100).toFixed(1),
          data[2].qText == "-"
            ? 0
            : (parseFloat(data[2].qText) * 100).toFixed(1),
          data[3].qText == "-"
            ? 0
            : (parseFloat(data[3].qText) * 100).toFixed(1),
          data[4].qText == "-"
            ? 0
            : (parseFloat(data[4].qText) * 100).toFixed(1)
        ];
        return arr;
      }
      return arr;
    },
    chartsData() {
      if (this.$store.state["de-margin-per"].length) {
        var data = this.$store.state["de-margin-per"];
        var obj = {
          perRecive: [],
          perCost: [],
          deMarginPer: [],
          deMarginCost: []
        };
        data.forEach((i, index) => {
          obj.perRecive[index] = {};
          obj.perRecive[index].name = i[0].qText;
          obj.perRecive[index].value =
            i[1].qText == "-" ? 0 : parseFloat(i[1].qText / 10000).toFixed(3)-0;
          obj.perRecive[index].growth =
            i[2].qText == "-"
              ? 0
              : (parseFloat(i[2].qText) * 100).toFixed(1) - 0;
          obj.perCost[index] = [];
          obj.perCost[index].name = i[0].qText;
          obj.perCost[index].value =
            i[3].qText == "-" ? 0 : parseFloat(i[3].qText / 10000).toFixed(3)-0;
          obj.perCost[index].growth =
            i[4].qText == "-"
              ? 0
              : (parseFloat(i[4].qText) * 100).toFixed(1) - 0;
          obj.deMarginPer[index] = [];
          obj.deMarginPer[index].name = i[0].qText;
          obj.deMarginPer[index].value =
            i[5].qText == "-" ? 0 : parseFloat(i[5].qText / 10000).toFixed(3)-0;
          obj.deMarginPer[index].growth =
            i[6].qText == "-"
              ? 0
              : (parseFloat(i[6].qText) * 100).toFixed(1) - 0;
          obj.deMarginCost[index] = [];
          obj.deMarginCost[index].name = i[0].qText;
          obj.deMarginCost[index].value =
            i[7].qText == "-" ? 0 : parseFloat(i[7].qText / 10000).toFixed(3)-0;
          obj.deMarginCost[index].growth =
            i[8].qText == "-"
              ? 0
              : (parseFloat(i[8].qText) * 100).toFixed(1) - 0;
        });
        return obj;
      }
      return [{ color: "#666666", size: "32px", value: 0 }, 0, 0, 0, 0];
    }
  },
  methods: {
    selectedHandle() {
      this.dialogShow = true;
    }
  }
};
</script>

<style scoped>
.constitute {
  width: 100%;
  overflow-y: scroll !important;
  background-color: #dddddd;
  flex-direction: column;
}
.overCon {
  width: 100%;
  background-color: #fff;
  margin: 4px 0;
  padding: 6px 4%;
  height: auto;
  position: relative;
}
.overCon > .title {
  font-size: 16px;
  line-height: 30px;
  width: 100%;
  text-align: left;
}
.selection {
  float: right;
  width: 120px;
  height: 27px;
  border: 1px solid #29a6ff;
  background-color: #29a6ff;
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  line-height: 27px;
  text-align: center;
}
.sign {
  display: inline-block;
  width: 6px;
  height: 16px;
  background-color: #29a6ff;
  margin: 3px 4px 0 0;
}
.overCon .content {
  text-align: left;
}
.overCon .content .contentDesc {
  margin: 12px 0 0 4px;
}
.contentCon {
  padding-bottom: 5px;
}
.desc {
  font-style: normal;
  text-align: left;
  color: #999999;
}
.num {
  font-style: normal;
  color: #666666;
  padding-left: 4px;
}
.height .num {
  line-height: 52px;
}
.height .desc {
  line-height: 52px;
}
.barDesc {
  position: relative;
  top: -7px;
  left: 7px;
}
.margin10 {
  margin: 10px;
}
.mainnum {
  font-size: 40px;
  font-style: normal;
  line-height: 52px;
}
</style>
