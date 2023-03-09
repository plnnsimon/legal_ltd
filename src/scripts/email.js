function validPhone(phone) {
  var regex = /^(\d{10}|\d{12})$/;
  return regex.test(phone);
}

function validateHuman(honeypot) {
  if (honeypot) {
    console.log('Robot Detected!');
    return true;
  } else {
    console.log('Welcome Human!');
  }
}

function getFormData(form) {
  const fields = [];
  const elements = [
    '#form-consult-name',
    '#form-consult-phone',
    '#form-consult-service',
    '#form-consult-message',
    '#form-consult-town'
  ];

  for (const item of elements) {
    const field = form.querySelector(item);
    fields.push(field);
  }

  const formData = {};
  fields.forEach(function (el) {
    if (!el) {
      return
    }

    const name = el.name;
    formData[name] = el.value;

    if (el.length) {
      var data = [];
      for (var i = 0; i < el.length; i++) {
        var item = el.item(i);
        if (item.checked || item.selected) {
          data.push(item.value);
        }
      }

      formData[el] = data.join(', ');
    }

    if (el.id === 'form-consult-phone') {
      el.addEventListener('input', () => {
        enableAllButtons(form);
      });
    }
  });

  return formData;
}

async function handleFormSubmit(form) {
  const data = getFormData(form);

  if (data.phone && !validPhone(data.phone)) {
    createTooltip('error', 'Телефон заповнено не корректно!')
    disableAllButtons(form);
    return;
  }

  sendEmail(
    {
      name: data.name || 'Клієнт',
      phone: data.phone,
      subject: data.service || '...',
      town: data.town || '...',
      message: data.message || '...'
    },
    form
  );
}

async function sendEmail(options, form) {
  try {
    disableAllButtons(form);
    await emailjs.send(
      process.env.SERVICE_ID,
      process.env.TEMPLATE_ID,
      {
        name: options.name,
        phone: options.phone,
        town: options.town,
        subject: options.subject,
        message: options.message
      },
      process.env.PUBLIC_KEY
    );
    form.reset();
    createTooltip('success', 'Дякуємо, що скористалися нашими послугами, чекайте на дзвінок!')
  } catch (err) {
    console.error(err);
    createTooltip('error', err.text)
  } finally {
    enableAllButtons(form);
  }
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    emailjs.init('xpCKXwDzPBY3DT09Z');

    const formIds = [
      'consult-form-1',
      'consult-form-2',
      'consult-form-3',
      'consult-form-4'
    ];

    for (const id of formIds) {
      getForm(id);
    }
  },
  false
);

function disableAllButtons(form) {
  var buttons = form.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

function enableAllButtons(form) {
  var buttons = form.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

function getForm(id) {
  const form = document.getElementById(id);
  form.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFormSubmit(form);
  };
}

function createTooltip(type, message) {
  const div = document.getElementById('custom-tooltip');

  div.classList.add('visible', type);
  div.innerText = message;

  setTimeout(() => {
    div.classList.remove('visible');
  }, 4000);

  setTimeout(() => {
    div.innerText = ''
  }, 4500);
}
