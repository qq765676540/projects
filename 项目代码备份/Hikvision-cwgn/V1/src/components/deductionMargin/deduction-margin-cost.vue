<template>
  <div :id="id+'-box'" class="normalBar">
    <div :id="id" class="normalBarCon"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "deduction-margin-per",
  components: {},
  data() {
    return {};
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
            value: 1854,
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
        var option = {
          grid: {
            left: 0,
            top: "16%",
            right: 0,
            bottom: 0,
            containLabel: true
          },
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0],
              start: 50,
              end: 100
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
              bottom: 40,
              handleStyle: {
                color: "",
                opacity: 0
              },
              borderColor: "rgba(0,0,0,0)"
            }
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                opacity: 0
              }
            },
            formatter: "{a0}: {c0}<br />{a1}: {c1}%"
          },
          legend: {
            data: ["扣费毛利/人力成本", "同比"],
            right: 5
          },
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
              name: "扣费毛利/人力成本",
              type: "bar",
              color: "#448DFF",
              data: value
            },
            {
              name: "同比",
              type: "line",
              yAxisIndex: 1,
              color: "orange",
              data: growth
            }
          ]
        };
        this.echartsIns.setOption(option, true);
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
  position: relative;
  min-width: 100%;
  padding: 4px;
}
.desc {
  border: 1px solid #dddddd;
  background-color: #dddddd;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 4px;
  padding: 10px;
}
.title {
  font-size: 14px;
  margin: 4px 0;
  color: #333333;
}
.content {
  font-size: 12px;
  color: #555555;
}
</style>
