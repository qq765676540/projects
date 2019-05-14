<template>
    <div class="flex flex-column">
        <div class="flex flex-1">
            <div class="flex flex-1 flex-justify-left flex-align-center">{{title}}</div>
            <div class="flex-3"></div>
            <div class="flex flex-1 flex-justify-right flex-align-center" :style="fontStyle">{{data+'%'}}</div>
        </div>
        <div class="flex-1">
            <div :style="Bars" :id="id">
                <div :style="BarsDiv"></div>
            </div>
        </div>
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
            type: Number,
            default: 0
        },
        barWidth: {
            type: String,
            default: "90px"
        },
        barHeight: {
            type: String,
            default: "18px"
        },
        barBgcolor_o: {
            type: String,
            default: "#efefef"
        },
        barBgcolor_i: {
            type: String,
            default: "#00f"
        },
        barRadius: {
            type: String,
            default: "1px 1px 1px 1px"
        },
        title: {
            type: String,
            default: "标题"
        },
        fontSize: {
            type: String,
            default: "18px"
        },
        fontColor: {
            type: String,
            default: "#000"
        }
    },
    data() {
        return {};
    },
    computed: {
        Bars: function() {
            return {
                position: "relative",
                width: this.barWidth,
                padding: "1px",
                background: this.barBgcolor_o,
                "border-radius": this.barRadius
            };
        },
        BarsDiv: function() {
            return {
                display: "block",
                position: "relative",
                background: this.barBgcolor_i,
                width: "0%",
                color: "#fff",
                transition: "width 0.5s ease-out",
                height: this.barHeight,
                "line-height": this.barHeight,
                "border-radius": this.barRadius
            };
        },
        fontStyle: function() {
            return {
                "font-size": this.fontSize,
                color: this.fontColor
            };
        }
    },
    watch: {
        data: function(val) {
            $("#" + this.id)
                .find("div")
                .css("width", val + "%");
        }
    },
    mounted() {
        
    },
    destroyed() {}
};
</script>
<style scoped>
</style>
