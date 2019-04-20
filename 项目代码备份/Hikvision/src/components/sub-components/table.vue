<template>
    <div :id="id" :style="style">
        <table class="table" :id="id+'_table'">
            <thead>
                <tr>
                    <th style="text-align:center;background:#efefef" v-for="(v,i) in title" :key="i">{{v}}</th>
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
            default: Math.random().toFixed(8)
        },
        data: {
            type: Array,
            default: function() {
                return [
                    ["NaN", "NaN", "NaN", 20],
                    ["NaN", "NaN", "NaN", 25],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30],
                    ["NaN", "NaN", "NaN", 30]
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
        }
    },
    data() {
        return {
            style: {
                "min-height": this.minH,
                "max-height": this.maxH,
                "overflow-y": "scroll"
            }
        };
    },
    mounted() {
        $("#"+this.id+"_table")
            .tablesort("4|Desc")
            .data("tablesort");
        $("#"+this.id+"_table thead th")
            .eq(4 - 1)
            .attr("class", "number");
        $("#"+this.id+"_table thead th.number").data("sortBy", function(th, td, sorter) {
            return parseInt(td.text(), 10);
        });

        $("#"+this.id+"_table thead th.number").click();

        $("#"+this.id).scroll(function() {
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

        $.info($.getRandomString(5));
    }
};
</script>
<style scoped>
</style>

