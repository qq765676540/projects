<template>
    <div></div>
</template>

<script>
// refresh.vue  用于刷新当前路由的空白页面
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.replace(from.path)
    })
  }
}
</script>