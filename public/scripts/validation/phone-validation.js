function numericStringMask(str, mask) {
  console.log(str);
  // if (!mask) return str;

  const numeric = str.replaceAll(/[^\d]/g, '');

  let idx = 0;

  const formated = mask.split('').map(el => {
    if (el === '#') {
      el = numeric[idx];
      idx++;
    }
    return el;
  });

  return formated.join('');
}

const prefixNumber = (str) => {
  // if (str === "3") {
  //   return "380 (";
  // }
  // if (str === "8") {
  //   return "8 (";
  // }
  // if (str === "9") {
  //   return "7 (9";
  // }
  return "380 (";
};

// ======================================
function setPhoneMask(targetValue) {
  const value = targetValue.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  if (targetValue.includes("380") || targetValue[0] === "3") {
    result = "";
  } else {
    result = "+";
  }

  //
  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  //
  return result;
}

function getInputs() {
  console.log('aaaa');
  const inputs = document.getElementById('consult-form-input')
  phoneInput.addEventListener("input", () => {
    let phone = phoneInput.value.replace(/\D/g, "");
    phone = phone.substring(0, 11);

    if (phone.length >= 1) {
      phone = `+38 (${phone.substring(1, 4)}) ${phone.substring(4, 7)}-${phone.substring(7, 9)}-${phone.substring(9, 11)}`;
    }

    phoneInput.value = phone;
  });
}
