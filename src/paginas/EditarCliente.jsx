import useNotas from "../hooks/useNotas"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import FormularioCliente from "../components/FormularioCliente"

function EditarCliente() {

    const params = useParams()
    const {obtenerCliente, cliente, cargando} = useNotas()
  
    useEffect( ()=> {
        obtenerCliente(params.id)
    },[])

    const {nombre} = cliente

    if(cargando) return "Cargando..."

  return (
    <>
        <h1 className="font-black text-4xl uppercase">Editar cliente: {nombre}</h1>

        <div className="mt-10 flex justify-center">
            <FormularioCliente/>
        </div>
    </>
  )
}

export default EditarCliente