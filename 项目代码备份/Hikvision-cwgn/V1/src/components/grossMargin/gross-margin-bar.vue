<template>
  <div :id="id+'-box'" class="normalBar">
    <div :id="id" class="normalBarCon"></div>
    <div class="flex flex-column desc">
      <div class="flex flex-row flex-1 title">{{this.selectedMsg.city}}详情</div>
      <div class="flex flex-row flex-1 content">
        <div class="flex flex-1">毛利额</div>
        <div class="flex flex-3">{{this.selectedMsg.grossMargin}}</div>
      </div>
      <div class="flex flex-row flex-1 content">
        <div class="flex flex-1">同比</div>
        <div class="flex flex-3">{{this.selectedMsg.growth}}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "gross-margin-bar",
  components: {},
  data() {
    return {
      selectedMsg: {
        city: "杭州",
        grossMargin: 1200,
        growth: 80
      }
    };
  },
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    update: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default() {
        return [
          {
            value: 4154,
            name: "杭州",
            growth: 40
          },
          {
            value: 3854,
            name: "宁波",
            growth: 60
          },
          {
            value: 3515,
            name: "舟山",
            growth: 50
          },
          {
            value: 3515,
            name: "台州",
            growth: 10
          },
          {
            value: 3054,
            name: "绍兴",
            growth: 80
          },
          {
            value: 2515,
            name: "温州",
            growth: 45
          },
          {
            value: 1515,
            name: "金华",
            growth: 42
          }
        ];
      }
    }
  },
  beforeCreate() {},
  mounted() {
    this.echartsIns = echarts.init(document.getElementById(this.id));
    this.setOption();
    this.selectedMsg.city = this.data[0] ? this.data[0].name : "";
    this.selectedMsg.grossMargin = this.data[0] ? this.data[0].value : "";
    this.selectedMsg.growth = this.data[0] ? this.data[0].growth : "";
    window.addEventListener("resize", this.resizeEcharts, false);
  },
  watch: {
    data() {
      this.setOption();
    },
    update() {
      this.resizeEcharts();
    }
  },
  methods: {
    setOption() {
      if (this.data) {
        var datas = this.data;
        var names = [];
        var value = [];
        var growth = [];
        datas.forEach(element => {
          names.push(element.name);
          value.push(element.value);
          growth.push(element.growth);
        });
        //选中状态改变颜色，加阴影
        var itemStyle = {
          normal: {},
          emphasis: {
            color: ["rgba(20,149,235,1)"],
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: "rgba(0,0,0,0.5)"
          }
        };
        var option = {
          grid: {
            left: 0,
            top: "16%",
            right: 0,
            bottom: 0,
            containLabel: true
          },
          legend: {
            data: ["毛利额", "同比"],
            right: 5
          },
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0],
              start: 0,
              end: 50
            },
            {
              type: "slider",
              xAxisIndex: [0],
              zoomLock: true,
              showDetail: false,
              dataBackground: {
                lineStyle: {
                  opacity: 0
                },
                areaStyle: {
                  opacity: 0
                }
              },
              height: 5,
              bottom: 55,
              handleStyle: {
                color: "",
                opacity: 0
              },
              borderColor: "rgba(0,0,0,0)"
            }
          ],
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: names,
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: [
            {
              type: "value",
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            },
            {
              type: "value",
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],
          series: [
            {
              name: "毛利额",
              type: "bar",
              data: value,
              color: "rgba(20,149,235,0.6)",
              itemStyle: itemStyle
            },
            {
              name: "同比",
              type: "line",
              color: "orange",
              yAxisIndex: 1,
              data: growth
            }
          ]
        };
        this.echartsIns.setOption(option, true);
        var _this = this;
        this.echartsIns.on("click", function(params) {
          _this.selectedMsg.city = params.name;
          _this.selectedMsg.grossMargin = params.data;
          _this.selectedMsg.growth = growth[params.dataIndex];
        });
      }
    },
    resizeEcharts() {
      setTimeout(() => {
        if (this.echartsIns) {
          this.echartsIns.resize();
        }
      }, 300);
    }
  },
  destroyed() {
    this.echartsIns.clear();
    this.echartsIns.dispose();
    this.option = null;
    this.echartsIns = null;
    window.removeEventListener("resize", this.resizeEcharts, false);
  }
};
</script>

<style scoped>
.normalBarCon {
  min-height: 240px;
  min-width: 100%;
  padding: 4px;
  box-shadow: 3px 3px 8px #888888;
}
.desc {
  border: 1px solid #dddddd;
  background-color: #dddddd;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 4px;
  padding: 10px;
  box-shadow: 3px 3px 8px #888888;
}
.title{
    font-size: 14px;
    margin: 4px 0;
    color: #333333;
}
.content{
    font-size: 12px;
    color: #555555;
}
</style>
