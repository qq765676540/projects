define(["./../config"], function (config) {
  return {
    type: "items",
    label: "样式设置",
    items: {
      maxheight: {
        type: "string",
        ref: config.refDefs['4-01'].ref,
        label: "最大高度",
        defaultValue: "400px"
      },
      theadbackground: {
        type: "string",
        ref: config.refDefs['4-02'].ref,
        label: "表头背景色",
        defaultValue: "#d9d9d9"
      },
    }
  };
});
