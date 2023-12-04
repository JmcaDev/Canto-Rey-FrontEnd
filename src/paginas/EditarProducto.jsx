import useNotas from "../hooks/useNotas"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import FormularioProducto from "../components/FormularioProducto"

function EditarProducto() {

  const params = useParams()
  const {obtenerProducto, producto, cargando, eliminarProducto} = useNotas()

  useEffect(() => {
    obtenerProducto(params.id)
  },[])

  const handleClick = () => {
    if(confirm("¿Desea eliminar este producto?")){
      eliminarProducto(params.id)
    }
  }

  const {nombre} = producto

  if(cargando) return "Cargando..."

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl uppercase">Editar Producto: {nombre}</h1>

        <div className="flex items-center gap-1 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
          </svg>

          <button className="uppecase font-bold" onClick={handleClick}>Eliminar</button>
        </div>
      </div>

        <div className="mt-10 flex justify-center">
          <FormularioProducto/>
        </div>
    </>
  )
}

export default EditarProducto