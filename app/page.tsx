'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);  // puede ser imagen o video
  const [mediaTipo, setMediaTipo] = useState<'imagen' | 'video'>('imagen');
  const [rotacion, setRotacion] = useState(0);
  const [ejerciciosRecomendados, setEjerciciosRecomendados] = useState<any[]>([]);
  const [mensaje, setMensaje] = useState('');

  const puntosPorDefecto = [
    { id: 0, nombre: 'Cuello', x: 50, y: 20 },
    { id: 1, nombre: 'Hombro izquierdo', x: 30, y: 30 },
    { id: 2, nombre: 'Hombro derecho', x: 70, y: 30 },
    { id: 3, nombre: 'Espalda', x: 50, y: 45 },
    { id: 4, nombre: 'Cadera izquierda', x: 35, y: 60 },
    { id: 5, nombre: 'Cadera derecha', x: 65, y: 60 },
    { id: 6, nombre: 'Rodilla izquierda', x: 35, y: 80 },
    { id: 7, nombre: 'Rodilla derecha', x: 65, y: 80 },
    { id: 8, nombre: 'Tobillo izquierdo', x: 35, y: 92 },
    { id: 9, nombre: 'Tobillo derecho', x: 65, y: 92 },
  ];

  const [puntos, setPuntos] = useState(puntosPorDefecto);

  // ========== CARGAR TODO AL INICIAR ==========
  useEffect(() => {
    const guardado = localStorage.getItem('bodyMapCompleto');
    if (guardado) {
      try {
        const datos = JSON.parse(guardado);
        if (datos.puntos) setPuntos(datos.puntos);
        if (datos.rotacion !== undefined) setRotacion(datos.rotacion);
        if (datos.mediaUrl) setMediaUrl(datos.mediaUrl);
        if (datos.mediaTipo) setMediaTipo(datos.mediaTipo);
        setMensaje('✅ Datos cargados');
        setTimeout(() => setMensaje(''), 2000);
      } catch (e) {}
    }
  }, []);

  // ========== GUARDAR TODO (MANUAL) ==========
  const guardarTodo = () => {
    const datos = {
      puntos: puntos,
      rotacion: rotacion,
      mediaUrl: mediaUrl,
      mediaTipo: mediaTipo,
    };
    localStorage.setItem('bodyMapCompleto', JSON.stringify(datos));
    setMensaje('✅ Todo guardado correctamente');
    setTimeout(() => setMensaje(''), 2000);
  };

  const convertirABase64 = (archivo: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(archivo);
    });
  };

  const subirArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    const tipo = archivo.type.startsWith('image/') ? 'imagen' : 'video';
    const base64 = await convertirABase64(archivo);
    
    setMediaUrl(base64);
    setMediaTipo(tipo);
    setRotacion(0);
    
    // Guardar automáticamente después de subir
    setTimeout(() => guardarTodo(), 100);
    setMensaje(`${tipo} cargado correctamente. Presiona "Guardar todo"`);
    setTimeout(() => setMensaje(''), 2000);
  };

  const rotarImagen = () => {
    if (mediaTipo === 'video') {
      setMensaje('⚠️ Los videos no se pueden rotar');
      setTimeout(() => setMensaje(''), 1500);
      return;
    }
    setRotacion((prev) => (prev + 90) % 360);
    setMensaje('Rotación aplicada. Presiona "Guardar todo" para guardarla.');
    setTimeout(() => setMensaje(''), 1500);
  };

  const moverPunto = (deltaX: number, deltaY: number) => {
    if (selectedPoint === null) {
      setMensaje('Primero selecciona un punto rojo');
      setTimeout(() => setMensaje(''), 1000);
      return;
    }
    setPuntos(puntos.map(p => {
      if (p.nombre === selectedPoint) {
        return { ...p, x: Math.min(98, Math.max(2, p.x + deltaX)), y: Math.min(98, Math.max(2, p.y + deltaY)) };
      }
      return p;
    }));
    setMensaje(`${selectedPoint} movido. Presiona "Guardar todo"`);
    setTimeout(() => setMensaje(''), 1000);
  };

  const resetearPuntos = () => {
    if (confirm('¿Resetear todos los puntos?')) {
      setPuntos(puntosPorDefecto);
      setMensaje('Puntos reseteados. Presiona "Guardar todo" para guardar.');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  const limpiarTodo = () => {
    if (confirm('Eliminar todo? Volverás a empezar.')) {
      localStorage.removeItem('bodyMapCompleto');
      setMediaUrl(null);
      setRotacion(0);
      setPuntos(puntosPorDefecto);
      setSelectedPoint(null);
      setEjerciciosRecomendados([]);
      setMensaje('Todo eliminado');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  const ejerciciosPorZona = {
    'Cuello': [{ nombre: 'Rotación de cuello', duracion: '30', dificultad: 'Baja', instrucciones: 'Gira suavemente la cabeza.' }],
    'Hombro izquierdo': [{ nombre: 'Círculos de hombro', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota los hombros.' }],
    'Hombro derecho': [{ nombre: 'Círculos de hombro', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota los hombros.' }],
    'Espalda': [{ nombre: 'Gato-vaca', duracion: '45', dificultad: 'Baja', instrucciones: 'Arquea y redondea la espalda.' }],
    'Cadera izquierda': [{ nombre: 'Mariposa', duracion: '30', dificultad: 'Baja', instrucciones: 'Plantas de pies juntas.' }],
    'Cadera derecha': [{ nombre: 'Mariposa', duracion: '30', dificultad: 'Baja', instrucciones: 'Plantas de pies juntas.' }],
    'Rodilla izquierda': [{ nombre: 'Flexión de rodilla', duracion: '30', dificultad: 'Baja', instrucciones: 'Desliza el talón.' }],
    'Rodilla derecha': [{ nombre: 'Flexión de rodilla', duracion: '30', dificultad: 'Baja', instrucciones: 'Desliza el talón.' }],
    'Tobillo izquierdo': [{ nombre: 'Círculos de tobillo', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota el tobillo.' }],
    'Tobillo derecho': [{ nombre: 'Círculos de tobillo', duracion: '30', dificultad: 'Baja', instrucciones: 'Rota el tobillo.' }]
  };

  const seleccionarZona = (nombre: string) => {
    setSelectedPoint(nombre);
    setEjerciciosRecomendados((ejerciciosPorZona as Record<string, any>)[nombre] || []);
  };

  const irARutina = () => {
    if (ejerciciosRecomendados.length === 0) {
      alert('Primero selecciona una zona del mapa');
      return;
    }
    const ejerciciosParam = encodeURIComponent(JSON.stringify(ejerciciosRecomendados));
    window.location.href = `/rutina?ejercicios=${ejerciciosParam}`;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Panel del entrenador - Mapa de dolor</h1>
      
      {mensaje && (
        <div style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '8px', marginBottom: '15px' }}>
          {mensaje}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <label style={{ backgroundColor: '#3b82f6', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          📁 Subir imagen o video
          <input type="file" accept="image/*,video/*" onChange={subirArchivo} style={{ display: 'none' }} />
        </label>
        
        {mediaUrl && mediaTipo === 'imagen' && (
          <button onClick={rotarImagen} style={{ backgroundColor: '#10b981', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            🔄 Rotar imagen 90°
          </button>
        )}
        
        <button onClick={guardarTodo} style={{ backgroundColor: '#1e40af', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          💾 GUARDAR TODO
        </button>
        
        <button onClick={resetearPuntos} style={{ backgroundColor: '#f59e0b', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          🔄 Resetear puntos
        </button>
        
        <button onClick={limpiarTodo} style={{ backgroundColor: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
          🗑️ Limpiar todo
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* MAPA */}
        <div style={{
          position: 'relative',
          width: '650px',
          height: '750px',
          backgroundColor: '#e5e7eb',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {mediaUrl && mediaTipo === 'imagen' && (
            <img
              src={mediaUrl}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `rotate(${rotacion}deg)`,
                transition: 'transform 0.3s ease'
              }}
              alt="mapa"
            />
          )}
          
          {mediaUrl && mediaTipo === 'video' && (
            <video
              src={mediaUrl}
              controls
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          )}
          
          {!mediaUrl && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
              Sube una imagen o video
            </div>
          )}

          {puntos.map((p) => (
            <button
              key={p.id}
              onClick={() => seleccionarZona(p.nombre)}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: selectedPoint === p.nombre ? '#22c55e' : '#ef4444',
                border: '3px solid white',
                cursor: 'pointer',
                transform: 'translate(-50%, -50%)',
                fontSize: '18px',
                color: 'white',
                zIndex: 10,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
              title={p.nombre}
            >
              ●
            </button>
          ))}
        </div>

        {/* EJERCICIOS */}
        <div style={{
          width: '300px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '15px',
          maxHeight: '750px',
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
            {selectedPoint ? `📋 Ejercicios para ${selectedPoint}` : '🔍 Selecciona una zona'}
          </h3>
          
          {ejerciciosRecomendados.length === 0 && selectedPoint && (
            <p style={{ color: '#666' }}>No hay ejercicios.</p>
          )}
          
          {ejerciciosRecomendados.length === 0 && !selectedPoint && (
            <p style={{ color: '#666' }}>Haz clic en un punto rojo.</p>
          )}
          
          {ejerciciosRecomendados.map((ej, i) => (
            <div key={i} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
              <h4 style={{ fontWeight: 'bold', color: '#3b82f6' }}>{ej.nombre}</h4>
              <p style={{ fontSize: '12px', color: '#666' }}>⏱️ {ej.duracion} seg | 📊 {ej.dificultad}</p>
              <p style={{ fontSize: '13px' }}>{ej.instrucciones}</p>
            </div>
          ))}

          {ejerciciosRecomendados.length > 0 && (
            <button onClick={irARutina} style={{ backgroundColor: '#22c55e', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '15px', width: '100%', fontWeight: 'bold' }}>
              🏋️ INICIAR RUTINA ({ejerciciosRecomendados.length} ejercicios)
            </button>
          )}
        </div>

        {/* CONTROLES */}
        {selectedPoint && (
          <div style={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '170px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '14px' }}>🎯 Ajustar</h3>
            <p style={{ fontWeight: 'bold', color: '#22c55e', fontSize: '12px' }}>{selectedPoint}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', width: '90px', margin: '0 auto' }}>
              <div></div>
              <button onClick={() => moverPunto(0, -3)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▲</button>
              <div></div>
              <button onClick={() => moverPunto(-3, 0)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>◀</button>
              <button onClick={() => moverPunto(0, 0)} style={{ background: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>●</button>
              <button onClick={() => moverPunto(3, 0)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▶</button>
              <div></div>
              <button onClick={() => moverPunto(0, 3)} style={{ background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer' }}>▼</button>
              <div></div>
            </div>
            <p style={{ fontSize: '10px', marginTop: '10px' }}>Luego presiona 💾 GUARDAR TODO</p>
          </div>
        )}
      </div>
    </div>
  );
}