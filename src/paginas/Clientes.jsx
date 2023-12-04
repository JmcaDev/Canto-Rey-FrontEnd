import {Link} from "react-router-dom"
import useNotas from "../hooks/useNotas"
import PreviewCliente from "../components/PreviewCliente"

function Clientes() {
    const {clientes} = useNotas()
  return (
    <>
        <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Clientes</h1>

            <Link
                to="crear-cliente"
                className="bg-sky-600 w-50 text-white uppercase font-bold block p-3  text-center rounded-md"
            >
            Agregar Clientes</Link> 
        </div>

        <div className="bg-white shadow mt-10 rounded-lg">
            {clientes.length ? 
                clientes.map(cliente => (
                    <PreviewCliente
                        key={cliente._id}
                        cliente = {cliente}
                    />
                ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay clientes</p>}
        </div>
    </>
  )
}

export default Clientes