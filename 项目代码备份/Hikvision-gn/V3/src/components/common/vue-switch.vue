<template>
<div :id="id" @click="handleClick" :style="oStyle" class="vue-switch relative flex">
    <div :id="id+'-btn'" class="vue-switch-btn absolute" :style="iStyle"></div>
    <span class="vue-switch-on" >On</span>
    <span class="vue-switch-off" >Off</span>
</div>
</template>

<script>
import img from '../../assets/image/filter.png'
export default {
    props: {
        switchStyle: {
            type: Object,
            default () {
                return {}
            }
        },
        id: {
            type: String,
            default: Math.random()
        },
        open: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            textFlag: false,
            isOpen: this.open
        }
    },
    methods: {
        handleClick() {
            this.isOpen = !this.isOpen;
            this.switchTo(this.isOpen);
            this.$emit('switch-to');
        },
        switchTo(isOpen) {
            if (isOpen) {
                $(`#${this.id}-btn`).animate({
                    left: (this.switchStyle.width - this.switchStyle.height) / 40 + 'rem'
                }, 300);
                $(`#${this.id}-btn`).css('backgroundColor', '#8BC34A');
            } else {
                $(`#${this.id}-btn`).animate({
                    left: 0
                }, 300);
                $(`#${this.id}-btn`).css('backgroundColor', '#3D92E2');
            }
        }
    },
    watch: {
        open(n, o) {
            this.isOpen = n;
            this.switchTo(n);
        }
    },
    computed: {
        oStyle() {
            return {
                height: this.switchStyle.height / 40 + 'rem',
                width: this.switchStyle.width / 40 + 'rem',
                borderRadius: this.switchStyle.height / 40 + 'rem',
                backgroundColor: this.switchStyle.bgColor
            }
        },
        iStyle() {
            return {
                height: (this.switchStyle.height) / 40 + 'rem',
                width: (this.switchStyle.height) / 40 + 'rem',
                borderRadius: (this.switchStyle.height) / 40 / 2 + 'rem',
                background: `url(${img}) center no-repeat`,
                backgroundColor: '#3D92E2',
                backgroundSize: '80%',
                zIndex: 100
            }
        }
    }
}
</script>

<style>
.vue-switch-on {
    position: absolute;
    right: 3px;
    align-items: center;
    display: flex;
    height: 100%;
    font-weight: bold;
    font-size: 12px;
    z-index: 1;
}

.vue-switch-off {
    position: absolute;
    left: 3px;
    align-items: center;
    display: flex;
    height: 100%;
    font-weight: bold;
    font-size: 12px;
    z-index: 1;
}
</style>
