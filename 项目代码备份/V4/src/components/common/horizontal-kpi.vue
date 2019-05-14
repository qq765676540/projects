<template>
    <div class="flex">
        <div class="flex flex-justify-center flex-align-center" style="max-width:10px">
            <div class="flex flex-justify-center flex-align-center" :style="iconStyle">
                <img
                    src="../../assets/image/customer.png"
                    :width="iconSize"
                    :height="iconSize"
                    v-if="iconImgShow"
                >
            </div>
        </div>
        <div class="flex flex-justify-left flex-align-center" style="margin-left:5px;white-space: nowrap;color:#666666">{{title}}</div>
        <div class="flex flex-justify-center flex-align-center" :style="fontStyle">{{data}}</div>
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
            default: 0
        },
        iconImgShow: {
            type: Boolean,
            default: false
        },
        iconSize: {
            default: "4px"
        },
        iconBgColor: {
            default: "#d2eaf5"
        },
        title: {
            default: "标题"
        },
        fontSize: {
            default: "16px"
        },
        fontColor: {
            default: "#333333"
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
        fontStyle: function() {
            return {
                'font-size': this.fontSize,
                color: this.fontColor,
                'margin-left': '10px'
            };
        }
    }
};
</script>
<style scoped>

</style>

