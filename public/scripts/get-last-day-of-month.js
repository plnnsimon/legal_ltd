function getLastDayOfMonth() {
  const dateContainerCollection = document.getElementsByClassName('date-container')
  const today = new Date();

  const currentDate = new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString('uk-UA', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  for (let i = 0; i < dateContainerCollection.length; i++) {
    dateContainerCollection[i].innerHTML = currentDate
  }
}


document.addEventListener(
  'DOMContentLoaded',
  () => {
    getLastDayOfMonth()
  },
  false
);