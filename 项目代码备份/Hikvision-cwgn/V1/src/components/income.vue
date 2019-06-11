<template>
  <div class="constitute">
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>收入概览</b>
        </div>
      </div>
      <div class="content">
        <div class="contentDesc">总收入</div>
        <easy-kpi :data="incomeAll[0]"></easy-kpi>
        <div class="flex flex-row">
          <Progress class="flex flex-9" :percentage="incomeAll[1]" :show-pivot="false"></Progress>
          <div class="flex flex-1 barDesc">{{incomeAll[1]}}%</div>
        </div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="desc">目标值</i>
            <b class="num">{{incomeAll[2]}}</b>
          </div>
          <div class="flex flex-1">
            <i class="desc">缺口值</i>
            <b class="num">{{incomeAll[3]}}</b>
          </div>
          <div class="flex flex-1">
            <i class="desc">同比</i>
            <b class="num">{{incomeAll[4]}}%</b>
          </div>
        </div>
        <div class="contentDesc">自有收入</div>
        <easy-kpi :data="incomeAll[5]"></easy-kpi>
        <div class="flex flex-row">
          <Progress class="flex flex-9" :percentage="incomeAll[6]" :show-pivot="false"></Progress>
          <div class="flex flex-1 barDesc">{{incomeAll[6]}}%</div>
        </div>
        <div class="flex flex-row contentCon">
          <div class="flex flex-1">
            <i class="desc">目标值</i>
            <b class="num">{{incomeAll[7]}}</b>
          </div>
          <div class="flex flex-1">
            <i class="desc">缺口值</i>
            <b class="num">{{incomeAll[8]}}</b>
          </div>
          <div class="flex flex-1">
            <i class="desc">同比</i>
            <b class="num">{{incomeAll[9]}}%</b>
          </div>
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
      <div class="content flex flex-column">
        <div class="flex flex-1 flex-row">
          <div class="flex flex-1 margin10">
            <vant-pie :id="'pie-11'" :data="incomeYear[0]"></vant-pie>
          </div>
          <div class="flex flex-5 flex-column margin10">
            <div>总收入</div>
            <easy-kpi :data="incomeYear[1]"></easy-kpi>
            <div class="flex flex-row">
              <div class="flex flex-1">
                <i class="desc">目标值</i>
                <b class="num">{{incomeYear[2]}}</b>
              </div>
              <div class="flex flex-1">
                <i class="desc">缺口值</i>
                <b class="num">{{incomeYear[3]}}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-1 flex-row">
          <div class="flex flex-1 margin10">
            <vant-pie :id="'pie-11'" :data="incomeYear[4]"></vant-pie>
          </div>
          <div class="flex flex-5 flex-column margin10">
            <div>自有收入</div>
            <easy-kpi :data="incomeYear[5]"></easy-kpi>
            <div class="flex flex-row">
              <div class="flex flex-1">
                <i class="desc">目标值</i>
                <b class="num">{{incomeYear[6]}}</b>
              </div>
              <div class="flex flex-1">
                <i class="desc">缺口值</i>
                <b class="num">{{incomeYear[7]}}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>行业分类</b>
        </div>
      </div>
      <div class="content">
        <tabs
          v-model="active"
          type="card"
          color="#0F8EE9"
          title-active-color="#FFFFFF"
          title-inactive-color="#0F8EE9"
        >
          <tab title="总收入">
            <cost-table
              :id="'hz'"
              class="tableCon"
              :headData="tradeTableAll.title"
              :bodyData="tradeTableAll.row"
            ></cost-table>
          </tab>
          <tab title="自有收入">
            <cost-table
              :id="'hzy'"
              class="tableCon"
              :headData="tradeTableSelf.title"
              :bodyData="tradeTableSelf.row"
            ></cost-table>
          </tab>
        </tabs>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>产品分类</b>
        </div>
      </div>
      <div class="content">
        <tabs
          v-model="active"
          type="card"
          color="#0F8EE9"
          title-active-color="#FFFFFF"
          title-inactive-color="#0F8EE9"
        >
          <tab title="总收入">
            <cost-table
              :id="'cz'"
              class="tableCon"
              :headData="productTableAll.title"
              :bodyData="productTableAll.row"
            ></cost-table>
          </tab>
          <tab title="自有收入">
            <cost-table
              :id="'czy'"
              class="tableCon"
              :headData="productTableSelf.title"
              :bodyData="productTableSelf.row"
            ></cost-table>
          </tab>
        </tabs>
      </div>
    </div>
    <div class="overCon">
      <div class="title">
        <div>
          <i class="sign"></i>
          <b>各城市业绩情况</b>
        </div>
      </div>
      <div class="content">
        <tabs
          v-model="active"
          type="card"
          color="#0F8EE9"
          title-active-color="#FFFFFF"
          title-inactive-color="#0F8EE9"
        >
          <tab title="总收入">
            <income-all :data="cityAll"></income-all>
          </tab>
          <tab title="自有收入">
            <income-self :data="citySelf"></income-self>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>

<script>
import easyKpi from "./common/easy-kpi";
import { Progress } from "vant";
import vantPie from "./common/vant-pie";
import { Tab, Tabs } from "vant";
import incomeAll from "./income/income-all";
import incomeSelf from "./income/income-self";
import costTable from "./cost/cost-table";
import accounting from "accounting";
export default {
  components: {
    easyKpi,
    Progress,
    vantPie,
    Tab,
    Tabs,
    incomeAll,
    incomeSelf,
    costTable
  },
  data() {
    return {
      active: 0
    };
  },
  mounted() {},
  computed: {
    incomeAll() {
      var arr = [
        { color: "#666666", size: "32px", value: 0 },
        0,
        0,
        0,
        0,
        { color: "#666666", size: "32px", value: 0 },
        0,
        0,
        0,
        0
      ];
      if (this.$store.state["income-all"].length) {
        var data = this.$store.state["income-all"][0];
        arr = [
          {
            color: "#666666",
            size: "32px",
            value: data[0].qText == "-" ? 0 : parseInt(data[0].qText)/10000
          },
          data[1].qText == "-" ? 0 : parseFloat((parseFloat(data[1].qText) * 100).toFixed(1)),
          data[2].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[2].qText)/10000),
          data[3].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[3].qText)/10000),
          data[4].qText == "-" ? 0 : parseFloat((parseFloat(data[4].qText) * 100).toFixed(1)),
          {
            color: "#666666",
            size: "32px",
            value: data[5].qText == "-" ? 0 : parseInt(data[5].qText)/10000
          },
          data[6].qText == "-" ? 0 : parseFloat((parseFloat(data[6].qText) * 100).toFixed(1)),
          data[7].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[7].qText)/10000),
          data[8].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[8].qText)/10000),
          data[9].qText == "-" ? 0 : parseFloat((parseFloat(data[9].qText) * 100).toFixed(1)),
        ];
      }
      return arr;
    },
    incomeYear() {
      var arr = [
        { size: "60px", rate: 0 },
        { color: "#666666", size: "32px", value: 0 },
        0,
        0,
        { size: "60px", rate: 0 },
        { color: "#666666", size: "32px", value: 0 },
        0,
        0
      ];
      if (this.$store.state["income-year"].length) {
        var data = this.$store.state["income-year"][0];
        arr = [
          { size: "60px", rate: data[0].qText == "-" ? 0 : parseInt(data[0].qText) },
          { color: "#666666", size: "32px", value: data[1].qText == "-" ? 0 : parseInt(data[1].qText)/10000 },
          data[2].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[2].qText)/10000),
          data[3].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[3].qText)/10000),
          { size: "60px", rate: parseInt(data[4].qText) },
          { color: "#666666", size: "32px", value: parseInt(data[5].qText)/10000 },
          data[6].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[6].qText)/10000),
          data[7].qText == "-" ? 0 : accounting.formatNumber(parseInt(data[7].qText)/10000),
        ];
      }
      return arr;
    },
    tradeTableAll() {
      var obj = {
        title: [
          {
            name: "行业",
            style: {},
            rowStyle: {}
          },
          {
            name: "总收入",
            style: {},
            rowStyle: {}
          },
          {
            name: "占比",
            style: {},
            rowStyle: {}
          },
          {
            name: "同比",
            style: {},
            rowStyle: {}
          }
        ],
        row: []
      };
      if (this.$store.state["income-hz"].length) {
        var data = this.$store.state["income-hz"];
        var row = [];
        data.forEach(i => {
          row.push([
            i[0].qText,
            i[1].qText == "-" ? 0 : parseInt(i[1].qText/10000),
            i[2].qText == "-" ? "0%" : (parseFloat(i[2].qText) * 100).toFixed(1)+ "%",
            i[3].qText == "-" ? "0%" : (parseFloat(i[3].qText) * 100).toFixed(1)+ "%",
          ]);
        });
        obj.row = row;
      }
      return obj;
    },
    tradeTableSelf() {
      var obj = {
        title: [
          {
            name: "行业",
            style: {},
            rowStyle: {}
          },
          {
            name: "自有收入",
            style: {},
            rowStyle: {}
          },
          {
            name: "占比",
            style: {},
            rowStyle: {}
          },
          {
            name: "同比",
            style: {},
            rowStyle: {}
          }
        ],
        row: []
      };
      if (this.$store.state["income-hzy"].length) {
        var data = this.$store.state["income-hzy"];
        var row = [];
        data.forEach(i => {
          row.push([
            i[0].qText,
            i[1].qText == "-" ? 0 : parseInt(i[1].qText/10000),
            i[2].qText == "-" ? "0%" : (parseFloat(i[2].qText) * 100).toFixed(1)+ "%",
            i[3].qText == "-" ? "0%" : (parseFloat(i[3].qText) * 100).toFixed(1)+ "%",
          ]);
        });
        obj.row = row;
      }
      return obj;
    },
    productTableAll() {
      var obj = {
        title: [
          {
            name: "经销商标识",
            style: {},
            rowStyle: {}
          },
          {
            name: "总收入",
            style: {},
            rowStyle: {}
          },
          {
            name: "占比",
            style: {},
            rowStyle: {}
          },
          {
            name: "同比",
            style: {},
            rowStyle: {}
          }
        ],
        row: []
      };
      if (this.$store.state["income-cz"].length) {
        var data = this.$store.state["income-cz"];
        var row = [];
        data.forEach(i => {
          row.push([
            i[0].qText,
            i[1].qText == "-" ? 0 : parseInt(i[1].qText/10000),
            i[2].qText == "-" ? "0%" : (parseFloat(i[2].qText) * 100).toFixed(1)+ "%",
            i[3].qText == "-" ? "0%" : (parseFloat(i[3].qText) * 100).toFixed(1)+ "%",
          ]);
        });
        obj.row = row;
      }
      return obj;
    },
    productTableSelf() {
      var obj = {
        title: [
          {
            name: "经销商标识",
            style: {},
            rowStyle: {}
          },
          {
            name: "自有收入",
            style: {},
            rowStyle: {}
          },
          {
            name: "占比",
            style: {},
            rowStyle: {}
          },
          {
            name: "同比",
            style: {},
            rowStyle: {}
          }
        ],
        row: []
      };
      if (this.$store.state["income-czy"].length) {
        var data = this.$store.state["income-czy"];
        var row = [];
        data.forEach(i => {
          row.push([
            i[0].qText,
            i[1].qText == "-" ? 0 : parseInt(i[1].qText/10000),
            i[2].qText == "-" ? "0%" : (parseFloat(i[2].qText) * 100).toFixed(1)+ "%",
            i[3].qText == "-" ? "0%" : (parseFloat(i[3].qText) * 100).toFixed(1)+ "%",
          ]);
        });
        obj.row = row;
      }
      return obj;
    },
    cityAll() {
      var arr = [];
      if (this.$store.state["income-cityz"].length) {
        var data = this.$store.state["income-cityz"];
        data.forEach(i => {
          arr.push({
            value: i[3].qText == "-" ? 0 : parseInt(i[3].qText/10000),
            name: i[0].qText,
            growth: i[4].qText == "-" ? 0 : (parseFloat(i[4].qText) * 100).toFixed(1),
            rate: i[5].qText == "-" ? 0 : (parseFloat(i[5].qText) * 100).toFixed(1),
            nameTrue: i[2].qText,
            level: i[1].qText
          });
        });
      }
      return arr;
    },
    citySelf() {
      var arr = [];
      if (this.$store.state["income-cityzy"].length) {
        var data = this.$store.state["income-cityzy"];
        data.forEach(i => {
          arr.push({
            value: i[3].qText == "-" ? 0 : parseInt(i[3].qText/10000),
            name: i[0].qText,
            growth: i[4].qText == "-" ? 0 : (parseFloat(i[4].qText) * 100).toFixed(1),
            rate: i[5].qText == "-" ? 0 : (parseFloat(i[5].qText) * 100).toFixed(1),
            nameTrue: i[2].qText,
            level: i[1].qText
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
.tableCon {
  margin-top: 5px;
}
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
.barDesc {
  position: relative;
  top: -7px;
  left: 7px;
}
.margin10 {
  margin: 10px;
}
</style>
