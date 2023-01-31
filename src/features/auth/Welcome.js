import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isManager, isAdmin} = useAuth()
    
    const date = new Date()
    const today = new Intl.DateTimeFormat('es-AR', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Hola {username}!</h1>

            <p><Link to="/dash/notes">Ver Tickets</Link></p>

            <p><Link to="/dash/notes/new">Agregar Ticket</Link></p>

            {(isManager || isAdmin) && <p><Link to="/dash/users">Ver Usuario</Link></p>}

            {(isManager || isAdmin) && <p><Link to="/dash/users/new">Agregar Usuario</Link></p>}


        </section>
    )

    return content
}

export default Welcome