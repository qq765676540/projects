<template>
<div :id="id" class="vant-pie flex flex-1">
    <div class="flex flex-1 flex-align-center flex-justify-center">
        <van-circle
            v-model="currentRate"
            :rate="data.rate"
            :size="data.size"
            :speed="100"
            :text="text"
            :color="data.rate > 100 ? '#FF7D22' : '#0F8EE9'"
            :layer-color="'#E9EFF4'"
            :stroke-width="60"
            />
    </div>
</div>
</template>

<script>
import { Circle } from "vant";

export default {
  name: "vant-pie",
  components: {
    [Circle.name]: Circle
  },
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      type: Object,
      default() {
        return {
          rate: 30,
          size: "30px"
        };
      }
    },
    pdSize:{
      type: String,
      default:'30px'
    },
  },
  data() {
    return {
      active: 0,
      currentRate: 0
    };
  },
  beforeCreate() {},
  mounted() {
  },
  computed: {
    text() {
      // if (this.data.size) {
        let content = this.currentRate.toFixed(0);
        let fontSize = this.data.size.split("px")[0] / 2.7;
        let color = "#0F8EE9";
        if (this.data.rate * 1 > 100) {
          color = "#FF7D22";
        }
        if (content === "100" && this.data.rate * 1 > 100) {
          color = "#FF7D22";
          content = this.data.rate;
        }
        let span = `
            <span style="font-size: ${fontSize}px;">${content}</span>%
        `;
        $(`#${this.id} .van-circle__text`).css({ color: color });
        $(`#${this.id} .van-circle__text`).html(span);
        return content + "";
      // }
    }
  }
};
</script>

<style scoped>
.vant-pie >>> .van-circle__layer {
  transform-origin: 50% !important;
}

.vant-pie {
  font-size: 12px;
}
</style>
