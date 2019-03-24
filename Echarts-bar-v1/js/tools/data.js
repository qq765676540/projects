function getData(model, index, type) {
  var dataArr = [];
  if (type == "dim") {
    $.each(model, function(i, val) {
      dataArr.push(val[index].qText);
    });
  } else {
    $.each(model, function(i, val) {
      dataArr.push({
        value: val[index].qNum,
        itemStyle: {
          color: val[index].qAttrExps.qValues[0].qText,
          opacity: val[index].qAttrExps.qValues[1].qText
        }
      });
    });
  }

  return dataArr;
}
