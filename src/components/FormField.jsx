import React from 'react'


const FormField = ({fieldtype, field, ph}) => {
    return (
        <div>            
            <label htmlFor={field}> {field}</label>
            <input name={field} type={fieldtype} placeholder={ph ? ph : field}></input>
        </div>
    )
}
export default FormField
