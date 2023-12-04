import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function Sidebar() {

    const {auth} = useAuth()

  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
        <p className="text-xl font-bold">Hola: {auth.nombre}</p>

        <Link
            to="crear-notaentrega"
            className="bg-sky-600 w-full text-white uppercase font-bold block p-3 mt-5 text-center rounded-md"
        >
            Nueva Nota de Entrega
        </Link>

        <Link
            to="productos"
            className="bg-sky-600 w-full text-white uppercase font-bold block p-3 mt-5 text-center rounded-md"
        >
            Ver Producto
        </Link>

        <Link
            to="clientes"
            className="bg-sky-600 w-full text-white uppercase font-bold block p-3 mt-5 text-center rounded-md"
        >
            Ver Cliente
        </Link>
    </aside>
  )
}

export default Sidebar