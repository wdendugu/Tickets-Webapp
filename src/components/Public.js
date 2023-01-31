import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Bienvenido a <span className="nowrap">Mesa de Ayuda Kenna</span></h1>
            </header>
            <main className="public__main">
            </main>
            <footer>
                <Link to="/login">Ingresar</Link>
            </footer>
        </section>

    )
    return content
}


export default Public