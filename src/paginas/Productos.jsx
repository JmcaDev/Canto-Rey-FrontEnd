import { Link } from "react-router-dom"
import useNotas from "../hooks/useNotas"
import PreviewProducto from "../components/PreviewProducto"

function Productos() {

  const {productos} = useNotas()

  return (
    <>
      <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Productos</h1>

          <Link
              to="crear-producto"
              className="bg-sky-600 w-50 text-white uppercase font-bold block p-3  text-center rounded-md"
          >
          Agregar Productos</Link>
      </div>

      <div className="bg-white shadow mt-10 rounded-lg">
          {productos.length ?
            productos.map(producto => (
              <PreviewProducto
                key={producto._id}
                producto={producto}
              />
            ))
          : <p className="text-gray-600 uppercase p-5">No hay productos</p> }
      </div>
    </>
  )
}

export default Productos