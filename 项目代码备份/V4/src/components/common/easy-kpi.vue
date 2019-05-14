<template>
<div :id="id" class="easy-kpi flex flex-1">
    <div class="flex flex-1 flex-align-center">
        <div class="flex" :style="{'color':'black','font-size':data.size}">{{kpiValue}}</div>
    </div>
</div>
</template>

<script>
import accounting from 'accounting'

export default {
  name: "easy-kpi",
  components: {
  },
  props: {
    id: {
      type: String,
      default: Math.random().toFixed(8)
    },
    data: {
      default: 10000
    },
    kpiStyle: {
      type: Object,
      default() {
        return {
          color: "#333333",
          size: "60px"
        };
      }
    }
  },
  data() {
    return {
    };
  },
  beforeCreate() {},
  mounted() {
  },
  computed: {
    kpiValue(){
      return accounting.formatNumber(this.data);
    }
  },
};
</script>

<style scoped>
.easy-kpi{
  font-size: 16px;
}
</style>
