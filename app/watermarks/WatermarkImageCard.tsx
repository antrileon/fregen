'use client';

import type { WatermarkImageOption } from '@/lib/watermarks';

function getPreviewKind(src: string) {
  if (src.includes('/outlines/')) return 'outline';
  if (src.includes('/shadows/')) return 'shadow';
  return 'original';
}

interface WatermarkImageCardProps {
  image: WatermarkImageOption;
  selected: boolean;
  onSelect: (src: string) => void;
}

export function WatermarkImageCard({ image, selected, onSelect }: WatermarkImageCardProps) {
  const kind = getPreviewKind(image.src);
  const lightSample = kind === 'outline';

  return (
    <button
      type="button"
      onClick={() => onSelect(image.src)}
      className={`overflow-hidden rounded-xl border-2 text-left transition ${
        selected ? 'border-amber-500' : 'border-slate-700 hover:border-amber-500/70'
      }`}
    >
      <div className={`relative aspect-[4/5] overflow-hidden ${lightSample ? 'bg-[#f8fafc]' : 'bg-[#172233]'}`}>
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat"
          style={{
            backgroundImage: `url('${image.src}')`,
            opacity: kind === 'original' ? 0.36 : lightSample ? 0.64 : 0.5,
            filter:
              kind === 'original'
                ? 'grayscale(0.35) sepia(0.75) saturate(1.15) hue-rotate(335deg) brightness(.72) contrast(1.05)'
                : lightSample
                  ? 'sepia(1) saturate(1.45) hue-rotate(345deg) brightness(.82) contrast(1.05)'
                  : 'brightness(.9) contrast(1.08)',
          }}
        />
        <div
          className={`absolute inset-0 ${
            lightSample
              ? 'bg-gradient-to-b from-transparent via-amber-500/0 to-amber-500/12'
              : 'bg-gradient-to-b from-slate-950/8 via-transparent to-slate-950/18'
          }`}
        />
      </div>
      <span className="block bg-[#0b1220]/86 px-2 py-1.5 text-xs font-bold text-slate-300">{image.label}</span>
    </button>
  );
}
