define(["./../config"], function(config) {
  return {
    type: "items",
    label: "Y轴",
    items: {
      //-----------------------------------------------------------------
      IDcA: {
        type: "boolean",
        component: "switch",
        label: "刻度标签",
        ref: config.refDefs.generalJs[8].ref,
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
      IDcHr1: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDcB: {
        type: "boolean",
        component: "switch",
        label: "刻度线",
        ref: config.refDefs.generalJs[9].ref,
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
      IDcHr2: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDcC: {
        type: "boolean",
        component: "switch",
        label: "轴线",
        ref: config.refDefs.generalJs[10].ref,
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
      }
      //-----------------------------------------------------------------
    }
  };
});
