import type { RegenMoveProfile } from '@/lib/regenmove/types';

interface ProfileRadarProps {
  profile: RegenMoveProfile;
  compact?: boolean;
}

const axes = [
  { key: 'neuralScore', label: 'Neural' },
  { key: 'fascialScore', label: 'Fascial' },
  { key: 'spiralScore', label: 'Espiral' },
  { key: 'breathScore', label: 'Resp' },
  { key: 'balanceScore', label: 'Balance' },
  { key: 'safetyScore', label: 'Seg' },
] as const;

function polarPoint(index: number, radius: number) {
  const angle = -Math.PI / 2 + (index / axes.length) * Math.PI * 2;
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

function pointList(values: number[]) {
  return values
    .map((value, index) => {
      const point = polarPoint(index, (Math.max(0, Math.min(100, value)) / 100) * 38);
      return `${point.x},${point.y}`;
    })
    .join(' ');
}

export function ProfileRadar({ profile, compact = false }: ProfileRadarProps) {
  const values = axes.map((axis) => profile[axis.key]);
  const polygon = pointList(values);
  const rings = [38, 28, 18];

  return (
    <div className={`soft-card overflow-hidden rounded-2xl p-4 ${compact ? '' : 'md:p-5'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-amber-400">Medicion V2</p>
          <h3 className="mt-1 text-lg font-bold text-white">Mapa de respuesta</h3>
        </div>
        <span className="rounded-full border border-amber-500/45 bg-amber-500/18 px-3 py-1 text-xs font-bold text-amber-200">
          {profile.phase}
        </span>
      </div>

      <div className={`mt-4 grid gap-4 ${compact ? '' : 'sm:grid-cols-[190px_1fr]'}`}>
        <div className="control-surface mx-auto aspect-square w-full max-w-[210px] rounded-2xl p-3">
          <svg viewBox="0 0 100 100" role="img" aria-label="Poligono de mediciones RegenMove V2" className="h-full w-full">
            <defs>
              <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.34" />
                <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0.02" />
              </radialGradient>
              <filter id="radarSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {rings.map((radius) => (
              <polygon
                key={radius}
                points={axes.map((_, index) => {
                  const point = polarPoint(index, radius);
                  return `${point.x},${point.y}`;
                }).join(' ')}
                fill="none"
                stroke="rgb(58 72 90)"
                strokeWidth="0.8"
              />
            ))}

            {axes.map((_, index) => {
              const end = polarPoint(index, 39);
              return <line key={index} x1="50" y1="50" x2={end.x} y2={end.y} stroke="rgb(58 72 90)" strokeWidth="0.7" />;
            })}

            <polygon points={polygon} fill="url(#radarGlow)" stroke="rgb(245 158 11)" strokeWidth="1.9" filter="url(#radarSoftGlow)" />
            {values.map((value, index) => {
              const point = polarPoint(index, (value / 100) * 38);
              return <circle key={axes[index].key} cx={point.x} cy={point.y} r="1.9" fill="rgb(251 191 36)" stroke="rgb(7 13 26)" strokeWidth="0.8" />;
            })}

            {axes.map((axis, index) => {
              const label = polarPoint(index, 46);
              return (
                <text
                  key={axis.key}
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="rgb(203 213 225)"
                  fontSize="5"
                  fontWeight="700"
                >
                  {axis.label}
                </text>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {axes.map((axis) => (
            <div key={axis.key} className="control-surface rounded-xl p-3">
              <p className="font-semibold text-slate-400">{axis.label}</p>
              <p className="mt-1 text-xl font-black text-white">{profile[axis.key]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
