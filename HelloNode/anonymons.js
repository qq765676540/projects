var fs = require('fs');
fs.readFile(__filename,'utf8',function(err,data){
	console.log(err,data);
});