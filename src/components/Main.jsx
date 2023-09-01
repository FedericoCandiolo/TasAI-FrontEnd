"use client";

import { useState,  React} from 'react'
import SingleForm from '../components/SingleForm'

// const [pagepart, setPagepart] = useState('login')
// console.log(pagepart)
const pagepart = 'login';
const pages_structure = {
  login: {
    title: "Iniciar Sesión",
    submitph: "Iniciar Sesión",
    fields: [
      {fieldtype: "email", field: "Usuario", ph: "user@mail.com"},
      {fieldtype: "password", field: "Contraseña"}
    ]
  },
  register: {
    title: "Registrarse",
    submitph: "Registrarse",
    fields: [
      {fieldtype: "email", field: "Usuario", ph: "user@mail.com"},
      {fieldtype: "password", field: "Contraseña"},
      {fieldtype: "password", field: "Confirmar Contraseña"}
    ]
  },
}

function Main() {
    return (
        <div>
            {
                pagepart === 'login' ?
                <>
                    <SingleForm {...pages_structure.login}/> 
                    <button onClick = {()=>console.log('register')} > Registrarse </button>
                </>
            : 
                (
                pagepart === 'register' ?
                <SingleForm {...pages_structure.register}/> 
            : 
                <p>Not Found</p>
                )
            }
        </div>
    )
}

export default Main









