<template>
  <div id="test">{{msg}}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {

    };
  },
  mounted() {
    console.log($('#test'));
    
  }
}
</script>

<style scoped>

</style>
