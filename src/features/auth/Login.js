import { useRef, useState, useEffect} from "react"
import { useNavigate} from "react-router-dom"

import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

import usePersist  from "../../hooks/usePersist"
import PulseLoader from "react-spinners/PulseLoader"



function Login() {

  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [login, {isLoading}] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect (() => {
    setErrMsg ("")
  },[username, password])

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist (prev => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({accessToken}))
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err.status) {
        setErrMsg("Sin respuesta del servidor")
      } else if (err.status === 400) {
        setErrMsg("Falta usuario o contraseña")
      } else if (err.status === 401) {
        setErrMsg("No autorizado")
      } else {
        setErrMsg (err.data?.message)
      }
    }
  }

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"}/>

  const content = (
    <section className="public public-login">
      <header>
        <h1>Iniciar Sesion</h1>
      </header>
      <main className="login">

        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input
            className="form__input__login"
            type="text"
            id="username"
            placeholder="Ingresa tu usuario"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            className="form__input__login"
            placeholder="Ingresa tu contraseña"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="form__submit-button">Logearse</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Mantener sesion abierta
          </label>
        </form>
      </main>
    </section>
  )

  return content
}

export default Login