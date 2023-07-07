import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [listaPaises, setListaPaises] = useState([])
  const [paisAdivinando, setPaisAdivinando] = useState()
  const [puntos, setPuntos] = useState(0)
  const input = useRef()
  
  const elegirPais = () => setPaisAdivinando(listaPaises[Math.round(Math.random() * listaPaises.length)])
  const comprobarSiGano = () => {
    if (input.current.value.toUpperCase() === paisAdivinando.name.toUpperCase()) return true
    return false
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!comprobarSiGano()) setPuntos(puntos => puntos - 1)
    else setPuntos(puntos => puntos + 10)
    elegirPais()
    input.current.value = null
  }
  useEffect(() => async() => {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images')
    const { data } = await response.json()
    setListaPaises(data)
    setPaisAdivinando(data[Math.round(Math.random() * data.length)])
  }, [])
  return (
    <>
      <h1>PUNTOS: {puntos}</h1>
      {
        paisAdivinando &&
        <div className='adivinando'>
          <h2>Nombre: {paisAdivinando.name}</h2>
          <img src={paisAdivinando.flag} className='img-flag'/>
          <form onSubmit={handleSubmit}>
            <input ref={input} />
          </form>
        </div>
      }
    </>
  )
}

export default App
