<template>
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
</template>

<script>

export default {
    name: 'overview',
}
</script>

<style scoped>
.vist-customer {
    width: 100%;
    height: calc(100% - 120px);
    overflow: hidden;
}

.vist-customer .partner-distribution {
    background-color: rgba(138, 214, 214, 0.616);
}

.vist-customer .industry-distribution {
    background-color: rgba(127, 255, 212, 0.555);
}

</style>
