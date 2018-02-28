function morseEnglishTranslator(morseToEnglish, textToTranslate) {
	
	const morseLookup = {
		a: '.-',
		b: '-...',
		c: '-.-.',
		d: '-..',
		e: '.',
		f: '..-.',
		g: '--.',
		h: '....',
		i: '..',
		j: '.---',
		k: '-.-',
		l: '.-..',
		m: '--',
		n: '-.',
		o: '---',
		p: '.--.',
		q: '--.-',
		r: '.-.',
		s: '...',
		t: '-',
		u: '..-',
		v: '...-',
		w: '.--',
		x: '-..-',
		y: '-.--',
		z: '--..',
		0: '-----',
		1: '.----',
		2: '..---',
		3: '...--',
		4: '....-',
		5: '.....',
		6: '-....',
		7: '--...',
		8: '---..',
    9: '----.',
    '.': '.-.-.-',
    ',': '--..--',
  }

  var englishLookup = {};
  for (var key in morseLookup) {
    if (morseLookup.hasOwnProperty(key)) {
      englishLookup[morseLookup[key]] = key;
    }
  }
  
  let translatedText = '';
  var invalidMorse = false;
	
	if (!morseToEnglish) {
    const text = textToTranslate.split(' ');
		text.forEach(word => {
			letters = word.split('');
			letters.forEach(letter => {
				translatedText += morseLookup[letter.toLowerCase()] + ' ';
			})
			translatedText += '  ';
		})
  } else {
    const text = textToTranslate.split('   ');
    text.forEach(word => {
			letters = word.split(' ');
			letters.forEach(letter => {
        if (letter in englishLookup) {
          translatedText += englishLookup[letter];
        } else {
          invalidMorse = true;
        }
      })
      translatedText += ' ';
    })
  }
  if (invalidMorse) {
    return 'Invalid Morse Code Or Spacing';
  }
	return translatedText;
}