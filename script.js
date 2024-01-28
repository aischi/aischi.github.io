const scl = 10;
const w = pixels[0][0].length;
const h = pixels[0].length;

const textContainer = document.createElement("div");
textContainer.id = "text";
document.body.append(textContainer);

const brightText = [
  ".",
  ":",
  "=",
  "!",
  "1",
  "7",
  "$",
  "2",
  "3",
  "§",
  "4",
  "5",
  "6",
  "9",
  "8",
  "0",
  "#",
];

// b = 0, 1, 2, 3, 4
const emojis = [
  [ // r = 0
    [" ", " ", " ", " ", " "], // g = 0
    [" ", " ", " ", " ", " "], // g = 1
    [" ", " ", " ", " ", " "], // g = 2
    [" ", " ", " ", " ", " "], // g = 3
    [" ", " ", " ", " ", " "], // g = 4
  ],
  [ // r = 1
    [" ", " ", " ", " ", " "], // g = 0
    [" ", " ", " ", " ", " "], // g = 1
    [" ", " ", " ", " ", " "], // g = 2
    [" ", " ", " ", " ", " "], // g = 3
    [" ", " ", " ", " ", " "], // g = 4
  ],
  [ // r = 2
    [" ", " ", " ", " ", " "], // g = 0
    [" ", " ", " ", " ", " "], // g = 1
    [" ", " ", " ", " ", " "], // g = 2
    [" ", " ", " ", " ", " "], // g = 3
    [" ", " ", " ", " ", " "], // g = 4
  ],
  [ // r = 3
    [" ", " ", " ", " ", " "], // g = 0
    [" ", " ", " ", " ", " "], // g = 1
    [" ", " ", " ", " ", " "], // g = 2
    [" ", " ", " ", " ", " "], // g = 3
    [" ", " ", " ", " ", " "], // g = 4
  ],
  [ // r = 4
    [" ", " ", " ", " ", " "], // g = 0
    [" ", " ", " ", " ", " "], // g = 1
    [" ", " ", " ", " ", " "], // g = 2
    [" ", " ", " ", " ", " "], // g = 3
    [" ", " ", " ", " ", " "], // g = 4
  ],
];

function DrawFrame(t) {
  const px = pixels[t];
  let text = "";

  for (let j = 0; j < px.length; j++) {
    for (let i = 0; i < px[0].length; i++) {
      const shift = 6;
      const r = adjustColorValue(px[j][i].r, shift);
      const g = adjustColorValue(px[j][i].g, shift);
      const b = adjustColorValue(px[j][i].b, shift);

      const brightness = (r + g + b) / (3 * 2 ** (8 - shift));

      const index = Math.floor((brightText.length - 1) * brightness);
      text += brightText[index];
    }

    text += "\n";
  }

  textContainer.innerHTML = text;
}

function adjustColorValue(val, shift) {
  const upper = ((val + 2 ** shift) >> shift) << shift;
  const lower = (val >> shift) << shift;
  return val - lower < upper - val ? lower >> shift : upper >> shift;
}

function Animate() {
  const wait = 200;
  for (let t = 0; t < pixels.length; t++) {
    setTimeout(() => DrawFrame(t), wait * t);
  }
}

document.addEventListener("keypress", Animate);
