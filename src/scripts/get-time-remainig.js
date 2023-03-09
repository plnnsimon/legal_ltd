function getTimeRemaining(id) {
  const clock = document.getElementById(id);
  if (!clock) return;
  const daysSpan = clock.querySelector('.t1016__days');
  const hoursSpan = clock.querySelector('.t1016__hours');
  const minutesSpan = clock.querySelector('.t1016__minutes');
  const secondsSpan = clock.querySelector('.t1016__seconds');

  let interval = setInterval(function () {
    const currentDate = new Date();

    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const timeUntilNextMonth = nextMonth.getTime() - currentDate.getTime();
    let days = Math.floor(timeUntilNextMonth / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeUntilNextMonth % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor(
      (timeUntilNextMonth % (1000 * 60 * 60)) / (1000 * 60)
    );
    let seconds = Math.floor((timeUntilNextMonth % (1000 * 60)) / 1000);

    if (days >= 100) {
      daysSpan.innerHTML = days;
    } else {
      daysSpan.innerHTML = ('0' + days).slice(-2);
    }
    hoursSpan.innerHTML = ('0' + hours).slice(-2);
    minutesSpan.innerHTML = ('0' + minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + seconds).slice(-2);
    if (timeUntilNextMonth <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    getTimeRemaining('t1016__timer508698093');
    getTimeRemaining('t1016__timer508686348');
  },
  false
);
