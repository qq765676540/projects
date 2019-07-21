define(["./../config"], function (config) {
  return {
    type: "items",
    label: "标题",
    items: {
      simple: {
        type: "string",
        ref: config.refDefs[0].ref,
        expression: "optional"
      }
    }
  };
});
