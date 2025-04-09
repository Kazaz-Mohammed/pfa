// components/MapComponent.tsx
"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

// Fix default icon issue in Next.js
delete (L.Icon.Default as any).prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
})

// Fake data example: region coordinates and price level
const regionData = [
  { name: "Casablanca", lat: 33.5731, lng: -7.5898, priceLevel: "high" },
  { name: "Fès", lat: 34.0331, lng: -5.0003, priceLevel: "medium" },
  { name: "Errachidia", lat: 31.9310, lng: -4.4244, priceLevel: "low" },
  { name: "Laâyoune", lat: 27.1253, lng: -13.1625, priceLevel: "low" },

]

// Color mapping
const getColor = (level: string) => {
  if (level === "high") return "red"
  if (level === "medium") return "yellow"
  return "green"
}

export default function MapComponent() {
  return (
    <MapContainer
    //   center={[32.0, -6.5]} // Center on Morocco
        center={[27.1253, -13.1625]} // Centered on Laâyoune
      zoom={6}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {regionData.map((region, index) => (
        <Marker
          key={index}
          position={[region.lat, region.lng]}
          icon={L.divIcon({
            className: "custom-icon",
            html: `<div style="background:${getColor(region.priceLevel)};width:16px;height:16px;border-radius:50%;"></div>`,
          })}
        >
          <Popup>
            {region.name}<br />Prix: {region.priceLevel}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
