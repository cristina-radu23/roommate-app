import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";

type Props = {
  address: string;
};

const MapPreview = ({ address }: Props) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await res.json();
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);

        // 🧭 If map already exists, center it
        if (mapRef.current) {
            mapRef.current.setView([lat, lon], 15);
          }
      }
    };

    fetchCoordinates();
  }, [address]);

  return position ? (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", marginBottom: "2rem" }}
      ref={(ref) => {
        if (ref && !mapRef.current) {
          mapRef.current = ref;
        }
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

      <Marker position={position} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png", iconSize: [25, 41], iconAnchor: [12, 41] })}>
        <Popup>Property Location</Popup>
      </Marker>
    </MapContainer>
  ) : (
    <p>Loading map...</p>
  );
};

export default MapPreview;
