<template>
  <div class="vue-table flex flex-column flex-1">
    <table class="costTable">
      <tr class="costTr">
        <th v-for="(item, key) in headData" :key="key" :style="item.style">{{item.name}}</th>
      </tr>
      <tr v-for="(item, indexOuter) in bodyData" :key="indexOuter" class="costTr">
        <td v-for="(cell, index) in item" :key="index" :style="headData[index].rowStyle">{{cell}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "vue-table",
  props: {
    headData: {
      type: Array,
      default() {
        return {};
      }
    },
    bodyData: {
      type: Array,
      default: function() {
        return ["暂无数据"];
      }
    },
    height: {
      type: String,
      default: "3rem"
    }
  },
  mounted() {
    this.objDiv = document.getElementById("tbody");
    this.setCSS();
  },
  updated() {
    this.setCSS();
  },
  methods: {
    setCSS() {
      $(".vue-table .tbody .cell").css({
        color: "#5D5D5D",
        fontSize: "0.28rem",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
      });

      $(".vue-table .tbody").css({
        lineHeight: "0.4rem"
      });
    },
    isDiff(nData, oData) {
      return JSON.stringify(nData) != JSON.stringify(oData);
    }
  },
  watch: {
    bodyData: {
      handler: function(nData, oData) {
        var IsTrue = this.isDiff(nData, oData);
        if (IsTrue) {
          this.setCSS();
        }
      },
      deep: true,
      immediate: true
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.objDiv = null;
  }
};
</script>

<style scoped>
.costTable {
  min-height: 40px;
  min-width: 100%;
}
.costTr {
  border: 1px solid #aaaaaa;
}
.costTr > th {
  border-left: 1px solid #aaaaaa;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}
.costTr > th:first {
  border-left: 0;
}
.costTr > td {
  border-left: 1px solid #aaaaaa;
  line-height: 28px;
  font-size: 14px;
  text-align: center;
}
.costTr > td:first {
  border-left: 0;
}
</style>
