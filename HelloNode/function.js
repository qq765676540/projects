function sum1(numA,numB){
	console.log(numA+numB);
	return numA+numB;
}

var sum2 = new Function(
	'numA',
	'numB',
	'console.log(numA+numB);'
);

var sum3 = function(numA,numB){
	console.log(numA+numB);
};

console.log(sum1(1,2));

