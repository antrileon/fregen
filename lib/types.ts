export type BodyArea =
  | 'neck'
  | 'shoulders'
  | 'upper_back'
  | 'lower_back'
  | 'hips'
  | 'knees'
  | 'ankles';

export type Difficulty = 'Baja' | 'Media' | 'Alta';

export interface Exercise {
  id: string;
  name: string;
  area: BodyArea;
  category: 'Liberacion neuromuscular' | 'Neurodinamia' | 'Fuerza correctiva' | 'Movilidad';
  durationSeconds: number;
  sets: number;
  reps?: string;
  difficulty: Difficulty;
  description: string;
  therapeuticGoal: string;
  image: string;
  videoDemo: string;
  startingPosition: string;
  steps: string[];
  commonMistakes: string[];
  painRule: string;
}

export interface PainAssessment {
  id: string;
  area: BodyArea;
  intensity: number;
  painType: string;
  limitation: string;
  goal: string;
  photoUrl?: string;
  frontPhotoUrl?: string;
  backPhotoUrl?: string;
  createdAt: string;
}

export interface ProgressLog {
  id: string;
  routineArea: BodyArea;
  painBefore: number;
  painAfter: number;
  completedExercises: number;
  totalExercises: number;
  notes: string;
  createdAt: string;
}

export interface BodyPoint {
  id: string;
  label: string;
  area: BodyArea;
  x: number;
  y: number;
}
