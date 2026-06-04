import { areaBalanceDomain, areaBreathPattern, areaFascialChain, areaNeuralPathway, areaSpiralPattern, neuralPainTypes } from './constants';
import { buildSafetyMessage, getSafetyMode } from './safetyEngine';
import type { RegenMoveAssessmentInput, RegenMovePhase, RegenMoveProfile } from './types';

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getPhase(input: RegenMoveAssessmentInput): RegenMovePhase {
  if (input.intensity >= 8) return 'Reset';
  if (neuralPainTypes.has(input.painType)) return 'Glide';
  if (input.goal === 'Volver a entrenar') return 'Strengthen';
  if (input.limitation === 'Caminar') return 'Integrate';
  if (input.area === 'upper_back' || input.area === 'hips') return 'Spiralize';
  return 'Decompress';
}

export function buildRegenMoveProfile(input: RegenMoveAssessmentInput): RegenMoveProfile {
  const neuralBoost = neuralPainTypes.has(input.painType) ? 28 : 8;
  const intensityLoad = input.intensity * 6;
  const phase = getPhase(input);
  const safetyMode = getSafetyMode(input);

  return {
    area: input.area,
    neuralScore: clampScore(intensityLoad + neuralBoost),
    fascialScore: clampScore(42 + input.intensity * 4),
    spiralScore: clampScore((input.area === 'upper_back' || input.area === 'hips' || input.area === 'lower_back' ? 56 : 34) + input.intensity * 3),
    breathScore: clampScore(input.intensity >= 7 ? 74 : 48),
    balanceScore: clampScore((input.limitation === 'Caminar' ? 70 : 35) + input.intensity * 2),
    safetyScore: clampScore(100 - input.intensity * 8),
    neuralPathway: areaNeuralPathway[input.area],
    fascialChain: areaFascialChain[input.area],
    spiralPattern: areaSpiralPattern[input.area],
    breathPattern: areaBreathPattern[input.area],
    balanceDomain: areaBalanceDomain[input.area],
    phase,
    safetyMode,
    safetyMessage: buildSafetyMessage(input),
    routineIntent: buildRoutineIntent(phase, safetyMode),
  };
}

function buildRoutineIntent(phase: RegenMovePhase, safetyMode: string) {
  if (safetyMode === 'blocked') return 'Prioridad: seguridad y referencia profesional.';
  if (safetyMode === 'reset_only') return 'Prioridad: bajar irritabilidad antes de reforzar.';

  const intents: Record<RegenMovePhase, string> = {
    Reset: 'Regular sistema nervioso y preparar movimiento suave.',
    Decompress: 'Crear descarga, espacio articular y movilidad segura.',
    Glide: 'Mejorar deslizamiento neural sin provocar sintomas.',
    Spiralize: 'Recuperar rotacion, diagonales y continuidad fascial.',
    Integrate: 'Conectar balance, marcha y control funcional.',
    Strengthen: 'Reforzar la zona con control y tolerancia progresiva.',
    Perform: 'Transferir a movimientos mas dinamicos y rendimiento.',
  };

  return intents[phase];
}
