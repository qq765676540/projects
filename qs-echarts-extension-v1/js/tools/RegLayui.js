define(["./../config"], function(config) {
  return function(layui, layout, view) {
    layui.define(["element", "layer"], function() {
      var element = layui.element;
      var layer = layui.layer;
      if (eval("layout."+config.refDefs.generalJs[6].ref) === true) {
        view.backendApi.getProperties().then(function(reply) {
          eval("reply."+config.refDefs.generalJs[6].ref+"= false");

          view.backendApi.setProperties(reply);
        });
        layer.open({
          type: 2,
          area: ["1100px","600px"],
          content: ["http://www.baidu.com","no"]
        });
      }
    });
  };
});
