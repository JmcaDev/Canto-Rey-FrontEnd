import { Link } from "react-router-dom"
import PropTypes from "prop-types"

function PreviewProducto({producto}) {

    const {nombre, _id} = producto

  return (
    <div className="border-b p-5 flex items-center">
        <div className="flex-1">
            <p className="uppercase font-bold">{nombre}</p>
        </div>

        <Link
            to ={`${_id}`}
            className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >Ver Producto</Link>
    </div>
  )
}

export default PreviewProducto