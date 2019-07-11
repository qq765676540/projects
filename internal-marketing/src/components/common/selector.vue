<template>
<transition v-show="show" enter-active-class="animated faster fadeInUp" leave-active-class="animated faster fadeOutDown">
    <div class="selector flex flex-column flex-1">
        <div class="selector-time flex flex-column flex-1">
            <span class="title flex-1">时间范围</span>
            <ul class="selections flex-3">
                <li v-for="(value, key) in timeItems" :key="key" class="time-item" :class="{active: value}" @click="selectTime(key)">{{key}}</li>
            </ul>
        </div>
        <div class="selector-org-tree flex flex-column flex-6">
            <span class="title flex-1">组织架构</span>
            <vue-tree :tree-data="realTreeData" v-model="ids" :options="options" class="org-tree flex-9" />
        </div>
        <div class="selector-btn flex flex-justify-center flex-2">
            <div class="selector-btn-cancle inactive" @click="cancle">取消</div>
            <div class="selector-btn-confirm active" @click="confirm">确定</div>
        </div>
    </div>
</transition>
</template>

<script>
import treeData from "../data/tree";

import Tools from "../../tools/tools";
var tool = new Tools();

export default {
    props: ["selectedTime", "selectedOrg", "show", "treeDataSet"],
    data() {
        return {
            time: "",
            timeItems: {
                本周: true,
                本月: false,
                本季: false,
                上周: false,
                上月: false,
                上季: false
            },
            ids: [],
            options: {
                idsWithParent: false,
                depthOpen: 1,
                openIcon: "fa fa-angle-right",
                closeIcon: "fa fa-angle-down"
            },
            treeData: treeData,
            orgLevelNum: 0
        };
    },
    created() {
        this.time = this.selectedTime;
        this.ids = tool.deepClone(this.selectedOrg);
    },
    mounted() {
        this.tmpArr = [];
    },
    computed: {
        realTreeData() {
            if (
                this.$store.state.currentLevel.length > 0 &&
                this.$store.state.organization.length > 0
            ) {
                //遍历部门
                let deptName = '';
                let deptNameArr = [];
                let a = this.$store.state.currentLevel;
                let b = this.$store.state.organization;
                let c = [];
                if (a[0][0].qText === '-') {
                    c = b;
                } else {
                    c = a.concat(b);
                }
                c.sort((a, b) => {
                    return a[6].qText / 1 - b[6].qText / 1;
                });

                c.filter((v) => {
                    let tmp = {};
                    if (deptName != v[5].qText) {
                        deptName = v[5].qText;
                        tmp.id = v[0].qText;
                        tmp.label = deptName;
                        tmp.pid = v[1].qText;
                        tmp.sortflag = parseInt(v[6].qText);
                        tmp.children = []
                        deptNameArr.push(tmp);
                    }
                });

                deptNameArr = deptNameArr.sort((a, b) => {
                    return a.sortflag - b.sortflag;
                });
                //遍历销售人员
                deptNameArr.filter((vo) => {
                    c.filter((vi) => {
                        let tmp = {};
                        if (vo.id === vi[0].qText) {
                            tmp.id = vi[2].qText + ':' + vi[3].qText; //过滤值：显示值
                            tmp.label = vi[3].qText;
                            tmp.flag = vi[4].qText;
                            vo.children.push(tmp);
                        }
                    });
                    vo.children = vo.children.sort((first, next) => {
                        return next.flag - first.flag;
                    });
                });

                // 递归组织架构树
                let orgTreeData = [];
                orgTreeData = this.getOrgData(deptNameArr, '-');

                return orgTreeData;
            }
            //默认数据
            return this.treeData;
        }
    },
    watch: {
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
            this.$emit("cancle");
        },
        confirm() {
            // console.log("2019-04-27 17:15:29->大门日志记录:this.ids", this.ids);
            this.$emit("confirm", {
                time: this.time,
                org: this.ids
            });
        },
        getOrgData(data, pid) {
            var result = [],
                temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].pid == pid) {
                    var obj = {
                        label: data[i].label,
                        id: data[i].id,
                        children: data[i].children
                    };
                    temp = this.getOrgData(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = obj.children.concat(temp);
                        this.orgLevelNum += 1;
                    }
                    result.push(obj);
                }
            }
            return result;
        }
    }
};
</script>

<style>
@import url("../../assets/css/font-awesome.min.css");
@import url("../../assets/css/bootstrap.min.css");

.selector {
    background-color: white;
    height: calc(100% - 80px);
    width: 100%;
    position: absolute;
    top: 80px;
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
    border-radius: 4px;
    border: 0.025rem solid rgba(128, 128, 128, 0.5);
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 11px;
    float: left;
    width: 100px;
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
    max-height: 8.2rem;
}

.selector .vue-tree-list {
    overflow-y: auto;
    text-align: left;
    padding-left: 10px;
}

.selector .selector-btn {
    position: absolute;
    bottom: 50px;
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
    color: rgb(90, 92, 90);
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
    font-size: 26px;
    color: #949191;
}

.vue-tree-list .fa-angle-down:before {
    font-size: 26px;
    color: #949191;
}

.vue-tree-list .fa-square-o:before,
.vue-tree-list .fa-check-square-o:before,
.vue-tree-list .fa-minus-square-o:before {
    color: #949191;
    font-size: 20px;
}

.vue-tree-list .fa-check-square-o:before {
    color: #03a9f4;
}

.vue-tree-list .item-label {
    text-indent: 5px;
}

.vue-tree-list .item-label.item-bold {
    font-weight: 500;
    color: black;
}
</style>
