'use-client'
import {React, useState, useEffect} from 'react'

function Menu({setPagepart,user,setUser}) {
  const [data, setData] = useState([]);

    useEffect(() => {
    // URL de la API que deseas consultar
    window.alert('revisando')
    const apiUrl = "http://localhost:8000/inicio-sesion/";
    
    const property = { //Modificar proceso carga para que corresponda 1 a 1
        username: user.username,
        password: user.pwd
      };
    
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };
      
    window.alert('por fetch')
    // Realizar una solicitud GET a la API utilizando fetch() //ERROR CORS
    // fetch(apiUrl, requestOptions)
    //     .then((response) => response.json())
    //     .then((data) => {
    //     setData(data); // Actualizar el estado con los datos recibidos de la API
    //     window.alert(data);
    //     console.log(data);
    //     /* setUser({...user, user: data.id_usuario});
    //     console.log(user); */
        
    //     })
    //     .catch((error) => {
    //         window.alert('error')
    //         console.error('Error al obtener los datos:', error);
    //     });
    }, []); // Ejecuta esto solo una vez al montar el componente
  ////FIN FETCH


  return (
    
    <div className='centerinpage'>
        <p>Hola</p>
        <button
          type="submit"
          className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
          onClick={()=>setPagepart('carga')}
        >
          Tasar nueva propiedad
        </button>
        <button
          type="submit"
          className="block w-full bg-transparent border border-sky-800 mt-4 py-2 rounded-2xl text-sky-800 font-semibold mb-2"
          onClick={()=>setPagepart('login')}
        >
          Cerrar sesión
        </button>
    </div>
  )
}

export default Menu
