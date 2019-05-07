<template>
<div :id="id">
    <div :id="id" class="vant-collapse">
        <van-collapse v-model="activeName" accordion >
          <van-collapse-item v-for="(item,key) in data"
          :title="item.title" 
          :key="key" 
          :name="key"
          :disabled="item.subData.length===0?true:false"
          >
          <div slot="title">
            <div class="flex flex-row">
              <div class="flex flex-1 flex-align-center collapse-title-top" :class="isDefaultTitle?'collapse-title':isDefaultTitle">
                <div class="title-name-icon"></div>
                <div class="title-name-value">{{item.name}}</div>
              </div>
              <div v-for="(val,index) in item.data" :key="index" class="flex flex-1 flex-row col1-right-title">
                <div class="flex-1 collapse-title-data" :style="{color:col2LegendColor[index]}">{{val}}</div>
              </div>
            </div>
          </div>
          <div class="flex flex-1 flex-row flex-justify-center">
            <div class="flex-1"></div>
            <div class="flex flex-8 flex-column context-ul">
              <ul class="flex flex-1 context-li flex-justify-left flex-align-center" v-for="(val,index) in item.subData" 
                    :key="index" >
                <li class="flex flex-1 flex-row flex-align-center">
                    <div class="subtitle-name-icon" ></div>
                    <div class="flex-justify-left" style="margin-left: -10px">{{val.subTitle}}</div>
                </li>
                <li class="flex-11 collapse-context flex flex-justify-right flex-align-center" @click="openContext($event,val.subTitle)">
                  <div v-for="(val,index) in item.data" :key="index" class="flex" style="width:50px">
                    <div class="flex-1 collapse-title-data" :style="{color:col2LegendColor[index]}">{{val}}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="flex-1"></div>
          </div>
          </van-collapse-item>
        </van-collapse>
    </div>
</div>
</template>

<script>
import { Collapse, CollapseItem } from "vant";

import Tools from "../../tools/tools";
var tool = new Tools();

export default {
  name: "vant-collapse",
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    isDefaultTitle: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    col2LegendColor:{
      type: Array,
      default() {
        return ["#0f8ee9", "#02D3AB", "#FF6D00"];
      }
    }
  },
  data() {
    return {
      activeName: -1111,
      wholeContext: [],
      titleValue: `
        <div class="flex flex-row">
          <div class="flex-1">a</div>
          <div class="flex-1">b</div>
        </div>
      `,
      popShow: false,
      popContext: "",
      currentData: tool.deepClone(this.data),
    };
  },
  beforeCreate() {},
  mounted() {
    this.currentData.forEach(e => {
      if (e.name) {
        e.subData.forEach(q => {
          if (q.context) {
            let tmp = q.context;
            this.wholeContext[q.subTitle] = tmp;
            let context = q.context;
            let maxLen = 96;
            if (context.length > maxLen) {
              context = context.substring(0, maxLen) + "...";
            }
            q.context = context;
          }
        });
      }
    });
    // $(".title-name-icon").each((index, ele) => {
    //   // $(ele).css({ backgroundColor: this.getRandomColor() });
    //   $(ele).css({ backgroundColor: "rgb(96, 203, 193)" });
    // });
  },
  watch: {
    data(nVal){
      this.data = nVal;
      // console.log('orgNewList',nVal);
    }
  },
  methods: {
    getRandomColor() {
      let r, g, b;
      r = Math.floor(Math.random() * 256);
      g = Math.floor(Math.random() * 256);
      b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    openContext(event, index) {
      if (event.target.innerText.indexOf("...") > -1) {
        this.$parent.$parent.$parent.popShow = true;
        this.$parent.$parent.$parent.popContext = this.wholeContext[index];
      }
    }
  },
  destroyed() {
    this.wholeContext = null;
  }
};
</script>

<style scoped>
.vant-collapse {
  margin-top: 10px;
}

.vant-collapse .collapse-title {
  white-space: nowrap;
}

.vant-collapse .collapse-title-data {
  white-space: nowrap;
}

.vant-collapse .title-name-icon {
  border-radius: 50%;
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
  background-color: #d2eaf5 !important;
}


.vant-collapse .subtitle-name-icon {
  border-radius: 50%;
  width: 6px;
  height: 6px;
  min-width: 6px;
  min-height: 6px;
  background-color: rgb(96, 203, 193) !important;
}

.vant-collapse .collapse-title-top {
  margin-left: 10px;
}

.vant-collapse .title-name-value {
  margin-left: 4px;
  color: #666666;
}

.context-ul {
  max-width: 450px;
}

.context-li {
  min-height: 25px;
  white-space: nowrap;
  text-indent: 20px;
  /* border-bottom: 1px solid #E3E1E1; */
}

.col1-right-title{
  max-width: 60px;
  font-weight: bold;
}

.vant-collapse >>> .van-collapse-item__content{
  padding: 8px 10px 8px 10px !important;
}

.van-collapse-item__title--disabled .van-cell__right-icon {
  color: #fff;
}
</style>
