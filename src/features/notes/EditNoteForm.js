import { useEffect, useState } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan} from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { LOCATIONS } from "../../config/locations"

// CONTROLAR INFORMACION DEL FORMULARIO - AGREGAR MAS INFO???????? 

const EditNoteForm = ({note, users}) => {
    const {isManager, isAdmin} = useAuth()

    const options = Object.values(users).map (user => {
        return (
            <option
                key={user.id}
                value={user.id}
            >
            {user.username} </option>
        )
    })

    const locationOptions = Object.values(LOCATIONS).map (location => {
        return (
            <option
                key={location}
                value={location}
            >
            {location} </option>
        )
    })

    
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation ()
    
    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation ()

    const navigate = useNavigate()
    
    
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [location, setLocation] = useState(note.location)
    const [completed, setCompleted] = useState(note.completed)
    const [user, setUser] = useState(note.user)

    useEffect (() => {
        if (isSuccess || isDelSuccess) {
            setTitle ('')
            setText('')
            navigate ('/dash/notes')
        }
    }, [isSuccess,isDelSuccess, navigate])
    
    const onTitleChanged = e => setTitle (e.target.value)
    const onTextChanged = e => setText (e.target.value)
    const onUserChange = e => setUser (e.target.value)
    const onLocationChange = e => setLocation (e.target.value)
    
    const onCompletedChanged = () => setCompleted (prev => !prev)
    
    const onSaveNoteClicked = async (e) => {
        e.preventDefault ()
        if (note.id) {
            await updateNote ({ id: note.id, title, text, completed, user, location})            
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote ({ id: note.id})
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
        <button
        className="icon-button"
        title="Delete"
        onClick={onDeleteNoteClicked}
        >
        <FontAwesomeIcon icon={faTrashCan} />
        </button>
        )
    }

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
                        {deleteButton}
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
                <label className="form__label" htmlFor="note-completed">
                    Completada:
                </label>
                <input 
                    className="form__checkbox"
                    id="note-completed"
                    name="note-completed"
                    type="checkbox"
                    checked={completed}
                    onChange={onCompletedChanged}
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

export default EditNoteForm