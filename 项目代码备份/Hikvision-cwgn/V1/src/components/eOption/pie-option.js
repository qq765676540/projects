var scale = 1;
var echartData = [{
    value: 124,
    name: '曲阜师范大学'
}, {
    value: 234,
    name: '潍坊学院'
}, {
    value: 111,
    name: '青岛职业技术学院'
}, {
    value: 214,
    name: '淄博师范高等专科'
}]

var rich = {
    value: {
        fontSize: 12 * scale,
        padding: [2, 0],
        align: 'center'
    },
    name: {
        align: 'center',
        fontSize: 9 * scale,
        padding: [2, 0]
    },
    hr: {
        borderColor: '#0F8EE955',
        width: '100%',
        borderWidth: 1,
        height: 0,
    }
}

var option = {
    series: [{
        type: 'pie',
        radius: ['35%', '50%'],
        hoverAnimation: false,
        color: ['#C28CC3', '#F46950', '#60CBC1', '#0F8EE9', '#6f81da', '#00ffb4'],
        label: {
            normal: {
                formatter: function(params, ticket, callback) {
                    var total = 0; 
                    var percent = 0; 
                    echartData.forEach(function(value, index, array) {
                        total += value.value;
                    });
                    percent = ((params.value / total) * 100).toFixed(1);
                    return '{value|' + params.value + '/' + percent +'%}\n{hr|}\n{name|' + params.name + '}';
                },
                rich: rich
            },
        },
        labelLine: {
            normal: {
                length: 20 * scale,
                length2: 0,
                lineStyle: {
                    color: '#0F8EE955'
                }
            }
        },
        data: echartData
    }]
}

export default option;