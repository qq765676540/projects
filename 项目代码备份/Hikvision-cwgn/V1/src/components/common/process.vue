<template>
    <div class="process flex flex-column fle">
        <span class="flex-1 text-left title">{{data.name}}</span>
        <div class="kpi-list flex flex-row flex-1">
            <div class="flex flex-1 flex-row">
                <span class="name">销售额</span>
                <span class="value flex-1">{{data.value}}</span>
            </div>
            <div class="flex flex-1 flex-row">
                <span class="name">销售目标</span>
                <span class="value flex-1">{{data.target}}</span>
            </div>
            <div class="flex flex-1 flex-row">
                <span class="name">同比</span>
                <span class="value last">{{data.YOY}}%</span>
                <i class="trend" :class="{'fa fa-long-arrow-up':trend, 'fa fa-long-arrow-down':!trend}"></i>
            </div>
        </div>
        <div class="flex-1">
            <div class="process-bar">
                <div class="process-rate" :style="{width: percent}"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default() {
                return {name:'指标名称', value:10, target:20, YOY:100}
            }
        }
    },
    data() {
        return {
            percent: '40%'
        }
    },
    mounted() {
        setInterval(() => {
            this.percent = (Math.random()*100).toFixed(0) + '%';
            this.data.YOY = (Math.random()*100 - 50).toFixed(0);
        }, 2000);
    },
    computed: {
        trend() {
            return this.data.YOY>0 ? true : false;
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 16px;
    margin-left: 15px;
    align-items: flex-end;
    display: flex;
}

.kpi-list>div {
    align-items: center;
    justify-content: flex-start;
    line-height: 14px;
}

.kpi-list {
    padding-left: 15px;
}

.name {
    font-size: 12px;
    color: #999999;
}

.value {
    text-align: left;
    text-indent: 5px;
    font-size: 14px;
}

.value.last {
    padding-right: 5px;
}

.trend.fa-long-arrow-up {
    color: rgb(24, 163, 55);
}

.trend.fa-long-arrow-down {
    color: red;
}

.process-bar {
    margin-left: 15px;
    width: 90%;
    height: 6px;
    border-radius: 3px;
    background-color: #99999934;
}

.process-rate {
    height: 6px;
    border-radius: 3px;
    background-color: #1495EB;
    transition: 1s width;
}
</style>

