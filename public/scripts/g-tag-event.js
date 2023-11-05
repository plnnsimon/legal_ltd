const buttonsToFollow = document.getElementsByClassName('g-tag-event')

for (const button of buttonsToFollow) {
  button.addEventListener('click', gtagReportConversion)
}


function gtagReportConversion(url) {
  try {
    const callback = () => {
      // if (typeof(url) != 'undefined') {
      //   window.location = url;
      // }
      console.log('Gtag event sent');
    };
  
    gtag('event', 'conversion', {
        'send_to': 'AW-10980539371/M4U6CLL9nOgYEOv39vMo',
        'event_callback': callback
    });
    return false;
  } catch (err) {
    console.error(err);
  }
}