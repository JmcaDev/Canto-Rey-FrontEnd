import { useState, useEffect, useContext, createContext } from "react";
import {useNavigate} from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import PropTypes from "prop-types"

const NotasEntregaContext = createContext();

const NotasEntregaProvider = ({children}) => {

    const [notasEntrega, setNotasEntrega] = useState([])
    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})
    const [productos, setProductos] = useState([])
    const [alerta, setAlerta] = useState({})

    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(()=>{
            setAlerta({})
        }, 5000)
    }

    useEffect(()=> {
        const obtenerClientes = async ()=>{
            try {
                const token = localStorage.getItem("token")
                if(!token)return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/clientes", config)
                setClientes(data)

            } catch (error) {
                console.log(error)
            }
        }

        const obtenerProductos = async () => {
            try {
                const token = localStorage.getItem("token")
                if(!token)return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/productos", config)
                setProductos(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerClientes()
        obtenerProductos()
    }, [])

    const submitCliente = async cliente => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/clientes", cliente, config)
            
            setClientes([...clientes, data])

            setAlerta({
                msg: "Cliente agregado correctamente",
                error: false
            })

            setTimeout(()=> {
                setAlerta({})
                navigate("/index/clientes")
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const submitProducto = async producto => {
        try{
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post("/productos", producto, config)
            setProductos([...productos, data])

            setAlerta({
                msg:"Producto agregado exitosamente",
                error: false
            })

            setTimeout(()=> {
                setAlerta({})
                navigate("index/productos")
            }, 3000)

        }catch(error){
            console.log(error)
        }
    }

    const obtenerCliente = async (id) => {

        setCargando(true)

        try {
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios(`/clientes/${id}`, config)
            setCliente(data)

        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }
    }


    return (
        <NotasEntregaContext.Provider
            value={{
                notasEntrega,
                clientes,
                cliente,
                productos,
                mostrarAlerta,
                alerta,
                submitCliente,
                obtenerCliente,
                submitProducto,
                cargando
            }}
        >{children}</NotasEntregaContext.Provider>
    )
}
export{
    NotasEntregaProvider
}

export default NotasEntregaContext

NotasEntregaProvider.propTypes = {
    children: PropTypes.object
}