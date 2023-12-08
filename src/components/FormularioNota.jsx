import useNotas from "../hooks/useNotas"
import { useEffect, useState } from "react"
import ModalProducto from "./ModalProducto"
import PreviewProductoVenta from "./PreviewProductoVenta"
import Alerta from "./Alerta"

function FormularioNota() {

  const {clientes, handleModalNota, productosVenta, mostrarAlerta, setProductosVenta,alerta, submitNota} = useNotas()

  const [clienteSeleccionado, setClienteSeleccionado] = useState({})
  const [modal, setModal] = useState(false)

  const [precioTotal, setPrecioTotal] = useState(0)

  useEffect(() => {
    let resultado = 0
    productosVenta.map(producto => {
      resultado = resultado + producto.montoProducto
    })
    setPrecioTotal(resultado)
  }, [productosVenta])

  const handleSubmitNota = async (e) => {
    e.preventDefault()
    
    if(clienteSeleccionado === "null"){
      mostrarAlerta({
        msg: "Seleccione un cliente valido",
        error: true
      })
      return
    }

    if(productosVenta.length == 0){
      mostrarAlerta({
        msg: "Debe ingresar algun producto",
        error: true
      })
    }

    await submitNota({cliente: clienteSeleccionado, productos: productosVenta, montoTotal: precioTotal})
    setPrecioTotal(0)
    setProductosVenta([])
  }

  const {msg} = alerta

  return (
    <form className="bg-white py-10 px-5 md:w-4/5 rounded-lg">

        {msg && <Alerta alerta={alerta}/>}
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
              <option value="null">-- Seleccione un cliente --</option>
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

        <div className="mt-2 border-t-2">
            {productosVenta.length ? (
                productosVenta.map((producto) => (
                  <PreviewProductoVenta key={producto.id} producto={producto}/>
                ))
              ) : "No hay productos"}
        </div>
            
        <div className="flex justify-around">
          <h1 className="uppercase font-bold">Precio a pagar</h1>
          <p className="font-bold">{precioTotal}$</p>
        </div>

        <button className="" onClick={handleSubmitNota}>Generar Nota de Entrega</button>
    </form>
  )
}

export default FormularioNota