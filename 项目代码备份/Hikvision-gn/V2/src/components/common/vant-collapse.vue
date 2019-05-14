<template>
<div :id="id">
    <div :id="id" class="vant-collapse">
        <van-collapse v-model="activeName" accordion >
          <van-collapse-item v-for="(item,key) in currentData" 
          :title="item.title" 
          :key="key" 
          :name="key"
          >
          <div slot="title">
            <div class="flex flex-row">
              <div class="flex flex-1 flex-align-center collapse-title-top" :class="isDefaultTitle?'collapse-title':isDefaultTitle">
                <div class="title-name-icon"></div>
                <div class="title-name-value">{{item.name}}</div>
              </div>
              <div class="flex-1">{{item.type}}</div>
              <div class="flex-1 collapse-title-data">{{item.data}}</div>
            </div>
          </div>
            <div class="flex flex-1 flex-column flex-justify-center flex-align-center">
              <ul class="flex flex-1 context-li" v-for="(val,index) in item.subData" 
                    :key="index">
                <li class="flex flex-1 flex-justify-left">
                  {{val.name}}
                </li>
                <li class="collapse-context flex" @click="openContext($event,val.subTitle)">
                  <div class="flex flex-1">
                  {{val.context}}
                  </div>
                </li>
              </ul>
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
    [CollapseItem.name]: CollapseItem,
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
      currentData: tool.deepClone(this.data)
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
    $(".title-name-icon").each((index, ele) => {
      // $(ele).css({ backgroundColor: this.getRandomColor() });
      $(ele).css({ backgroundColor: 'rgb(96, 203, 193)' });
      
    });
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
  width: 12px;
  height: 12px;
  min-width: 12px;
  min-height: 12px;
}

.vant-collapse .collapse-title-top {
  margin-left: 10px;
}

.vant-collapse .title-name-value {
  margin-left: 4px;
}

.collapse-context {
  margin: 0 10px 10px 10px;
}

.context-li{
    text-indent: 20px;
    justify-content: space-between;
}
</style>
