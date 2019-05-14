let baseSerie = {
    data: [],
    type: 'pie',
    radius: [30, 80],
    center: ['50%', '50%'],
    data: [],
    label: {
        normal: {
            position: 'outside',
            show: true,
            // formatter:'{y|{b}}  {x|{d}%}',
            formatter: (q) => {
                let percent = q.percent.toFixed(1);
                if(percent.split('.')[1] === '0'){
                    percent = percent.split('.')[0];
                }
                let name = q.name;
                // return '{y|'+name+'} {x|'+percent+'%}';
                return '{x|'+percent+'%}';
            },
            rich: {
                x: {
                    fontSize: 18,
                    lineHeight: 10
                },
                y: {
                    color: 'black',
                    fontSize: 12,
                }
            }
        }
    },
    labelLine: {
        normal: {
            smooth: 0.2,
            length: 5,
            length2: 10
        }
    },
    animation: true,
    animationDuration: 800,
    // animationType: 'scale',
    // animationEasing: 'elasticOut',
    animationDelay: function (idx) {
        return Math.random() * 500;
    }
};

let pieOption = {
    legend: {
        show: false
    },
    color: ["#448DFF", "#59D4FF", "#751DE2", "#BB2B79", "#DB479B", "#F8B9D9", "#D391B8", "#C2A0F7", "#AEEFFE", "#A7D0FF"],
    series: []
};



export { pieOption, baseSerie };