<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="summary">
            <div class="sales-plan border-bottom flex flex-column">
                <div class="sub-title flex">
                    <div class="pub-icon sales-icon"></div>
                    <span class="sub-title-name">销售日志</span>
                    <span class="sub-title-unit">单位(人)</span>
                </div>
                <div class="content-box flex flex-10 flex-column">
                    <div class="flex flex-3 col-2-pie">
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-1'" :data="pieData[0]"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-2'" :data="pieData[1]"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-3'" :data="pieData[2]"></vant-pie>
                        </div>
                        <div class="flex flex-1 flex-row col-2-pie-param flex-align-center">
                            <vant-pie :id="'pie-4'" :data="pieData[3]"></vant-pie>
                        </div>
                    </div>
                    <div class="flex flex-1 flex-row">
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button class="col-2-button" :class="btActive[0]" @click="changeActiveBt(0)">计划填写率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button class="col-2-button" :class="btActive[1]"  @click="changeActiveBt(1)">工作记录填写率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button class="col-2-button" :class="btActive[2]"  @click="changeActiveBt(2)">计划执行率</button>
                        </div>
                        <div class="flex flex-1 flex-justify-center flex-align-center">
                            <button class="col-2-button" :class="btActive[3]" @click="changeActiveBt(3)">有效拜访率</button>
                        </div>
                    </div>
                    <div class="flex flex-2 flex-column col-2-kpi flex-justify-center">
                        <div class="flex flex-1 flex-row flex-justify-center">
                            <div class="flex flex-1 col-2-kpi-row flex-justify-center flex-align-center">
                                <div class="flex flex-1 flex-row col-2-kpi-icon" :style="{'color':kpiData[0].color}">●</div>
                                <div class="flex flex-3 flex-row">销售总人数</div>
                                <div class="flex flex-3 flex-row">
                                    <easy-kpi :data="kpiData[0]"></easy-kpi>
                                </div>
                            </div>
                            <div class="flex flex-1 col-2-kpi-row flex-justify-center flex-align-center">
                                <div class="flex flex-1 flex-row col-2-kpi-icon" :style="{'color':kpiData[1].color}">●</div>
                                <div class="flex flex-3 flex-row">计划填写数</div>
                                <div class="flex flex-3 flex-row">
                                    <easy-kpi :data="kpiData[1]"></easy-kpi>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-1 flex-row flex-justify-center">
                            <div class="flex flex-1 col-2-kpi-row flex-justify-center flex-align-center">
                            <div class="flex flex-1 flex-row col-2-kpi-icon" :style="{'color':kpiData[2].color}">●</div>
                            <div class="flex flex-3 flex-row">计划条目数</div>
                            <div class="flex flex-3 flex-row">
                                <easy-kpi :data="kpiData[2]"></easy-kpi>
                            </div>
                            </div>
                            <div class="flex flex-1 col-2-kpi-row flex-justify-center flex-align-center">
                            <div class="flex flex-1 flex-row col-2-kpi-icon" :style="{'color':kpiData[3].color}">●</div>
                            <div class="flex flex-3 flex-row">预留样式</div>
                            <div class="flex flex-3 flex-row">
                                <easy-kpi :data="kpiData[3]"></easy-kpi>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="org-structure border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="pub-icon org-structure-icon"></div>
                    <span class="sub-title-name">组织架构</span>
                </div>
                <div class="content-box">
                    <vant-collapse :id="'collapse-1'" :data="collapseData" :isDefaultTitle="true"></vant-collapse>
                </div>
            </div>
            <div class="vist-num-trend border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="pub-icon vist-num-trend-icon"></div>
                    <span class="sub-title-name">工作拜访周趋势折线图</span>
                </div>
                <easy-line :id="'line-1'" :data="eLineData1"></easy-line>
            </div>
            <div class="vist-customer-trend border-bottom flex flex-column">
                <div class="sub-title">
                    <div class="pub-icon vist-customer-trend-icon"></div>
                    <span class="sub-title-name">工作拜访客户数周趋势</span>
                </div>
                <easy-line :id="'line-2'" :data="eLineData2"></easy-line>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import { Button, PullRefresh } from "vant";
import vantPie from "./common/vant-pie";
import vantCollapse from "./common/vant-collapse";
import easyKpi from "./common/easy-kpi";
import easyLine from "./common/easy-echarts-line";
import {eLineData1,eLineData2} from "./data/echarts-line-data";

export default {
  name: "overview",
  components: {
    vantPie,
    easyKpi,
    easyLine,
    vantCollapse,
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      active: 0,
      list: [],
      eLineData1,
      eLineData2,
      pieData: [
        {
          size: "60px",
          rate: 30
        },
        {
          size: "60px",
          rate: 30
        },
        {
          size: "60px",
          rate: 30
        },
        {
          size: "60px",
          rate: 30
        }
      ],
      btActive: ["active", "", "", ""],
      kpiData: [
        {
          color: "#60cbc1",
          size: ".45rem",
          value: "93200"
        },
        {
          color: "#C28CC3",
          size: ".45rem",
          value: "83200"
        },
        {
          color: "#0F8EE9",
          size: ".45rem",
          value: "123100"
        },
        {
          color: "#F46950",
          size: ".45rem",
          value: "831200"
        }
      ],
      isLoading:false,
      collapseData:[{
          name:'一级组织架构',
          data:"指标1 指标2 指标3",
          subData:[{
            subTitle:"二级组织架构",
            context:"指标1 指标2 "
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 "
          },{
            subTitle:"二级组织架构",
            context:"指标1      指标2      "
          },{
            subTitle:"二级组织架构",
            context:"指标1      指标2      "
          },{
            subTitle:"二级组织架构",
            context:"指标1      指标2      "
          },{
            subTitle:"二级组织架构",
            context:"指标1      指标2      "
          }]
        },{
          name:'二级组织架构',
          data:"指标1 指标2 ",
          subData:[{
            subTitle:"二级组织架构",
            context:"指标1 指标2 "
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 "
          },{
            subTitle:"二级组织架构",
            context:"指标1 指标2 "
          }]
        },{
          name:'三级组织架构',
          data:"指标1 指标2 ",
          subData:[{
            subTitle:"二级组织架构"
          }]
        }]
    };
  },
  beforeCreate() {
  },
  mounted() {
    this.calcWidth();
    window.addEventListener("resize",this.calcWidth,false);
    this.$parent.active = this.findKey(this.$parent.pageMap,this.$route.name);
  },
  methods: {
    calcWidth() {
      let pop = $(".col-2-pie-param").height();
      let avg = (window.innerWidth - 30) / 4 - 10;
      if (pop < avg) {
        avg = pop;
      }
      avg += "px";
      this.pieData[0].size = avg;
      this.pieData[0].rate = 20;
      this.pieData[1].size = avg;
      this.pieData[1].rate = 50;
      this.pieData[2].size = avg;
      this.pieData[2].rate = 190;
      this.pieData[3].size = avg;
      this.pieData[3].rate = 40;
    },
    changeActiveBt(index) {
      $.each(this.btActive, (i, v) => {
        this.$set(this.btActive, i, "");
      });
      if (this.btActive[index] === "") {
        this.$set(this.btActive, index, "active");
        this.kpiData.forEach(e => {
          e.value = (Math.random() * 1000000).toFixed(0);
        });
      }
    },
    findKey(obj, value, compare = (a, b) => a === b) {
        return Object.keys(obj).find(k => compare(obj[k], value))
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.$router.replace({
          path: "/refresh",
          query: {
            t: Date.now()
          }
        });
      }, 300);
    }
  },
  beforeDestroy() {
    // window.removeEventListener("resize",this.calcWidth,false);
  }
};
</script>

<style scoped>
.summary {
  width: 100%;
  /* height: calc(100% - 125px); */
  overflow-y: scroll !important;
}

.summary .sales-plan {
  min-height: 320px;
  /* max-height: 1500px; */
}


.summary .org-structure {
  min-height: 270px;
}

.summary .vist-num-trend {
  min-height: 320px;
}

.summary .vist-customer-trend {
  min-height: 320px;
}

.summary .sub-title-unit {
  font-family: PingFangSC-Light;
  color: #8e9091;
  font-size: 12px;
  letter-spacing: 1px;
}

.summary .col-2-pie-param {
  width: 100%;
  height: auto;
}

.summary .col-2-button {
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #9b9b9b;
  background-color: #ffffff;
  text-align: center;
  line-height: 22px;
  border-radius: 15px;
  white-space: nowrap;
  max-width: 1160px;
}
.summary .active {
  background-color: #0f8ee9;
  border-radius: 15px;
  color: #ffffff;
}

.summary .col-2-kpi {
  font-size: 13px;
}

.summary .col-2-kpi-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  font-size: 20px;
  line-height: 16px;
  text-align: center;
  color: #60cbc1;
  text-decoration: none;
}

.summary .col-2-kpi-row {
  min-width: 150px;
  max-width: 260px;
}

.summary .sales-icon {
  background-image: url("../assets/image/sales-log.png");
}

.summary .org-structure-icon {
  background-image: url("../assets/image/org-structure.png");
}

.summary .vist-num-trend-icon {
  background-image: url("../assets/image/vist-num-trend.png");
}

.summary .vist-customer-trend-icon {
  background-image: url("../assets/image/vist-num-trend.png");
}

.summary .col-3 {
  height: auto;
}

</style>
