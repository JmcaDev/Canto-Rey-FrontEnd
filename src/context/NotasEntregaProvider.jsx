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

        if(cliente.id){
            await editarCliente(cliente)
        }else{
            await nuevoCliente(cliente)
        }

        return
    }

    const editarCliente = async cliente => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/clientes/${cliente.id}`, cliente, config)

            //Sincronizar el state
            const clientesActualizados = clientes.map((clienteState) => clienteState._id === data._id ? data : clienteState)
            setClientes(clientesActualizados)


            //Mostrar la alerta
            setAlerta({
                msg: "Cliente actualizado correctamente",
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

    const nuevoCliente = async cliente => {
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

    const eliminarCliente = async id => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/clientes/${id}`, config)

            //Sincronizar el state
            const clientesActualizados = clientes.filter(clientesState => clientesState._id !== id)
            setClientes(clientesActualizados)

            setAlerta({
                msg: data.msg,
                error:false
            })

            setTimeout(()=> {
                setAlerta({})
                navigate("/index/clientes")
            },3000)

        } catch (error) {
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

    return (
        <NotasEntregaContext.Provider
            value={{
                notasEntrega,
                cliente,
                clientes,
                submitCliente,
                eliminarCliente,
                productos,
                mostrarAlerta,
                alerta,
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