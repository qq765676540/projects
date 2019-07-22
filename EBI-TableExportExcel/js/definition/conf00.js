define(["./../config"], function (config) {
  return {
    type: "items",
    label: "标题",
    items: {
      title: {
        type: "string",
        ref: config.refDefs['0-01'].ref,
        defaultValue: "标题",
        expression: "optional"
      },
      'text-align': {
        type: "string",
        component: "buttongroup",
        label: "布局",
        ref: config.refDefs['0-02'].ref,
        options: [
          {
            value: "left",
            label: "居左"
          },
          {
            value: "center",
            label: "居中"
          },
          {
            value: "right",
            label: "居右"
          }
        ],
        defaultValue: "center"
      },
      'font-size': {
        type: "string",
        label: "字体大小",
        ref: config.refDefs['0-03'].ref,
        defaultValue: "20px"
      },
      'font-color': {
        type: "string",
        label: "字体颜色",
        ref: config.refDefs['0-04'].ref,
        defaultValue: "#333333"
      },
      'text-weight': {
        type: "string",
        component: "buttongroup",
        label: "字体样式",
        ref: config.refDefs['0-05'].ref,
        options: [
          {
            value: "normal",
            label: "普通"
          },
          {
            value: "bold",
            label: "加粗"
          }
        ],
        defaultValue: "bold"
      },
    }
  };
});
