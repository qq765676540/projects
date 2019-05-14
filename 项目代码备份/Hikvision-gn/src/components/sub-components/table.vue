<template>
    <div :id="id" :style="style">
        <table class="table" :id="id+'_table'">
            <thead>
                <tr>
                    <th :style="th" v-for="(v,i) in title" :key="i" @click="onClick(i+1)">
                        <div class="tableTh flex flex-align-center">
                            <div class="flex-1" v-if="i+1===orderCol"></div>
                            <div class="flex-8">{{v}}</div>
                            <div
                                :class="[orderClassLoad==='Desc'?'ascOrder':'descOrder','flex-1']"
                                v-if="i+1===orderCol"
                            ></div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in data.length" :key="i">
                    <td v-for="(item,index) in data[i-1]" :key="index">{{item}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import "../../assets/js/jquery.tablesort.min.js";

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
        minH: {
            type: String,
            default: "150px"
        },
        maxH: {
            type: String,
            default: "200px"
        },
        thBgColor: {
            type: String,
            default: "#fff"
        },
        orderCol: {
            type: Number,
            default: 4
        },
        orderType: {
            type: String,
            default: "Desc"
        },
        thFontSize: {
            type: String,
            default: "12px"
        },
        thFontColor: {
            type: String,
            default: "#343021"
        }
    },
    data() {
        return {
            orderClassLoad: this.orderType
        };
    },
    mounted() {
        var _self = this;
        $("#" + this.id + "_table")
            .tablesort(this.orderCol + "|" + this.orderType)
            .data("tablesort");

        $("#" + this.id + "_table thead th")
            .eq(this.orderCol - 1)
            .attr("class", "number");

        $("#" + this.id + "_table thead th.number").data("sortBy", function(
            th,
            td,
            sorter
        ) {
            return parseInt(td.text(), 10);
        });

        $("#" + this.id + "_table thead th.number").click();

        $("#" + this.id).scroll(function() {
            if (
                $(this)
                    .attr("style")
                    .indexOf("overflow") > -1
            ) {
                var scrollTop = this.scrollTop;
                $(this)
                    .find("thead")
                    .attr(
                        "style",
                        "transform: translateY(" + scrollTop + "px);"
                    );
            }
        });
    },
    methods: {
        onClick(n) {
            if (n === this.orderCol) {
                this.orderClassLoad =
                    this.orderClassLoad === "Desc" ? "Asc" : "Desc";
            }
        }
    },
    computed: {
        style: function() {
            return {
                "min-height": this.minH,
                "max-height": this.maxH,
                "overflow-y": "scroll"
            };
        },
        th: function() {
            return {
                "text-align": "center",
                background: this.thBgColor,
                "font-size": this.thFontSize,
                color: this.thFontColor
            };
        }
    }
};
</script>
<style scoped>
.tableTh {
    max-height: 30px;
}
.ascOrder {
    background-image: url("../../assets/image/asc.png");
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.descOrder {
    background-image: url("../../assets/image/desc.png");
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
</style>

