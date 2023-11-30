import { useState, useEffect } from "react"
// import axios from "axios"
import { Link, useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

function NuevoPassword() {

  const [password, setPassword] = useState("")
  const [passwordModificado, setPasswordModificado] = useState(false)
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {token}  =params

  useEffect(() => {

    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/resetPassword/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error:true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(password.length < 8){
      setAlerta({
        msg: "La contraseña debe ser minimo de 8 caracteres",
        error:true
      })
    }

    try {
      const url = `/usuarios/resetPassword/${token}`
      const {data} = await clienteAxios.post(url, {
        password
      })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize text-center">Reestablecer Contraseña</h1>

      {msg && <Alerta alerta={alerta}/>}

      {tokenValido && (
        <form 
          className="my-10 bg-white shadow rounded-lg px-10 py-5"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
              htmlFor="password" 
              className="uppercase text-gray-600 block text-xl font-bold"
            >Nueva Contraseña</label>
            <input
              id="password"
              type="password" 
              placeholder="Escribe tu nueva contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit" 
            value="Recuperar Cuenta"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
      </form>
      )}

          {passwordModificado && (
            <Link
                to="/"
                className=" block text-center my-5 text-white uppercase font-bold text-sm bg-slate-600 p-5 rounded "
              >Inicia Sesión</Link>
          )}
    </>
  )
}

export default NuevoPassword