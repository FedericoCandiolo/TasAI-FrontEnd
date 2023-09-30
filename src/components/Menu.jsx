'use-client'
import React from 'react'

function Menu({setPagepart}) {
  
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
