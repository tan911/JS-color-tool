'use-strict';

const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');

const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');

const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');

const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  if (!toggleBtn.classList.contains('toggled')) {
    toggleBtn.classList.add('toggled');
    darkenText.classList.remove('unselected');
    lightenText.classList.add('unselected');
  } else {
    toggleBtn.classList.remove('toggled');
    darkenText.classList.add('unselected');
    lightenText.classList.remove('unselected');
  }

  reset();
});

hexInput.addEventListener('keyup', () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace('#', '');
  inputColor.style.backgroundColor = '#' + strippedHex;
  reset();
});

// check to see whether the input  from the user is valid
// hex color
// const isValidHex = hex => /^#([0-9A-F]{3}){1,2}$/i.test(hex);
const isValidHex = function (hex) {
  // const unValidLetter = [
  //   'g',
  //   'h',
  //   'i',
  //   'j',
  //   'k',
  //   'l',
  //   'm',
  //   'n',
  //   'o',
  //   'p',
  //   'q',
  //   'r',
  //   's',
  //   't',
  //   'u',
  //   'v',
  //   'w',
  //   'x',
  //   'y',
  //   'z',
  // ];

  if (!hex) return false;

  //   check if the character is valid
  // for (const c of unValidLetter) {
  //   if (hex.includes(c)) return false;
  // }

  const strippedHex = hex.replace('#', '');
  return strippedHex.length === 3 || strippedHex.length === 6;
};

// convert hex to RGB

const convertHexToRGB = hex => {
  if (!isValidHex(hex)) return null;

  let strippedHex = hex.replace('#', '');

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }

  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

// Convert RGB To Hex

const convertRGBToHex = (r, g, b) => {
  const firstPair = ('0' + r.toString(16)).slice(-2);
  const secondPair = ('0' + g.toString(16)).slice(-2);
  const thirdPair = ('0' + b.toString(16)).slice(-2);

  const hex = '#' + firstPair + secondPair + thirdPair;
  return hex;
};

const alterColor = function (hex, percentage) {
  const { r, g, b } = convertHexToRGB(hex);

  const amount = Math.floor((percentage / 100) * 255);

  const newR = increaseWihtin0To255(r, amount);
  const newG = increaseWihtin0To255(g, amount);
  const newB = increaseWihtin0To255(b, amount);

  return convertRGBToHex(newR, newG, newB);
};

const increaseWihtin0To255 = function (hex, amount) {
  // const newHex = hex + amount;
  // if (newHex > 255) {
  //   return 255;
  // }
  // if (newHex < 0) {
  //   return 0;
  // }
  // return newHex;

  return Math.min(255, Math.max(0, hex + amount));
};

alterColor('fff', 10);

slider.addEventListener('input', () => {
  // check if hex is valid
  // if (!isValidHex(hexInput.value)) return;
  if (!isValidHex(hexInput.value)) return;

  sliderText.textContent = `${slider.value}%`;

  // calculate the value for the color alteration
  // between positive and negative
  const valueAddition = toggleBtn.classList.contains('toggled')
    ? -slider.value
    : slider.value;

  // get the altered hex value
  const alteredHex = alterColor(hexInput.value, valueAddition);

  // update the alterColor
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

const reset = () => {
  slider.value = 0;
  sliderText.innerText = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
