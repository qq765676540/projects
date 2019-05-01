<template>
    <transition
        v-show="show"
        enter-active-class="animated faster fadeInUp"
        leave-active-class="animated faster fadeOutDown"
    >
        <div class="selector flex flex-column flex-1">
            <div class="selector-time flex flex-column flex-1">
                <span class="title flex-1">时间范围</span>
                <ul class="selections flex-3">
                    <li
                        v-for="(value, key) in timeItems"
                        :key="key"
                        class="time-item"
                        :class="{active: value}"
                        @click="selectTime(key)"
                    >{{key}}</li>
                </ul>
            </div>
            <div class="selector-org-tree flex flex-column flex-3">
                <span class="title flex-1">组织架构</span>
                <vue-tree
                    :tree-data="realTreeData"
                    v-model="ids"
                    :options="options"
                    class="org-tree flex-9"
                />
            </div>
            <div class="selector-btn">
                <!-- <div class="selector-btn-cancle inactive" @click="cancle">取消</div> -->
                <div class="selector-btn-confirm active" @click="confirm">确定</div>
            </div>
        </div>
    </transition>
</template>

<script>
import treeData from "../data/tree";

import Tools from "../../tools/tools";
var tool = new Tools();

export default {
  props: ["selectedTime", "selectedOrg", "show", "treeDataSet"],
  data() {
    return {
      time: "",
      timeItems: {
        本周: true,
        本月: false,
        本季: false,
        本年: false,
        上周: false,
        上月: false,
        上季: false,
        上年: false
      },
      ids: [],
      options: {
        idsWithParent: false,
        depthOpen: 1,
        openIcon: "fa fa-angle-right",
        closeIcon: "fa fa-angle-down"
      },
      treeData: treeData,
      //当前数据层级Level
      orgLevel: 1
    };
  },
  created() {
    this.time = this.selectedTime;
    this.ids = tool.deepClone(this.selectedOrg);
  },
  mounted() {
    this.tmpArr = [];
  },
  computed: {
    realTreeData() {
      if (this.$store.state.organization.length > 0) {
        var arr = tool.deepClone(this.$store.state.organization);
        // console.log(arr);
        let levelArr = this.$store.state.currentLevel;
        levelArr.forEach(v => {
          this.orgLevel = v[0].qNum;
        });
        let level1Arr = {},
          level2Arr = {},
          level3Arr = {},
          level4Arr = {},
          level5Arr = {};
        arr.forEach((p, i) => {
          var tmpStr = p[1].qText;
          if (p[0].qText !== "-") {
            if (!level1Arr[p[0].qText]) {
              level1Arr[p[0].qText] = new Set();
            }
            if (tmpStr !== "-") {
              level1Arr[p[0].qText].add(tmpStr);
            }
          }

          tmpStr = p[2].qText;
          if (p[1].qText !== "-") {
            if (!level2Arr[p[1].qText]) {
              level2Arr[p[1].qText] = new Set();
            }
            if (tmpStr !== "-") {
              level2Arr[p[1].qText].add(tmpStr);
            }
          }

          tmpStr = p[3].qText;
          if (p[2].qText !== "-") {
            if (!level3Arr[p[2].qText]) {
              level3Arr[p[2].qText] = new Set();
            }
            if (tmpStr !== "-") {
              level3Arr[p[2].qText].add(tmpStr);
            }
          }

          tmpStr = p[4].qText;
          if (p[3].qText !== "-") {
            if (!level4Arr[p[3].qText]) {
              level4Arr[p[3].qText] = new Set();
            }
            if (tmpStr !== "-") {
              level4Arr[p[3].qText].add(tmpStr);
            }
          }

          
        });
        // console.log(
        //   "2019-04-27 22:33:07->大门日志记录:",
        //   'level3Arr:',level3Arr,
        //   'level2Arr:',level2Arr,
        //   'level1Arr:',level1Arr
        // );

        let maxLevel = 4;

        var cTmp = {};
        pushTreeData(level4Arr, 4);
        pushTreeData(level3Arr, 3);
        pushTreeData(level2Arr, 2);
        pushTreeData(level1Arr, 1);
        function pushTreeData(_arr, level) {
          var tmp = {};
          for (var i in _arr) {
            let tSet = _arr[i];
            let tmp1 = [];
            for (var item of tSet.values()) {
              let tmp2 = {
                label: item,
                id: item + ":" + level
              };
              if (level * 1 < maxLevel) {
                tmp2.children = cTmp[item] ? cTmp[item].children || [] : [];
              }
              tmp1.push(tmp2);
            }
            tmp = {
              label: i,
              id: i + ":" + level,
              level: level
            };
            if (level * 1 < maxLevel) {
              tmp.children = tmp1;
            }

            if (!cTmp[i]) {
              cTmp[i] = {};
            }
            cTmp[i] = tmp;
          }
        }
        let result = [];
        for (var i in cTmp) {
          if (cTmp[i].level === this.orgLevel) {
            result.push(cTmp[i]);
          }
        }
        // console.log("2019-04-27 17:36:01->大门日志记录:", result);
        return result;
      }
      //默认数据
      return this.treeData;
    }
  },
  watch: {},
  methods: {
    selectTime(name) {
      for (var key in this.timeItems) {
        this.timeItems[key] = false;
      }
      this.timeItems[name] = true;
      this.time = name;
    },
    cancle() {
      this.$emit("cancle");
    },
    confirm() {
      // console.log("2019-04-27 17:15:29->大门日志记录:this.ids", this.ids);
      this.$emit("confirm", {
        time: this.time,
        org: this.ids
      });
    }
  }
};
</script>

<style>
@import url("../../assets/css/font-awesome.min.css");
@import url("../../assets/css/bootstrap.min.css");

.selector {
  background-color: white;
  height: calc(100% - 120px);
  width: 100%;
  position: absolute;
  top: 124px;
  left: 0;
  padding: 0 10px 0 10px;
  z-index: 100;
}

.selector .title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-indent: 10px;
  font-size: 14px;
  font-weight: bold;
}

.selector .selector-time {
  min-height: 110px;
  max-height: 110px;
}

.selector .time-item {
  border-radius: 20px;
  border: 0.025rem solid rgba(128, 128, 128, 0.5);
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 11px;
  float: left;
  width: 75px;
  line-height: 26px;
  height: 25px;
  font-size: 12px;
}

.selector .time-item.active {
  background-color: #039ce3;
  color: white;
  border: none;
}

.selector .selector-org-tree .title {
  min-height: 30px;
  max-height: 30px;
}

.selector .selector-org-tree {
  max-height: calc(100% - 165px);
  min-height: calc(100% - 165px);
  border-bottom: 1px solid rgba(139, 139, 143, 0.2);
  padding-bottom: 6px;
}

.selector .vue-tree-list {
  overflow-y: auto;
  text-align: left;
  padding-left: 10px;
}

.selector .selector-btn {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0;
  height: 30px;
  width: 100%;
  font-size: 14px;
}

.selector .selector-btn .selector-btn-cancle {
  position: absolute;
  bottom: 10px;
  height: 30px;
  line-height: 30px;
  width: 70px;
  left: calc(50% - 70px);
  border-radius: 20px 0 0 20px;
}

.selector .selector-btn .selector-btn-confirm {
  position: absolute;
  bottom: 10px;
  height: 30px;
  line-height: 30px;
  width: 70px;
  left: calc(50% - 35px);
  border-radius: 20px;
}

.selector .selector-btn-cancle.active,
.selector .selector-btn-confirm.active {
  background-color: #039ce3;
  color: white;
}

.selector .selector-btn-cancle.inactive,
.selector .selector-btn-confirm.inactive {
  border: 1px solid rgba(128, 128, 128, 0.521);
  color: black;
}

.vue-tree-list .item-checkbox,
.vue-tree-list .item-label {
  font-size: 14px !important;
  color: rgb(90, 92, 90);
}

.vue-tree-list .item-wrapper,
.vue-tree-list .item-wrapper > span {
  display: flex;
  align-items: center;
}

.vue-tree-list .fa-square-o:before,
.vue-tree-list .fa-check-square-o:before,
.vue-tree-list .fa-minus-square-o:before {
  font-size: 18px;
}

.vue-tree-list .fa-angle-right:before {
  font-size: 26px;
  color: #949191;
}

.vue-tree-list .fa-angle-down:before {
  font-size: 26px;
  color: #949191;
}

.vue-tree-list .fa-square-o:before,
.vue-tree-list .fa-check-square-o:before,
.vue-tree-list .fa-minus-square-o:before {
  color: #949191;
  font-size: 20px;
}

.vue-tree-list .fa-check-square-o:before {
  color: #03a9f4;
}

.vue-tree-list .item-label {
  text-indent: 5px;
}

.vue-tree-list .item-label.item-bold {
  font-weight: 500;
  color: black;
}
</style>
