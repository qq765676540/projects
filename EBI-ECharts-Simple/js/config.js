define([], function() {
  return {
    settings: {
      maxDimensions: 1,
      maxMeasures: 5
    },
    refDefs: {
      dimensionJs: [],
      measureJs: [
        {"index":0,"comments":"柱形颜色","ref":"qAttributeExpressions.0.qExpression"},
        {"index":1,"comments":"柱形透明度","ref":"qAttributeExpressions.1.qExpression"}
      ],
      generalJs: [
        {"index":0,"comments":"图表类型","ref":"EchartsOptions.charType"},
        {"index":1,"comments":"柱形图方式","ref":"EchartsOptionsBar.mode"},
        {"index":2,"comments":"网格线","ref":"EchartsOptionsBar.splitLine"},
        {"index":3,"comments":"图例方向","ref":"EchartsOptionsBar.legend.orient"},
        {"index":4,"comments":"图例上下","ref":"EchartsOptionsBar.legend.top"},
        {"index":5,"comments":"图例左右","ref":"EchartsOptionsBar.legend.left"},
        {"index":6,"comments":"图例显示","ref":"EchartsOptionsBar.legend.show"},
        {"index":7,"comments":"柱形间隔设置","ref":"EchartsOptionsBar.series.bargap"},
        {"index":8,"comments":"Y柱形间隔设置","ref":"EchartsOptionsBar.yAxis.Label"},
        {"index":9,"comments":"Y柱形间隔设置","ref":"EchartsOptionsBar.yAxis.Tick"},
        {"index":10,"comments":"Y柱形间隔设置","ref":"EchartsOptionsBar.yAxis.Line"},
        {"index":11,"comments":"X柱形间隔设置","ref":"EchartsOptionsBar.xAxis.Label"},
        {"index":12,"comments":"X柱形间隔设置","ref":"EchartsOptionsBar.xAxis.Tick"},
        {"index":13,"comments":"X柱形间隔设置","ref":"EchartsOptionsBar.xAxis.Line"},
        {"index":14,"comments":"提示框","ref":"EchartsOptionsBar.tooltip.axisPointer"},
        {"index":15,"comments":"值标签显示","ref":"EchartsOptionsBar.series.label.show"},
        {"index":16,"comments":"值标签位置","ref":"EchartsOptionsBar.series.label.position"},
        {"index":17,"comments":"值标签旋转","ref":"EchartsOptionsBar.series.label.rotate"},
        {"index":18,"comments":"值标签颜色","ref":"EchartsOptionsBar.series.label.color"},
        {"index":19,"comments":"值标签颜色","ref":"EchartsOptionsBar.series.label.fontSize"},
        {"index":19,"comments":"值标签颜色","ref":"EchartsOptionsBar.series.label.formatter"}
      ]
    },
    eChartsDefs: {
      ColorDef: [
        "#c23531",
        "#2f4554",
        "#61a0a8",
        "#d48265",
        "#91c7ae",
        "#749f83"
      ]
    },
    HrDefs: ["—————————————————————"]
  };
});
