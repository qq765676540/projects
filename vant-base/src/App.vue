<template>
<div id="app">
    <div class="vist-warning flex flex-column" id="vist-warning">
        <div class="flex flex-1 flex-justify-right">
            <button class="btn btn-default btn-xs" type="button" style="background: rgba(239, 239, 239, 0.5);width: 90px;margin-right: 10px;margin-top: 3px" @click="onClickA">
                {{Aselected}}
                <span class="caret" style="float: right;margin-top:8px"></span>
            </button>
        </div>
        <van-dialog v-model="Ashow" title="选项" id="ashow" :lock-scroll="true">
            <van-radio-group v-model="Aselected">
                <van-cell-group>
                    <van-cell v-for="(item,index) in ['全部','战略客户','核心客户','认证客户','潜力客户']" :key="index" :title="item" clickable @click="Aselected = item">
                        <van-radio slot="right-icon" :name="item" />
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </van-dialog>
    </div>
</div>
</template>

<script>
import {
    Dialog,
    RadioGroup,
    Radio,
    CellGroup,
    Cell,
    Popup
} from 'vant';
export default {
    name: "vant",
    components: {
        [Dialog.Component.name]: Dialog.Component,
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [CellGroup.name]: CellGroup,
        [Cell.name]: Cell,
        [Popup.name]: Popup,
    },
    data() {
        return {
            Ashow: false,
            Aselected: '全部',
        };
    },
    methods: {
        onClickA() {
            this.Ashow = true;
        },
    }
}
</script>

<style>
.vist-warning {
    width: 100%;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    position: relative;
}

</style>
