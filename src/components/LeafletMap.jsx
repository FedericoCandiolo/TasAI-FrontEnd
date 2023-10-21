"use client";
import "leaflet/dist/leaflet.css";

import { useState, React, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// const createCustomClusterIcon = (cluster) => {
//   return new divIcon({
//     html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
//     className: "custom-marker-cluster",
//     iconSize: PointerEvent(33, 33, true),
//   });
// }; -- Ver de implementar después

export default function LeafletMap({ propiedad }) {
  const [propiedadTasada, setPropiedadTasada] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
  const nominatim_request_options = {
    method: "GET",
    redirect: "follow",
  };

  useEffect(() => {
    const nominatim_params = {
      q: propiedad.direccion + "+" + "Ciudad Autonoma Buenos Aires",
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const queryString = new URLSearchParams(nominatim_params).toString();

    //console.log(searchText);
    //console.log(`${NOMINATIM_BASE_URL}${queryString}`);
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, nominatim_request_options)
      .then((response) => response.json())
      .then((result) => {
        const propTasada = [
          {
            geocode: [result[0]?.lat, result[0]?.lon],
          },
        ];
        console.log(propTasada[0]?.geocode);
        setPropiedadTasada(propTasada[0]?.geocode);
        // console.log(result);
        // console.log(propiedadTasada);
        setDataLoaded(true);
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  const markers = [
    {
      geocode: [-34.6090219, -58.378698],
      popUp: "Caece",
    },
    {
      geocode: [-34.6084374, -58.3724627],
      popUp: "Casa Rosada",
    },
    {
      geocode: [-34.6098163, -58.397477],
      popUp: "Congreso de la Nación",
    },
  ];

  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    // iconUrl: require("iconroute"),
    iconSize: [38, 38],
  });

  return (
    <div class="space-from-header">
      {dataLoaded ? (
        <MapContainer center={propiedadTasada} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={propiedadTasada} icon={CustomIcon}></Marker>
          {/* <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createCustomClusterIcon} -- Ver de implementar después
          > 
          {propiedadTasada.map((marker) => (
            <Marker position={marker} icon={CustomIcon}>
              {/* <Popup>{marker.popUp}</Popup> */}
          {/*</Marker> */}
          {/* }))} */}
          {/*</MarkerClusterGroup> */}
        </MapContainer>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
// export default LeafletMap;
