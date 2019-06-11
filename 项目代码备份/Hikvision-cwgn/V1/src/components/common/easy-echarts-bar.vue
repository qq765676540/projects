<template>
  <div :id="id+'-box'" class="easybar">
    <div :id="id" class="easybarCon" :style="'height:'+height+'px'"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "easybar",
  components: {},
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Object,
      default() {
        return { x1: [], x2: [], x3:[], y: [] };
      }
    }
  },
  computed: {
    height() {
      return this.data.y.length * 24 + 40;
    }
  },
  beforeCreate() {},
  mounted() {
    this.echartsIns = echarts.init(document.getElementById(this.id));
    this.setOption();
    window.addEventListener("resize", this.resizeEcharts, false);
  },
  watch: {
    height() {
      this.setOption();
      this.resizeEcharts();
    },
    data() {
      this.setOption();
      this.resizeEcharts();
    }
  },
  methods: {
    setOption() {
      if (this.data) {
        let thisData = this.data;
        this.option = {
          color: ["rgba(206,19,28,0.6)", "#999999", "#999999"],
          legend: {
            data: ["总收入", "完成率"],
            x: "right"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                opacity: 0
              }
            },
            formatter: "{a0}: {c0}<br />{a1}: {c1}%<br />{a2}: {c2}%"
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "5%",
            top: "8%",
            height: "85%",
            containLabel: true,
            z: 22
          },
          yAxis: {
            type: "category",
            data: this.data.y,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            offset: 40,
            inverse: true,
            axisLabel: {
              interval: 0,
              align: "left",
              color: "grey",
              formatter: function(params) {
                var res = "";
                var myseries = thisData.y;
                for (var j = 0; j < myseries.length; j++) {
                  if (myseries[j] == params) {
                    if (j == 0) {
                      res += "{img1|}" + myseries[j];
                    } else if (j == 1) {
                      res += "{img2|}" + myseries[j];
                    } else if (j == 2) {
                      res += "{img3|}" + myseries[j];
                    } else {
                      res += j + ". " + myseries[j];
                    }
                  }
                }
                return res;
              },
              rich: {
                img1: {
                  backgroundColor: {
                    image: "../no1.png"
                  }
                },
                img2: {
                  backgroundColor: {
                    image: "../no2.png"
                  }
                },
                img3: {
                  backgroundColor: {
                    image: "../no3.png"
                  }
                }
              }
            }
          },
          xAxis: [
            {
              show: false,
            },
            {
              show: false,
            }
          ],
          series: [
            {
              name: "总收入",
              xAxisIndex: 0,
              data: this.data.x1,
              type: "bar",
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "right",
                    textStyle: {
                      color: "#666666",
                      fontSize: 14
                    }
                  }
                }
              }
            },
            {
              name: "完成率",
              xAxisIndex: 1,
              type: "line",
              data: this.data.x2
            },
            {
              name: "平均完成率",
              xAxisIndex: 1,
              type: "line",
              lineStyle: {
                normal: {
                  color: "#999999",
                  width: 1,
                  type: "dashed"
                }
              },
              data: this.data.x3
            }
          ]
        };
        this.echartsIns.setOption(this.option);
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
.easybar {
  width: 100%;
  min-height: 60px;
  display: block;
}
.easybarCon {
  width: 100%;
  min-height: 60px;
  display: block;
}
</style>
