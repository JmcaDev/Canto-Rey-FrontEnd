import FormularioCliente from "../components/FormularioCliente"

function NuevoCliente() {
  return (
   <>
        <h1 className="text-4xl font-black">Agregar Cliente</h1>
    
        <div className="mt-10 flex justify-center">
            <FormularioCliente/>
        </div>
   </>
  )
}

export default NuevoCliente