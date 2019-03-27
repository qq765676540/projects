define(["./../config"], function(config) {
  return function(layui, layout, view, pageGet) {
    layui.define(["layer"], function() {
      var layer = layui.layer;
      // layer.msg('Hello World');
      if (
        eval("layout." + config.refDefs.generalJs[0].ref) === "true" ||
        pageGet === "PageSet"
      ) {
        view.backendApi.getProperties().then(function(reply) {
          eval("reply." + config.refDefs.generalJs[0].ref + "= 'false'");

          view.backendApi.setProperties(reply);
        });
        layer.open({
          type: 2,
          title: "eChartEdit",
          area: ["1100px", "600px"],
          content: [
            "../resources/../extensions/qs-echarts-extension-v1/qs-echarts-extension-v1.html",
            "no"
          ],
          success: function(layero, index) {
            var body = layer.getChildFrame("body", index);
            //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
            var iframeWin = window[layero.find("iframe")[0]["name"]];
            //iframeWin.abc();
            console.log(body.html());
            //得到iframe页的body内容
            body.find("#btnIDa").val("Hi，我是从父页来的");
          }
        });
      }
    });
  };
});
