import {React,useState} from 'react'

function Tasacion({prop, tasaciones, btnEliminar, setFields, btnsubmit}) {
    const [eliminado, estaEliminado] = useState(false);

    
  const toSentenceCase = v => v[0].toUpperCase().concat(v.substring(1));
  //const tasacionesFiltradas = tasaciones.filter((tas)=>tas.id_propiedad === prop.id);

  const handleRetasar = () => {
    //Guardo datos en propiedad, veo si borro un campo para actualizar. Actualizo setFields al final
    const property = {
      calle: prop.calle,
      numero: prop.numero,
      ambientes: prop.ambientes,
      banios: prop.baños,
      dormitorios: prop.dormitorios,
      pileta: prop.pileta,
      parrilla: prop.parrilla,
      jardin: prop.jardin,
      latitud: prop.latitud, 
      longitud: prop.longitud, 
      esta_guardado: true,
      m2: prop.metros,
      cocheras: prop.cochera,
      ciudad: toSentenceCase(prop.ciudad),
      toilette: prop.toilette,
      lavadero: prop.lavadero,
      ac: prop.AC,
      balcon: prop.balcon,
      id_propiedad: prop.id,
      id_usuario: prop.id_usuario,
      precioAnterior: tasaciones[tasaciones.length - 1].precio
    }

    setFields({...property});
    btnsubmit();
  }
  const handleEliminar = () => {
    //Elimino guardado prop
    const apiUrlProp = `http://localhost:8000/esta-guardado-propiedad/${prop.id}/`;
        
    const property = {
      esta_guardado: false
    }

    console.log(
      JSON.stringify(property)
    )
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    };

    // Realizar una solicitud GET a la API utilizando fetch()
      fetch(apiUrlProp, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        setPropiedad({...propiedad, esta_guardado: true})
        //window.alert('Propiedad guardada.')
        })
      .then(data=>console.log(data))
      .catch((error) => {
          console.error('Error al obtener los datos:', error);
      });

      //Elimino guardado tasaciones
      for(let tas of tasaciones){
        
        let apiUrlTasacion = `http://localhost:8000/esta-guardado-tasacion/${tas.id}/`;
          
        fetch(apiUrlTasacion, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            setPropiedad({...propiedad, esta_guardado: true})
            //window.alert('Propiedad guardada.')
        })
        .then(data=>console.log(data))
        .catch((error) => {
            console.error('Error al obtener los datos:', error);
        });
        
        btnEliminar();
    }
  }

  return (
    <div className='inline spacebetween bottom1rem'>
        <div>
            <h3 className='bold'>{prop.calle} {prop.numero}, {toSentenceCase(prop.ciudad)}</h3>
        </div>
        <div>
            {(tasaciones && tasaciones.length > 0 ) && 
            <div>
                <h4 className='semibold smaller sizefirstpart'>Tasaciones:</h4>
                <table className='DivWithScrollTas tabtas'>
                {
                    tasaciones
                    .reverse()
                    .map(tas=> //FALTA FORMATO Y BOTON DE BORRAR Y RETASAR
                        <tr>
                        <td className='small'>{tas.fecha}</td>
                        <td className='small'>{Intl.NumberFormat('es-AR', {style: 'currency', currency: 'USD'})
                        .format(tas.precio)}</td>
                        </tr>
                    )
                }
                </table>
            </div>
            }
        </div>
        <div>
          <button
            className="buttonretasar block w-full bg-sky-800 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onClick={handleRetasar}
          >
            Volver a tasar
          </button>
          <button
            type="submit"
            className="buttonretasar block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
    </div>
  )
}

export default Tasacion