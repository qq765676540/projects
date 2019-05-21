<template>
<div :id="id+'-box'" class="flex echarts-pie flex-1 relative">
  <div class="flex flex-1 flex-column relative">
    <div v-if="title" class="flex-1 pie-title ">{{title}}</div>
    <div :id="id" class="flex-1">
    </div>
    <div class="echarts-bg-icon flex-1 absolute"
      :style="{'background-image':'url('+pieConfig.imgUrl+')','background-size':pieConfig.size}"
    ></div>
  </div>
</div>
</template>

<script>
import echarts from "echarts";
import { pieOption, baseSerie } from "../echarts-option/echarts-pie-option.js";
import Tools from "../../tools/tools";
var toolsBean = new Tools();

export default {
  name: "echarts-pie",
  components: {},
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default() {
        return "";
      }
    },
    colorList: {
      type: Array,
      default() {
        return [
          "#448DFF",
          "#59D4FF",
          "#751DE2",
          "#BB2B79",
          "#DB479B",
          "#F8B9D9",
          "#D391B8",
          "#C2A0F7",
          "#AEEFFE",
          "#A7D0FF"
        ];
      }
    },
    pieConfig: {
      type: Object,
      default() {
        return {
          imgUrl: "",
          size: "",
          radius: ["50%", "70%"]
        };
      }
    }
  },
  data() {
    return {
      option: toolsBean.deepClone(pieOption),
      pConfig: this.pieConfig
    };
  },
  beforeCreate() {},
  mounted() {
    this.echartsIns = echarts.init(document.getElementById(this.id));
    this.setOption(this.option);
    window.addEventListener("resize", this.resizeEcharts, false);
  },
  watch: {
    data: {
      handler(nVal, oVal) {
        if (this.isDiff(nVal, oVal)) {
          this.echartsIns.dispose();
          this.echartsIns = echarts.init(document.getElementById(this.id));
          this.setOption(this.option);
        }
      },
      deep: true
    }
  },
  methods: {
    setOption(_option) {
      let _this = this;
      if (_option && this.data) {
        let _data = toolsBean.deepClone(this.data);
        let series = [];
        var _serie = toolsBean.deepClone(baseSerie);
        _serie.radius = _this.pConfig.radius;
        if (!_this.pConfig.labelShow) {
          _serie.labelLine.show = false;
          _serie.label.normal.show = false;
        }
        _serie.data = _data;
        series.push(_serie);
        _option.series = series;
        this.echartsIns.setOption(_option);
      }
    },
    isDiff(nData, oData) {
      return JSON.stringify(nData) != JSON.stringify(oData);
    },
    resizeEcharts() {
      setTimeout(() => {
        if (this.echartsIns) {
          this.echartsIns.resize();
        }
      }, 333);
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
.echarts-pie {
  font-size: 12px;
}

.echarts-pie .pie-title {
  margin-top: 10px;
  font-size: 14px;
  max-height: 20px;
}

.echarts-pie .echarts-bg-icon {
  width: 100%;
  height: 100%;
  top: 10px;
  background-repeat: no-repeat;
  /* background-size: 20%; */
  background-position: center;
}
</style>
