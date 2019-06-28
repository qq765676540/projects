<template>
<div v-show="show">
    <div class="selector flex flex-column flex-1">
        <div class="selector-time flex flex-column">
            <span class="title" style="padding-bottom: 5px;">时间区间</span>
            <ul class="selections">
                <ul>
                    <li v-for="(value, key) in timeItems" :key="key" class="time-item" :class="{active: value}" @click="selectTime(key)">{{key}}</li>
                </ul>
            </ul>
        </div>
        <div class="flex flex-column">
            <span class="title" style="padding-bottom: 5px;">默认货币</span>
            <div class="flex flex-align-center" style="margin-left: 10px">
                <div :class="{currencyStyle:true,currencyStyleActive:currencyStyleActive=='人民币'}" @click="setCurrency('R')">人民币</div>
                <div :class="{currencyStyle:true,currencyStyleActive:currencyStyleActive=='美元'}" @click="setCurrency('U')" style="margin-left: 15px" v-if="!(this.$store.state.pageActive==3)&&!(this.$store.state.dataScope=='T')&&!(this.$store.state.dataScope=='I')">美元</div>
            </div>
        </div>
        <div class="selector-org-tree flex flex-column flex-1" style="padding-top: 15px;">
            <span class="title">产品细分</span>
            <vue-tree :tree-data="orgTreeData" v-model="ids" :options="options" class="org-tree" v-if="orgTreeData" />
        </div>
        <div class="selector-btn flex">
            <div class="selector-btn-cancle inactive" @click="cancle">取消</div>
            <div class="selector-btn-confirm active" @click="confirm">确定</div>
        </div>
    </div>
    <div class="actionsheet absolute" v-show="asShow" @click.stop="asShow=false">
        <time-bucket v-model="asShow" :actions="selctions" :overlay="false" cancel-text="取消" @getTime="getTime"></time-bucket>
    </div>
</div>
</template>

<script>
import treeData from "../data/tree";
import Tools from "../../tools/tools";
import TimeBucket from "./time-bucket";
var tool = new Tools();

export default {
    props: ["selectedTime", "selectedOrg", "show", "treeDataSet"],
    components: {
        TimeBucket
    },
    data() {
        return {
            asShow: false,
            time: "本月",
            time_bucket: "本月",
            timeItems: {
                本月: true,
                本季: false,
                本年: false,
                上月: false,
                上季: false,
                上年: false,
                其他: false
            },
            ids: [],
            options: {depthOpen:1,idsWithParent:false},
            treeData: treeData
        };
    },
    created() {
        // this.time = this.selectedTime;
        this.ids = tool.deepClone(this.selectedOrg);
    },
    mounted() {

    },
    computed: {
        selctions() {
            return this[this.curFilter];
        },
        currencyStyleActive() {
            return this.$store.state['currency'] == 'R' ? '人民币' : '美元';
        },
        orgTreeData() {
            if (this.$store.state.org.length > 0) {
                let orgData = this.$store.state.org;
                orgData = orgData.sort((a,b) => {
                    return a[2].qText.charCodeAt() - b[2].qText.charCodeAt();
                });
                let treeData = [{
                    label: orgData[0][0].qText,
                    id: orgData[0][0].qText,
                    children: []
                }];
                orgData.filter(v => {
                    let temp = {};
                    temp.label = v[1].qText;
                    temp.id = v[1].qText;
                    treeData[0].children.push(temp);
                });
                return treeData;
            }
            return false;
        }
    },
    watch: {},
    methods: {
        setCurrency(curr) {
            this.$store.dispatch('updateData', {
                dataName: 'currency',
                data: curr
            });
        },
        getTime(data) {
            this.time_bucket =
                data.year + "年" + data.startMonth + "月至" + data.endMonth + "月";
            this.time = data;
        },
        selectTime(name) {
            for (var key in this.timeItems) {
                this.timeItems[key] = false;
            }
            this.timeItems[name] = true;
            if (name == "其他") {
                this.asShow = true;
            }
            this.time = name;
        },
        cancle() {
            this.$emit("cancle");
        },
        confirm() {
            this.$emit("confirm", {
                time: this.time,
                org: this.ids
            });
        }
    }
};
</script>

<style>
@import url("../../assets/css/font-awesome.min.css");
@import url("../../assets/css/bootstrap.min.css");

.actionsheet {
    z-index: 1000;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
}

.selector {
    background-color: white;
    height: calc(100% - 80px);
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    padding: 10px 10px 0 10px;
    z-index: 100;
}

.selector .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-indent: 10px;
    font-size: 14px;
    font-weight: bold;
}

.selector .selector-time {
    min-height: 110px;
    max-height: 110px;
}

.selector .time-item {
    border-radius: 20px;
    border: 1px solid grey;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 11px;
    float: left;
    width: 75px;
    line-height: 26px;
    height: 25px;
    font-size: 12px;
}

.selector .time-item.active {
    background-color: #039ce3;
    color: white;
    border: none;
}

.selector .selector-org-tree .title {
    min-height: 30px;
    max-height: 30px;
}

.selector .selector-org-tree {
    max-width: 100%;
    min-width: 100%;
    max-height: 360px;
}

.selector .vue-tree-list {
    overflow-y: auto;
    text-align: left;
    padding-left: 10px;
}

.selector .selector-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0;
    height: 30px;
    width: 100%;
    font-size: 14px;
}

.selector .selector-btn .selector-btn-cancle {
    position: absolute;
    bottom: 10px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    left: calc(50% - 70px);
    border-radius: 0px;
}

.selector .selector-btn .selector-btn-confirm {
    position: absolute;
    bottom: 10px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    left: 50%;
    border-radius: 0px;
}

.selector .selector-btn-cancle.active,
.selector .selector-btn-confirm.active {
    background-color: #039ce3;
    color: white;
}

.selector .selector-btn-cancle.inactive,
.selector .selector-btn-confirm.inactive {
    border: 1px solid rgba(128, 128, 128, 0.521);
    color: black;
}

.vue-tree-list .item-checkbox,
.vue-tree-list .item-label {
    font-size: 14px !important;
}

.vue-tree-list .item-wrapper,
.vue-tree-list .item-wrapper>span {
    display: flex;
    align-items: center;
}

.vue-tree-list .fa-square-o:before,
.vue-tree-list .fa-check-square-o:before,
.vue-tree-list .fa-minus-square-o:before {
    font-size: 18px;
}

.vue-tree-list .fa-angle-right:before {
    font-size: 16px;
    content: "\f054";
}

.vue-tree-list .fa-angle-down:before {
    font-size: 16px;
    content: "\f078";
}

.currencyStyle {
    border-radius: 4px;
    border: 0.025rem solid rgba(128, 128, 128, 0.5);
    background-color: #fff;
    width: 80px;
    line-height: 25px;
    height: 25px;
    font-size: 12px;
    margin-right: 2px;
}

.currencyStyleActive {
    background-color: #039ce3;
    color: white;
    border: none;
}
</style>
