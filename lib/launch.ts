import { areaLabels } from '@/lib/routines';
import type { BodyArea } from '@/lib/types';

export type LaunchSide = 'left' | 'right' | 'both' | 'center' | 'not_sure';

export interface LaunchPainRequest {
  id: string;
  patientName: string;
  contact: string;
  area: BodyArea;
  side: LaunchSide;
  intensityNow: number;
  intensityWorst: number;
  painType: string;
  radiation: string;
  triggers: string;
  relief: string;
  timing: string;
  limitation: string;
  symptoms: string[];
  redFlags: string[];
  goal: string;
  notes: string;
  createdAt: string;
}

export const launchStorageKey = 'regenmove.launchRequests';

export const launchCoachEmail = process.env.NEXT_PUBLIC_REGENMOVE_COACH_EMAIL || 'antrileon@gmail.com';
export const launchCoachWhatsapp = process.env.NEXT_PUBLIC_REGENMOVE_COACH_WHATSAPP || '';

export const launchPainTypes = [
  'Corriente/electrico',
  'Hormigueo',
  'Adormecimiento',
  'Punzante',
  'Ardor',
  'Tension profunda',
  'Rigidez',
  'Debilidad',
];

export const launchSymptoms = [
  'Dolor baja por brazo o pierna',
  'Hormigueo',
  'Adormecimiento',
  'Debilidad',
  'Empeora sentado',
  'Empeora al dormir',
  'Empeora al caminar',
  'Mejora con movimiento suave',
];

export const launchRedFlags = [
  'Perdida marcada de fuerza',
  'Perdida de control de orina o heces',
  'Anestesia en zona intima',
  'Fiebre o infeccion reciente',
  'Trauma fuerte reciente',
  'Dolor nocturno intenso que no cambia',
];

export const launchSides: Array<{ value: LaunchSide; label: string }> = [
  { value: 'left', label: 'Izquierda' },
  { value: 'right', label: 'Derecha' },
  { value: 'both', label: 'Ambos lados' },
  { value: 'center', label: 'Centro' },
  { value: 'not_sure', label: 'No estoy seguro' },
];

export function buildLaunchMessage(request: LaunchPainRequest) {
  const symptomLine = request.symptoms.length ? request.symptoms.join(', ') : 'No especificado';
  const redFlagLine = request.redFlags.length ? request.redFlags.join(', ') : 'Ninguna marcada';

  return [
    'REGENMOVE LANZAMIENTO - SOLICITUD DE RUTINA MANUAL',
    `ID: ${request.id}`,
    `Fecha: ${new Date(request.createdAt).toLocaleString('es-CR')}`,
    '',
    `Paciente: ${request.patientName || 'Sin nombre'}`,
    `Contacto: ${request.contact || 'Sin contacto'}`,
    `Zona: ${areaLabels[request.area]}`,
    `Lado: ${launchSides.find((side) => side.value === request.side)?.label || request.side}`,
    `Dolor ahora: ${request.intensityNow}/10`,
    `Dolor maximo: ${request.intensityWorst}/10`,
    `Tipo: ${request.painType}`,
    `Irradiacion: ${request.radiation || 'No especificado'}`,
    '',
    `Cuando aparece/empeora: ${request.triggers || 'No especificado'}`,
    `Que lo alivia: ${request.relief || 'No especificado'}`,
    `Momento del dia/duracion: ${request.timing || 'No especificado'}`,
    `Limitacion principal: ${request.limitation || 'No especificado'}`,
    `Sintomas marcados: ${symptomLine}`,
    `Alertas marcadas: ${redFlagLine}`,
    '',
    `Objetivo del paciente: ${request.goal || 'No especificado'}`,
    `Notas libres: ${request.notes || 'Sin notas'}`,
    '',
    'Accion esperada: Andres revisa el caso, conversa con el paciente y entrega una rutina manual personalizada dentro de RegenMove.',
  ].join('\n');
}

export function buildMailtoUrl(request: LaunchPainRequest) {
  const subject = `RegenMove lanzamiento - ${request.patientName || areaLabels[request.area]}`;
  return `mailto:${launchCoachEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildLaunchMessage(request))}`;
}

export function buildWhatsappUrl(request: LaunchPainRequest) {
  if (!launchCoachWhatsapp) return '';
  const cleanPhone = launchCoachWhatsapp.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(buildLaunchMessage(request))}`;
}

export function saveLaunchRequest(request: LaunchPainRequest) {
  const current = JSON.parse(window.localStorage.getItem(launchStorageKey) || '[]') as LaunchPainRequest[];
  window.localStorage.setItem(launchStorageKey, JSON.stringify([request, ...current].slice(0, 25)));
}
