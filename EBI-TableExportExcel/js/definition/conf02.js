define(["./../config"], function (config) {
  return {
    type: "items",
    label: "表头设置",
    items: {
      theadName: {
        type: "string",
        ref: config.refDefs['2-01'].ref,
        label: "字段名称(维度集合+指标集合,用|分割)"
      },
      theadSort: {
        type: "string",
        ref: config.refDefs['2-02'].ref,
        label: "展现顺序(用|分割,例如1|3|5|2|4|..)"
      }
    }
  };
});
