import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
// import axios from "axios"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


function ConfirmarCuenta() {
  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {

      try {
        const url = `/usuarios/confirmar/${id}`
        const { data } = await clienteAxios.get(url)

        setAlerta({
          msg: data.msg,
          error: false
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        
      }

    }
    confirmarCuenta()
  },[])

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize text-center">Confirmar <span className="text-slate-700">Cuenta</span></h1>
      <div className=" mt-20 md:mt-10 px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta}/>}

        <div>
          {cuentaConfirmada && (
            <Link
                to="/"
                className=" block text-center my-5 text-white uppercase font-bold text-sm bg-slate-600 p-5 rounded "
              >Inicia Sesión</Link>
          )}
        </div>
      </div>
    </>
  )
}

export default ConfirmarCuenta