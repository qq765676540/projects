<template>
<div :id="id" class="easy-kpi flex flex-column">
    <div class="flex flex-1 flex-justify-left flex-align-center title">{{data[0][0]}}</div>
    <div class="flex flex-1 flex-justify-left flex-align-center">
        <div class="titleVal">{{data[0][1]}}</div>
        <div class='titleunit' v-if="data[0][2]!=''">{{data[0][2]}}</div>
    </div>
    <div class="flex flex-1 flex-justify-left flex-align-center" style="padding-top:8px">
        <div class="flex flex-2 flex-justify-left flex-align-center subtitle">{{data[1][0]}}</div>
        <div class="flex flex-3 flex-justify-left flex-align-center"> 
            <div class="subtitle">{{data[1][1]}}</div>
            <div class='subtitleunit' v-if="data[1][2]!=''">{{data[1][2]}}</div>
        </div>
    </div>
    <div class="flex flex-1 flex-justify-left flex-align-center">
        <div class="flex flex-2 flex-justify-left flex-align-center subtitle">同&nbsp;&nbsp;&nbsp;&nbsp;比</div>
        <div class="flex flex-3 flex-justify-left flex-align-center">
            <div class="subtitle">{{data[2][1]}}</div>
            <div class='subtitleunit' v-if="data[2][2]!=''">{{data[2][2]}}</div>
        </div>
    </div>
</div>
</template>

<script>
import accounting from 'accounting'

export default {
    name: "easy-kpi",
    components: {},
    props: {
        id: {
            type: String,
            default: Math.random().toFixed(8)
        },
        data: {
            default(){
                return [
                    ['总收入','21,193,200',''],
                    ['完成率','120%',''],
                    ['同比','25%','']
                ]
            }
        }
    },
    data() {
        return {};
    },
    beforeCreate() {},
    mounted() {},
    computed: {
        // kpiValue() {
        //     return accounting.formatNumber(this.data[0][1]);
        // }
    },
};
</script>

<style scoped>
.easy-kpi {
  min-width: 170px;
  max-width: 170px;
  min-height: 125px;
  max-height: 125px;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #e9e9e9, 2px 2px 5px #e9e9e9, 2px 2px 5px #e9e9e9,2px 2px 10px #e9e9e9;     
}

.title {
    font-size: 16px;
    color: #222222;
    margin: 1px;
    font-weight: bold;
}

.titleVal {
    font-size: 26px;
    color: #222222;
    margin: 1px;
    font-weight: bold;
}

.subtitle {
    font-size: 14px;
    color: #444444;
    margin: 1px;
}
.titleunit {
    font-size: 6px;
    color: #444444;
    margin-top: 8px;
}

.subtitleunit {
    font-size: 6px;
    color: #444444;
    margin-top: 1px;
}
</style>
