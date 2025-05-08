import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const HotelMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;
  return (
    <div
      style={{
        width: "100%",
        height: 320,
        borderRadius: 12,
        overflow: "hidden",
        margin: "32px 0",
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>호텔 위치</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default HotelMap;
