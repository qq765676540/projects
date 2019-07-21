define(["./../config"], function (config) {
  return {
    type: "items",
    label: "样式设置",
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
