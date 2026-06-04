import type { BodyArea } from '@/lib/types';
import type { BalanceDomain, BreathPattern, FascialChain, NeuralPathway, SpiralPattern } from './types';

export const areaNeuralPathway: Record<BodyArea, NeuralPathway> = {
  neck: 'cervical_root',
  shoulders: 'brachial_plexus',
  upper_back: 'thoracic_intercostal',
  lower_back: 'sciatic',
  hips: 'femoral',
  knees: 'femoral',
  ankles: 'tibial',
};

export const areaFascialChain: Record<BodyArea, FascialChain> = {
  neck: 'superficial_back_line',
  shoulders: 'arm_lines',
  upper_back: 'spiral_line',
  lower_back: 'superficial_back_line',
  hips: 'deep_front_line',
  knees: 'lateral_line',
  ankles: 'superficial_back_line',
};

export const areaSpiralPattern: Record<BodyArea, SpiralPattern> = {
  neck: 'contralateral_reach',
  shoulders: 'diagonal_extension',
  upper_back: 'thoracic_rotation',
  lower_back: 'pelvic_rotation',
  hips: 'pelvic_rotation',
  knees: 'gait_spiral',
  ankles: 'tai_chi_weight_shift',
};

export const areaBreathPattern: Record<BodyArea, BreathPattern> = {
  neck: 'downregulation_breath',
  shoulders: 'lateral_rib_expansion',
  upper_back: 'spiral_breathing',
  lower_back: '360_breathing',
  hips: 'exhale_lengthening',
  knees: 'downregulation_breath',
  ankles: 'downregulation_breath',
};

export const areaBalanceDomain: Record<BodyArea, BalanceDomain> = {
  neck: 'static_stance',
  shoulders: 'static_stance',
  upper_back: 'weight_shift',
  lower_back: 'weight_shift',
  hips: 'rotational_balance',
  knees: 'gait_control',
  ankles: 'fall_risk_safe_mode',
};

export const neuralPainTypes = new Set(['burning', 'sharp']);
