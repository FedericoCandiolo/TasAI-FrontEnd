
import React, { useEffect, useState } from 'react';

function Fetch() {    
    const [data, setData] = useState([]);

    useEffect(() => {
    // URL de la API que deseas consultar
    const apiUrl = "http://localhost:8000/tasacion-propiedad-nueva/";

    const property = {
        calle: "Av Junin",
        numero: 811,
        habitaciones: 3,
        baños: 2,
        toilets: 2,
        dormitorios: 4,
        pisos: 2,
        pileta: true,
        parrilla: true,
        jardin: true,
        latitud: "20",
        longitud: "20",
        id_usuario: 1,
      };
    
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };

    // Realizar una solicitud GET a la API utilizando fetch()
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        setData(data); // Actualizar el estado con los datos recibidos de la API
        window.alert(data);
        console.log(data);
        })
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
        });
    }, []); // Ejecuta esto solo una vez al montar el componente

    return (
        <div>
        {/* Utiliza los datos obtenidos de la API en tu componente */}
            <p>{data.toString()}</p>
        </div>
    );
}

export default Fetch