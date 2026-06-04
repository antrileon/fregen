'use client';

import { useEffect } from 'react';
import { watermarkPages, watermarkStorageKey, type WatermarkSetting } from '@/lib/watermarks';
import { getWatermarkFilter } from '@/lib/watermarkFilters';

function getSurfaceVars(setting: WatermarkSetting) {
  if (setting.surface === 'diffuse') {
    return `
      --watermark-surface-bg: rgba(8, 14, 25, 0.10);
      --watermark-control-bg: rgba(8, 14, 25, 0.08);
      --watermark-surface-border: rgba(92, 113, 139, 0.34);
      --watermark-control-border: rgba(92, 113, 139, 0.30);
      --watermark-surface-shadow: 0 0 42px rgba(7, 13, 26, 0.12);
      --watermark-surface-blur: none;
      --watermark-control-blur: none;
    `;
  }

  if (setting.surface === 'text') {
    return `
      --watermark-surface-bg: transparent;
      --watermark-control-bg: transparent;
      --watermark-surface-border: transparent;
      --watermark-control-border: transparent;
      --watermark-surface-shadow: none;
      --watermark-surface-blur: none;
      --watermark-control-blur: none;
    `;
  }

  return `
    --watermark-surface-bg: rgba(13, 24, 38, 0.08);
    --watermark-control-bg: rgba(8, 14, 25, 0.06);
    --watermark-surface-border: rgba(92, 113, 139, 0.68);
    --watermark-control-border: rgba(92, 113, 139, 0.62);
    --watermark-surface-shadow: 0 18px 42px rgba(0, 0, 0, 0.08);
    --watermark-surface-blur: none;
    --watermark-control-blur: none;
  `;
}

function buildCss(settings: Record<string, WatermarkSetting>) {
  return watermarkPages
    .map((page) => {
      const setting = settings[page.id];
      if (!setting?.image) return '';
      const darkFilter = getWatermarkFilter(setting, 'dark');
      const lightFilter = getWatermarkFilter(setting, 'light');
      const lightOpacity = Math.min(setting.opacity * 1.35, 0.16);
      const surface = setting.surface || 'box';

      return `
        .page-watermark.${page.className} {
          --watermark-image: url('${setting.image}') !important;
          --watermark-opacity: ${setting.opacity} !important;
          --watermark-size: min(${setting.size}rem, 78vw) !important;
          --watermark-position: ${setting.x}% ${setting.y}% !important;
          --watermark-filter: ${darkFilter} !important;
          ${getSurfaceVars({ ...setting, surface })}
        }

        html[data-theme='light'] .page-watermark.${page.className} {
          --watermark-opacity: ${lightOpacity} !important;
          --watermark-filter: ${lightFilter} !important;
        }

        .page-watermark.${page.className} {
          ${surface === 'text' ? '--watermark-text-mode: 1;' : '--watermark-text-mode: 0;'}
        }
      `;
    })
    .join('\n');
}

export function WatermarkRuntime() {
  useEffect(() => {
    const styleId = 'regenmove-watermark-runtime';

    function applySettings() {
      const existing = document.getElementById(styleId);
      const raw = window.localStorage.getItem(watermarkStorageKey);
      watermarkPages.forEach((page) => {
        document.querySelectorAll(`.page-watermark.${page.className}`).forEach((element) => {
          element.classList.remove('watermark-surface-box', 'watermark-surface-text', 'watermark-surface-diffuse');
        });
      });

      if (!raw) {
        existing?.remove();
        return;
      }

      try {
        const settings = JSON.parse(raw) as Record<string, WatermarkSetting>;
        const css = buildCss(settings);
        const style = existing || document.createElement('style');
        style.id = styleId;
        style.textContent = css;
        if (!existing) document.head.appendChild(style);
        watermarkPages.forEach((page) => {
          const surface = settings[page.id]?.surface || 'box';
          document.querySelectorAll(`.page-watermark.${page.className}`).forEach((element) => {
            element.classList.add(`watermark-surface-${surface}`);
          });
        });
      } catch {
        window.localStorage.removeItem(watermarkStorageKey);
        existing?.remove();
      }
    }

    applySettings();
    window.addEventListener('storage', applySettings);
    window.addEventListener('regenmove-watermarks-updated', applySettings);

    return () => {
      window.removeEventListener('storage', applySettings);
      window.removeEventListener('regenmove-watermarks-updated', applySettings);
    };
  }, []);

  return null;
}
