define(["./../config"], function (config) {
  return {
    type: "array",
    ref: config.refDefs[1].ref,
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
        label: "key"
      },
      value: {
        type: "string",
        ref: "value",
        label: "value",
        expression: "optional"
      }
    }
  };
});
