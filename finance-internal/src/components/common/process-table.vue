<template>
<div class="process-table flex flex-column flex-1" :style="{'max-height':height}">
    <div v-for="(row, index) in rows" :key="index" class="row flex flex-row flex-1">
        <div class="name flex-1" :title="row.name">{{row.name}}</div>
        <div class="process-bar flex-3">
            <div v-if="row.value/row.total<0.85" class="process-rate" :style="{width: row.value/row.total*100+'%'}">
                <div class="process-rate-label value" :style="{left:'calc(100% + 3px)'}">{{row.value}}</div>
            </div>
            <div v-if="row.value/row.total>=0.85" class="process-rate" :style="{width: row.value/row.total*100+'%', backgroundColor:'#F57556'}">
                <div class="process-rate-label value" :style="{right:'3px', color:'white'}">{{row.value}}</div>
            </div>
            <div class="process-rate-label total" :style="{left:'102%'}">{{row.total}}</div>
        </div>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'process-table',
    props: {
        rows: {
            type: Array,
            default: function () {
                return []
            }
        },
        height: {
            type: String,
            default: '130px'
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.setCSS();
    },
    updated() {
        this.setCSS();
    },
    methods: {
        setCSS() {
            $('.process-table .name').css({
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
            });
        },
        isDiff(nData, oData) {
            return JSON.stringify(nData) != JSON.stringify(oData);
        }
    },
    watch: {
        bodyData: {
            handler: function (nData, oData) {
                var IsTrue = this.isDiff(nData, oData);
                if (IsTrue) {
                    this.setCSS();
                }
            },
            deep: true,
            immediate: true
        },
    },
    beforeDestroy() {
        clearTimeout(this.timer);
        this.objDiv = null;
    },
}
</script>

<style scoped>
.process-table {
    overflow-x: hidden;
    overflow-y: auto !important;
}

.process-table .row {
    align-items: center;
}

.process-table .row {
    line-height: 30px;
}

.process-table .name {
    font-size: 12px;
    min-width: 80px;
    max-width: 80px;
    text-indent: 20px;
}

.process-bar {
    margin-right: 50px;
    margin-left: 15px;
    width: calc(100% - 160px);
    height: 12px;
    border-radius: 3px;
    background-color: #99999934;
    position: relative;
}

.process-rate {
    height: 12px;
    border-radius: 3px;
    background-color: #1495EB;
    transition: 1s width;
    position: relative;
}

.process-rate-label {
    position: absolute;
    top: -9px;
    font-size: 10px;
}
</style>
