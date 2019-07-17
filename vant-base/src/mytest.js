let arr = [{col_2:'1,1,1'},{col_2:'3,3,3'},{col_2:'4,4,4'},{col_2:'2,2,2'}];

  arr.filter((v,i) => {
      if(i === arr.length-1) {
          arr.sort((a, b) => {
            return b.col_2.replace(/,/g,'') * 1 - a.col_2.replace(/,/g,'') * 1;
          });
      }
  });
console.log(arr);