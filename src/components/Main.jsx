"use client";

import { useState,  React} from 'react';
import SingleForm from '../components/SingleForm';
import CargaDatos from './CargaDatos';

//const pagepart = 'login';


function Main() {
    const [pagepart, setPagepart] = useState('login');

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
    };

    const handleClick = () => {
        window.alert('doing');
        setPagepart('register')
    };

    const handleNavigateToNewComponent = () => {
        window.alert('Nuevo Componente');
        setPagepart('carga');
    }

    return (
        <div>
            {
                pagepart === 'login' ? (
                <>
                    <SingleForm {...pages_structure.login}/> 
                    <button type="button" onClick = {handleClick} > Registrarse </button>
                    <button type="button" onClick={handleNavigateToNewComponent}>Ir al componente nuevo</button>
                </>
            ) : pagepart === 'register' ? (
                <SingleForm {...pages_structure.register}/> 
            ) : pagepart === 'carga' ? (
                <CargaDatos />
            ) : (
                <p>Not Found</p>
                )
            }
        </div>
    )
}

export default Main