import React from "react";

function FieldTasacion({ fieldtype, classes, cod, labeltext, ph, tt }) {
  return (
    <div class={`${classes} ${tt ? "tooltip" : ""}`}>
      {tt && <span class="tooltiptext">{tt}</span>}

      {fieldtype === "boolean" ? (
        <>
          <div>
            <label
              for={cod}
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {labeltext}
            </label>
          </div>
          <label class="relative inline-flex cursor-pointer items-center">
            <input id={cod} type="checkbox" class="peer sr-only" />
            <label for={`${{ cod }} hidden`}></label>
            <div class="peer h-4 w-11 rounded border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-800 peer-checked:after:translate-x-full peer-focus:ring-sky-800"></div>
          </label>
        </>
      ) : (
        <>
          <label
            for={cod}
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            {labeltext}
          </label>
          <div class="mt-2">
            <input
              id={cod}
              name={cod}
              type={fieldtype}
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={ph}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FieldTasacion;
