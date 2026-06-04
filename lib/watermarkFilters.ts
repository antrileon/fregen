import { defaultWatermarkSetting, type WatermarkSetting } from '@/lib/watermarks';

export function isProcessedWatermark(image: string) {
  return image.includes('/outlines/') || image.includes('/shadows/');
}

export function getWatermarkFilter(setting: WatermarkSetting, theme: 'dark' | 'light') {
  const tone = setting.tone ?? defaultWatermarkSetting.tone;
  const cold = tone < -15;
  const warm = tone > 15;
  const processed = isProcessedWatermark(setting.image);

  if (processed) {
    if (theme === 'dark') {
      if (cold) return 'sepia(1) saturate(1.25) hue-rotate(165deg) brightness(0.88) contrast(1.08)';
      if (warm) return 'sepia(1) saturate(1.35) hue-rotate(335deg) brightness(0.92) contrast(1.08)';
      return 'brightness(0.9) contrast(1.08)';
    }

    if (cold) return 'sepia(1) saturate(1.25) hue-rotate(165deg) brightness(0.78) contrast(1.06)';
    if (warm) return 'sepia(1) saturate(1.55) hue-rotate(350deg) brightness(0.8) contrast(1.05)';
    return 'grayscale(0.45) sepia(0.2) brightness(0.78) contrast(1.04)';
  }

  if (theme === 'dark') {
    if (cold) return 'grayscale(0.55) sepia(1) saturate(1.05) hue-rotate(165deg) brightness(0.74) contrast(1.08)';
    if (warm) return 'grayscale(0.45) sepia(1) saturate(1.15) hue-rotate(335deg) brightness(0.78) contrast(1.08)';
    return 'grayscale(0.55) sepia(0.28) brightness(0.76) contrast(1.06)';
  }

  if (cold) return 'grayscale(0.5) sepia(1) saturate(1.1) hue-rotate(165deg) brightness(0.86) contrast(1.05)';
  if (warm) return 'grayscale(0.42) sepia(1) saturate(1.35) hue-rotate(350deg) brightness(0.9) contrast(1.05)';
  return 'grayscale(0.45) sepia(0.25) brightness(0.9) contrast(1.04)';
}
