import WaveSurfer from "wavesurfer.js";

export function createWaveSurfer(container) {
  if (!container) return null;

  const rootStyles = getComputedStyle(document.documentElement);

  return WaveSurfer.create({
    container: container,
    waveColor: rootStyles.getPropertyValue("--gr-grey-light").trim(),
    progressColor: rootStyles.getPropertyValue("--color-text").trim(),
    cursorColor: rootStyles.getPropertyValue("--color-text").trim(),
    barWidth: 3,
    height: 100,
  });
}
