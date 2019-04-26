<template>
    <div :id="id" v-if="!destroyed">
        <table class="display" style="width:100%" :id="id+'_table'">
            <thead v-show="isShowTitle" class="table-title-row">
                <tr>
                    <th v-for="(v,i) in title" :key="i">{{v}}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="i in data.length" :key="i">
                    <td v-for="(item,index) in (data[i-1].value?data[i-1].value:data[i-1])" :key="index">
                        <div v-if="index < 1" class="first-td flex flex-align-center">
                            <div class="col-xs-2 col-sm-2">
                                <div v-if="data[i-1].color" class="title-name-icon" :style="{'background':data[i-1].color}">
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-6" :style="'white-space: nowrap;text-align: left;'">
                                {{item}}
                            </div>
                        </div>
                        <div v-if="index > 0" >
                            {{item}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
// import "../../assets/js/jquery.dataTables.min.js";
// import "../../assets/js/dataTables.fixedHeader.min.js";

require( 'datatables.net-dt' );
require( 'datatables.net-fixedheader-dt' );

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
    colorList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    orderBy: {
      default: "1|asc"
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
    var table = $("#" + this.id + "_table").DataTable({
      fixedHeader: true,
      scrollY: this.scrollY,
      paging: false,
      searching: false,
      info: false
    });
    table
      .column(this.orderBy.split("|")[0] - 1 + ":visible")
      .order(this.orderBy.split("|")[1])
      .draw();

    $(".dataTables_wrapper.no-footer .dataTables_scrollBody").css({
      border: "none"
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
* {
  padding: 0;
}

@import "../../assets/css/jquery.dataTables.min.css";
@import "../../assets/css/fixedHeader.dataTables.min.css";
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

table.dataTable.display tbody tr.even > .sorting_1,
table.dataTable.order-column.stripe tbody tr.even > .sorting_1{
  background-color: #ffffff;
}
table.dataTable.display tbody tr.odd > .sorting_1,
table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {
  background-color: #fbfbfb;
}

.title-name-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.first-td{
  margin-left: 20px;
}


.table-title-row {
  white-space: nowrap;
  color: rgb(136, 136, 136);
}
</style>

