<template>
<div class="flex flex-column" style="width:95%">
    <div class="flex flex-1">
        <div class="flex flex-1 flex-justify-left">
            <div class="titleName flex flex-1 flex-align-center">{{data[1]['title']}}</div>
            <div class="titleValue flex flex-4 flex-align-center">{{data[1]['value']}}</div>
        </div>
    </div>
    <div class="process-bar flex flex-row flex-1 flex-align-center">
        <div :style="Bars" :id="id" class="process-outline flex-3">
            <div :style="BarsDiv" class="process-progress"></div>
        </div>
        <div class="process-value flex-1 flex-justify-right" :style="fontStyle">{{data[0]['value']+'%'}}</div>
    </div>
    <div class="flex flex-1 flex-justify-left">
        <div class="flex flex-1 flex-justify-left">
            <div class="subtitleName flex flex-1 flex-align-center">{{data[2]['title']}}&nbsp;&nbsp;{{data[2]['value']}}</div>
            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
        </div>
        <div class="flex flex-1 flex-justify-left">
            <div class="subtitleName flex flex-1 flex-align-center">{{data[3]['title']}}&nbsp;&nbsp;{{data[3]['value']}}</div>
            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
        </div>
        <div class="flex flex-1 flex-justify-left">
            <div class="subtitleName flex flex-1 flex-align-center">{{data[4]['title']}}&nbsp;&nbsp;{{data[4]['value']}}</div>
            <!-- <div class="subtitleValue flex flex-2 flex-align-center"></div> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        id: {
            type: String,
            default: function () {
                return Math.random().toFixed(8);
            }
        },
        data: {
            type: Number,
            default: 0
        },
        barWidth: {
            type: String,
            default: "100%"
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
        Bars: function () {
            return {
                position: "relative",
                width: this.barWidth,
                background: this.barBgcolor_o,
                "border-radius": this.barRadius,
                "margin-right": "20px"
            };
        },
        BarsDiv: function () {
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
        fontStyle: function () {
            return {
                "font-size": this.fontSize,
                color: this.fontColor
            };
        }
    },
    mounted() {
        this.initData = this.data[0]['value'] > 100 ? 100 : this.data[0]['value'];
    },
    watch: {
        data: function (nVal) {
            this.initData = nVal[0]['value'] > 100 ? 100 : nVal[0]['value'];
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

.titleName {
    font-size: 14px;
    font-weight: bold;
    color: #333333;
    margin-top: 3px;
}

.titleValue {
    font-size: 22px;
    font-weight: bold;
    color: #222222;
}

.subtitleName {
    font-size: 12px;
    color: #333333;
}

.subtitleValue {
    font-size: 14px;
    color: #222222;
}
</style>
