import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map({ userIp }) {
  return (
    <div>
      {userIp.latitude && userIp.longitude ? (
        <MapContainer
          center={[userIp.latitude, userIp.longitude]}
          zoom={12}
          style={{ height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userIp.latitude && userIp.longitude && (
            <Marker position={[userIp.latitude, userIp.longitude]} />
          )}
        </MapContainer>
      ) : (
        <p>is loading map</p>
      )}
    </div>
  );
}
