import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapLibreMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [144.9631, -37.8136], // Melbourne coordinates
      zoom: 11
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full min-h-[420px] rounded-lg"
      style={{ height: '420px' }}
    />
  );
};

export default MapLibreMap;