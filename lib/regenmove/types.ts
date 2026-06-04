import type { BodyArea, Difficulty } from '@/lib/types';

export type NeuralPathway =
  | 'sciatic'
  | 'tibial'
  | 'common_peroneal'
  | 'femoral'
  | 'median'
  | 'ulnar'
  | 'radial'
  | 'brachial_plexus'
  | 'cervical_root'
  | 'thoracic_intercostal'
  | 'none_detected';

export type FascialChain =
  | 'superficial_back_line'
  | 'superficial_front_line'
  | 'lateral_line'
  | 'spiral_line'
  | 'deep_front_line'
  | 'functional_front_line'
  | 'functional_back_line'
  | 'arm_lines'
  | 'pelvic_chain'
  | 'diaphragm_pelvic_floor_axis'
  | 'none_detected';

export type SpiralPattern =
  | 'thoracic_rotation'
  | 'pelvic_rotation'
  | 'contralateral_reach'
  | 'diagonal_extension'
  | 'cross_crawl'
  | 'spiral_decompression'
  | 'tai_chi_weight_shift'
  | 'gait_spiral'
  | 'none_detected';

export type BreathPattern =
  | '360_breathing'
  | 'lateral_rib_expansion'
  | 'exhale_lengthening'
  | 'hypopressive_basic'
  | 'spiral_breathing'
  | 'downregulation_breath'
  | 'unknown';

export type BalanceDomain =
  | 'static_stance'
  | 'weight_shift'
  | 'single_leg_control'
  | 'rotational_balance'
  | 'gait_control'
  | 'fall_risk_safe_mode'
  | 'none_detected';

export type RegenMovePhase =
  | 'Reset'
  | 'Decompress'
  | 'Glide'
  | 'Spiralize'
  | 'Integrate'
  | 'Strengthen'
  | 'Perform';

export type SafetyMode = 'blocked' | 'reset_only' | 'guided' | 'standard';

export type ExerciseLevel =
  | 'level_0_reset'
  | 'level_1_foundation'
  | 'level_2_integration'
  | 'level_3_dynamic';

export interface RegenMoveExerciseDNA {
  id: string;
  name: string;
  area: BodyArea;
  category: 'Respiracion' | 'Espiral' | 'Balance' | 'Integracion';
  difficulty: Difficulty;
  level: ExerciseLevel;
  neuralPathways: NeuralPathway[];
  fascialChains: FascialChain[];
  spiralPatterns: SpiralPattern[];
  breathPatterns: BreathPattern[];
  balanceDomains: BalanceDomain[];
  instructions: string[];
  coachCues: string[];
  painRule: string;
  durationSeconds: number;
  seniorSafe: boolean;
  acutePainSafe: boolean;
}

export interface RegenMoveAssessmentInput {
  area: BodyArea;
  intensity: number;
  painType: string;
  limitation: string;
  goal: string;
}

export interface RegenMoveProfile {
  area: BodyArea;
  neuralScore: number;
  fascialScore: number;
  spiralScore: number;
  breathScore: number;
  balanceScore: number;
  safetyScore: number;
  neuralPathway: NeuralPathway;
  fascialChain: FascialChain;
  spiralPattern: SpiralPattern;
  breathPattern: BreathPattern;
  balanceDomain: BalanceDomain;
  phase: RegenMovePhase;
  safetyMode: SafetyMode;
  safetyMessage: string;
  routineIntent: string;
}
