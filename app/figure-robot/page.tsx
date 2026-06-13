import { readFileSync } from 'fs';
import { join } from 'path';
import { FigureRobotClient, type FigureExerciseSpec } from './FigureRobotClient';

const basePrompt = [
  'Genera una imagen educativa de rehabilitacion.',
  'Crear una silueta humana negra, fondo blanco limpio, bordes definidos, sin detalles internos, sin texto, sin logos.',
  'Incluir flechas ambar simples para indicar direccion del movimiento.',
  'La postura debe ser anatomica y clara.',
  'Debe parecer una lamina imprimible de ejercicio terapeutico, no una ilustracion decorativa.',
].join(' ');

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getField(block: string, label: string) {
  const match = block.match(new RegExp(`- ${label}: ([\\s\\S]*?)(?=\\n- [A-Z]|$)`));
  return match?.[1]?.replace(/\n/g, ' ').trim() || '';
}

function parseSpecs(): FigureExerciseSpec[] {
  const filePath = join(process.cwd(), 'docs/regenmove_25_exercise_figure_specs.md');
  const markdown = readFileSync(filePath, 'utf8');
  const sections = markdown.split(/\n## (?=\d+\. )/).slice(1);

  return sections.map((section) => {
    const heading = section.match(/^(\d+)\.\s+(.+)\n/);
    const id = Number(heading?.[1] || 0);
    const title = heading?.[2]?.trim() || `Ejercicio ${id}`;
    const body = section.replace(/^.+\n/, '');
    const zoneLine = getField(body, 'Zona');
    const zoneMatch = zoneLine.match(/^(.+?)\. Categoria: (.+?)\. Dosis: (.+)$/);
    const zone = zoneMatch?.[1]?.trim() || zoneLine;
    const category = zoneMatch?.[2]?.trim() || '';
    const dose = zoneMatch?.[3]?.trim() || '';
    const objective = getField(body, 'Objetivo');
    const start = getField(body, 'Postura inicial');
    const movement = getField(body, 'Movimiento');
    const figure = getField(body, 'Figura necesaria');
    const avoid = getField(body, 'Evitar');
    const rule = getField(body, 'Regla');
    const fileName = `${String(id).padStart(2, '0')}-${slugify(title)}.png`;
    const prompt = [
      basePrompt,
      '',
      `Ejercicio ${id}: ${title}`,
      `Archivo esperado: ${fileName}`,
      `Zona: ${zone}. Categoria: ${category}. Dosis de referencia: ${dose}.`,
      `Objetivo clinico: ${objective}`,
      `Postura inicial: ${start}`,
      `Movimiento que debe mostrar la imagen: ${movement}`,
      `Figura exacta necesaria: ${figure}`,
      `Errores que la imagen NO debe mostrar: ${avoid}`,
      `Regla de seguridad: ${rule}`,
      '',
      'Requisitos de imagen:',
      '- Una sola imagen para este ejercicio.',
      '- Formato cuadrado o vertical simple, facil de recortar para una tarjeta de ejercicio.',
      '- La postura debe coincidir con el titulo y con la figura exacta necesaria.',
      '- No usar una silueta generica si no representa el ejercicio.',
      '- Si requiere pared, silla, toalla, escalon o suelo, incluir ese elemento de forma simple.',
      '- Flechas ambar/naranja visibles, limpias y orientadas segun el movimiento.',
      '- Sin texto dentro de la imagen.',
      '- Si no puedes representar algo con seguridad, prioriza postura correcta sobre decoracion.',
    ].join('\n');

    return {
      id,
      title,
      zone,
      category,
      dose,
      objective,
      start,
      movement,
      figure,
      avoid,
      rule,
      prompt,
      fileName,
    };
  });
}

export default function FigureRobotPage() {
  return <FigureRobotClient exercises={parseSpecs()} />;
}
