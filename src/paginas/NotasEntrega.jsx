import useNotas from "../hooks/useNotas"

function NotasEntrega() {

  const {notasEntrega} = useNotas()

  

  return (
    <>
      <h1 className="text-4xl font-black">Notas de Entrega</h1>

      <div>

      </div>
    </>
  )
}

export default NotasEntrega