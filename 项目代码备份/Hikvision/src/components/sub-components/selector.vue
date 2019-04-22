<template>
<transition v-show="show" enter-active-class="animated faster fadeInUp" leave-active-class="animated faster fadeOutDown">
    <div class="selector flex flex-column flex-1">
        <div class="selector-time flex flex-column flex-1">
            <span class="title flex-1">时间范围</span>
            <ul class="selections flex-3">
                <li v-for="(key, value) in timeItems" :key="value" class="time-item" :class="{active: key}" @click="selectTime(value)">
                    {{value}}
                </li>
            </ul>
        </div>
        <div class="selector-org-tree flex flex-column flex-3">
            <span class="title flex-1">时间范围</span>
            <vue-tree :tree-data="treeData" v-model="ids" :options="options" class="org-tree flex-9" />
        </div>
        <div class="selector-btn">
            <!-- <div class="selector-btn-cancle inactive" @click="cancle">取消</div> -->
            <div class="selector-btn-confirm active" @click="confirm">确认</div>
        </div>
    </div>
</transition>
</template>

<script>
import treeData from '../data/tree'
// import vueTree from '../common/tree/vue-tree'

import Tools from '../../tools/tools';
var tool = new Tools();

export default {
    props: ['selectedTime', 'selectedOrg', 'show'],
    data() {
        return {
            time: '',
            timeItems: {
                本周: true,
                本月: false,
                本季: false,
                本年: false,
                上周: false,
                上月: false,
                上季: false,
                上年: false
            },
            ids: [],
            options: {},
            treeData: treeData
        }
    },
    created() {
        this.time = this.selectedTime;
        this.ids = tool.deepClone(this.selectedOrg);
    },
    methods: {
        selectTime(name) {
            for (var key in this.timeItems) {
                this.timeItems[key] = false;
            }
            this.timeItems[name] = true;
            this.time = name;
        },
        cancle() {
            this.$emit('cancle');
        },
        confirm() {
            this.$emit('confirm', {
                time: this.time,
                org: this.ids
            });
        }
    }
}
</script>

<style>
@import url('../../assets/css/font-awesome.min.css');
@import url('../../assets/css/bootstrap.min.css');

.selector {
    background-color: white;
    height: calc(100% - 120px);
    width: 100%;
    position: absolute;
    top: 124px;
    left: 0;
    padding: 0 10px 0 10px;
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
    background-color: #039CE3;
    color: white;
    border: none;
}

.selector .selector-org-tree .title {
    min-height: 30px;
    max-height: 30px;
}

.selector .selector-org-tree {
    max-width: calc(100% - 180px);
    min-width: calc(100% - 180px);
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
    border-radius: 20px 0 0 20px;
}

.selector .selector-btn .selector-btn-confirm {
    position: absolute;
    bottom: 10px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    /* left: calc(50%); */
    /* border-radius: 0 20px 20px 0; */
    left: calc(50% - 35px);
    border-radius: 20px;
}

.selector .selector-btn-cancle.active,
.selector .selector-btn-confirm.active {
    background-color: #039CE3;
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
</style>
