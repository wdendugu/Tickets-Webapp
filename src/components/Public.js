import Login from '../features/auth/Login'

const Public = () => {
    const content = (
        <section className='public'>
            <main className='public__main'>
            <Login />
            </main>
        </section>

    )
    return content
}


export default Public