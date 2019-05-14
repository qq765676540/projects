<template>
<div class="warning flex flex-column">
    <div class="row row-1 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">中标未签商机预警</span>
        </div>
        <div class="sub-content flex-1">
            <vue-table :bodyData="vueTableData" height="2.5rem"></vue-table>
        </div>
    </div>
    <div class="row row-2 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">锁定用户商机覆盖情况</span>
        </div>
        <div class="sub-content flex flex-column flex-1">
            <div class="sub-content_1 flex flex-column flex-1">
                <span class="name text-left">负责区域</span>
                <process-table :rows="processTableData" height="110px"></process-table>
            </div>
            <div class="sub-content_2 flex flex-column flex-1">
                <span class="name text-left">负责行业</span>
                <process-table :rows="processTableData" height="110px"></process-table>
            </div>
        </div>
    </div>
    <div class="row row-3 flex flex-column">
        <div class="sub-title">
            <div class="sub-title-icon plan-icon"></div>
            <span class="sub-title-name">商机下单出库情况</span>
        </div>
        <div class="sub-content flex-1">
            <vue-table :bodyData="vueTableData" height="3rem"></vue-table>
        </div>
    </div>
</div>
</template>

<script>
// import Cube from '../tools/cube'
import vueTable from './common/vue-table'
import vueTableData from './data/vue-table-data'

import processTable from './common/process-table'
import processTableData from './data/process-table-data'

export default {
    components: {
        vueTable,
        processTable
    },
    data() {
        return {
            vueTableData,
            processTableData
        }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped>
.warning {
    width: 100%;
    overflow-y: scroll !important;
}

.sub-title {
    width: 100%;
    margin-bottom: 8px;
}

.row-1 {
    min-height: 165px;
    max-height: 165px;
    margin-bottom: 5px;
}

.row-2 {
    min-height: 370px;
    max-height: 370px;
}

.row-3 {
    min-height: 165px;
    max-height: 165px;
}

.row-3 .sub-content {
    margin-bottom: 10px;
}

.sub-content_1 .name,
.sub-content_2 .name {
    text-indent: 16px;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    padding-bottom: 8px;
}

.color {
    background-color: rgba(137, 43, 226, 0.2);
}
</style>
