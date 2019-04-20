<template>
    <div class="myselectlist" :id="id">
        <button class="btn btn-default btn-xs" type="button" :style="myStyle" @click="show=true">
            {{selected}}
            <span class="caret" style="float: right;margin-top:8px"></span>
        </button>
        
        <van-actionsheet v-model="show" :title="selTitle">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" style="text-align: center">
                <van-cell v-for="(item,index) in data" :key="index" :title="item" @click="onSelect(index)"/>
            </van-list>
        </van-actionsheet>
    </div>
</template>
<script>
import { Actionsheet, Icon, List, Cell } from "vant";
export default {
    components: {
        [Actionsheet.name]: Actionsheet,
        [Icon.name]: Icon,
        [List.name]: List,
        [Cell.name]: Cell
    },
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        data: {
            type: Array,
            default: ["NaN"]
        },
        selTitle: {
            default: "请选择:"
        },
        defSelected: {
            default: "NaN"
        },
        myStyle: {
            type: Object,
            default: {
                background: "#efefef"
            }
        }
    },
    data() {
        return {
            show: false,
            selected:
                this.defSelected === "NaN" ? this.data[0] : this.defSelected,
            list: [],
            loading: false,
            finished: false
        };
    },
    methods: {
        onSelect(i) {
            this.show = false;
            this.selected = this.data[i];
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
        }
    }
};
</script>
<style scoped>
.myselectlist {
    font-weight: normal;
    height: 100%;
    line-height: 100%;
}
</style>
