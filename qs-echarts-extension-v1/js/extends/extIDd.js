define(["./../config"], function(config) {
  return {
    type: "items",
    label: "X轴",
    items: {
      //-----------------------------------------------------------------
      IDdA: {
        type: "boolean",
        component: "switch",
        label: "刻度标签",
        ref: config.refDefs.generalJs[11].ref,
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
      IDdHr1: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDdB: {
        type: "boolean",
        component: "switch",
        label: "刻度线",
        ref: config.refDefs.generalJs[12].ref,
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
      IDdHr2: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDdC: {
        type: "boolean",
        component: "switch",
        label: "轴线",
        ref: config.refDefs.generalJs[13].ref,
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
