import useNotas from "../hooks/useNotas"

function PreviewProductoVenta({producto}) {

  const {id, idProducto, nombreProducto,cantKg, precioKg, montoProducto} = producto

  return (
    <div className="border-b p-5 flex items-center">
      <div className="flex gap-4 flex-1">
        <div className="grid grid-cols-4 gap-2 w-full">
          <p className="uppercase"><span className="font-bold">Producto: </span> {nombreProducto}</p>
          <p><span className="font-bold">Cantidad: </span>  {cantKg}</p>
          <p><span className="font-bold">Precio: </span>  {precioKg}</p>
          <p><span className="font-bold">Monto: </span>  {montoProducto}</p>
        </div>
      </div>
    </div>
  )
}

export default PreviewProductoVenta