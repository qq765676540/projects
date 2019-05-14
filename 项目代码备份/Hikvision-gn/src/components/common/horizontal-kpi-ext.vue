<template>
    <div class="flex">
        <div class="flex flex-1 flex-justify-center flex-align-center" style="max-width:10px">
            <div class="flex flex-justify-center flex-align-center" :style="iconStyle"></div>
        </div>
        <div class="flex flex-1 flex-justify-left flex-align-center" style="margin-left:5px;white-space: nowrap;">{{title}}</div>
        <div class="flex flex-7 flex-justify-left flex-align-center" :style="fontStyle0">{{data[0]}}</div>
        <div class="flex flex-5 flex-justify-left flex-align-center" :style="fontStyle1">{{data[1]}}</div>
    </div>
</template>
<script>
export default {
    props: {
        id: {
            type: String,
            default: function() {
                return $.getRandomString(7);
            }
        },
        data: {
            default(){
                return [0,0]
            }
        },
        iconImgShow: {
            type: Boolean,
            default: false
        },
        iconSize: {
            default: "8px"
        },
        iconBgColor: {
            default: "#d2eaf5"
        },
        title: {
            default: "标题"
        },
        fontSize: {
            default(){
                return ["16px","16px"]
            }
        },
        fontColor: {
            default(){
                return ["#000","#000"]
            }
        }
    },
    data() {
        return {};
    },
    computed: {
        iconStyle: function() {
            return {
                background: this.iconBgColor,
                width: eval(this.iconSize.replace('px',''))+2+"px",
                height:eval(this.iconSize.replace('px',''))+2+"px",
                "border-radius": "50%"
            };
        },
        fontStyle0: function() {
            return {
                'font-size': this.fontSize[0],
                color: this.fontColor[0],
                'margin-left': '10px'
            };
        },
        fontStyle1: function() {
            return {
                'font-size': this.fontSize[1],
                color: this.fontColor[1],
                'margin-left': '10px'
            };
        }
    }
};
</script>
<style scoped>

</style>

