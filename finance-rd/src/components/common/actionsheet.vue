<template>
    <div class="myselectlist" :id="id">
        <button class="btn btn-default btn-xs" type="button" :style="myStyle" @click="clickBtn">
            {{selected}}
            <span class="caret" style="float: right;margin-top:8px"></span>
        </button>

        <van-action-sheet v-model="show" :title="selTitle" :style="actionStyle">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                style="text-align: center;"
            >
                <van-cell
                    v-for="(item,index) in data"
                    :key="index"
                    :title="item"
                    @click="onSelect(index)"
                />
            </van-list>
        </van-action-sheet>
    </div>
</template>
<script>
import { ActionSheet, Icon, List, Cell } from "vant";
import { truncate } from "fs";
export default {
    components: {
        [ActionSheet.name]: ActionSheet,
        [Icon.name]: Icon,
        [List.name]: List,
        [Cell.name]: Cell
    },
    props: {
        id: {
            type: String,
            default: function() {
                return $.getRandomString(7);
            }
        },
        data: {
            type: Array,
            default() {
                return ["NaN"];
            }
        },
        selTitle: {
            default: "请选择:"
        },
        defSelected: {
            default: "NaN"
        },
        myStyle: {
            type: Object,
            default() {
                return { background: "#efefef", borderColor: "#cccccc96" };
            }
        },
        asshow: {
            default: false
        }
    },
    data() {
        return {
            show: this.asshow,
            selected:
                this.defSelected === "NaN" ? this.data[0] : this.defSelected,
            list: [],
            loading: false,
            finished: false,
            actionStyle: {
                height: "600px"
            }
        };
    },
    methods: {
        onCancel() {
            this.show = false;
        },
        onSelect(i) {
            this.show = false;
            this.selected = this.data[i];
            this.$emit("setScroll", "scroll !important",this.selected);
        },
        onLoad() {
            // 异步更新数据 
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }
                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= this.data.length) {
                    this.finished = true;
                }
            }, 500);
        },
        clickBtn() {
            var scrollHeight =
                $("#vist-warning").height() -
                $("#vist-warning").scrollTop() + 20 +
                "px";
            this.actionStyle = {
                height: scrollHeight
            };
            this.$emit("setScroll", "hidden !important",this.selected);
            this.show = true;
            this.$nextTick(() => {
                $(".van-overlay").click(() => {
                    this.$emit("setScroll", "scroll !important",this.selected);
                });
                $(".van-icon-close").click(() => {
                    this.$emit("setScroll", "scroll !important",this.selected);
                });
            });
            
        }
    },
    computed: {}
};
</script>
<style scoped>
.myselectlist {
    font-weight: normal;
    height: 100%;
    line-height: 100%;
}
</style>
