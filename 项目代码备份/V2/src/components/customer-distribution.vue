<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="vist-distribution flex flex-column">
            <div class="task-distribution flex-1 flex-column">
                <div class="sub-title flex-1">
                    <div class="sub-title-icon"></div>
                    <span class="sub-title-name">拜访任务类型占比</span>
                </div>
                <div class="task-distribution-middle flex flex-14 flex-row">
                    <e-pie
                        class="vist-e-pie flex"
                        :pieConfig="config"
                        :data="pieData"
                        v-if="pieData"
                    ></e-pie>
                </div>
                <div class="task-distribution-bottom">
                    <data-table
                        orderBy="2|desc"
                        :scrollY="220"
                        :isShowTitle="true"
                        :data="tableData"
                        :title="['拜访任务类型','占比','次数']"
                        v-if="tableData"
                    ></data-table>
                </div>
            </div>
        </div>
    </van-pull-refresh>
</template>

<script>
import { PullRefresh } from "vant";

import ePie from "./common/echarts-pie";
import dataTable from "./common/datatables";

export default {
    name: "overview",
    components: {
        [PullRefresh.name]: PullRefresh,
        ePie,
        dataTable
    },
    data() {
        return {
            isLoading: false,
            config: {
                title: "",
                imgUrl: "",
                size: "",
                labelShow: true,
                radius: ["30%", "50%"]
            },
            colorList: [
                "#1495EB",
                "#60CBC1",
                "#F8DAB6",
                "#F46950",
                "#C28CC3",
                "#AB5787",
                "#2FC25B",
                "#8543E0",
                "#223273"
            ]
        };
    },
    beforeCreate() {},
    computed: {
        pieData() {
            if (this.$store.state.customerDistribution.length > 0) {
                var rows = this.$store.state.customerDistribution,
                    pieData = [];

                rows = rows.slice(0, 6);
                rows.forEach((row, index) => {
                    var color = this.colorList[index],
                        col1 = row[0].qText,
                        col2 = (row[1].qNum * 100).toFixed(0),
                        col3 = row[2].qNum;

                    pieData.push({
                        name: col1,
                        value: col3,
                        itemStyle: {
                            color: color
                        }
                    });
                });
                // console.log("customerDistribution Pie", pieData);
                return pieData;
            }
            return false;
        },
        tableData() {
            if (this.$store.state.customerDistribution.length > 0) {
                var rows = this.$store.state.customerDistribution,
                    tabData = [];

                rows = rows.slice(0, 6);
                rows.forEach((row, index) => {
                    var color = this.colorList[index],
                        col1 = row[0].qText,
                        col2 = (row[1].qNum * 100).toFixed(0)+'%',
                        col3 = row[2].qNum;


                    tabData.push({
                        value: [col1, col2, col3],
                        color: color
                    });

                });
                // console.log("customerDistribution Table", tabData);
                return tabData;
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
        }
    }
};
</script>

<style scoped>
.vist-distribution {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.vist-distribution .task-distribution {
    min-height: 300px;
}

.task-distribution-middle {
    margin-left: -10px;
    min-height: 300px;
}

.task-distribution-bottom {
    min-height: 200px;
    margin: 0 40px 10px 40px;
}

.table.dataTable.no-footer {
    border-bottom: 0.025rem solid #cac6bf78 !important;
}
</style>
