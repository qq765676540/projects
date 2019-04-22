<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="plan-execution flex flex-column">
            <div class="plan-execution-rate flex-1">
                <div class="sub-title flex-1">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">近五周计划执行率</span>
                </div>
                <span class="sub-title-unit flex-1">单位（%）</span>
                <div class="content-box flex-10"></div>
            </div>
            <div class="curr-week-unexecution flex-1">
                <div class="sub-title flex-1">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">本周未执行计划</span>
                </div>
                <div class="content-box flex-11"></div>
            </div>
            <div class="last-week-unexecution flex-1">
                <div class="sub-title flex-1">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">上周未执行计划</span>
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
  methods: {
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

.van-pull-refresh {
overflow-y: scroll !important;
}

.plan-execution {
  width: 100%;
  height: calc(100% - 80px);
}

.plan-execution .plan-execution-rate {
  background-color: rgba(138, 214, 214, 0.616);
  min-height: 320px;
}

.plan-execution .curr-week-unexecution {
  background-color: rgba(127, 255, 212, 0.555);
  min-height: 320px;
}

.plan-execution .last-week-unexecution {
  background-color: rgba(138, 214, 214, 0.589);
  min-height: 320px;
}
</style>
