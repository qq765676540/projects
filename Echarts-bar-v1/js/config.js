define([], function() {
  return {
    settings: {
      maxDimensions: 1,
      maxMeasures: 5
    },
    refDefs: {
      measureJs: ["qAttributeExpressions.0.qExpression","qAttributeExpressions.1.qExpression"],
      generalJs: ["EchartsOptions.charType", "EchartsOptions.bar.mode"]
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
    }
  };
});
