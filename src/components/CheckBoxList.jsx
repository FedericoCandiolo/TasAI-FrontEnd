import {React,useState} from 'react'

function CheckBoxList({nombre, estados, estados_seleccionados, fcambio, estaAbierto, seleccionarFiltro}) {
    return (
        <div>
            <form>
                <div className="multiselect">
                    <div className="selectBox" onClick={seleccionarFiltro}>
                    <select>
                        <option>{nombre}</option>
                    </select>
                    <div className="overSelect"></div>
                    </div>
                    {estaAbierto &&
                        <div className="checkboxes" /* style={{display: expanded ? 'block' : 'none'}} */>
                            {
                                estados.map(e=><>
                                    <label htmlFor={`${nombre}_${e}`}>
                                        {
                                        estados_seleccionados.filter(f=>f===e).length > 0 
                                        ? 
                                        <input type="checkbox" checked id={`${nombre}_${e}`} onChange={()=>fcambio(e)} /> 
                                        : 
                                        <input type="checkbox" id={`${nombre}_${e}`} onChange={()=>fcambio(e)} />
                                        }
                                    {e}</label> {/* Ver que siga el filtro */}
                                </>)
                            }
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default CheckBoxList