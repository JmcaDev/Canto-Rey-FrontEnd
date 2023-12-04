import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import PropTypes from "prop-types"

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [ cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token")
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Conten-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios.get("/usuarios/perfil", config)
                setAuth(data)
            } catch (error) {
               setAuth({})
            }finally{
                setCargando(false)
            }
        }
        autenticarUsuario()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext

AuthProvider.propTypes = {
    children: PropTypes.object
}