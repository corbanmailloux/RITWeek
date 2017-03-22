// Must be manually updated for new academic years.
const gradDateString = '2017-05-19';

const gradDateMoment = moment(gradDateString, 'YYYY-MM-DD');

// Returns an integer whose value is the floor of the difference in number of days from now until the graduation date
function getDaysUntilGraduation() {
  return gradDateMoment.diff(new Date(), 'days');
}
const daysUntilGrad = getDaysUntilGraduation();

// Display the days remaining.
if (daysUntilGrad > 0) {
  // Grad day is forthcoming
  document.getElementById('daysUntilGraduation').innerText = daysUntilGrad;
  document.getElementById('gradDate').innerText = gradDateMoment.format('MMM DD, YYYY');
} else if (daysUntilGrad === 0) {
  // Today is grad day!
  document.getElementById('graduation').innerHTML = `Graduation ${gradDateMoment.format('YYYY')} is <strong>today</strong>!`;
} else {
  // Graduation already happened!
  document.getElementById('graduation').innerHTML = 'Oops! This site hasn\'t been updated for the new academic term.<br>Help other students out by <a href="https://github.com/corbanmailloux/RITWeek">making a pull request</a>!';
}
