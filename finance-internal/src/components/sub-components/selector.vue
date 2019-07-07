<template>
  <div v-show="show">
    <div class="selector flex flex-column flex-1">
      <div class="selector-time flex flex-column flex-1">
        <span class="title flex-1">时间区间</span>
        <ul class="selections flex-3">
          <li class="time-item" :class="{active: timeItems['本月']}" @click="selectTime('本月')">本月</li>
          <li class="time-item" :class="{active: timeItems['本季']}" @click="selectTime('本季')">本季</li>
          <li class="time-item" :class="{active: timeItems['本年']}" @click="selectTime('本年')">本年</li>
          <li class="time-item" :class="{active: timeItems['上月']}" @click="selectTime('上月')">上月</li>
          <li class="time-item" :class="{active: timeItems['其他']}" @click="selectTime('其他')">其他</li>
        </ul>
      </div>
      <div class="selector-org-tree flex flex-column flex-3" v-show="treeData">
        <span class="title flex-1">业务中心</span>
        <div class="cityCon">
          <span
            class="city"
            :class="item == ids?'selected':''"
            v-for="(item, index) in treeData"
            :key="index"
            @click="ids = item"
          >{{item}}</span>
        </div>
      </div>
      <div class="selector-btn flex flex-1">
        <div class="selector-btn-cancle inactive" @click="cancle">取消</div>
        <div class="selector-btn-confirm active" @click="confirm">确定</div>
      </div>
    </div>
    <div class="actionsheet absolute" v-show="asShow" @click.stop="asShow=false">
      <!-- :actions="selctions" -->
      <time-bucket v-model="asShow" :overlay="false" cancel-text="取消" @getTime="getTime"></time-bucket>
    </div>
  </div>
</template>

<script>
import Tools from "../../tools/tools";
import TimeBucket from "./time-bucket";
var tool = new Tools();

export default {
  props: ["selectedTime", "selectedOrg", "show", "orgData"],
  components: {
    TimeBucket
  },
  computed: {
    // selctions() {
    //   return this[this.curFilter];
    // }
  },
  data() {
    return {
      asShow: false,
      time: {
        name: "本月",
        year: 2019,
        startMonth: 1,
        endMonth: 2
      },
      timeItems: {
        本月: true,
        本季: false,
        本年: false,
        上月: false,
        其他: false
      },
      ids: "浙江"
    };
  },
  computed: {
    treeData() {
      var Arr = [];
      if (!this.orgData) {
        return Arr;
      }
      this.orgData.forEach(i => {
        Arr.push(i[0].qText);
      });
      return Arr;
    }
  },
  created() {
    this.time.year = this.selectedTime.year;
    this.time.startMonth = this.selectedTime.startMonth;
    this.time.endMonth = this.selectedTime.endMonth;
  },
  watch: {},
  methods: {
    getTime(data) {
      this.time.year = data.year;
      this.time.startMonth = data.startMonth;
      this.time.endMonth = data.endMonth;
    },
    selectTime(name) {
      for (var key in this.timeItems) {
        this.timeItems[key] = false;
      }
      this.timeItems[name] = true;
      if (name == "其他") {
        this.asShow = true;
      }
      this.time.name = name;
    },
    cancle() {
      this.$emit("cancle");
    },
    confirm() {
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

.actionsheet {
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.selector {
  background-color: white;
  height: calc(100% - 80px);
  width: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  padding: 10px 10px 0 10px;
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
  border: 1px solid grey;
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
  max-width: 100%;
  min-width: 100%;
  max-height: 310px;
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
    bottom: 60px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    left: calc(50% - 70px);
    border-radius: 0px;
}

.selector .selector-btn .selector-btn-confirm {
  position: absolute;
  bottom: 60px;
  height: 30px;
  line-height: 30px;
  width: 70px;
  left: 50%;
  border-radius: 0px;
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

.cityCon {
  text-align: left;
}

.city {
  border-radius: 20px;
  border: 1px solid grey;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 11px;
  text-align: center;
  float: left;
  padding: 0 20px;
  line-height: 26px;
  height: 25px;
  font-size: 12px;
}

.selected {
  background-color: #039ce3;
  color: white;
  border: 1px solid #039ce3;
}
</style>
