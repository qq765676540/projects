define(["./../config"], function(config) {
  return {
    type: "items",
    label: "图例",
    items: {
      //-----------------------------------------------------------------
      IDbInit: {
        type: "boolean",
        component: "switch",
        label: "是否显示",
        ref: config.refDefs.generalJs[6].ref,
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
      IDbHr1: {
        label: config.HrDefs[0],
        component: "text",
        show: function(data) {
          return eval("data." + config.refDefs.generalJs[6].ref);
        }
      },
      //-----------------------------------------------------------------
      IDbA: {
        type: "string",
        component: "buttongroup",
        label: "方向",
        ref: config.refDefs.generalJs[3].ref,
        options: [
          {
            value: "vertical",
            label: "vertical"
          },
          {
            value: "horizontal",
            label: "horizontal"
          }
        ],
        defaultValue: "horizontal",
        show: function(data) {
          return eval("data." + config.refDefs.generalJs[6].ref);
        }
      },
      //-----------------------------------------------------------------
      IDbB: {
        type: "string",
        component: "buttongroup",
        label: "上下",
        ref: config.refDefs.generalJs[4].ref,
        options: [
          {
            value: "top",
            label: "top"
          },
          {
            value: "middle",
            label: "middle"
          },
          {
            value: "bottom",
            label: "bottom"
          }
        ],
        defaultValue: "top",
        show: function(data) {
          return eval("data." + config.refDefs.generalJs[6].ref);
        }
      },
      //-----------------------------------------------------------------
      IDbC: {
        type: "string",
        component: "buttongroup",
        label: "左右",
        ref: config.refDefs.generalJs[5].ref,
        options: [
          {
            value: "left",
            label: "left"
          },
          {
            value: "center",
            label: "center"
          },
          {
            value: "right",
            label: "right"
          }
        ],
        defaultValue: "center",
        show: function(data) {
          return eval("data." + config.refDefs.generalJs[6].ref);
        }
      }
    }
  };
});
