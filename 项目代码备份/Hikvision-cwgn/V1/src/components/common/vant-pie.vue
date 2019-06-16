<template>
<div :id="id" class="vant-pie flex flex-1">
    <div class="flex flex-1 flex-align-center flex-justify-center">
        <van-circle
            v-model="currentRate"
            :rate="data.rate"
            :size="data.size"
            :speed="100"
            :text="data.rate+'%'"
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
    $(`#${this.id} .van-circle__text`).css({ 'font-size': '14px' });
  },
  computed: {
  }
};
</script>

<style scoped>

.vant-pie {
  font-size: 12px;
}

</style>
