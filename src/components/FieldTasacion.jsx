import React, { useState } from "react";

function FieldTasacion({ fieldtype, classes, cod, labeltext, ph, tt, valor, actualizarDato, options }) {
  const handleChange = (e) => {
    actualizarDato(
      fieldtype === "boolean" 
        ? 
      (valor ? false : true) 
        : 
      (parseInt(e.target.value) && (!fieldtype || fieldtype === "number") ? parseInt(e.target.value) : e.target.value)
    );
    console.log('value is ', valor)
  }

  return (
    <div className={`${classes} ${tt ? "tooltip" : ""}`}>
      {tt && <span className="tooltiptext">{tt}</span>}

      {fieldtype === "boolean" ? (
        <>
          <div>
            <label
              htmlFor={cod}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {labeltext}
            </label>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input id={cod} type="checkbox" className="peer sr-only" name={cod} onChange={handleChange} value={valor}/>
            <label htmlFor={`${{ cod }} hidden`}></label>
            <div className="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-800 peer-checked:after:translate-x-full peer-focus:ring-sky-800"></div>
          </label>
        </>
      ): fieldtype === "options" ? (
        <>
          <label
            htmlFor={cod}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {labeltext}
          </label>
          <div className="mt-2">
            <select
              id={cod}
              name={cod}
              type={fieldtype}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={ph}
              onChange={handleChange}
            >
              {options.map(opt=><option value={opt}>{opt}</option>)}
            </select>
          </div>
        </>
      ) : (
        <>
          <label
            htmlFor={cod}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {labeltext}
          </label>
          <div className="mt-2">
            <input
              id={cod}
              name={cod}
              type={fieldtype}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={ph}
              autoComplete="off"
              onChange={handleChange}
              value={valor}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FieldTasacion;
