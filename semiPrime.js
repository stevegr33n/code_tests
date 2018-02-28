function isSemiprime(number) {

	isSemiprime = false;

	if (isNaN(number)) {
		return isSemiprime;
	}
	
	let numberIsDivisible = 0;
	
	const numberHalved = Math.round(number/2);
	
	for (let i = 2; i <= numberHalved; i++) {
		if (number % i === 0) {
			numberIsDivisible++
    }
    if (numberIsDivisible > 2) {
      return isSemiprime;
    }
	}
	
	if (numberIsDivisible === 2) {
		isSemiprime = true;
	}
  
	return isSemiprime;
}