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
          //btn: ["提交","关闭"],
          content: [
            "../resources/../extensions/qs-echarts-extension-v1/examples.html",//examples.html",
            "no"
          ]//,
          // success: function(layero, index){
          //   var body = layer.getChildFrame("body", index);

          //   $.each(body.find("dl").find("a"),function(i,v){
          //     body.find("dl").find("a").eq(i).attr("id",layout.qInfo.qId+"_menu_"+i);
          //   });
            
          //   body.find("dl").find("a").attr("onClick","runChart(this.id)");
          //   layero.find("a").eq(2).css({color:"#fff",background:"#393D49"});
            
          // },
          // btn1: function(index, layero){
          //   //do some
          //   var iframeWin = window[layero.find("iframe")[0]["name"]];
          //   iframeWin.reSetChart(layout);
          // }
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
            btn: ["提交","关闭"],
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
              layero.find("a").eq(2).css({color:"#fff",background:"#393D49"});
            },
            btn1: function(index, layero){
              //do some
              var iframeWin = window[layero.find("iframe")[0]["name"]];
              iframeWin.reSetChart(layout);
            }
          });
        }
      }
    });
  };
});
