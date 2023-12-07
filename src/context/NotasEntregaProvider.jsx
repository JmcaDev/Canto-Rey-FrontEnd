import { useState, useEffect, createContext } from "react";
import {useNavigate} from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import PropTypes from "prop-types"

const NotasEntregaContext = createContext();

const NotasEntregaProvider = ({children}) => {

    const [notasEntrega, setNotasEntrega] = useState([])
    const [productosVenta, setProductosVenta] = useState([])
    const [productoVenta, setProductoVenta] = useState({})

    const [clientes, setClientes] = useState([])
    const [cliente, setCliente] = useState({})

    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState({})

    const [alerta, setAlerta] = useState({})

    const [cargando, setCargando] = useState(false)

    const [modalFormularioNota, setModalFormularioNota] = useState(false)

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

    const obtenerProducto = async (id) => {
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

            const {data} = await clienteAxios(`productos/${id}`, config)
            setProducto(data)
        } catch (error) {
            console.log(error)
        }finally{
            setCargando(false)
        }
    }
    const submitProducto = async producto => {
        if(producto.id){
            await editarProducto(producto)
        }else{
            await nuevoProducto(producto)
        }
    }

    const editarProducto = async producto => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.put(`/productos/${producto.id}`, producto,config)

            //Sincronizar el state
            const productosActualizados = productos.map((productoState) => productoState._id === data._id ? data : productoState)
            setProductos(productosActualizados)

            //Mostrar la alerta
            setAlerta({
                msg: "Producto Actualizado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/index/productos")
            },3000)
        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProducto = async producto => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.post(`/productos/${producto.id}`, producto,config)
            setProductos([...productos, data])
            

            //Mostrar la alerta
            setAlerta({
                msg: "Producto agregado correctamente",
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate("/index/productos")
            },3000)
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarProducto = async id => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const {data} = await clienteAxios.delete(`/productos/${id}`, config)

            //Sincronizar el state
            const productosActualizados = productos.filter(productosState => productosState._id !== id)
            setProductos(productosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(()=> {
                setAlerta({})
                navigate("/index/productos")
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const handleModalNota = () => {
        setModalFormularioNota(!modalFormularioNota)
    }

    const agregarProductoVenta = (id, cant, precio, monto) => {
        setProductoVenta({id, cant, precio, monto})
    }

    const agregarProductosVenta = (productoV) => {
        if(Object.keys(productoV).length === 0){
            return
        }

        if(productosVenta.length === 0){
            setProductosVenta([productoV])
        }else{
            setProductosVenta([...productosVenta, productoV])
        }
    }

    const submitNota = async (nota) => {
        try {
            const token = localStorage.getItem("token")
            if(!token)return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            console.log(nota)
            const {data} = await clienteAxios.post(`/notasentregas`, nota, config)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <NotasEntregaContext.Provider
            value={{
                notasEntrega,
                cliente,
                clientes,
                obtenerCliente,
                submitCliente,
                eliminarCliente,
                productos,
                producto,
                obtenerProducto,
                submitProducto,
                eliminarProducto,
                alerta,
                mostrarAlerta,
                cargando,
                modalFormularioNota,
                handleModalNota,
                productoVenta,
                setProductoVenta,
                productosVenta,
                setProductosVenta,
                agregarProductoVenta,
                agregarProductosVenta,
                submitNota
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