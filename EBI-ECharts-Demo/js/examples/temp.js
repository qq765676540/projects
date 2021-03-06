var arr = [];
arr.push({
  index: 0,
  option: {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line"
      }
    ]
  }
});

arr.push({
  index: 1,
  option: {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  }
});

arr.push({
  index: 2,
  option: {
    color: ["#003366", "#006699", "#4cabce", "#e5323e"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: ["Forest", "Steppe", "Desert", "Wetland"]
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["2012", "2013", "2014", "2015", "2016"]
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Forest",
        type: "bar",
        barGap: 0,
        label: {
          normal: {
            show: true,
            position: "insideBottom",
            distance: 15,
            align: "left",
            verticalAlign: "middle",
            rotate: 90,
            formatter: "{c}  {name|{a}}",
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: "#fff"
              }
            }
          }
        },
        data: [320, 332, 301, 334, 390]
      },
      {
        name: "Steppe",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "insideBottom",
            distance: 15,
            align: "left",
            verticalAlign: "middle",
            rotate: 90,
            formatter: "{c}  {name|{a}}",
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: "#fff"
              }
            }
          }
        },
        data: [220, 182, 191, 234, 290]
      },
      {
        name: "Desert",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "insideBottom",
            distance: 15,
            align: "left",
            verticalAlign: "middle",
            rotate: 90,
            formatter: "{c}  {name|{a}}",
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: "#fff"
              }
            }
          }
        },
        data: [150, 232, 201, 154, 190]
      },
      {
        name: "Wetland",
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "insideBottom",
            distance: 15,
            align: "left",
            verticalAlign: "middle",
            rotate: 90,
            formatter: "{c}  {name|{a}}",
            fontSize: 16,
            rich: {
              name: {
                textBorderColor: "#fff"
              }
            }
          }
        },
        data: [98, 77, 101, 99, 40]
      }
    ]
  }
});

arr.push({
  index: 3,
  option: {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: {
      type: "value"
    },
    yAxis: {
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    },
    series: [
      {
        name: "直接访问",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: "邮件营销",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "联盟广告",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: "视频广告",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: "搜索引擎",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: true,
            position: "insideRight"
          }
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  }
});

arr.push({
  index: 4,
  option: {
    backgroundColor: "#2c343c",

    title: {
      text: "Customized Pie",
      left: "center",
      top: 20,
      textStyle: {
        color: "#ccc"
      }
    },

    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 274, name: "联盟广告" },
          { value: 235, name: "视频广告" },
          { value: 400, name: "搜索引擎" }
        ].sort(function(a, b) {
          return a.value - b.value;
        }),
        roseType: "radius",
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          }
        },
        itemStyle: {
          normal: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },

        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function(idx) {
          return Math.random() * 200;
        }
      }
    ]
  }
});

arr.push({
  index: 5,
  option: {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 335, name: "直接访问" },
          { value: 310, name: "邮件营销" },
          { value: 234, name: "联盟广告" },
          { value: 135, name: "视频广告" },
          { value: 1548, name: "搜索引擎" }
        ]
      }
    ]
  }
});

var data6 = [
  [
    [28604, 77, 17096869, "Australia", 1990],
    [31163, 77.4, 27662440, "Canada", 1990],
    [1516, 68, 1154605773, "China", 1990],
    [13670, 74.7, 10582082, "Cuba", 1990],
    [28599, 75, 4986705, "Finland", 1990],
    [29476, 77.1, 56943299, "France", 1990],
    [31476, 75.4, 78958237, "Germany", 1990],
    [28666, 78.1, 254830, "Iceland", 1990],
    [1777, 57.7, 870601776, "India", 1990],
    [29550, 79.1, 122249285, "Japan", 1990],
    [2076, 67.9, 20194354, "North Korea", 1990],
    [12087, 72, 42972254, "South Korea", 1990],
    [24021, 75.4, 3397534, "New Zealand", 1990],
    [43296, 76.8, 4240375, "Norway", 1990],
    [10088, 70.8, 38195258, "Poland", 1990],
    [19349, 69.6, 147568552, "Russia", 1990],
    [10670, 67.3, 53994605, "Turkey", 1990],
    [26424, 75.7, 57110117, "United Kingdom", 1990],
    [37062, 75.4, 252847810, "United States", 1990]
  ],
  [
    [44056, 81.8, 23968973, "Australia", 2015],
    [43294, 81.7, 35939927, "Canada", 2015],
    [13334, 76.9, 1376048943, "China", 2015],
    [21291, 78.5, 11389562, "Cuba", 2015],
    [38923, 80.8, 5503457, "Finland", 2015],
    [37599, 81.9, 64395345, "France", 2015],
    [44053, 81.1, 80688545, "Germany", 2015],
    [42182, 82.8, 329425, "Iceland", 2015],
    [5903, 66.8, 1311050527, "India", 2015],
    [36162, 83.5, 126573481, "Japan", 2015],
    [1390, 71.4, 25155317, "North Korea", 2015],
    [34644, 80.7, 50293439, "South Korea", 2015],
    [34186, 80.6, 4528526, "New Zealand", 2015],
    [64304, 81.6, 5210967, "Norway", 2015],
    [24787, 77.3, 38611794, "Poland", 2015],
    [23038, 73.13, 143456918, "Russia", 2015],
    [19360, 76.5, 78665830, "Turkey", 2015],
    [38225, 81.4, 64715810, "United Kingdom", 2015],
    [53354, 79.1, 321773631, "United States", 2015]
  ]
];

arr.push({
  index: 6,
  option: {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
      {
        offset: 0,
        color: "#f7f8fa"
      },
      {
        offset: 1,
        color: "#cdd0d5"
      }
    ]),
    title: {
      text: "1990 与 2015 年各国家人均寿命与 GDP"
    },
    legend: {
      right: 10,
      data: ["1990", "2015"]
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      scale: true
    },
    series: [
      {
        name: "1990",
        data: data6[0],
        type: "scatter",
        symbolSize: function(data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function(param) {
              return param.data[3];
            },
            position: "top"
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: "rgba(120, 36, 50, 0.5)",
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: "rgb(251, 118, 123)"
              },
              {
                offset: 1,
                color: "rgb(204, 46, 72)"
              }
            ])
          }
        }
      },
      {
        name: "2015",
        data: data6[1],
        type: "scatter",
        symbolSize: function(data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function(param) {
              return param.data[3];
            },
            position: "top"
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: "rgba(25, 100, 150, 0.5)",
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
              {
                offset: 0,
                color: "rgb(129, 227, 238)"
              },
              {
                offset: 1,
                color: "rgb(25, 183, 207)"
              }
            ])
          }
        }
      }
    ]
  }
});

arr.push({
  index: 7,
  option: {
    xAxis: {
      scale: true
    },
    yAxis: {
      scale: true
    },
    series: [
      {
        type: "effectScatter",
        symbolSize: 20,
        data: [[172.7, 105.2], [153.4, 42]]
      },
      {
        type: "scatter",
        data: [
          [161.2, 51.6],
          [167.5, 59.0],
          [159.5, 49.2],
          [157.0, 63.0],
          [155.8, 53.6],
          [170.0, 59.0],
          [159.1, 47.6],
          [166.0, 69.8],
          [176.2, 66.8],
          [160.2, 75.2],
          [172.5, 55.2],
          [170.9, 54.2],
          [172.9, 62.5],
          [153.4, 42.0],
          [160.0, 50.0],
          [147.2, 49.8],
          [168.2, 49.2],
          [175.0, 73.2],
          [157.0, 47.8],
          [167.6, 68.8],
          [159.5, 50.6],
          [175.0, 82.5],
          [166.8, 57.2],
          [176.5, 87.8],
          [170.2, 72.8],
          [174.0, 54.5],
          [173.0, 59.8],
          [179.9, 67.3],
          [170.5, 67.8],
          [160.0, 47.0],
          [154.4, 46.2],
          [162.0, 55.0],
          [176.5, 83.0],
          [160.0, 54.4],
          [152.0, 45.8],
          [162.1, 53.6],
          [170.0, 73.2],
          [160.2, 52.1],
          [161.3, 67.9],
          [166.4, 56.6],
          [168.9, 62.3],
          [163.8, 58.5],
          [167.6, 54.5],
          [160.0, 50.2],
          [161.3, 60.3],
          [167.6, 58.3],
          [165.1, 56.2],
          [160.0, 50.2],
          [170.0, 72.9],
          [157.5, 59.8],
          [167.6, 61.0],
          [160.7, 69.1],
          [163.2, 55.9],
          [152.4, 46.5],
          [157.5, 54.3],
          [168.3, 54.8],
          [180.3, 60.7],
          [165.5, 60.0],
          [165.0, 62.0],
          [164.5, 60.3],
          [156.0, 52.7],
          [160.0, 74.3],
          [163.0, 62.0],
          [165.7, 73.1],
          [161.0, 80.0],
          [162.0, 54.7],
          [166.0, 53.2],
          [174.0, 75.7],
          [172.7, 61.1],
          [167.6, 55.7],
          [151.1, 48.7],
          [164.5, 52.3],
          [163.5, 50.0],
          [152.0, 59.3],
          [169.0, 62.5],
          [164.0, 55.7],
          [161.2, 54.8],
          [155.0, 45.9],
          [170.0, 70.6],
          [176.2, 67.2],
          [170.0, 69.4],
          [162.5, 58.2],
          [170.3, 64.8],
          [164.1, 71.6],
          [169.5, 52.8],
          [163.2, 59.8],
          [154.5, 49.0],
          [159.8, 50.0],
          [173.2, 69.2],
          [170.0, 55.9],
          [161.4, 63.4],
          [169.0, 58.2],
          [166.2, 58.6],
          [159.4, 45.7],
          [162.5, 52.2],
          [159.0, 48.6],
          [162.8, 57.8],
          [159.0, 55.6],
          [179.8, 66.8],
          [162.9, 59.4],
          [161.0, 53.6],
          [151.1, 73.2],
          [168.2, 53.4],
          [168.9, 69.0],
          [173.2, 58.4],
          [171.8, 56.2],
          [178.0, 70.6],
          [164.3, 59.8],
          [163.0, 72.0],
          [168.5, 65.2],
          [166.8, 56.6],
          [172.7, 105.2],
          [163.5, 51.8],
          [169.4, 63.4],
          [167.8, 59.0],
          [159.5, 47.6],
          [167.6, 63.0],
          [161.2, 55.2],
          [160.0, 45.0],
          [163.2, 54.0],
          [162.2, 50.2],
          [161.3, 60.2],
          [149.5, 44.8],
          [157.5, 58.8],
          [163.2, 56.4],
          [172.7, 62.0],
          [155.0, 49.2],
          [156.5, 67.2],
          [164.0, 53.8],
          [160.9, 54.4],
          [162.8, 58.0],
          [167.0, 59.8],
          [160.0, 54.8],
          [160.0, 43.2],
          [168.9, 60.5],
          [158.2, 46.4],
          [156.0, 64.4],
          [160.0, 48.8],
          [167.1, 62.2],
          [158.0, 55.5],
          [167.6, 57.8],
          [156.0, 54.6],
          [162.1, 59.2],
          [173.4, 52.7],
          [159.8, 53.2],
          [170.5, 64.5],
          [159.2, 51.8],
          [157.5, 56.0],
          [161.3, 63.6],
          [162.6, 63.2],
          [160.0, 59.5],
          [168.9, 56.8],
          [165.1, 64.1],
          [162.6, 50.0],
          [165.1, 72.3],
          [166.4, 55.0],
          [160.0, 55.9],
          [152.4, 60.4],
          [170.2, 69.1],
          [162.6, 84.5],
          [170.2, 55.9],
          [158.8, 55.5],
          [172.7, 69.5],
          [167.6, 76.4],
          [162.6, 61.4],
          [167.6, 65.9],
          [156.2, 58.6],
          [175.2, 66.8],
          [172.1, 56.6],
          [162.6, 58.6],
          [160.0, 55.9],
          [165.1, 59.1],
          [182.9, 81.8],
          [166.4, 70.7],
          [165.1, 56.8],
          [177.8, 60.0],
          [165.1, 58.2],
          [175.3, 72.7],
          [154.9, 54.1],
          [158.8, 49.1],
          [172.7, 75.9],
          [168.9, 55.0],
          [161.3, 57.3],
          [167.6, 55.0],
          [165.1, 65.5],
          [175.3, 65.5],
          [157.5, 48.6],
          [163.8, 58.6],
          [167.6, 63.6],
          [165.1, 55.2],
          [165.1, 62.7],
          [168.9, 56.6],
          [162.6, 53.9],
          [164.5, 63.2],
          [176.5, 73.6],
          [168.9, 62.0],
          [175.3, 63.6],
          [159.4, 53.2],
          [160.0, 53.4],
          [170.2, 55.0],
          [162.6, 70.5],
          [167.6, 54.5],
          [162.6, 54.5],
          [160.7, 55.9],
          [160.0, 59.0],
          [157.5, 63.6],
          [162.6, 54.5],
          [152.4, 47.3],
          [170.2, 67.7],
          [165.1, 80.9],
          [172.7, 70.5],
          [165.1, 60.9],
          [170.2, 63.6],
          [170.2, 54.5],
          [170.2, 59.1],
          [161.3, 70.5],
          [167.6, 52.7],
          [167.6, 62.7],
          [165.1, 86.3],
          [162.6, 66.4],
          [152.4, 67.3],
          [168.9, 63.0],
          [170.2, 73.6],
          [175.2, 62.3],
          [175.2, 57.7],
          [160.0, 55.4],
          [165.1, 104.1],
          [174.0, 55.5],
          [170.2, 77.3],
          [160.0, 80.5],
          [167.6, 64.5],
          [167.6, 72.3],
          [167.6, 61.4],
          [154.9, 58.2],
          [162.6, 81.8],
          [175.3, 63.6],
          [171.4, 53.4],
          [157.5, 54.5],
          [165.1, 53.6],
          [160.0, 60.0],
          [174.0, 73.6],
          [162.6, 61.4],
          [174.0, 55.5],
          [162.6, 63.6],
          [161.3, 60.9],
          [156.2, 60.0],
          [149.9, 46.8],
          [169.5, 57.3],
          [160.0, 64.1],
          [175.3, 63.6],
          [169.5, 67.3],
          [160.0, 75.5],
          [172.7, 68.2],
          [162.6, 61.4],
          [157.5, 76.8],
          [176.5, 71.8],
          [164.4, 55.5],
          [160.7, 48.6],
          [174.0, 66.4],
          [163.8, 67.3]
        ]
      }
    ]
  }
});
function getTempOption(i) {
  return arr[i];
}
