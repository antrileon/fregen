export type BuilderStageId =
  | 'brief'
  | 'builder'
  | 'assets'
  | 'exerciseFigures'
  | 'backend'
  | 'deploy'
  | 'test'
  | 'handoff';

export interface BuilderStep {
  id: BuilderStageId;
  title: string;
  role: string;
  outcome: string;
  website: string;
  url: string;
  checklist: string[];
  promptLead: string;
}

export interface AppPackage {
  appName: string;
  audience: string;
  problem: string;
  coreWorkflow: string;
  inputs: string;
  outputs: string;
  visualDirection: string;
  launchTarget: string;
}

export const builderStorageKey = 'regenmove.appBuilderRobot';

export const builderSteps: BuilderStep[] = [
  {
    id: 'brief',
    title: '1. Paquete de informacion',
    role: 'Ordenar la idea antes de moverla a otra herramienta.',
    outcome: 'Un resumen claro del software, usuarios, datos y flujo principal.',
    website: 'ChatGPT',
    url: 'https://chatgpt.com/',
    checklist: [
      'Nombre y objetivo del producto definidos.',
      'Usuario principal y problema escritos en lenguaje simple.',
      'Flujo central descrito paso por paso.',
      'Entradas, salidas y criterio de exito listos para copiar.',
    ],
    promptLead: 'Convierte este paquete en un brief de construccion para una aplicacion web.',
  },
  {
    id: 'builder',
    title: '2. Construccion guiada',
    role: 'Enviar el brief a la herramienta que crea el primer prototipo.',
    outcome: 'Una version funcional inicial con pantallas, navegacion y datos de ejemplo.',
    website: 'Replit',
    url: 'https://replit.com/',
    checklist: [
      'Pegar el brief completo.',
      'Pedir una primera pantalla usable, no una pagina promocional.',
      'Revisar que el flujo principal se pueda completar.',
      'Guardar el enlace del proyecto.',
    ],
    promptLead: 'Crea una aplicacion web funcional con este brief. La primera pantalla debe ser el producto usable.',
  },
  {
    id: 'assets',
    title: '3. Activos y contenido',
    role: 'Organizar imagenes, textos, videos, marcas y ejemplos.',
    outcome: 'Material listo para reemplazar datos de prueba por contenido real.',
    website: 'Google Drive',
    url: 'https://drive.google.com/',
    checklist: [
      'Crear carpeta del proyecto.',
      'Subir logos, imagenes, videos o documentos necesarios.',
      'Nombrar archivos con version y uso.',
      'Copiar enlaces importantes en notas del paquete.',
    ],
    promptLead: 'Integra estos activos y manten una lista clara de donde se usa cada archivo.',
  },
  {
    id: 'exerciseFigures',
    title: '4. Figuras de ejercicios',
    role: 'Automatizar las imagenes educativas de cada ejercicio antes de integrarlas a la app.',
    outcome: 'Un set de figuras coherentes: silueta/postura correcta, flechas de movimiento y nombre de archivo por ejercicio.',
    website: 'ChatGPT / generador de imagenes',
    url: 'https://chatgpt.com/',
    checklist: [
      'Usar la guia docs/regenmove_25_exercise_figure_specs.md como fuente de verdad.',
      'Generar una imagen por ejercicio, no repetir la misma postura.',
      'Mantener fondo limpio, silueta clara y flechas ambar de direccion.',
      'Exportar con nombres consistentes para reemplazar los diagramas de la app.',
    ],
    promptLead: [
      'Genera las figuras educativas de RegenMove usando la especificacion de 25 ejercicios.',
      'Cada imagen debe mostrar la postura real del ejercicio, una silueta humana clara y flechas ambar de movimiento.',
      'No uses una sola figura repetida. Cada ejercicio necesita una postura distinta y clinicamente coherente.',
    ].join(' '),
  },
  {
    id: 'backend',
    title: '5. Datos y cuentas',
    role: 'Conectar autenticacion, tablas, almacenamiento o APIs si el producto lo necesita.',
    outcome: 'Datos persistentes y cuentas reales cuando el flujo lo requiera.',
    website: 'Supabase',
    url: 'https://supabase.com/dashboard',
    checklist: [
      'Decidir si la app necesita usuarios.',
      'Crear tablas solo para los datos necesarios del flujo.',
      'Copiar variables de entorno al proyecto.',
      'Probar crear, leer y actualizar datos.',
    ],
    promptLead: 'Agrega persistencia y autenticacion solamente donde el flujo lo requiere.',
  },
  {
    id: 'deploy',
    title: '6. Publicacion',
    role: 'Llevar la aplicacion a una URL publica.',
    outcome: 'Aplicacion publicada con variables configuradas y dominio listo.',
    website: 'Vercel',
    url: 'https://vercel.com/new',
    checklist: [
      'Importar el repositorio o proyecto.',
      'Configurar variables de entorno.',
      'Ejecutar deploy.',
      'Abrir la URL publica y guardar el enlace.',
    ],
    promptLead: 'Prepara esta app para deploy y documenta las variables necesarias.',
  },
  {
    id: 'test',
    title: '7. Prueba de lanzamiento',
    role: 'Repetir el recorrido como usuario real antes de compartir.',
    outcome: 'Lista corta de errores, mejoras y decisiones de lanzamiento.',
    website: 'App publicada',
    url: 'https://vercel.com/dashboard',
    checklist: [
      'Abrir la URL en escritorio y telefono.',
      'Completar el flujo principal desde cero.',
      'Verificar textos, botones, formularios y enlaces.',
      'Anotar errores con captura o descripcion concreta.',
    ],
    promptLead: 'Audita esta app como lanzamiento privado y devuelve una lista priorizada de correcciones.',
  },
  {
    id: 'handoff',
    title: '8. Entrega operativa',
    role: 'Dejar la receta lista para repetir con la siguiente aplicacion.',
    outcome: 'Resumen final con enlaces, cuentas, estado y proximos pasos.',
    website: 'Notion',
    url: 'https://www.notion.so/',
    checklist: [
      'Guardar brief, enlaces y credenciales necesarias.',
      'Escribir el estado actual del producto.',
      'Definir que se prueba esta semana.',
      'Duplicar este proceso para la siguiente app.',
    ],
    promptLead: 'Convierte este paquete en una ficha operativa de entrega y seguimiento.',
  },
];

export function buildPackageText(appPackage: AppPackage) {
  return [
    `Nombre: ${appPackage.appName || 'Sin nombre'}`,
    `Usuario principal: ${appPackage.audience || 'No definido'}`,
    `Problema que resuelve: ${appPackage.problem || 'No definido'}`,
    `Flujo principal: ${appPackage.coreWorkflow || 'No definido'}`,
    `Informacion que entra: ${appPackage.inputs || 'No definido'}`,
    `Resultado que entrega: ${appPackage.outputs || 'No definido'}`,
    `Direccion visual: ${appPackage.visualDirection || 'No definido'}`,
    `Meta de lanzamiento: ${appPackage.launchTarget || 'No definido'}`,
  ].join('\n');
}

export function buildStepPrompt(step: BuilderStep, appPackage: AppPackage) {
  return [
    step.promptLead,
    '',
    'PAQUETE DEL SOFTWARE',
    buildPackageText(appPackage),
    '',
    'REGLAS DE TRABAJO',
    '- Mantener el flujo principal como prioridad.',
    '- No agregar funciones que distraigan del lanzamiento.',
    '- Entregar pasos concretos para revisar el resultado.',
    '- Si falta informacion, usar supuestos conservadores y marcarlos.',
  ].join('\n');
}
