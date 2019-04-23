<template>
    <div :id="id" v-if="!destroyed">
        <table class="display" style="width:100%" :id="id+'_table'">
            <thead>
                <tr>
                    <th v-for="(v,i) in title" :key="i">{{v}}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="i in data.length" :key="i">
                    <td v-for="(item,index) in data[i-1]" :key="index">{{item}}</td>
                </tr>
            </tbody>
            <!-- <tfoot>
                <tr>
                    <th v-for="(v,i) in title" :key="i">{{v}}</th>
                </tr>
            </tfoot>-->
        </table>
    </div>
</template>
<script>
import "../../assets/js/jquery.dataTables.min.js";
import "../../assets/js/dataTables.fixedHeader.min.js";

export default {
    props: {
        id: {
            type: String,
            default: function() {
                return $.getRandomString(7);
            }
        },
        data: {
            type: Array,
            default: function() {
                return [
                    ["NaN", "NaN", "NaN", 20],
                    ["NaN", "NaN", "NaN", 25],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 19.1],
                    ["NaN", "NaN", "NaN", 20]
                ];
            }
        },
        title: {
            type: Array,
            default: function() {
                return ["客户名称", "负责销售", "客户类型", "本年BP(万)"];
            }
        },
        orderBy: {
            default: "1|asc"
        },
        scrollY: {
            type: Number,
            default: 170
        }
    },
    data() {
        return {
            destroyed: false
        };
    },
    mounted() {
        var table = $("#" + this.id + "_table").DataTable({
            fixedHeader: true,
            scrollY: this.scrollY,
            paging: false,
            searching: false,
            info: false
        });
        table.column(this.orderBy.split("|")[0] - 1 + ":visible")
            .order(this.orderBy.split("|")[1])
            .draw();
        
        $('.dataTables_wrapper.no-footer .dataTables_scrollBody').css({
            border: 'none'
        });
    },
    methods: {},
    computed: {},
    destroyed() {
        this.destroyed = true;
    }
};
</script>
<style scoped>
@import "../../assets/css/jquery.dataTables.min.css";
@import "../../assets/css/fixedHeader.dataTables.min.css";
table.dataTable thead th,
table.dataTable thead td {
    border-bottom: 1px solid #b3adad;
}

</style>

