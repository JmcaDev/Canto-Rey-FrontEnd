import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"



function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const { setAuth } = useAuth()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if([email, password].includes("")){
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error:true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post("/usuarios/login", {
        email, password
      })
      setAlerta({})
      localStorage.setItem("token", data.token)
      setAuth(data)

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-bold text-6xl capitalize text-center">Iniciar Sesión</h1>

      {msg && <Alerta alerta={alerta}/>}

      <form className="my-10 bg-white shadow rounded-lg px-10 py-5" onSubmit={handleSubmit}>
        <div className="my-5">
          <label 
            htmlFor="email" 
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>
          <input
            id="email"
            type="email" 
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label 
            htmlFor="password" 
            className="uppercase text-gray-600 block text-xl font-bold"
          >password</label>
          <input
            id="password"
            type="password" 
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value="Iniciar Sesión"
          className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="registrar"
          className="block text-center my-5 text-slate-500 text-sm"
        >¿No tienes una cuenta? Registrate aqui</Link>

        <Link
          to="olvide-password"
          className="block text-center my-5 text-slate-500 text-sm"
        >Olvide mi contraseña</Link>
      </nav>
    </>
  )
}

export default Login