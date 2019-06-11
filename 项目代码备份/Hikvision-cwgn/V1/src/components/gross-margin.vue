<template>
  <div class="constitute">
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>毛利概览</b>
        </div>
      </div>
      <div class="content">
        <div class="contentDesc">毛利额</div>
        <easy-kpi :data="marginAll[0]"></easy-kpi>
        <div class="flex flex-row">
          <Progress class="flex flex-9" :percentage="marginAll[1]" :show-pivot="false"></Progress>
          <div class="flex flex-1 barDesc">{{marginAll[1]}}%</div>
        </div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="desc">同比</i>
            <b class="num">{{marginAll[2]}}%</b>
          </div>
        </div>
        <!-- 毛利率 -->
        <div class="contentDesc">毛利率</div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="mainnum">{{marginAll[3]}}%</i>
          </div>
          <div class="flex flex-1 height">
            <i class="desc">上年同期</i>
            <b class="num">{{marginAll[4]}}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>各城市毛利额情况</b>
        </div>
      </div>
      <div class="content grossBar">
        <gross-margin-bar :data="marginBar"></gross-margin-bar>
      </div>
    </div>
  </div>
</template>

<script>
import easyKpi from "./common/easy-kpi";
import { Progress } from "vant";
import grossMarginBar from "./grossMargin/gross-margin-bar";
import accounting from "accounting";
export default {
  components: { easyKpi, Progress, grossMarginBar },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    marginAll() {
      var arr = [{ color: "#666666", size: "32px", value: 0 }, 0, 0, 0, 0];
      if (this.$store.state["margin-all"].length) {
        var data = this.$store.state["margin-all"][0];
        arr = [
          {
            color: "#666666",
            size: "40px",
            value:
              data[0].qText == "-"
                ? 0
                : accounting.formatNumber(parseInt(data[0].qText) / 10000)
          },
          data[1].qText == "-" || parseFloat(data[1].qText) <= 0
            ? 0
            : parseInt((parseFloat(data[1].qText) * 100).toFixed()),
          data[2].qText == "-"
            ? 0
            : (parseFloat(data[2].qText) * 100).toFixed(1),
          data[3].qText == "-"
            ? 0
            : (parseFloat(data[3].qText) * 100).toFixed(1),
          data[4].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[4].qText) / 10000)
        ];
      }
      return arr;
    },
    marginBar() {
      var arr = [];
      if (this.$store.state["margin-city"].length) {
        var data = this.$store.state["margin-city"];
        data.forEach(i => {
          arr.push({
            value:
              i[3].qText == "-"
                ? 0
                : accounting.formatNumber(parseInt(i[3].qText) / 10000),
            name: i[0].qText,
            growth:
              i[4].qText == "-"
                ? 0
                : (parseFloat(i[4].qText) * 100).toFixed(1)
          });
        });
      }
      return arr;
    }
  },
  methods: {}
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
}
.overCon > .title {
  font-size: 16px;
  line-height: 30px;
  width: 100%;
  text-align: left;
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
.grossBar {
  min-height: 80px;
}
</style>
