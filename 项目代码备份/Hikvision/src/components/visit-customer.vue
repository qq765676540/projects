<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="vist-customer flex flex-column">
        <div class="partner-distribution flex-1">
            <div class="sub-title flex-1">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">合作伙伴拜访分类数据占比</span>
            </div>
            <div class="content-box flex-10"></div>
        </div>
        <div class="industry-distribution flex-1">
            <div class="sub-title flex-1">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">各行业拜访最终用户数量占比</span>
            </div>
            <div class="content-box flex-11"></div>
        </div>
    </div>
  </van-pull-refresh>
</template>

<script>
import { PullRefresh } from "vant";
export default {
  name: "overview",
  components: {
    [PullRefresh.name]: PullRefresh
  },
  data() {
    return {
      isLoading: false
    };
  },
  mounted() {
    this.$parent.active = this.findKey(this.$parent.pageMap, this.$route.name);
  },
  methods: {
    findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value));
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
      }, 500);
    }
  }
};
</script>

<style scoped>
.vist-customer {
  width: 100%;
  height: calc(100% - 120px);
  overflow: hidden;
}

.vist-customer .partner-distribution {
  min-height: 320px;
  background-color: rgba(138, 214, 214, 0.616);
}

.vist-customer .industry-distribution {
  min-height: 320px;
  background-color: rgba(127, 255, 212, 0.555);
}
</style>
