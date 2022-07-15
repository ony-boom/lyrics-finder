import Vibrant from "node-vibrant/lib/bundle-worker";

async function getVibrant(src: HTMLImageElement) {
  const Builder = Vibrant.from(src);
  const palette = await Builder.getPalette();
  const vibrant = palette.Vibrant;
  return vibrant?.hex;
}

export default getVibrant;
