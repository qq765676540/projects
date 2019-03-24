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
        {"index":1,"comments":"柱形图方式","ref":"EchartsOptions.bar.mode"},
        {"index":2,"comments":"网格线","ref":"EchartsOptions.bar.splitLine"},
        {"index":3,"comments":"图例方向","ref":"EchartsOptions.barLegend.orient"},
        {"index":4,"comments":"图例上下","ref":"EchartsOptions.barLegend.top"},
        {"index":5,"comments":"图例左右","ref":"EchartsOptions.barLegend.left"},
        {"index":6,"comments":"图例显示","ref":"EchartsOptions.bar.legend"},
        {"index":7,"comments":"柱形间隔设置","ref":"EchartsOptions.bar.bargap"}
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
