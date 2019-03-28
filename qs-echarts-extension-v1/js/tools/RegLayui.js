define(["./../config"], function(config) {
  return function(layui, layout, view, pageGet) {
    layui.define(["layer"], function() {
      var layer = layui.layer;
      // layer.msg('Hello World');
      if (pageGet === "examples") {//examples
        layer.open({
          type: 2,
          title: "",
          area: ["1100px", "650px"],
          //btn: ["确定"],
          content: [
            "../resources/../extensions/qs-echarts-extension-v1/examples.html",//examples.html",
            "no"
          ],
          success: function(layero, index){
            var body = layer.getChildFrame("body", index);

            $.each(body.find("dl").find("a"),function(i,v){
              body.find("dl").find("a").eq(i).attr("id",layout.qInfo.qId+"_menu_"+i);
            });
            
            body.find("dl").find("a").attr("onClick","runChart(this.id)");
          }
        });
      }
      if (pageGet === "echartsConfig") {
        if (eval("layout." + config.refDefs.generalJs[0].ref) === "true") {
          view.backendApi.getProperties().then(function(reply) {
            eval("reply." + config.refDefs.generalJs[0].ref + "= 'false'");
            view.backendApi.setProperties(reply);
          });
          layer.open({
            type: 2,
            title: " ",
            area: ["1100px", "600px"],
            btn: ["确定"],
            content: [
              "../resources/../extensions/qs-echarts-extension-v1/qs-echarts-extension-v1.html",
              "no"
            ],
            success: function(layero, index) {
              var body = layer.getChildFrame("body", index);
              //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
              var iframeWin = window[layero.find("iframe")[0]["name"]];
              console.log(body.html());
              //得到iframe页的body内容
              body.find("#btnIDa").val("Hi，我是从父页来的");
              $.each(body.find("dl").find("a"),function(i,v){
                body.find("dl").find("a").eq(i).attr("id",layout.qInfo.qId+"_menu_"+i);
              });
              
              body.find("dl").find("a").attr("onClick","runChart(this.id)");
            },
            yes: function(index, layero) {
              //如果设定了yes回调，需进行手工关闭
              //do something
              layer.close(index);
            }//,
            // cancel: function(index, layero) {
            //   if (confirm("确定要关闭么")) {
            //     //只有当点击confirm框的确定时，该层才会关闭
            //     //do something
            //     layer.close(index);
            //   }
            //   return false;
            // }
          });
        }
      }
    });
  };
});
