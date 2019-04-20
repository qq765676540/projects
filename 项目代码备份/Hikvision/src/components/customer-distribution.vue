<template>
<div class="vist-distribution flex flex-column">
    <div class="task-distribution flex-1">
        <div class="sub-title flex-1">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">拜访任务类型占比</span>
        </div>
        <div class="content-box flex-10"></div>
    </div>
</div>
</template>

<script>

export default {
    name: 'overview',
}
</script>

<style scoped>
.vist-distribution {
    width: 100%;
    height: 100vw;
    overflow: hidden;
}

.vist-distribution .task-distribution {
    background-color: rgba(138, 214, 214, 0.616);
}

</style>
