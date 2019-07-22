define([], function () {
  let name = 'tableExcel';
  return {
    refDefs: {
        '0-01': { "comments": "标题名称", "ref": `${name}.title.name` },
        '0-02': { "comments": "标题布局", "ref": `${name}.title.textalign` },
        '0-03': { "comments": "字体大小", "ref": `${name}.title.fontsize` },
        '0-04': { "comments": "字体颜色", "ref": `${name}.title.fontcolor` },
        '0-05': { "comments": "字体样式", "ref": `${name}.title.fontweight` },
        '1-01': { "comments": "字体大小", "ref": `${name}.selector.fontsize` },
        '1-02': { "comments": "字体颜色", "ref": `${name}.selector.fontcolor` },
        '1-03': { "comments": "字体样式", "ref": `${name}.selector.fontweight` },
        '1-04': { "comments": "筛选", "ref": `${name}.selector.content` },
        '2': { "comments": "表头", "ref": `${name}.thead` },
    },
    HrDefs: ["—————————————————————"]
  };
});
