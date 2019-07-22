define(["./../config"], function (config) {
  return {
    type: "array",
    ref: config.refDefs['3-01'].ref,
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
        label: "维度表达式"
      },
      mea: {
        type: "string",
        ref: "mea",
        label: "指标表达式"
      },
      group: {
        type: "string",
        ref: "group",
        label: "分组",
        defaultValue: "-"
      },
      sort: {
        type: "string",
        ref: "sort",
        label: "排序(汇总追加用&标识)",
        defaultValue: "-"
      },
      colspan: {
        type: "string",
        ref: "colspan",
        label: "列单元格合并(开始位置-结束位置)",
        defaultValue: "-"
      }
    }
  };
});
