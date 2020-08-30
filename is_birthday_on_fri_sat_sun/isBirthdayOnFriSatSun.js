function isBirthdayOnFriSatSun(birthdayDate) {
  var day = birthdayDate.split('-')[0];
  var month = birthdayDate.split('-')[1];
  var checkDateValid = new Date(`1970-${month}-${day}`);
  if (checkDateValid == 'Invalid Date') {
    console.error('Invalid birthdayDate format');
    return;
  }
  
  var date;
  var weekday;
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var startingYear = 2016;
  var endingYear = startingYear + 50;
  var futureDates = [];

  for (var year = startingYear; year < endingYear; year++) {
    date = new Date(`${year}-${month}-${day}`);
    weekday = weekdays[date.getDay()];
    if (weekday == 'Fri' || weekday == 'Sat' || weekday == 'Sun') {
      if (day == date.getDate()) {
        futureDates.push(`${weekday}-${year}`);
      }
    }
  }
  return futureDates.join(' ');
}

console.log(isBirthdayOnFriSatSun('23-10'), '\n');
console.log(isBirthdayOnFriSatSun('01-01'), '\n');
console.log(isBirthdayOnFriSatSun('29-02'), '\n');