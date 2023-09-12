"use client";

import { useState,  React} from 'react';
import SingleForm from './SingleForm';
import CargaDatos from './CargaDatos';
import RootLayout from '@/app/layout';

//const pagepart = 'login';


export default function Main() {
    const [pagepart, setPagepart] = useState('login');
    const [resultados, setResultados] = useState({});

    const handleCargaDatos = obj => {
        setResultados(obj);
        setPagepart(resultados);
    }

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
                    <CargaDatos {...{handleCargaDatos}}/>
                ) : pagepart === 'resultados' ? (
                    <Resultados {...{resultados:{resultados}}} />
                ) :
                (
                    <p>Not Found</p>
                )
                }
            </div>
    )
};