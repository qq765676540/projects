<template>
<van-pull-refresh v-model="isLoading" @refresh="onRefresh" :style="{'overflow-y': scroll}" id="gross">
    <div class="gross flex flex-column" id="gross-box">
        <div class="customer-distribution border-bottom">
            <div class="sub-title">
                <div class="sub-title-icon"></div>
                <span class="sub-title-name">客用户拜访覆盖</span>
            </div>
            <div style="margin:0px 15px 0px 15px">
               
            </div>
        </div>
    </div>
</van-pull-refresh>
</template>

<script>
import table from "./common/datatables";
import progress from "./common/progress";
import actionsheet from "./common/actionsheet";
import {PullRefresh} from "vant";

export default {
    name: "gross",
    components: {
        [PullRefresh.name]: PullRefresh,
        MyTable: table,
        MyProgress: progress,
        MyActionsheet: actionsheet
    },
    data() {
        return {
            isLoading: false,
            asshow1: false,
            asshow2: false,
            ash1: "0px",
            ash2: "0px",
            scroll: "scroll !important",
            Aselected: "全部",
            Bselected: "全部"
        };
    },
    computed: {
        CollapseADataSet() {
            if (this.$store.state.visitWarningCollapseA1.length > 0) {
                let a1 = this.$store.state.visitWarningCollapseA1;
                let a2 = this.$store.state.visitWarningCollapseA2;
                let data = {
                    全部: [],
                    战略: [],
                    核心: [],
                    潜力: [],
                    认证: []
                };
                let dataIndex0 = this.getData(a1, a2, "全部");
                let dataIndex1 = this.getData(a1, a2, "战略客户");
                let dataIndex2 = this.getData(a1, a2, "核心客户");
                let dataIndex3 = this.getData(a1, a2, "潜力客户");
                let dataIndex4 = this.getData(a1, a2, "认证客户");

                if (this.Aselected === "全部") {
                    data[this.Aselected] = dataIndex0;
                } else if (this.Aselected === "战略") {
                    data[this.Aselected] = dataIndex1;
                } else if (this.Aselected === "核心") {
                    data[this.Aselected] = dataIndex2;
                } else if (this.Aselected === "潜力") {
                    data[this.Aselected] = dataIndex3;
                } else {
                    data[this.Aselected] = dataIndex4;
                }

                // console.log("2019-05-10 16:09:04->YCQ日志记录:", dataIndex0);
                return data;
            }
            return false;
        }
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                this.isLoading = false;
                this.$router.replace({
                    path: "/refresh",
                    query: {
                        t: Date.now()
                    }
                });
            }, 500);
        },
        setScrollStyleA(style, selected) {
            this.scroll = style;
            this.Aselected = selected;
        },
        setScrollStyleB(style, selected) {
            this.scroll = style;
            this.Bselected = selected;
        },
        getData(a, b, c) {
            let data = [];
            let tempdb = "";
            a.filter(v => {
                let tmp = {};
                if (
                    tempdb != v[0].qText &&
                    (v[2].qText === c || c === "全部")
                ) {
                    tmp.name = v[0].qText;
                    tmp.title = v[0].qText;
                    tmp.type = v[1].qText;
                    tmp.data =
                        c === "全部" ?
                        v[4].qNum === "NaN" ?
                        0 :
                        v[4].qNum :
                        v[3].qNum === "NaN" ?
                        0 :
                        v[3].qNum;
                    tmp.subData = [];
                    tempdb = v[0].qText;
                    data.push(tmp);
                }
            });

            data.filter(vo => {
                let e = [];
                b.filter(vi => {
                    if (
                        vi[0].qText === vo.name &&
                        (vi[2].qText === c || c === "全部")
                    ) {
                        e.push([vi[1].qText, vi[2].qText]);
                    }
                });
                vo.subData = e;
            });

            return data;
        }
    }
};
</script>

<style scoped>
.padding-empty {
    padding: 0px;
}

.gross {
    width: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
}

.border-bottom {
    border-bottom: 5px solid #e6e9f0;
}
</style>
