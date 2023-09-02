"use client";

import { useState,  React} from 'react';
import SingleForm from './SingleForm';

function CargaDatos() {
    const [pagepart, setPagePart] = useState('nuevaTasacion');
    const [mensaje, setMensaje] = useState('');

    const pages_structure = {
        nuevaTasacion: {
            title: "Nueva Tasación",
            fields: [
                {fieldtype: "string", field: "direccion", ph: "calle falsa 123"},
                {fieldtype: "string", field: "m2Cubiertos", ph: "10"},
                {fieldtype: "string", field: "m2Descubiertos", ph: "5"},
                {fieldtype: "string", field: "ambientes", ph: "1"},
                {fieldtype: "string", field: "banios", ph: "1"},
                {fieldtype: "string", field: "parrilla", ph: "No"},
                {fieldtype: "string", field: "cochera", ph: "No"},
                {fieldtype: "string", field: "cantPlantas", ph: "1"},
                {fieldtype: "string", field: "toilettes", ph: "0"},
                
            ]
        }
    }

    const handleClick = () => {
        setMensaje('Propiedad Tasada');
    }

    return(
        <div>
            <div>
                <SingleForm {...pages_structure.nuevaTasacion} />
                <button type="button" onClick={handleClick}>Tasar</button>
                {mensaje && <p>{mensaje}</p>}
            </div>
        </div>

    )
}

export default CargaDatos;