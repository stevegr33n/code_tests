function RomanNumeralParser() {
}

RomanNumeralParser.prototype.parse = function(value) {
    
    var lookupNumeral = {
        'I': 1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        'M': 1000,
    };

    try {
        numerals = value.split('');
    } catch(e) {
        if (e.name == 'TypeError') {
            return null;
        }
    }
    var total = 0;
    var bothNumerals = '';
    var validNumeral = '';
    var firstNumeral = '';
    var secondNumeral = '';
    while (numerals.length > 0) {
        bothNumerals = numerals.splice(0, 2);
        firstNumeral = bothNumerals[0];
        secondNumeral = bothNumerals[1];

        validNumeral = lookupNumeral[bothNumerals.join('')]
        if (validNumeral) {
            total += validNumeral;
        } else if (firstNumeral && secondNumeral)  {
            lookupNumeral[firstNumeral];
            lookupNumeral[secondNumeral];
            firstNumeral > secondNumeral ? total += firstNumeral : total = null;
            numerals.unshift(secondNumeral);
        } else {
            return null;
        }
    }
    return total;
}

module.exports = RomanNumeralParser;

console.log(RomanNumeralParser.prototype.parse('IX'));