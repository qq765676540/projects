<template>
    <div class="flex flex-column">
        <div class="flex flex-1">
            <div class="flex flex-1 flex-justify-left">{{title}}</div>
            <div class="flex-1"></div>
        </div>
        <div class="process-bar flex flex-row flex-1 flex-align-center">
            <div :style="Bars" :id="id" class="process-outline flex-3">
                <div :style="BarsDiv" class="process-progress"></div>
            </div>
            <div class="process-value flex-1 flex-justify-right" :style="fontStyle">{{data+'%'}}</div>
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
        return {
            initData: 0
        };
    },
    computed: {
        Bars: function() {
            return {
                position: "relative",
                width: this.barWidth,
                background: this.barBgcolor_o,
                "border-radius": this.barRadius
            };
        },
        BarsDiv: function() {
            return {
                display: "block",
                position: "relative",
                background: this.barBgcolor_i,
                width: this.initData + "%",
                color: "#fff",
                transition: "width 0.5s ease-out",
                height: this.barHeight,
                "line-height": this.barHeight,
                "border-radius": this.barRadius,
            };
        },
        fontStyle: function() {
            return {
                "font-size": this.fontSize,
                color: this.fontColor
            };
        }
    },
    mounted() {
        this.initData = this.data;
    },
    watch: {
        data: function(nVal) {
            this.initData = nVal;
        }
    },
};
</script>
<style scoped>

.process-outline {
    max-height: 10px;
}

.process-value {
    max-width: 50px;
    min-width: 50px;
}
</style>
