import type { RegenMoveAssessmentInput, SafetyMode } from './types';

export function getSafetyMode(input: RegenMoveAssessmentInput): SafetyMode {
  if (input.intensity >= 9) return 'blocked';
  if (input.intensity >= 8) return 'reset_only';
  if (input.painType === 'burning' || input.painType === 'sharp') return 'guided';
  return 'standard';
}

export function buildSafetyMessage(input: RegenMoveAssessmentInput) {
  const safetyMode = getSafetyMode(input);

  if (safetyMode === 'blocked') {
    return 'Por seguridad, usa solo orientacion general y busca valoracion profesional antes de iniciar ejercicios.';
  }

  if (safetyMode === 'reset_only') {
    return 'Dolor alto: usa respiracion, descarga y movilidad suave. Evita tension neural intensa y fuerza.';
  }

  if (safetyMode === 'guided') {
    return 'Trabaja con rango bajo. Si el sintoma baja hacia brazo o pierna, reduce o detente.';
  }

  return 'Trabaja en rango comodo, sin dolor agudo ni sintomas que aumenten despues del ejercicio.';
}
