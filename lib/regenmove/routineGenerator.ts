import type { Exercise } from '@/lib/types';
import type { RegenMoveExerciseDNA, RegenMoveProfile } from './types';

export function orderRoutineByProfile(exercises: Exercise[], profile: RegenMoveProfile) {
  if (profile.safetyMode === 'blocked') return [];

  const categoryOrder = profile.safetyMode === 'reset_only'
    ? ['Liberacion neuromuscular', 'Movilidad', 'Neurodinamia', 'Fuerza correctiva']
    : ['Liberacion neuromuscular', 'Neurodinamia', 'Movilidad', 'Fuerza correctiva'];

  return [...exercises].sort((a, b) => categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category));
}

export function getV2SupportExercises(profile: RegenMoveProfile, seed: RegenMoveExerciseDNA[]) {
  if (profile.safetyMode === 'blocked') return [];

  return seed
    .filter((exercise) => exercise.area === profile.area || exercise.area === 'lower_back' || exercise.area === 'upper_back')
    .filter((exercise) => profile.safetyMode !== 'reset_only' || exercise.acutePainSafe)
    .slice(0, 2);
}
