<template>
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
</template>

<script>

export default {
    name: 'overview',
}
</script>

<style scoped>
.plan-execution {
    width: 100%;
    height: calc(100% - 80px);
    overflow: hidden;
}

.plan-execution .plan-execution-rate {
    background-color: rgba(138, 214, 214, 0.616);
}

.plan-execution .curr-week-unexecution {
    background-color: rgba(127, 255, 212, 0.555);
}

.plan-execution .last-week-unexecution {
    background-color: rgba(138, 214, 214, 0.589);
}

</style>
