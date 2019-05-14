<template>
<div id="water-mark" class="water-mark"></div>
</template>

<script>
export default {
    props: {
        userName: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.drawWaterMark(this.userName);
    },
    methods: {
        getImgBase64(text, fontsize, fontcolor, sWidth, sHeight) {
            var canvas = document.createElement('canvas');
            var $buHeight = 0;
            if (fontsize <= 32) {
                $buHeight = 99;
            } else if (fontsize > 32 && fontsize <= 60) {
                $buHeight = 2;
            } else if (fontsize > 60 && fontsize <= 80) {
                $buHeight = 4;
            } else if (fontsize > 80 && fontsize <= 100) {
                $buHeight = 6;
            } else if (fontsize > 100) {
                $buHeight = 10;
            }
            canvas.height = fontsize + $buHeight;
            canvas.padding = 30;
            canvas.width = sWidth / 3.2;
            canvas.height = sHeight / 4;

            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width * 2, canvas.height);
            context.rotate(-60 / 180)
            context.fillStyle = fontcolor;
            context.font = fontsize + 'px Arial';
            context.textBaseline = 'middle';
            context.fillText(text, 0, fontsize * 2);

            var dataUrl = canvas.toDataURL('image/png');
            return dataUrl;
        },
        drawWaterMark(text) {
            var waterMark = document.createElement('div');
            var img = this.getImgBase64(text, 22, 'black', 375, 660);
            var style = waterMark.style;
            style.position = 'absolute';
            style.left = '15px';
            style.top = '15px';
            style.width = 'calc(100% - 40px)';
            style.height = 'calc(100% - 40px)';
            style.opacity = 0.1;
            style.background = `url(${img})`;
            style.zIndex = 5555;
            style.pointerEvents = 'none';
            var root = document.getElementById('water-mark');
            root.appendChild(waterMark);
        }
    }
}
</script>

<style>
.water-mark {
    height: 100%;
    width: 100%;
}
</style>

