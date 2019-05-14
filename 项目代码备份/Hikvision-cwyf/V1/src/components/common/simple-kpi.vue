<template>
    <div class="sample-kpi flex flex-column flex-1">
        <font class="value">{{value}}</font>
        <font class="name">{{name}}</font>
    </div>
</template>

<script>
export default {
    props: {
       value: {
           type: String,
           default: 'N/A'
       },
       name: {
           type: String,
           default: '指标名称'
       },
    }
}
</script>

<style scoped>
.sample-kpi font {
    height: 22px;
    line-height: 22px;
}

.sample-kpi font.value {
    font-size: 20px;
}

.sample-kpi font.name {
    font-size: 12px;
}
</style>