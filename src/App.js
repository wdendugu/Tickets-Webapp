import {Routes, Route} from 'react-router-dom'
import Layout from "./components/Layout"
import Public from './components/Public'
import DashLayout from './components/DashLayout'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import NewNote from './features/notes/NewNote'
import EditNote from './features/notes/EditNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from "./hooks/useTitle"


function App() {
  useTitle("Mesa de Ayuda Kennedy")
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes*/}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Protected Routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path='dash' element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path='notes' >
                  <Route index element={<NotesList />} />
                  <Route path=':id' element={<EditNote />} />
                  <Route path='new' element={<NewNote />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Manager]} />}>
                  <Route path='users' >
                    <Route index element={<UsersList />} />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
                </Route>
                </Route>
              </Route>
            </Route>
        </Route>
        {/* Protected Routes*/}
      </Route>
    </Routes>
)}

export default App;
