define(["./../config"], function (config) {
  return {
    type: "items",
    label: "查询设置",
    items: {
      exportmaxcount: {
        type: "string",
        ref: config.refDefs['3-02'].ref,
        label: "导出数据的最大行数(500*n)",
        defaultValue: "2000"
      },
      query: {
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
            // type: "string",
            component: "textarea",
            rows: 5,
            ref: "dim",
            label: "维度表达式"
          },
          qNull: {
            type: "string",
            ref: "qNull",
            label: "空值过滤"
          },
          mea: {
            type: "array",
            ref: 'mea',
            label: "指标设置",
            itemTitleRef: "meaname",
            allowAdd: true,
            allowRemove: true,
            addTranslation: "添加指标",
            items: {
              name: {
                type: "string",
                ref: "meaname",
                label: "名称"
              },
              exp: {
                type: "string",
                ref: "meaexp",
                label: "表达式"
              }
            }
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
      }
    }
  };
});
