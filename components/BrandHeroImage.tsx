'use client';

import { useState } from 'react';

export function BrandHeroImage() {
  const [src, setSrc] = useState('/default-body-map.svg');

  return (
    <img
      src={src}
      alt="Mapa corporal RegenMove"
      className="mx-auto aspect-[5/7] max-h-[470px] w-full object-contain opacity-90"
      onError={() => {
        if (src !== '/default-body-map.svg') {
          setSrc('/default-body-map.svg');
        }
      }}
    />
  );
}
