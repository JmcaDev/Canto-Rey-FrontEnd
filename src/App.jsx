import {BrowserRouter, Route, Routes} from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"

import {AuthProvider} from "./context/AuthProvider"
import {NotasEntregaProvider} from "./context/NotasEntregaProvider"

import Login from "./paginas/Login"
import Registrar from "./paginas/Registrar"
import OlvidePassword from "./paginas/OlvidePassword"
import NuevoPassword from "./paginas/NuevoPassword"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"

import RutaProtegida from "./layouts/RutaProtegida"
import NotasEntrega from "./paginas/NotasEntrega"
import NuevaNotaEntrega from "./paginas/NuevaNotaEntrega"

import Clientes from "./paginas/Clientes"
import Cliente from "./paginas/Cliente"
import NuevoCliente from "./paginas/NuevoCliente"
import EditarCliente from "./paginas/EditarCliente"


import NuevoProducto from "./paginas/NuevoProducto"
import Productos from "./paginas/Productos"
import Producto from "./paginas/Producto"

function App() {

  return (
    <>
     <BrowserRouter>
      <AuthProvider>
        <NotasEntregaProvider>
          <Routes>
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>

            <Route path="/index" element={<RutaProtegida/>}>
              <Route index element={<NotasEntrega/>}/>
              <Route path="crear-notaentrega" element={<NuevaNotaEntrega/>}/>

              <Route path="clientes" element={<Clientes/>}/>
              <Route path="clientes/crear-cliente" element={<NuevoCliente/>}/>
              <Route path="clientes/:id" element={<Cliente/>}/>
              <Route path="clientes/editar/:id" element={<EditarCliente/>}/>
              
              <Route path="productos" element={<Productos/>} />
              <Route path="productos/crear-producto" element={<NuevoProducto/>}/>
              <Route path="productos/:id" element={<Producto/>}/>
            </Route>
          </Routes>
        </NotasEntregaProvider>
      </AuthProvider>
     </BrowserRouter>
    </>
  )
}

export default App
