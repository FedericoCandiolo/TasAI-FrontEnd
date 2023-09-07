import React from 'react'
import ToolTip from './ToolTip'


const FormField = ({fieldtype, field, ph, tt}) => {
    return (
        <div>
            <p>{tt}</p>    
            {tt && <ToolTip {...{tt}} />}
            <label htmlFor={field}> {field}</label>
            <input name={field} type={fieldtype} placeholder={ph ? ph : field}></input>
        </div>
    )
}
export default FormField
