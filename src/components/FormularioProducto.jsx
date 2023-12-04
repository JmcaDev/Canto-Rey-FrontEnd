import { useState } from "react"
import useNotas from "../hooks/useNotas"
import Alerta from "./Alerta"

function FormularioProducto() {

  const {mostrarAlerta, alerta, submitProducto} = useNotas()

  const [nombre, setNombre] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    if(nombre === ""){
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return
    }

    //Pasar los datos al provider
    await submitProducto({nombre})

    setNombre("")
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
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >Nombre del producto</label>
        <input 
          type="text" 
          id="nombre" 
          placeholder="Ingrese nombre del producto aqui"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <input 
        type="submit" 
        value="Añadir producto" 
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white cursor-pointer hover:bg-sky-800 transition-colors"
      />
    </form>
  )
}

export default FormularioProducto