import PropTypes from "prop-types"


function Alerta({alerta}) {
  return (
    <div className={` ${alerta.error ? 'bg-red-600' : 'bg-sky-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10 `}>
        {alerta.msg}
    </div>
  )
}

Alerta.propTypes = {
  alerta : PropTypes.object
}

export default Alerta