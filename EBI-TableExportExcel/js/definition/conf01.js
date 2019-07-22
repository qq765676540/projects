define(["./../config"], function (config) {
  return {
    type: "items",
    label: "筛选设置",
    items: {
      'font-size': {
        type: "string",
        label: "字体大小",
        ref: config.refDefs['1-01'].ref,
        defaultValue: "16px"
      },
      'font-color': {
        type: "string",
        label: "字体颜色",
        ref: config.refDefs['1-02'].ref,
        defaultValue: "#333333"
      },
      'text-weight': {
        type: "string",
        component: "buttongroup",
        label: "字体样式",
        ref: config.refDefs['1-03'].ref,
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
      selector: {
        type: "array",
        ref: config.refDefs['1-04'].ref,
        label: "筛选设置",
        itemTitleRef: "selectorname",
        allowAdd: true,
        allowRemove: true,
        addTranslation: "添加筛选",
        items: {
          name: {
            type: "string",
            ref: "selectorname",
            label: "筛选名称",
            defaultValue: "筛选1"
          },
          key: {
            type: "string",
            ref: "key",
            label: "描述"
          },
          value: {
            type: "string",
            ref: "value",
            label: "值",
            expression: "optional"
          }
        }
      }
    }
  };
});
