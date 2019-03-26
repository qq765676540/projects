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
      IDaHr2: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDaD: {
        type: "string",
        label: "柱形间隔( -1 ~ 1 )",
        ref: config.refDefs.generalJs[7].ref,
        defaultValue: "0.3"
      },
      //-----------------------------------------------------------------
      IDaHr3: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDaE: {
        type: "string",
        component: "buttongroup",
        label: "提示框",
        ref: config.refDefs.generalJs[14].ref,
        options: [
          {
            value: "line",
            label: "线"
          },
          {
            value: "shadow",
            label: "块"
          },
          {
            value: "cross",
            label: "交"
          },
          {
            value: "none",
            label: "无"
          }
        ],
        defaultValue: "shadow"
      },
      //-----------------------------------------------------------------
      IDaHr4: {
        label: config.HrDefs[0],
        component: "text"
      },
      //-----------------------------------------------------------------
      IDaF: {
        type: "boolean",
        component: "switch",
        label: "值标签",
        ref: config.refDefs.generalJs[15].ref,
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
        defaultValue: false
      },
      IDaG: {
        type: "string",
        component: "dropdown",
        label: "position",
        ref: config.refDefs.generalJs[16].ref,
        show: function(data){
          return eval("data."+config.refDefs.generalJs[15].ref)
        },
        options: [
          {
            value: "top",
            label: "top"
          },
          {
            value: "left",
            label: "left"
          },
          {
            value: "right",
            label: "right"
          },
          {
            value: "bottom",
            label: "bottom"
          },
          {
            value: "inside",
            label: "inside"
          },
          {
            value: "insideLeft",
            label: "insideLeft"
          },
          {
            value: "insideRight",
            label: "insideRight"
          },
          {
            value: "insideTop",
            label: "insideTop"
          },
          {
            value: "insideBottom",
            label: "insideBottom"
          },
          {
            value: "insideTopLeft",
            label: "insideTopLeft"
          },
          {
            value: "insideBottomLeft",
            label: "insideBottomLeft"
          },
          {
            value: "insideTopRight",
            label: "insideTopRight"
          },
          {
            value: "insideBottomRight",
            label: "insideBottomRight"
          }
        ],
        defaultValue: "insideBottom"
      },
      IDaH: {
        type: "string",
        label: "rotate",
        ref: config.refDefs.generalJs[17].ref,
        defaultValue: "90",
        show: function(data){
          return eval("data."+config.refDefs.generalJs[15].ref)
        }
      },
      IDaI: {
        type: "string",
        label: "color",
        ref: config.refDefs.generalJs[18].ref,
        defaultValue: "#111111",
        show: function(data){
          return eval("data."+config.refDefs.generalJs[15].ref)
        }
      },
      IDaJ: {
        type: "string",
        label: "fontSize",
        ref: config.refDefs.generalJs[19].ref,
        defaultValue: "16",
        show: function(data){
          return eval("data."+config.refDefs.generalJs[15].ref)
        }
      },
      IDaK: {
        type: "string",
        component: "dropdown",
        label: "formatter",
        options: [
          { value: "{c}", label: "值" },
          { value: "{c} {a}", label: "指标+值" },
          { value: "{a} {c}", label: "值+指标" }
        ],
        ref: config.refDefs.generalJs[20].ref,
        defaultValue: "{c}",
        show: function(data){
          return eval("data."+config.refDefs.generalJs[15].ref)
        }
      }
    }
  };
});
