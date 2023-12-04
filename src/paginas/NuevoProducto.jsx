import FormularioProducto from "../components/FormularioProducto"

function NuevoProducto() {
  return (
   <>
        <h1 className="text-4xl font-black">Crear Producto</h1>

        <div className="mt-10 flex justify-center">
            <FormularioProducto/>
        </div>
   </>
  )
}

export default NuevoProducto