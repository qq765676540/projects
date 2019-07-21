define(["./config",
        "./settings/dimension",
        "./settings/measure",
        "./settings/general"      
      ], function(config,dimDef,meaDef,generalDef) {

  var dimensions = {
    uses: "dimensions",
    min: 1,
    max: config.settings.maxDimensions,
    items: dimDef
  };

  var measures = {
    uses: "measures",
    min: 1,
    max: config.settings.maxMeasures,
    items:  meaDef
  };

  var sorting = {
    uses: "sorting"
  };

  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: dimensions,
      measures: measures,
      sorting: sorting,
      settings: generalDef
    }
  };
});
