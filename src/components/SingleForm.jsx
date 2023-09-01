import React from 'react'
import FormField from './FormField'

const SingleForm = ({title,submitph,fields/*,f_onsubmit*/}) => {
    return (
        <>
        <center> <h1> {title} </h1> </center>   
        <form action="">
            {fields.map((f)=>(
                <FormField {...f}/>
            ))}
            {/* <FormField {...{fieldtype: "password", field: "Contraseña"}}/> */}
            <input type="submit" value={submitph}/>
        </form>
        </>
    )
}

export default SingleForm
