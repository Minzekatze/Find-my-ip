import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function Map() {
  const [lat, setlat] = useState();
  const [lng, setlng] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=064a790cfb2c4d30be1a9b1be5c256b4&excludes=continent_code,currency,time_zone`
      )
      .then((response) => {
        console.log(response);
        setlat(parseFloat(response.data.latitude));
        setlng(parseFloat(response.data.longitude));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {lat && lng ? (
        <MapContainer center={[lat, lng]} zoom={12} style={{ height: "50vh" }}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat && lng && <Marker position={[lat, lng]} />}
        </MapContainer>
      ) : (
        <p>is loading map</p>
      )}
    </div>
  );
}
