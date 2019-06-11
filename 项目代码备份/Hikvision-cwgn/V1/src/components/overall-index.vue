<template>
  <div class="constitute">
    <div class="overCon1">
      <div class="topCon">
        <div class="leftCon deatalCon">
          <h2>总收入</h2>
          <p class="num">{{topData[0]}}</p>
          <p class="detail">
            <i>完成率</i>
            <i class="per">{{topData[1]}}%</i>
          </p>
          <p class="detail">
            <i>同比</i>
            <i class="per">{{topData[2]}}%</i>
          </p>
        </div>
        <div class="rightCon deatalCon">
          <h2>自有收入</h2>
          <p class="num">{{topData[3]}}</p>
          <p class="detail">
            <i>完成率</i>
            <i class="per">{{topData[4]}}%</i>
          </p>
          <p class="detail">
            <i>同比</i>
            <i class="per">{{topData[5]}}%</i>
          </p>
        </div>
      </div>
      <div class="btmCon">
        <div class="leftCon deatalCon">
          <h2>毛利额</h2>
          <p class="num">{{topData[6]}}</p>
          <p class="detail">
            <i>同比</i>
            <i class="per">{{topData[7]}}%</i>
          </p>
        </div>
        <div class="rightCon deatalCon">
          <h2>毛利率</h2>
          <p class="num">{{topData[8]}}%</p>
          <p class="detail">
            <i>上年同期</i>
            <i class="per">{{topData[9]}}%</i>
          </p>
        </div>
      </div>
    </div>
    <div class="overCon1">
      <div class="topCon">
        <div class="leftCon deatalCon">
          <h2>费用</h2>
          <p class="num">{{btmData[0]}}</p>
          <p class="detail">
            <i>完成率</i>
            <i class="per">{{btmData[1]}}%</i>
          </p>
          <p class="detail">
            <i>同比</i>
            <i class="per">{{btmData[2]}}%</i>
          </p>
        </div>
        <div class="rightCon deatalCon">
          <h2>费用率</h2>
          <p class="num">{{btmData[3]}}%</p>
          <p class="detail">
            <i>上年同期</i>
            <i class="per">{{btmData[4]}}%</i>
          </p>
        </div>
      </div>
      <div class="btmCon">
        <div class="leftCon deatalCon">
          <h2>扣费毛利</h2>
          <p class="num">{{btmData[5]}}%</p>
          <p class="detail">
            <i>上年同期</i>
            <i class="per">{{btmData[6]}}%</i>
          </p>
        </div>
        <div class="rightCon deatalCon">
          <h2>扣费毛利率</h2>
          <p class="num">{{btmData[7]}}%</p>
          <p class="detail">
            <i>上年同期</i>
            <i class="per">{{btmData[8]}}%</i>
          </p>
        </div>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>全年预算进度</b>
        </div>
      </div>
      <div class="chartsCon">
        <div class="flex flex-3 col-2-pie">
          <div class="flex flex-1 flex-column col-2-pie-param flex-align-center">
            <vant-pie :id="'pie-1'" :data="pieData[0]"></vant-pie>
            <div class="pieDes">总收入</div>
          </div>
          <div class="flex flex-1 flex-column col-2-pie-param flex-align-center">
            <vant-pie :id="'pie-2'" :data="pieData[1]"></vant-pie>
            <div class="pieDes">自有收入</div>
          </div>
          <div class="flex flex-1 flex-column col-2-pie-param flex-align-center">
            <vant-pie :id="'pie-4'" :data="pieData[2]"></vant-pie>
            <div class="pieDes">费用</div>
          </div>
        </div>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>业绩排名</b>
        </div>
      </div>
      <div class="chartsCon">
        <easybar :id="'chartsOverall'" :data="chartData"></easybar>
      </div>
    </div>
  </div>
</template>

<script>
import vantPie from "./common/vant-pie";
import easybar from "./common/easy-echarts-bar";
import accounting from "accounting";
export default {
  components: {
    vantPie,
    easybar
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    topData() {
      var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (this.$store.state["over-all-top"].length) {
        var data = this.$store.state["over-all-top"][0];
        arr = [
          data[0].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[0].qText)/10000),
          data[1].qText == "-"
            ? 0
            : (parseFloat(data[1].qText) * 100).toFixed(1),
          data[2].qText == "-"
            ? 0
            : (parseFloat(data[2].qText) * 100).toFixed(1),
          data[3].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[3].qText)/10000),
          data[4].qText == "-"
            ? 0
            : (parseFloat(data[4].qText) * 100).toFixed(1),
          data[5].qText == "-"
            ? 0
            : (parseFloat(data[5].qText) * 100).toFixed(1),
          data[6].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[6].qText)/10000),
          data[7].qText == "-"
            ? 0
            : (parseFloat(data[7].qText) * 100).toFixed(1),
          data[8].qText == "-"
            ? 0
            : (parseFloat(data[8].qText) * 100).toFixed(1),
          data[9].qText == "-"
            ? 0
            : (parseFloat(data[9].qText) * 100).toFixed(1)
        ];
      }
      return arr;
    },
    btmData() {
      var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      if (this.$store.state["over-all-btm"].length) {
        var data = this.$store.state["over-all-btm"][0];
        arr = [
          data[0].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[0].qText)/10000),
          data[1].qText == "-"
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
            : (parseFloat(data[4].qText) * 100).toFixed(1),
          data[5].qText == "-"
            ? 0
            : accounting.formatNumber(parseInt(data[6].qText)/10000),
          data[6].qText == "-"
            ? 0
            : (parseFloat(data[6].qText) * 100).toFixed(1),
          data[7].qText == "-"
            ? 0
            : (parseFloat(data[7].qText) * 100).toFixed(1),
          data[8].qText == "-"
            ? 0
            : (parseFloat(data[8].qText) * 100).toFixed(1)
        ];
      }
      return arr;
    },
    pieData() {
      var arr = [];
      if (this.$store.state["over-all-progress"].length) {
        this.$store.state["over-all-progress"][0].forEach(i => {
          if (i.qText == "-") {
            arr.push({
              size: "60px",
              rate: 0
            });
          } else {
            arr.push({
              size: "60px",
              rate: parseFloat((i.qText * 100).toFixed(1))
            });
          }
        });
      }
      return arr;
    },
    chartData() {
      var obj = { x1: [], x2: [], x3: [], y: [] };
      if (this.$store.state["over-all-ranking"].length) {
        this.$store.state["over-all-ranking"].forEach(i => {
          obj.y.push(i[0].qText);
          obj.x1.push(i[1].qText == "-" ? 0 : parseInt(parseInt(i[1].qText)/10000));
          obj.x2.push(
            i[2].qText == "-" ? 0 : (parseFloat(i[2].qText) * 100).toFixed(1)
          );
          obj.x3.push(
            i[3].qText == "-" ? 0 : (parseFloat(i[3].qText) * 100).toFixed(1)
          );
        });
      }
      return obj;
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
.overCon1 {
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 8px;
  width: 96%;
  background-color: #fff;
  margin: 4px 2%;
  padding: 6px;
  height: auto;
}
.topCon {
  border-bottom: 1px solid #dddddd;
  overflow: auto;
}
.btmCon {
  overflow: auto;
}
.leftCon {
  border-right: 1px solid #dddddd;
}
.deatalCon {
  width: calc(50% - 1px);
  float: left;
  padding: 10px 10px;
  text-align: left;
}
.deatalCon > h2 {
  font-size: 18px;
  font-weight: bold;
  color: black;
}

.deatalCon > p {
  font-size: 14px;
  text-align: left;
}

.deatalCon > .num {
  padding: 5px 0 8px;
  font-size: 18px;
  color: black;
}

.deatalCon > p > i {
  font-style: normal;
}

.detail {
  overflow: auto;
}

.detail > i {
  display: block;
  float: left;
}

.detail > i:first-child {
  width: 40%;
  padding-right: 6px;
  text-align-last: justify;
  text-align: justify;
  text-justify: distribute-all-lines;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
}
.arrow > img {
  width: 10px;
  vertical-align: middle;
}

.overCon {
  text-align: left;
}
.overCon > .title {
  font-size: 16px;
  line-height: 30px;
}
.overCon > .title > .titleDes {
  font-size: 12px;
  line-height: 26px;
  color: gray;
}

.sign {
  display: inline-block;
  width: 6px;
  height: 16px;
  background-color: #29a6ff;
  margin: 3px 4px 0 0;
}
.overCon > .chartsCon {
  min-height: 100px;
  width: 100%;
}

.col-2-kpi {
  font-size: 13px;
}

.pieDes {
  line-height: 40px;
}

.col-2-pie-param {
  padding: 5px;
}
</style>
