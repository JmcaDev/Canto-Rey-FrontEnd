import {Link} from "react-router-dom"
import PropTypes from "prop-types"

function PreviewCliente({cliente}) {
    const { nombre, direccion, rif, telefono, _id} = cliente 
  return (
    <div className="border-b p-5 flex items-center">
        <div className="flex gap-4 flex-1">
          <div className="grid grid-cols-2 gap-2 w-60">
            <p className="uppercase font-bold">{nombre}</p>
            <p className="font-bold">J-{rif}</p>
            <p>{direccion}</p>
            <p>{telefono}</p>
          </div>
        </div>

        <Link
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
        >Ver cliente</Link>
    </div>
  )
}

export default PreviewCliente

PreviewCliente.propTypes = {
  cliente: PropTypes.object
}