<template>
<div :id="id">
    <table class="display" style="width:100%" :id="id+'_table'">
        <thead v-show="isShowTitle" class="table-title-row">
            <tr>
                <th v-for="(v,i) in title" :key="i" class="text-left">{{v}}</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="i in data.length" :key="i">
                <td v-for="(item,index) in (data[i-1].value?data[i-1].value:data[i-1])" :key="index" :style="{'text-align':index>2?'center':'left'}">
                    <div v-if="index < 1" class="flex flex-align-center">
                        <div v-if="data[i-1].color">
                            <div class="title-name-icon" :style="{'background':data[i-1].color}"></div>
                        </div>
                        <div style="white-space: nowrap; text-align: left; padding-top:2px">
                            {{item}}
                        </div>
                    </div>
                    <div v-if="index > 0">
                        {{item}}
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
require('datatables.net-dt');
require('datatables.net-fixedheader-dt');

export default {
    props: {
        id: {
            type: String,
            default: function () {
                return $.getRandomString(7);
            }
        },
        data: {
            type: Array,
            default: function () {
                return [
                    ['NaN', 'NaN', 'NaN', 20],
                    ['NaN', 'NaN', 'NaN', 25],
                    ['NaN', 'NaN', 'NaN', 30],
                    ['NaN', 'NaN', 'NaN', 19.1],
                    ['NaN', 'NaN', 'NaN', 20]
                ];
            }
        },
        title: {
            type: Array,
            default: function () {
                return ['客户名称', '负责销售', '客户类型', '本年BP(万)'];
            }
        },
        colorList: {
            type: Array,
            default: function () {
                return [];
            }
        },
        orderBy: {
            default: '1|asc'
        },
        scrollY: {
            type: Number,
            default: 170
        },
        isShowTitle: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            destroyed: false
        };
    },
    mounted() {
        var table = $('#' + this.id + '_table').DataTable({
            fixedHeader: true,
            scrollY: this.scrollY,
            paging: false,
            searching: false,
            info: false,
            ordering: false
        });
        table.column(this.orderBy.split('|')[0] - 1 + ':visible')
            .order(this.orderBy.split('|')[1])
            .draw();

        $('.dataTables_wrapper.no-footer .dataTables_scrollBody').css({
            border: 'none'
        });
    },
    methods: {},
    computed: {},
    destroyed() {
        // this.destroyed = true;
    }
};
</script>

<style scoped>
* {
    padding: 0;
}

@import '../../assets/css/jquery.dataTables.min.css';
@import '../../assets/css/fixedHeader.dataTables.min.css';

table.dataTable thead th,
table.dataTable thead td {
    border-bottom: none;
}

table.dataTable.stripe tbody tr.odd,
table.dataTable.display tbody tr.odd {
    background-color: #fbfbfb;
}

table.dataTable.row-border tbody th,
table.dataTable.row-border tbody td,
table.dataTable.display tbody th,
table.dataTable.display tbody td {
    border-top: 0.025rem solid #e9e2e2 !important;
}

table.dataTable.display tbody tr.even>.sorting_1,
table.dataTable.order-column.stripe tbody tr.even>.sorting_1 {
    background-color: #ffffff;
}

table.dataTable.display tbody tr.odd>.sorting_1,
table.dataTable.order-column.stripe tbody tr.odd>.sorting_1 {
    background-color: #fbfbfb;
}

.title-name-icon {
    width: 12px;
    height: 8px;
    border-radius: 0px;
}

.table-title-row {
    white-space: nowrap;
    color: rgb(136, 136, 136);
}

.table-title-row>tr>th {
    text-align: left;
}

table.dataTable thead td,
table.dataTable thead th {
    padding: .25rem .25rem;
}

.dataTables_wrapper.no-footer .dataTables_scrollBody {
    border-bottom: none !important;
}

/* .dataTables_scrollBody::-webkit-scrollbar-thumb {
    background-color: #d5cbcb6b;
    height: 20px;
} */
</style>
