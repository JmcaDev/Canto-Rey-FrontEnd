import FormularioNota from "../components/FormularioNota"

function NuevaNotaEntrega() {
    return (
      <>
        <h1 className="text-4xl font-black">Crear Nota de Entrega</h1>
  
        <div className="mt-10 flex justify-center">
            <FormularioNota/>
        </div>
      </>
    )
  }
  
  export default NuevaNotaEntrega