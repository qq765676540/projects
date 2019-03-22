define(["./../config"], function(config) {
  return {
    uses: "settings",
    items: {
      general: {
        type: "items",
        label: "General",
        items: {}
      },
      extIDa: {
        type: "items",
        label: "演示",
        items: {
          IDaA: {
            type: "string",
            component: "dropdown",
            label: "图表类型",
            defaultValue: "bar",
            options: [
              {
                value: "bar",
                label: "Bar Chart"
              },
              {
                value: "pie",
                label: "Pie Chart"
              }
            ],
            ref: config.refDefs.generalJs[0]
          },
          IDaB: {
            type: "string",
            component: "radiobuttons",
            label: "柱形方向",
            ref: config.refDefs.generalJs[1],
            options: [
              {
                value: "v",
                label: "垂直"
              },
              {
                value: "h",
                label: "水平"
              }
            ],
            defaultValue: "v"
          }
        }
      }
    }
  };
});
