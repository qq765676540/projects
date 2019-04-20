<template>
<div class="vist-warning flex flex-column">
    <div class="customer-distribution flex-1">
        <div class="sub-title flex-1">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">客用户拜访覆盖</span>
        </div>
        <div class="content-box flex-10"></div>
    </div>
    <div class="covered-customer-detail flex-1">
        <div class="sub-title flex-1">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">拜访未覆盖客户名单</span>
        </div>
        <div class="content-box flex-11">
            <my-table id="table1"></my-table>
        </div>
    </div>
    <div class="uncovered-customer-detail flex-1">
        <div class="sub-title flex-1">
            <div class="sub-title-icon"></div>
            <span class="sub-title-name">拜访未覆盖客户名单</span>
        </div>
        <div class="content-box flex-11"></div>
    </div>
</div>
</template>

<script>
import table from './sub-components/table'
export default {
    name: 'visit-warning',
    components: {
        MyTable: table
    }
}
</script>

<style scoped>
.vist-warning {
    width: 100%;
    height: calc(100% - 120px);
    overflow: hidden;
}

.vist-warning .customer-distribution {
    background-color: rgba(138, 214, 214, 0.616);
}

.vist-warning .covered-customer-detail {
    background-color: #fff;
}

.vist-warning .uncovered-customer-detail {
    background-color: rgba(138, 214, 214, 0.589);
}

</style>
