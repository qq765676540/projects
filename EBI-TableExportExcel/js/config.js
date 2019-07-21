define([], function () {
  let name = 'tableExcel';
  return {
    refDefs: {
        0: { "comments": "标题", "ref": `${name}.title` },
        1: { "comments": "筛选", "ref": `${name}.selector` },
        2: { "comments": "表头", "ref": `${name}.thead` },
    },
    HrDefs: ["—————————————————————"]
  };
});
