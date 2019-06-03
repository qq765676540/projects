<template>
  <div class="constitute">
    <div class="flex time_button">
      <div class="flex-1">取消</div>
      <div class="flex-3">&nbsp;</div>
      <div class="flex-1" @click="setData">确定</div>
    </div>
    <div class="flex">
      <div class="flex-1">
        <van-picker :columns="year" @change="onChangeYear" :default-index="2"/>
      </div>
      <div class="flex-1 center">
        <div>年&nbsp;</div>
      </div>
      <div class="flex-1">
        <van-picker :columns="month1" @change="onChangeStartMonth"/>
      </div>
      <div class="flex-1 center">
        <div>月至</div>
      </div>
      <div class="flex-1">
        <van-picker :columns="month2" @change="onChangeEndMonth"/>
      </div>
      <div class="flex-1 center">
        <div>月</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Picker } from "vant";
export default {
  components: {
    [Picker.name]: Picker
  },
  data() {
    return {
      startYear: new Date().getFullYear()-2,
      endYear: new Date().getFullYear(),
      year: [],
      data: {
        year: 2019,
        startMonth: 1,
        endMonth: 2
      },
      month1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      month2: [1]
    };
  },
  watch: {
    "data.startMonth": function() {
      this.month2 = [];
      for (var i = this.data.startMonth; i <= 12; i++) {
        this.month2.push(i);
      }
      this.data.endMonth = this.data.startMonth;
    }
  },
  methods: {
    setData() {
      this.$emit("getTime", this.data);
    },
    onChangeYear(picker, value, index) {
      this.data.year = value;
    },
    onChangeStartMonth(picker, value, index) {
      this.data.startMonth = value;
    },
    onChangeEndMonth(picker, value, index) {
      this.data.endMonth = value;
    }
  },
  created() {
    for (let i = this.startYear; i <= this.endYear; i++) {
      this.year.push(i);
    }
  }
};
</script>

<style scoped>
.constitute {
  width: 100%;
  height: 40%;
  font-size: 18px;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  overflow-y: scroll;
}
.time_button > div {
  text-align: center;
  align-content: center;
  color: #1d71f0;
  line-height: 50px;
  height: 50px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: Center;
}
</style>
