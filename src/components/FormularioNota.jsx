import useNotas from "../hooks/useNotas"
import { useState } from "react"
import ModalProducto from "./ModalProducto"

function FormularioNota() {

  const {clientes, handleModalNota, productosVenta} = useNotas()

  const [clienteSeleccionado, setClienteSeleccionado] = useState({})
  
  const [modal, setModal] = useState(false)

  return (
    <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
        <div>
            <label htmlFor="" 
              className="text-gray-700 uppercase font-bold text-sm"
            >Cliente</label>
            <select 
              name="cliente" 
              id="cliente"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={clienteSeleccionado}
              onChange={e => setClienteSeleccionado(e.target.value)}
            >
              {clientes.length ? 
                (clientes.map(cliente => (
                  <option value={cliente._id} key={cliente._id}>{cliente.nombre}</option>
                )))
                : <option value="">No hay registros</option>
              }
            </select>
        </div>

        <div className="md:flex justify-between mt-5 items-center">
            <label htmlFor="" className="uppercase font-bold text-center">Productos</label>

            <button
              onClick={handleModalNota}
              type="button"
              className="flex gap-2 text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-600 text-white text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
              </svg>

              Añadir Productos
            
            </button>

            <ModalProducto
              modal={modal}
              setModal = {setModal}
            />
        </div>      
    </form>
  )
}

export default FormularioNota