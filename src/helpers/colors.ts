import ColorThief from "@neutrixs/colorthief";

const colorThief = new ColorThief();

function getDominantColor(img: HTMLImageElement) {
  return colorThief.getColor(img, 5) as number[];
}

// contrast
function getRGB(c: string) {
  return parseInt(c, 16) || c;
}

function getsRGB(c: string) {
  return +getRGB(c) / 255 <= 0.03928
    ? +getRGB(c) / 255 / 12.92
    : Math.pow((+getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor: string) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f: string, b: string) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getTextColor(bgColor: number[]) {
  const bgColorHex = rgbToHex(bgColor[0], bgColor[1], bgColor[2]);

  const whiteContrast = getContrast(bgColorHex, "#ffffff");
  const blackContrast = getContrast(bgColorHex, "#282c33");

  return whiteContrast > blackContrast ? "#ffffff" : "#282c33";
}

export default getDominantColor;
