define(["./../config"], function (config) {
  return {
    type: "array",
    ref: config.refDefs[2].ref,
    label: "查询设置",
    itemTitleRef: "queryname",
    allowAdd: true,
    allowRemove: true,
    addTranslation: "添加查询",
    items: {
      name: {
        type: "string",
        ref: "queryname",
        label: "查询名称",
        defaultValue: "查询1"
      },
      dim: {
        type: "string",
        ref: "dim",
        label: "维度表达式",
        expression: "optional"
      },
      mea: {
        type: "string",
        ref: "mea",
        label: "指标表达式",
        expression: "optional"
      }
    }
  };
});
