import { useState, useEffect } from "react"
import { useAddNewNoteMutation} from "./notesApiSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router"
import { LOCATIONS } from "../../config/locations"
import { useSendMailMutation } from "../email/emailApiSlice"


const NewNoteForm = ({users}) => {

  const [addNewNote, {
    isLoading,
    isSuccess,
    isError,
    error
}] = useAddNewNoteMutation()

const [sendMail] = useSendMailMutation()


  const navigate = useNavigate()

  const locationOptions = Object.values(LOCATIONS).map (location => {
    return (
        <option
            key={location}
            value={location}
        >
        {location} </option>
    )
})


  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [user, setUser] = useState('')
  const [location, setLocation] = useState('')
  const [email, setEmail] = useState('')


  useEffect (() => {
    if (isSuccess) {
        setTitle ('')
        setText('')
        navigate ('/dash/notes')
    }
}, [isSuccess, navigate])


const canSave = [user].every(Boolean) && !isLoading

const onTitleChanged = e => setTitle (e.target.value)
const onTextChanged = e => setText (e.target.value)
const onUserChange = e => setUser (e.target.value)
const onLocationChange = e => setLocation (e.target.value)

// ACA ESTA //
useEffect (() => {
  if (user) {
    const selectedUser = users.find(userS => userS._id === user)
    setEmail(selectedUser.email)
  }
}, [onUserChange])

  const onSaveNoteClicked = async (e) => {
    e.preventDefault ()
    if (canSave) {
        await addNewNote ({  title, text, user, location})
        await sendMail ({email, text})
    }
  }

  const errClass = isError ? "errmsg" : "offscreen"

  const errContent = (error?.data?.message) ?? ''

  const options = Object.values(users).map (user => {
    return (
        <option
            key={user.id}
            value={user.id}
        >
        {user.username}</option>
    )
})

  const content = (
    <>
        <p className={errClass}>{errContent}</p>

        <form className="form" onSubmit={e => e.preventDefault()} >
            <div className="form__title-row">
                <h2>Editar Nota</h2>
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        //disabled={!canSave}
                        onClick={onSaveNoteClicked}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                </div>
            </div>
            <label className="form__label" htmlFor="title">
                Titulo:
            </label>
            <input 
                className={`form__input`}
                id="title"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
            />
            <label className="form__label" htmlFor="text">
                Texto:
            </label>
            <input 
                className={`form__input`}
                id="text"
                name="text"
                type="text"
                value={text}
                onChange={onTextChanged}
            />
            <label className="form__label" htmlFor="user">
                Asignado a:
            </label>
            <select
                id="user"
                name="username"
                value={user}
                onChange={onUserChange}
            >
                {options}
            </select>
            <label className="form__label" htmlFor="location">
                    Ubicacion:
                </label>
                <select
                    id="location"
                    name="location"
                    value={location}
                    onChange={onLocationChange}
                >
                    {locationOptions}
                </select>
        </form>
    </>
  )

    
  return content
}

export default NewNoteForm