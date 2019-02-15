outter:for (var i = 0; i < 3; i++) {
	inner:for (var j = 0; j < 2; j++) {
		console.log(i,j);
		if (i===1) {
			break outter;
		}
	}	
}