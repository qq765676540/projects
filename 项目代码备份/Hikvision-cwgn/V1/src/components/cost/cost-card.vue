<template>
  <div :id="id+'-box'" class="costCard">
    <div :id="id" class="costCardCon"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "cost-card",
  components: {},
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Array,
      default() {
        return [
          {
            value: 2154,
            name: "人力成本"
          },
          {
            value: 3854,
            name: "宣传成本"
          },
          {
            value: 3515,
            name: "A成本"
          },
          {
            value: 3515,
            name: "B成本"
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
    }
  },
  methods: {
    setOption() {
      if (this.data) {
        var datas = this.data;
        var rich = {
          name: {
            color: "#666666",
            fontSize: 12,
            padding: [5, 2],
            align: "center"
          },
          percent: {
            align: "center",
            fontSize: 16,
            padding: [9, 0]
          },
          value: {
            color: "#666666",
            fontSize: 12,
            align: "center"
          },
          hr: {
            borderColor: "#111111",
            width: "100%",
            borderWidth: 1,
            height: 0
          }
        };
        var option = {
          series: [
            {
              name: "在线数量",
              type: "pie",
              radius: ["30%", "45%"],
              // hoverAnimation: true,
              color: [
                "#1495EB",
                "#60CBC1",
                "#F8DAB6",
                "#F46950",
                "#C28CC3",
                "#AB5787",
                "#2FC25B",
                "#8543E0",
                "#223273"
              ],
              label: {
                normal: {
                  textStyle: {
                    fontSize: 12
                  },
                  formatter: function(params) {
                    var total = 0;
                    var percent = 0;
                    datas.forEach(function(value) {
                      total += value.value;
                    });
                    percent = ((params.value / total) * 100).toFixed(1);
                    return (
                      "{percent|" +
                      percent +
                      "%}\n{hr|}\n{name|" +
                      params.name +
                      "}\n{value|" +
                      params.value +
                      "}"
                    );
                  },
                  rich: rich
                }
              },
              labelLine: {
                normal: {
                  length: 20,
                  length2: 35,
                  lineStyle: {
                    color: "#111111"
                  }
                }
              },
              data: datas
            }
          ]
        };
        this.echartsIns.setOption(option);
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
.costCardCon {
  min-height: 280px;
}
</style>
