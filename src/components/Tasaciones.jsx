import React from 'react'

function Tasaciones() {
    const [data, setData] = useState([]);
    const [propiedad, setPropiedad] = useState(resultados);
  
      useEffect(() => {
      // URL de la API que deseas consultar
      const apiUrl = "http://localhost:8000/tasacion-propiedad-nueva/";
      
      const property = { //Modificar proceso carga para que corresponda 1 a 1
          calle: propiedad.direccion,
          numero: propiedad.direccion.match(/(\d+)/)[0],
          habitaciones: propiedad.ambientes,
          baños: propiedad.banios,
          toilets: propiedad.toilletes,
          dormitorios: propiedad.ambientes,
          pisos: propiedad.plantas,
          pileta: true,
          parrilla: propiedad.parrilla || false,
          jardin: true,
          //latitud: "20", //desconocida
          //longitud: "20",
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
          setPropiedad({...propiedad, precio: data.precio})
          })
          .catch((error) => {
              console.error('Error al obtener los datos:', error);
          });
      }, []); // Ejecuta esto solo una vez al montar el componente
    ////FIN FETCH

  return (
    <div>Tasaciones</div>
  )
}

export default Tasaciones