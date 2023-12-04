import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useNotas from "../hooks/useNotas"
import Alerta from "./Alerta"

function FormularioCliente() {

  const {mostrarAlerta, alerta, submitCliente, cliente} = useNotas()

  const [id,setId] = useState(null)
  const [nombre,setNombre] = useState("")
  const [rif,setRif] = useState("")
  const [direccion,setDireccion] = useState("")
  const [telefono,setTelefono] = useState("")
  const params = useParams()

  useEffect(()=> {
    if(cliente.nombre){
      setId(cliente._id)
      setNombre(cliente.nombre)
      setRif(cliente.rif)
      setDireccion(cliente.direccion)
      setTelefono(cliente.telefono)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()

    if([nombre,rif,direccion,telefono].includes("")){
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    //Pasar los datos al provider
    await submitCliente({id,nombre, rif,direccion,telefono})

    setId(null)
    setNombre("")
    setRif("")
    setDireccion("")
    setTelefono("")
  }

  
  const {msg} = alerta

  return (
    <form 
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >

      {msg && <Alerta alerta={alerta}/>}

      <div className="mb-5">
        <label 
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >Nombre de la empresa</label>

        <input 
          type="text" 
          id="nombre" 
          placeholder="Ingrese el nombre de la empresa aqui"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label 
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="rif"
        >Rif de la empresa</label>

        <input 
          type="text" 
          id="rif" 
          placeholder="Ingrese el rif de la empresa aqui"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={rif}
          onChange={(e) => setRif(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label 
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="direccion"
        >Direccion de la empresa</label>

        <input 
          type="text" 
          id="direccion" 
          placeholder="Ingrese la direccion de la empresa aqui"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label 
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="telefono"
        >Telefono de la empresa</label>

        <input 
          type="tel"
          id="telefono" 
          placeholder="Ingrese el Telefono de la empresa aqui"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <input 
        type="submit" 
        value={id ? "Actualizar Cliente" : "Crear cliente"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  )
}

export default FormularioCliente