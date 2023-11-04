"use client";
import "leaflet/dist/leaflet.css";

import { useState, React, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Processing from "./Processing";


export default function LeafletMap({ propiedad }) {
  const similares = propiedad.similares;


  let markers = [
  /*   {
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
    }, */
  ];

  markers = [
    ...markers,
    ...(similares ? similares.map(p=>({geocode:[p.latitud,p.longitud],popUp:p})) : [])
  ]

  const CustomIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/4551/4551325.png",
    // iconUrl: require("iconroute"),
    iconSize: [38, 38],
  });

  const ComparacionIcon = new Icon({
    iconUrl: "https://i.ibb.co/2FYFJ9h/casabn.png",
    // iconUrl: require("iconroute"),
    iconSize: [34, 34],
  });

  console.log("SIMILARES MAP")
  console.log(similares)
  //console.log([...similares].map(e=>[e.latitud, e.longitud]))
  //console.log(propiedadTasada)

  return (
    <div class="map">
      {similares ? (
        <MapContainer className="map" center={[propiedad.latitud,propiedad.longitud]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[propiedad.latitud,propiedad.longitud]} icon={CustomIcon}></Marker>
          {
            markers.map(m=>
            <Marker position={m.geocode} icon={ComparacionIcon}>
              <Popup>
                <div className="grid2col">
                  <p>{propiedad.m2} metros cuadrados</p>
                  <p>{m.popUp.ambientes} { m.popUp.ambientes === 1 ? 'ambiente' : 'ambientes'}</p>
                  <p>{m.popUp.dormitorios} { m.popUp.dormitorios === 1 ? 'dormitorio' : 'dormitorios'}</p>
                  <p>{m.popUp.cochera} { m.popUp.cochera === 1 ? 'cochera' : 'cocheras'}</p>
                  <p>{m.popUp.baños} { m.popUp.baños === 1 ? 'baño' : 'baños'}</p>
                  <p>{ m.popUp.toilette ? '✔️' : '❌'} Toilette</p>
                  <p>{ m.popUp.lavadero ? '✔️' : '❌'} Lavadero</p>
                  <p>{ m.popUp.ac ? '✔️' : '❌'} A/C</p>
                  <p>{ m.popUp.balcon ? '✔️' : '❌'} Balcón</p>
                  <p>{ m.popUp.parrilla ? '✔️' : '❌'} Parrilla</p>
                  <p>{ m.popUp.jardin ? '✔️' : '❌'} Jardin</p>
                  <p>{ m.popUp.pileta ? '✔️' : '❌'} Pileta</p>
                </div>
              </Popup>
              {/* <Popup><p>{m.popUp}</p></Popup> */}
            </Marker>)
          }
          { similares ? 
          similares.map((p,id)=><Marker key={p.id} position={[`${id}`, "0"]} icon={CustomIcon} ></Marker>)
          : <></>
          }
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
        <div className="centerContainter">
          <div className="centerHijo">
            <svg className="rotate" fill="#222" version="1.1" id="Capa_1"  width="10vh" height="10vh" viewBox="0 0 26.349 26.35">
              <g>
                <g>
                  <circle cx="13.792" cy="3.082" r="3.082"/>
                  <circle cx="13.792" cy="24.501" r="1.849"/>
                  <circle cx="6.219" cy="6.218" r="2.774"/>
                  <circle cx="21.365" cy="21.363" r="1.541"/>
                  <circle cx="3.082" cy="13.792" r="2.465"/>
                  <circle cx="24.501" cy="13.791" r="1.232"/>
                  <path d="M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05
                    C6.902,18.996,5.537,18.988,4.694,19.84z"/>
                  <circle cx="21.364" cy="6.218" r="0.924"/>
                </g>
              </g>
            </svg>
            <p class="bigtext">Procesando...</p>
          </div>
        </div>
      )}
    </div>
  );
}
// export default LeafletMap;
