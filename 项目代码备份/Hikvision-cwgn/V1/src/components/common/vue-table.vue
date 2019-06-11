<template>
<div class="vue-table flex flex-column flex-1">
    <ul class="thead flex flex-row flex-1">
        <li v-for="(item, key) in headData" :key="key" class="cell" :style="'width:'+item.colWidth">{{ item.name }}</li>
    </ul>
    <div id="tbody" class="tbody flex flex-column flex-6" :style="{maxHeight: this.height}">
        <ul v-for="(item, indexOuter) in bodyData" :key="indexOuter" class="row flex flex-row">
            <li v-for="(cell, key, index) in item" :key="index" class="cell" :style="'width:'+headData[index].colWidth" :title="cell">{{ cell }}</li>
        </ul>
    </div>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'vue-table',
    props: {
        bodyData: {
            type: Array,
            default: function () {
                return [{
                    name: '',
                    address: '暂无数据',
                    value: 0,
                }]
            }
        },
        height: {
            type: String,
            default: '3rem'
        },
        config: {
            type: Object,
            default: function () {
                return {
                    color: '#5D5D5D',
                    fontSize: '0.25rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }
            }
        }
    },
    data() {
        return {
            headData: [{
                name: '名称',
                colWidth: '25%'
            }, {
                name: '地址',
                colWidth: '25%'
            }, {
                name: '频次(天)',
                colWidth: '25%'
            }, {
                name: '告警数',
                colWidth: '25%'
            }],
        }
    },
    mounted() {
        this.objDiv = document.getElementById('tbody');
        this.setCSS();
    },
    updated() {
        this.setCSS();
    },
    methods: {
        setCSS() {
            $('.vue-table .tbody .cell').css({
                color: '#5D5D5D',
                fontSize: '0.28rem',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            });

            $('.vue-table .tbody').css({
                lineHeight: '0.4rem'
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
.vue-table {
    overflow: hidden;
}

.vue-table .thead>li {
    font-size: 12px;
    min-height: 0.6rem;
    max-height: 0.6rem;
}

.vue-table .row {
    min-height: 0.6rem;
    max-height: 0.6rem;
}

.vue-table .tbody {
    overflow-y: auto;
    overflow-x: hidden !important;
    cursor: pointer;
}

</style>
