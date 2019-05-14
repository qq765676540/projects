var dataStyle = {
    normal: {
        label: {
            show: true,
            color: '#fff',
            fontSize: 18,
        },
        labelLine: {
            length: 12,
            length2: 12,
            lineStyle: {
                color: 'rgba(20,150,200,0.7)'
            }
        },
    }
};

var labelShow = {
    show: true,
    normal: {
        formatter: '{c}\n{d}%',
        fontSize: 15,
        color: 'black'
    },
};

var option = {
    backgroundColor: 'rgba(0,0,0,0)',
    color: ['#00358e', '#0053b7', '#036dd8', '#059de0', '#00b9cc', '#81c106', '#aeb702', '#dda03e'], 
    tooltip: {
        show: true,
        formatter: "{b} <br/> {c} ({d}%)"
    },
    angleAxis: {
        type: 'category',
        z: 10,
        axisLine: {
            color: '#fff',
            lineStyle: {
                width: 1,
                color: '#1595C8',
            }
        },
    },
    radiusAxis: {
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false,
            color: '#fff',
        },
        axisLine: {
            show: false,
            color: '#fff',
            lineStyle: {
                color: '#fff',
            }
        },
        splitLine: {
            color: '#000',
            lineStyle: {
                type: 'dotted',
                color: 'rgba(170,170,170,.5)',
            }
        },
    },
    polar: {
        center: ['40%', '52%'],
        radius: '56%',
    },
    legend: {
        show: true,
        orient: 'vertical',
        left: '75%',
        top: '20%',
        icon: 'circle',
        textStyle: {
            color: '#54C0E6',
            fontSize: 14
        },
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 15,
        data: []
    },
    series: {
        type: 'pie',
        clockWise: true,
        center: ['40%', '52%'],
        radius: ['40%', '53%'],
        itemStyle: dataStyle,
        hoverAnimation: true,
        label: {
            fontSize: 15,
        },
        data: []
    }
};

export {option, labelShow};