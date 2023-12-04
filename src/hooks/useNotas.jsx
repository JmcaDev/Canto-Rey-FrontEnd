import {useContext} from "react"
import NotasEntregaContext from "../context/NotasEntregaProvider"

const useNotas = () => {
    return useContext(NotasEntregaContext)
}

export default useNotas