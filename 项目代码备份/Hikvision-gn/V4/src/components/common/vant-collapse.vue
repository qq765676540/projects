<template>
    <div :id="id">
        <div :id="id" class="vant-collapse">
            <van-collapse v-model="activeName" accordion>
                <van-collapse-item
                    v-for="(item,key) in data"
                    :title="item.title"
                    :key="key"
                    :name="key"
                >
                    <div slot="title">
                        <div class="flex flex-row">
                            <div
                                class="flex flex-2 flex-align-center collapse-title-top"
                                :class="isDefaultTitle?'collapse-title':isDefaultTitle"
                            >
                                <div class="title-name-icon"></div>
                                <div class="title-name-value">{{item.name}}</div>
                            </div>
                            <div class="flex-5">{{item.type}}</div>
                            <div class="flex-1 collapse-title-data" style="color: #0f8ee9">
                                {{item.data}}
                            </div>
                        </div>
                    </div>
                    <div class="flex-1" style="max-height:150px;overflow-y: scroll !important;">
                        <div v-for="(v,i) in item.subData" :key="i" class="flex flex-column flex-justify-center flex-align-center">
                            <div v-if="v.length>2" class="flex" style="width: 90%">
                                <div class="flex-4 text-left">{{v[0]}}</div>
                                <div class="flex-1">{{v[1]}}</div>
                                <div class="flex-1" style="white-space: nowrap;">{{v[2]}}</div>
                            </div>
                            <div v-if="v.length>2" style="width: 90%">{{v[3]}}</div>

                            <div v-if="v.length<3" class="flex" style="width: 90%">
                                <div class="flex-5 text-left">{{v[0]}}</div>
                                <div class="flex-1 text-center" style="white-space: nowrap;">{{v[1]}}</div>
                            </div>
                        </div>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script>
import { Collapse, CollapseItem } from "vant";

import Tools from "../../tools/tools";
var tool = new Tools();

export default {
    name: "vant-collapse",
    components: {
        [Collapse.name]: Collapse,
        [CollapseItem.name]: CollapseItem
    },
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        isDefaultTitle: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            activeName: -1111,
            wholeContext: [],
            popShow: false,
            popContext: "",
            currentData: tool.deepClone(this.data)
        };
    },
    beforeCreate() {},
    mounted() {
        this.currentData.forEach(e => {
            if (e.name) {
                e.subData.forEach(q => {
                    if (q.context) {
                        let tmp = q.context;
                        this.wholeContext[q.subTitle] = tmp;
                        let context = q.context;
                        let maxLen = 96;
                        if (context.length > maxLen) {
                            context = context.substring(0, maxLen) + "...";
                        }
                        q.context = context;
                    }
                });
            }
        });
    },
    methods: {
        getRandomColor() {
            let r, g, b;
            r = Math.floor(Math.random() * 256);
            g = Math.floor(Math.random() * 256);
            b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        openContext(event, index) {
            if (event.target.innerText.indexOf("...") > -1) {
                this.$parent.$parent.$parent.popShow = true;
                this.$parent.$parent.$parent.popContext = this.wholeContext[
                    index
                ];
            }
        }
    },
    destroyed() {
        this.wholeContext = null;
    }
};
</script>

<style scoped>
.vant-collapse {
    margin-top: 10px;
    max-height: 260px;
    overflow-y: scroll !important;
}

.vant-collapse .collapse-title {
    white-space: nowrap;
}

.vant-collapse .collapse-title-data {
    white-space: nowrap;
}

.vant-collapse .title-name-icon {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    min-width: 6px;
    min-height: 6px;
    background-color: #d2eaf5 !important;
}

.vant-collapse .collapse-title-top {
    margin-left: 10px;
}

.vant-collapse .title-name-value {
    margin-left: 4px;
}

.collapse-context {
    margin: 0 10px 10px 10px;
}

.context-li {
    text-indent: 20px;
    justify-content: space-between;
}
</style>
