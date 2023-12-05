import useNotas from "../hooks/useNotas"
import { useState } from "react"

function FormularioNota() {

  const {clientes } = useNotas()

  const [clienteSeleccionado, setClienteSeleccionado] = useState({})

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
    </form>
  )
}

export default FormularioNota