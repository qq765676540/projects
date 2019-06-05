var demoData = {
    homeData: {
        overview: {
            kpi_1: [
                ['总收入', '21,193,200', ''],
                ['完成率', '120%', ''],
                ['同比', '25%', '']
            ],
            kpi_2: [
                ['战略产品', '16,889', '台'],
                ['完成率', '88%', ''],
                ['同比', '36%', '']
            ],
            kpi_3: [
                ['毛利额', '151,000', ''],
                ['完成率', '58%', ''],
                ['同比', '18%', '']
            ],
            kpi_4: [
                ['毛利率', '58%', ''],
                ['去年同期', '88%', ''],
                ['同比', '36%', '']
            ],
            kpi_5: [
                ['扣费毛利', '281,000', ''],
                ['完成率', '58%', ''],
                ['同比', '18%', '']
            ],
            kpi_6: [
                ['扣费毛利率', '33%', ''],
                ['去年同期', '88%', ''],
                ['同比', '36%', '']
            ],
            kpi_7: [
                ['人均销售额', '58,000', '万元/人'],
                ['去年同期', '153', '万元/人'],
                ['同比', '9%', '']
            ],
            kpi_8: [
                ['人均扣费毛利', '200', '万元/人'],
                ['去年同期', '132', '万元/人'],
                ['同比', '36%', '']
            ]
        }
    },
    incomeData: {
        bp: {
            xAxisData: [
                '业务部ABC01',
                '业务部ABC02',
                '业务部ABC03',
                '业务部ABC04',
                '业务部ABC05',
                '业务部ABC06',
                '业务部ABC07',
                '业务部ABC08',
                '业务部ABC09',
                '业务部ABC10',
                '业务部ABC12',
                '业务部ABC13'
            ],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
            seriesData3: [20, 30, 40, 30, -20, 20, 15, 30, 20, 10, 25, 20]
        },
        bpDrillDown: {
            业务部ABC10: {
                xAxisData: [
                    '产品线ABC01',
                    '产品线ABC02',
                    '产品线ABC03',
                    '产品线ABC04',
                    '产品线ABC05',
                    '产品线ABC06',
                    '产品线ABC07',
                    '产品线ABC08',
                    '产品线ABC09',
                    '产品线ABC10',
                    '产品线ABC11',
                    '产品线ABC12'
                ],
                seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
                seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
                seriesData3: [20, 30, 40, 30, -20, 20, 15, 30, 20, 10, 25, 20]
            },
            业务部ABC09: {
                xAxisData: [
                    '产品线ABC01',
                    '产品线ABC02',
                    '产品线ABC03',
                    '产品线ABC04',
                    '产品线ABC05',
                    '产品线ABC06',
                    '产品线ABC07',
                    '产品线ABC08',
                    '产品线ABC09',
                    '产品线ABC10',
                    '产品线ABC12',
                    '产品线ABC13'
                ],
                seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
                seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
                seriesData3: [20, 30, 40, 30, -20, 20, 15, 30, 20, 10, 25, 20]
            }

        },
        structure: [
            {
                bar: {
                    text: '业务部总体行业同比',
                    xAxis: [
                        '行业XXXA',
                        '行业XXXB',
                        '行业XXXC',
                        '行业XXXD',
                        '行业XXXE',
                        '行业XXXF',
                        '行业XXXG',
                        '行业XXXC',
                        '行业XXXD',
                        '行业XXXE',
                        '行业XXXF',
                        '行业XXXG'
                    ],
                    series: [90, 100, 80, 80, 70, 68, 95, 80, 80, 70, 68, 95],
                    avg: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
                }
            },
            {
                bar: {
                    text: '业务部总体行业同比',
                    xAxis: [
                        '行业XXXA',
                        '行业XXXB',
                        '行业XXXC',
                        '行业XXXD',
                        '行业XXXE',
                        '行业XXXF',
                        '行业XXXG',
                        '行业XXXC',
                        '行业XXXD',
                        '行业XXXE',
                        '行业XXXF',
                        '行业XXXG'
                    ],
                    series: [100, 80, 79, 50, 70, 68, 100, 80, 80, 70, 68, 95],
                    avg: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
                }
            },
            {
                pie: [
                    { value: 335, name: '直接访问' },
                    { value: 310, name: '邮件营销' },
                    { value: 234, name: '联盟广告' },
                    { value: 135, name: '视频广告' },
                    { value: 1548, name: '搜索引擎' }
                ],
                text: '业务部总体占比'

            }
        ],
        branch: {
            xAxisData: [
                '业务部ABC01',
                '业务部ABC02',
                '业务部ABC03',
                '业务部ABC04',
                '业务部ABC05',
                '业务部ABC06',
                '业务部ABC07',
                '业务部ABC08',
                '业务部ABC09',
                '业务部ABC10',
                '业务部ABC12',
                '业务部ABC13'
            ],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
            seriesData3: [20, 30, 40, 30, -20, 20, 15, 30, 20, 10, 25, 20]
        },
        trend: {
            legend: ['业务部A', '业务部B', '业务部C', '业务部D', '业务部E', '业务部F', '业务部G', '业务部H'],
            xAxis: ['201801', '201802', '201803', '201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812'],
            series: [
                {
                    name: '业务部A',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230]
                },
                {
                    name: '业务部B',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330]
                },
                {
                    name: '业务部C',
                    type: 'line',
                    data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330]
                },
                {
                    name: '业务部D',
                    type: 'line',
                    data: [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330]
                },
                {
                    name: '业务部E',
                    type: 'line',
                    data: [90, 60, 30, 134, 90, 50, 130, 60, 30, 134, 90, 50]
                },
                {
                    name: '业务部F',
                    type: 'line',
                    data: [100, 182, 191, 100, 290, 200, 150, 182, 191, 100, 290, 200]
                },
                {
                    name: '业务部G',
                    type: 'line',
                    data: [150, 100, 201, 154, 190, 200, 130, 100, 201, 154, 190, 200]
                },
                {
                    name: '业务部H',
                    type: 'line',
                    data: [200, 150, 301, 334, 300, 150, 320, 150, 301, 334, 300, 150]
                }
            ]
        }
    },
    grossData: {
        bp: {
            xAxisData: [
                '业务部ABC01',
                '业务部ABC02',
                '业务部ABC03',
                '业务部ABC04',
                '业务部ABC05',
                '业务部ABC06',
                '业务部ABC07',
                '业务部ABC08',
                '业务部ABC09',
                '业务部ABC10',
                '业务部ABC12',
                '业务部ABC13'
            ],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
            seriesData3: [20, 30, 40, 30, -20, 20, 15, 30, 20, 10, 25, 20]
        },
        deduction: {
            xAxis: ['201801', '201802', '201803', '201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812'],
            series: [
                {
                    name: '上年毛利率',
                    type: 'line',
                    lineStyle: {
                        type: 'dashed'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230]
                },
                {
                    name: '本年毛利率',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330]
                },
                {
                    name: '上年扣费毛利率',
                    type: 'line',
                    lineStyle: {
                        type: 'dashed'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330]
                },
                {
                    name: '本年扣费毛利率',
                    type: 'line',
                    data: [320, 332, 301, 334, 390, 330, 320, 332, 301, 334, 390, 330]
                }
            ]
        }
    },
    costData: {
        rate: {
            xAxisData: ['201801', '201802', '201803', '201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812'],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
            seriesData3: [20, 30, 40, 30, 20, 20, 15, 30, 20, 10, 25, 20],
            seriesData4: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        },
        structure: {
            kpi_1: [
                ['人力成本', '1563', ''],
                ['预算消耗', '99%', ''],
                ['同比', '15%', '']
            ],
            kpi_2: [
                ['差旅费用', '68', ''],
                ['预算消耗', '88%', ''],
                ['同比', '36%', '']
            ],
            kpi_3: [
                ['检测认证', '151,000', ''],
                ['预算消耗', '58%', ''],
                ['同比', '18%', '']
            ],
            kpi_4: [
                ['研发领料', '58%', ''],
                ['预算消耗', '88%', ''],
                ['同比', '36%', '']
            ],
            kpi_5: [
                ['退货拆解', '281,000', ''],
                ['预算消耗', '58%', ''],
                ['同比', '18%', '']
            ],
            kpi_6: [
                ['模具手板', '33%', ''],
                ['预算消耗', '88%', ''],
                ['同比', '36%', '']
            ]
        },
        trend: {
            xAxis: ['201801', '201802', '201803', '201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812',
                '201901', '201902', '201903', '201904', '201905', '201906', '201907', '201908', '201909', '201910', '201911', '201912'],
            series: [
                {
                    name: '人均人力成本',
                    type: 'line',
                    data: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '人均非人力成本',
                    type: 'line',
                    data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '人均成本',
                    type: 'line',
                    data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410, 220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290]
                }
            ]
        }
    },
    orderData: {
        base: {
            xAxisData: ['201801', '201802', '201803', '201804', '201805', '201806', '201807', '201808', '201809', '201810', '201811', '201812'],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
            seriesData2: [110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 5],
            seriesData3: [20, 30, 40, 30, 20, 20, 15, 30, 20, 10, 25, 20],
            seriesData4: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        },
        structure: {
            pie: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1048, name: '搜索引擎' }
            ],
            text: ''
        },
        branch: {
            xAxisData: [
                '产品线ABC01',
                '产品线ABC02',
                '产品线ABC03',
                '产品线ABC04',
                '产品线ABC05',
                '产品线ABC06',
                '产品线ABC07',
                '产品线ABC08',
                '产品线ABC09',
                '产品线ABC10',
                '产品线ABC12'
            ],
            seriesData1: [120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
        }
    }

}

export default demoData;