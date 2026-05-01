'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export function BodyMap({ onSelectArea, selectedArea, coachId }: { onSelectArea: (area: string) => void; selectedArea?: string; coachId?: string }) {
  const [backgroundUrl, setBackgroundUrl] = useState('/default-body-map.svg');
  const [loading, setLoading] = useState(true);

  // Cargar la imagen personalizada del coach (si existe)
  useEffect(() => {
    const fetchCustomMap = async () => {
      const { data, error } = await supabase
        .from('media_assets')
        .select('url')
        .eq('asset_type', 'body_map')
        .eq('owner_id', coachId)
        .single();
      if (data && !error) {
        setBackgroundUrl(data.url);
      }
      setLoading(false);
    };
    if (coachId) fetchCustomMap();
  }, [coachId]);

  // Puntos predefinidos (coordenadas relativas en %)
  const hotspots = [
    { area: 'Cuello', x: 50, y: 15 },
    { area: 'Hombros', x: 30, y: 25 },
    { area: 'Hombros', x: 70, y: 25 },
    { area: 'Espalda alta', x: 50, y: 35 },
    { area: 'Espalda baja', x: 50, y: 55 },
    { area: 'Glúteos', x: 50, y: 70 },
    { area: 'Rodillas', x: 35, y: 85 },
    { area: 'Rodillas', x: 65, y: 85 },
    { area: 'Tobillos', x: 50, y: 95 },
  ];

  if (loading) return <div className="text-center p-4">Cargando mapa...</div>;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <img
        src={backgroundUrl}
        alt="Mapa corporal"
        className="w-full h-auto border rounded-lg shadow"
      />
      {hotspots.map((spot, idx) => (
        <button
          key={idx}
          onClick={() => onSelectArea(spot.area)}
          className={`absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 
            ${selectedArea === spot.area ? 'bg-green-500 scale-125' : 'bg-blue-500'} 
            bg-opacity-70 hover:bg-opacity-100 transition-all duration-200 cursor-pointer`}
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          title={spot.area}
        >
          ●
        </button>
      ))}
    </div>
  );
}