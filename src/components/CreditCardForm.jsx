"use client"
import React, { useState } from 'react';
import FieldTasacion from "./FieldTasacion";





const CreditCardForm = ({btnVolver, btnCargar, user,setUser}) => {
  const [fields, setFields] = useState({});

  const handleField = (cod_item, val_item) => {
    const new_fields = fields;
    fields[cod_item] = val_item;
    setFields({
      ...new_fields,
    })
  };

  const handleSuscripcion = (e) => {
    e.preventDefault() 
    console.log(fields)
    if(isValid){
      
      const apiUrl = `http://localhost:8000/cambio-de-plan/${user.id_usuario}/`;
      const property = { 
        id_plan: 2,
      };
      
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
      };
      
      console.log(JSON.stringify(property))
      fetch(apiUrl, requestOptions)
      .then((response) =>  {       
        setUser({...user, id_plan: 2})
        window.alert("Suscripción exitosa.")
        //btnCargar();          
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
    ////FIN FETCH

      btnCargar(2);
    }
    else{
      const msg = `Tarjeta inválida. Errores en: ${
        fields.numerotarjeta.length === 16 && (isVisa || isMastercard) ?
        "" : "Número de tarjeta, "
      }${
        fields.titulartarjeta ? "" : "Titular de la tarjeta, "
      }${
        fields.fechatarjeta ? "" : "Fecha de expiración, "
      }${
        fields.cvvtarjeta.length === 3  ? "" : "CVV, "
      }`.slice(0,-2);
      window.alert(msg);
      //window.alert(fields.numerotarjeta.length);
      //window.alert(fields.cvvtarjeta.length);
    }
  }

  const handleDesuscripcion = () => {       
    const apiUrl = `http://localhost:8000/cambio-de-plan/${user.id_usuario}/`;
    const property = { 
      id_plan: 1,
    };
    
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    };
    
    console.log(JSON.stringify(property))
    fetch(apiUrl, requestOptions)
    .then((response) =>  {       
      setUser({...user, id_plan: 1})
      window.alert("Desuscripción completada.")      
      //btnCargar();          
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  ////FIN FETCH

    btnCargar(1);
  }

  const isVisa = /^4[0-9]{12}(?:[0-9]{3})?$/.test(fields.numerotarjeta);
  const isMastercard = /^5[1-5][0-9]{14}$/.test(fields.numerotarjeta);

  const isValid = fields && (
    fields.numerotarjeta && fields.numerotarjeta.length === 16 
    && fields.titulartarjeta 
    && fields.fechatarjeta 
    && (fields.cvvtarjeta && fields.cvvtarjeta.length === 3 )
    && (isVisa || isMastercard)
  );

  return (    
    
    <div>
      {/* <div className="bg-white rounded-2xl ml-2 h-fit mt-20">
        <p>Plan Básico</p>
      </div>
      <div className="bg-white rounded-2xl ml-2 h-fit mt-20">
        <p>Plan Premium</p>
      </div> */}
      <div className="flex items-centrer justify-center h-screen bg-gradient-to-b from-teal-50 to-teal-800">
        <div className='h-fit mt-20 grid2x2'>
          <div className="bg-white rounded-2xl box-padding">
            <h2 className='plantitle'>Plan Básico</h2>
            <p className='plantext'>5 tasaciones totales</p>
            <p className='plantext'>2 tasaciones guardadas</p>
            <p className='bold planprice'>Gratis</p>
          </div>
          <div className='bg-white rounded-2xl box-padding'>
            <h2 className='plantitle'>Plan Premium</h2>
            <p className='plantext'>Tasaciones totales SIN LÍMITE</p>
            <p className='plantext'>Tasaciones guardadas SIN LÍMITE</p>
            <p className='bold planprice'>U$S 10 / mes</p>
          </div>
          <div className='double-col bg-white rounded-2xl box-padding'>
            <form>
              <div className="space-y-12">
                {user.id_plan === 1 
                ?
                  <div >
                    <h2 className="text-base font-semibold leading-7 text-gray-900 ml-2">
                      Suscripción al Plan Premium
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 ml-2">
                      Ingrese los datos de tarjeta de crédito Visa o MasterCard
                    </p>

                    <FieldTasacion
                      {...{
                        fieldtype: "string",
                        classes: "sm:col-span-4 ml-2 mr-2 separacion-campos",
                        cod: "numerotarjeta",
                        labeltext: "Número de la tarjeta",
                        ph: "0000000000000000",
                        tt: "Número de tarjeta válido de Visa o MasterCard",
                      }}
                      {...{valor: fields["numerotarjeta"]}}{...{actualizarDato: (v)=>handleField("numerotarjeta",v)}}
                      />

                    <FieldTasacion
                      {...{
                        fieldtype: "string",
                        classes: "sm:col-span-4 ml-2 mr-2 separacion-campos",
                        cod: "titulartarjeta",
                        labeltext: "Titular de la tarjeta",
                        ph: "Nombre Apellido",
                        tt: "Nombre completo del titular como figura en la tarjeta",
                      }}
                      {...{valor: fields["titulartarjeta"]}}{...{actualizarDato: (v)=>handleField("titulartarjeta",v)}}
                      />

                    <FieldTasacion
                      {...{
                        fieldtype: "string",
                        classes: "sm:col-span-4 ml-2 mr-2 separacion-campos",
                        cod: "fechatarjeta",
                        labeltext: "Fecha de expiración",
                        ph: "MMAA",
                        tt: "Fecha en formato MMAA. Ejemplo: 0728 (Julio 2028)",
                      }}
                      {...{valor: fields["fechatarjeta"]}}{...{actualizarDato: (v)=>handleField("fechatarjeta",v)}}
                      />

                    <FieldTasacion
                      {...{
                        fieldtype: "string",
                        classes: "sm:col-span-4 ml-2 mr-2 separacion-campos",
                        cod: "cvvtarjeta",
                        labeltext: "CVV",
                        ph: "000",
                        tt: "Código de seguridad (por lo general en el anverso de la tarjeta)",
                      }}
                      {...{valor: fields["cvvtarjeta"]}}{...{actualizarDato: (v)=>handleField("cvvtarjeta",v)}}
                    />
                    
                    <div className="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={btnVolver}
                        >
                        Volver
                      </button>
                      {
                        isValid 
                      ?
                        <button
                          type="submit"
                          /*  disabled={!isValid} */
                          onClick={handleSuscripcion}
                          className="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                          Suscribirme
                        </button>
                      :
                        <button
                          type="submit"
                          disabled
                          className="disabled rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                          Suscribirme
                        </button>
                      }
                    </div>
                  </div>
                :
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900 ml-2">
                      Desuscripción del Plan Premium
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 ml-2">
                      ¿Desea desuscribirse del plan premium? Las propiedades y tasaciones guardadas que superen el límite podrían ser eliminadas permamentemente. 
                    </p>
                    <div className="mt-6 flex items-center justify-end gap-x-6 mr-2 mb-2">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={btnVolver}
                        >
                        Volver
                      </button>
                      <button
                        type="submit"
                        /*  disabled={!isValid} */
                        onClick={handleDesuscripcion}
                        className="rounded-md bg-sky-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Desuscribirme
                      </button>
                    </div>
                  </div>
                }
                
                    
                {/* {isVisa && <p className="visa">Visa</p>}
                {isMastercard && <p className="mastercard">Mastercard</p>} */}

              </div> 

              
            </form>
          </div>
        </div>
      </div>
    </div>
      
  );
  
};

export default CreditCardForm;