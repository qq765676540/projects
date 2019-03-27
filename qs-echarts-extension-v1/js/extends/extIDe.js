define(["./../config"], function(config) {
  return {
    type: "items",
    label: "全局配置",
    items: {
      //-----------------------------------------------------------------
      IDeA: {
        type: "string",
        component: "buttongroup",
        label: "eChartOptionsEditPage",
        ref: config.refDefs.generalJs[0].ref,
        options: [
          {
            value: "true",
            label: "打开配置页面"
          }
        ],
        defaultValue: "false"
      }
      //-----------------------------------------------------------------
    }
  };
});
