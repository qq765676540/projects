<template>
<div :id="id+'-box'" class="flex easy-line flex-1 relative">
  <div :id="id" class="flex-1"></div>
</div>
</template>

<script>
import accounting from "accounting";
import echarts from "echarts";
import { lineOption, baseSerie,colorStops } from "../eOption/line-option.js";
import Tools from "../../tools/tools";
var toolsBean = new Tools();

export default {
  name: "easy-line",
  components: {},
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      option: toolsBean.deepClone(lineOption)
    };
  },
  beforeCreate() {},
  mounted() {
    this.echartsIns = echarts.init(document.getElementById(this.id));
    // this.echartsIns.setOption(this.option);
    this.setOption(this.option);
    window.addEventListener(
      "resize",
      () => {
        setTimeout(() => {
          console.log("2019-04-19 11:52:20->大门日志记录:", this.echartsIns);
          this.echartsIns.resize();
        }, 300);
      },
      false
    );
  },
  watch: {
    data: {
      handler(nVal, oVal) {
        if (this.isDiff(nVal, oVal)) {
          this.echartsIns.dispose();
          this.echartsIns = echarts.init(document.getElementById(this.id));
          this.echartsIns.setOption();
        }
      },
      deep: true
    }
  },
  methods: {
    setOption(_option) {
      
      if (this.data) {
        let _data = Object.assign([], this.data);
        let legend = [];
        let series = [];
        let i = 0;
        _data.yData.forEach(item => {
          legend.push(item.name);
          var _serie = toolsBean.deepClone(baseSerie);
          // _serie.name = item.name;
          _serie.data = item.value;
          _serie.lineStyle.color.colorStops = colorStops[i];
          i++
          i = i > 1 ? 0 : i;
          series.push(_serie);
        });
        if (_data.config.legend) {
          _option.legend.show = true;
        }
        _option.legend.data = legend;
        _option.series = series;
        _option.xAxis.data = _data.xData;
        console.log(
          "2019-04-19 12:35:33->大门日志记录:",
          _option.series[0].type
        );
        this.echartsIns.setOption(_option);
      }
    },
    isDiff(nData, oData) {
      return JSON.stringify(nData) != JSON.stringify(oData);
    }
  },
  beforeDestroy() {
    this.echartsIns.clear();
    this.echartsIns.dispose();
    this.option = null;
    this.echartsIns = null;
  }
};
</script>

<style scoped>
.easy-line {
  font-size: 16px;
  width: 100%;
  height: auto;
}
</style>
