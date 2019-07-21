define(["./../config"], function (config) {
  return {
    type: "items",
    label: "表头设置",
    items: {
      simple: {
        type: "string",
        ref: "simple",
        label: "simple",
        expression: "optional"
      }
    }
  };
});
