<template>
<div>
    <div :id="id" class="echarts-barMarkLine"></div>
    <div class="goback">
        <div class="backbtn" v-if="goback!='none'" @click="gobackBtn">{{goback+' '}}</div>
    </div>
</div>
</template>

<script>
import echarts from "echarts";
import barMarkLineGetOption from "../echarts-option/bar-markLine-option.js";

import Tools from "../../tools/tools";
var toolsBean = new Tools();

export default {
    name: "echarts-bar",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        name: '',
        data: {
            type: Object,
            default () {
                return {};
            }
        },
        drilldown: {
            type: Object,
            default () {
                return {};
            }
        }
    },
    data() {
        return {
            option: toolsBean.deepClone(barMarkLineGetOption(this.name, this.data)),
            goback: 'none'
        };
    },
    beforeCreate() {},
    mounted() {
        var _self = this;
        this.$nextTick(() => {
            this.echartsIns = echarts.init(document.getElementById(this.id));
            this.setOption(this.option);
            this.echartsIns.on('click', 'xAxis.category', function (params) {
                _self.$emit("getDrillVal",params.value);
                if (_self.drilldown[params.value] != undefined) {
                    _self.echartsIns.clear();
                    _self.setOption(barMarkLineGetOption(_self.name + '-drill', _self.drilldown[params.value]));
                    _self.goback = params.value;
                }
            });
        });

        window.addEventListener("resize", this.resizeEcharts, false);
    },
    watch: {
        data: {
            handler(nVal, oVal) {
                if (this.isDiff(nVal, oVal)) {
                    this.option = toolsBean.deepClone(barMarkLineGetOption(this.name, nVal));
                    this.echartsIns.dispose();
                    this.echartsIns = echarts.init(document.getElementById(this.id));
                    this.setOption(this.option);
                }
            },
            deep: true
        }
    },
    methods: {
        gobackBtn(){
          this.setOption(this.option);
          this.echartsIns.resize();
          this.goback = 'none';
          this.$emit("getDrillVal",'none');
        },
        setOption(_option) {
            this.echartsIns.setOption(_option);
        },
        isDiff(nData, oData) {
            return JSON.stringify(nData) != JSON.stringify(oData);
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
.echarts-barMarkLine {
    width: 98%;
    min-height: 320px;
    margin-left: 10px;
}

.goback {
  position: relative;
  top: -318px;
}

.goback .backbtn {
  border-radius: 12px;
  border: 0.025rem solid rgba(128, 128, 128, 0.5);
  color: white;
  background-color: #039ce3;
  width: 100px;
  margin-left: 10px;
  line-height: 25px;
  height: 25px;
  font-size: 12px;
}
</style>
