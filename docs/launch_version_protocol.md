# RegenMove Launch Version

## Objetivo

Usar RegenMove como prueba privada con pacientes reales sin depender de una rutina automatica. El paciente llena la evaluacion, Andres recibe el resumen clinico, conversa con la persona y prepara la rutina manualmente.

## Flujo del paciente

1. Entrar a `/launch`.
2. Escribir nombre y contacto.
3. Marcar la zona principal en el mapa corporal.
4. Elegir lado, intensidad actual, intensidad maxima y tipo de molestia.
5. Describir cuando aparece, que lo alivia, hacia donde se corre y que actividad limita.
6. Marcar sintomas y alertas importantes.
7. Enviar a Andres para rutina manual.

## Flujo de Andres

1. Copiar o recibir el resumen por email/WhatsApp.
2. Hablar con el paciente y confirmar detalles clave.
3. Escoger los ejercicios adecuados.
4. Mantener la ficha normal de RegenMove:
   - instrucciones
   - diagrama imprimible
   - posicion inicial
   - pasos
   - regla de dolor
   - objetivo terapeutico
5. Reemplazar solamente el video/demo por el video personalizado del paciente.

## Nota de seguridad

Si el paciente marca perdida marcada de fuerza, perdida de control de orina/heces, anestesia en zona intima, trauma fuerte, fiebre o dolor nocturno intenso que no cambia, no se entrega rutina normal sin revision profesional.

## URL de prueba

`http://localhost:3000/launch`
