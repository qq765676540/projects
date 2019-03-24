define(["./../config"], function(config) {
  return {
    type: "items",
    label: "演示",
    items: {
      // IDaA: {
      //   type: "string",
      //   component: "dropdown",
      //   label: "图表类型",
      //   defaultValue: "bar",
      //   options: [
      //     {
      //       value: "bar",
      //       label: "Bar Chart"
      //     },
      //     {
      //       value: "pie",
      //       label: "Pie Chart"
      //     }
      //   ],
      //   ref: config.refDefs.generalJs[0]
      // },
      //-----------------------------------------------------------------
      IDaB: {
        type: "string",
        component: "buttongroup",
        label: "柱形方向",
        ref: config.refDefs.generalJs[1].ref,
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
      },
      //-----------------------------------------------------------------
      IDaHr1: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDaC: {
        type: "boolean",
        component: "switch",
        label: "网格线",
        ref: config.refDefs.generalJs[2].ref,
        options: [
          {
            value: true,
            label: "显示"
          },
          {
            value: false,
            label: "隐藏"
          }
        ],
        defaultValue: true
      },
      //-----------------------------------------------------------------
      IDaHr1: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDaD: {
        type: "string",
        label: "柱形间隔( -1 ~ 1 )",
        ref: config.refDefs.generalJs[7].ref,
        defaultValue: "0.3"
      }
    }
  };
});
