export type WatermarkPageId =
  | 'home'
  | 'assessment'
  | 'body-map'
  | 'exercises'
  | 'routine'
  | 'functional'
  | 'tracking'
  | 'dashboard'
  | 'login';

export interface WatermarkPageOption {
  id: WatermarkPageId;
  label: string;
  path: string;
  className: string;
}

export interface WatermarkImageOption {
  id: string;
  label: string;
  src: string;
}

export interface WatermarkSetting {
  image: string;
  opacity: number;
  size: number;
  x: number;
  y: number;
  negative: boolean;
  tone: number;
  surface: 'box' | 'text' | 'diffuse';
}

export const watermarkPages: WatermarkPageOption[] = [
  { id: 'home', label: 'Inicio', path: '/', className: 'wm-home' },
  { id: 'assessment', label: 'Evaluacion', path: '/assessment', className: 'wm-assessment' },
  { id: 'body-map', label: 'Mapa corporal', path: '/body-map', className: 'wm-body-map' },
  { id: 'exercises', label: 'Ejercicios', path: '/exercises', className: 'wm-exercises' },
  { id: 'routine', label: 'Rutina', path: '/routine?area=lower_back&intensity=5', className: 'wm-routine' },
  { id: 'functional', label: 'Fuerza funcional', path: '/functional', className: 'wm-functional' },
  { id: 'tracking', label: 'Progreso', path: '/tracking', className: 'wm-tracking' },
  { id: 'dashboard', label: 'Panel', path: '/dashboard', className: 'wm-dashboard' },
  { id: 'login', label: 'Login', path: '/login', className: 'wm-login' },
];

const watermarkBaseIds = [
  'DSC_7312',
  'DSC_7490',
  'DSC_7507-2',
  'DSC_7609',
  'DSC_7705',
  'DSC_7975',
  'DSC_7986',
  'DSC_8037',
  'DSC_8066-2',
  'DSC_8085',
  'DSC_8133',
];

export const watermarkImages: WatermarkImageOption[] = watermarkBaseIds.flatMap((id) => {
  const label = id.replace('DSC_', 'Foto ');

  return [
    {
      id: `${id}-original`,
      label: `${label} · original`,
      src: `/watermarks/options/${id}.jpg`,
    },
    {
      id: `${id}-shadow`,
      label: `${label} · sombra`,
      src: `/watermarks/shadows/${id}.png`,
    },
    {
      id: `${id}-outline`,
      label: `${label} · linea+sombra`,
      src: `/watermarks/outlines/${id}.png`,
    },
  ];
});

export const defaultWatermarkSetting: WatermarkSetting = {
  image: watermarkImages[0].src,
  opacity: 0.055,
  size: 54,
  x: 82,
  y: 22,
  negative: false,
  tone: 35,
  surface: 'box',
};

export const watermarkStorageKey = 'regenmove.watermarks';
