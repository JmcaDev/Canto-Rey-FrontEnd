import {Link} from "react-router-dom"

function Header() {
  return (
    <header className="px-4 py-5 bg-white border-b">
        <div className="md:flex md:justify-between">
            <h2 className="text-4xl font-black text-center">Canto Rey, C.A.</h2>

            <input
                type="search"
                placeholder="Buscar Nota por cliente"
                className="rounded-lg lg:w-96 block p-2 border"
            />

            <div className="flex items-center gap-4">
                <Link 
                    to="/index"
                    className="font-bold uppercase"
                >
                    Notas de Entrega
                </Link>

                <button
                    type="button"
                    className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header