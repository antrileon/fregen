export type FunctionalFocus = 'arms' | 'legs' | 'chest' | 'glutes' | 'core' | 'full_body';

export interface FunctionalExercise {
  id: string;
  focus: FunctionalFocus;
  name: string;
  level: 'Base' | 'Intermedio' | 'Reto';
  duration: string;
  description: string;
  cues: string[];
  game: string;
}

export const functionalFocusLabels: Record<FunctionalFocus, string> = {
  arms: 'Brazos',
  legs: 'Piernas',
  chest: 'Pecho',
  glutes: 'Gluteos',
  core: 'Core',
  full_body: 'Full body',
};

export const functionalExercises: FunctionalExercise[] = [
  {
    id: 'incline-pushup',
    focus: 'chest',
    name: 'Flexion inclinada',
    level: 'Base',
    duration: '3 x 8-12',
    description: 'Empuje seguro para fortalecer pecho, hombros y triceps sin equipo.',
    cues: ['Manos sobre pared, mesa o superficie firme', 'Cuerpo en linea', 'Baja lento y empuja fuerte'],
    game: 'Reto 30 segundos: cuenta repeticiones perfectas, no rapidas.',
  },
  {
    id: 'pushup-hold',
    focus: 'chest',
    name: 'Flexion con pausa',
    level: 'Intermedio',
    duration: '4 x 6',
    description: 'Aumenta fuerza de pecho con control y pausa isometrica.',
    cues: ['Pausa un segundo abajo', 'Codos a 45 grados', 'Aprieta abdomen'],
    game: 'Modo precision: cada repeticion debe durar 4 segundos.',
  },
  {
    id: 'bear-shoulder-tap',
    focus: 'arms',
    name: 'Bear shoulder taps',
    level: 'Intermedio',
    duration: '3 x 20 taps',
    description: 'Fortalece brazos, hombros y core con estabilidad dinamica.',
    cues: ['Rodillas apenas elevadas', 'Toca hombro contrario', 'Cadera quieta'],
    game: 'No derrames el vaso: imagina un vaso sobre la espalda.',
  },
  {
    id: 'triceps-floor-dip',
    focus: 'arms',
    name: 'Dip de triceps en piso',
    level: 'Base',
    duration: '3 x 10',
    description: 'Trabajo directo de triceps y hombros usando solo el suelo.',
    cues: ['Dedos apuntan hacia pies', 'Pecho abierto', 'Flexiona codos suave'],
    game: 'Escalera: 4, 6, 8, 10 repeticiones con descanso corto.',
  },
  {
    id: 'squat-tempo',
    focus: 'legs',
    name: 'Sentadilla tempo',
    level: 'Base',
    duration: '4 x 10',
    description: 'Piernas fuertes con control, sin saltos ni equipo.',
    cues: ['3 segundos bajando', 'Rodillas alineadas', 'Sube empujando el piso'],
    game: 'Semaforo: baja en rojo, pausa en amarillo, sube en verde.',
  },
  {
    id: 'reverse-lunge',
    focus: 'legs',
    name: 'Zancada hacia atras',
    level: 'Intermedio',
    duration: '3 x 8 por lado',
    description: 'Fortalece piernas con menos estres frontal en rodilla.',
    cues: ['Paso atras largo', 'Torso alto', 'Empuja con pierna delantera'],
    game: 'Alterna lados sin perder equilibrio durante 60 segundos.',
  },
  {
    id: 'glute-bridge-march',
    focus: 'glutes',
    name: 'Puente con marcha',
    level: 'Intermedio',
    duration: '3 x 20 pasos',
    description: 'Gluteos y pelvis fuertes con estabilidad unilateral.',
    cues: ['Cadera alta', 'Costillas abajo', 'Levanta un pie sin girarte'],
    game: 'Mantén una linea recta: si la cadera cae, reinicia conteo.',
  },
  {
    id: 'frog-pump',
    focus: 'glutes',
    name: 'Frog pumps',
    level: 'Base',
    duration: '3 x 25',
    description: 'Activacion intensa y rapida de gluteos sin impacto.',
    cues: ['Plantas juntas', 'Rodillas abiertas', 'Sube apretando gluteos'],
    game: 'Beat set: 25 repeticiones al ritmo de una cancion.',
  },
  {
    id: 'dead-bug',
    focus: 'core',
    name: 'Dead bug',
    level: 'Base',
    duration: '3 x 8 por lado',
    description: 'Core fuerte y espalda protegida con control respiratorio.',
    cues: ['Espalda baja estable', 'Exhala al extender', 'Movimiento lento'],
    game: 'Nivel ninja: sin mover la pelvis en ninguna repeticion.',
  },
  {
    id: 'plank-reach',
    focus: 'core',
    name: 'Plancha con alcance',
    level: 'Reto',
    duration: '3 x 30s',
    description: 'Core, hombros y estabilidad en un solo ejercicio.',
    cues: ['Pies separados', 'Alcanza al frente', 'No gires cadera'],
    game: 'Cronometro: suma segundos limpios sin perder forma.',
  },
  {
    id: 'animal-flow',
    focus: 'full_body',
    name: 'Flujo animal basico',
    level: 'Reto',
    duration: '5 rondas de 40s',
    description: 'Movimiento entretenido para fuerza, movilidad y coordinacion.',
    cues: ['Bear crawl 10s', 'Crab reach 10s', 'Squat walk 10s', 'Respira 10s'],
    game: 'Circuito arcade: cada ronda perfecta suma un punto.',
  },
];
