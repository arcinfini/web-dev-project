import {Link} from 'react-router-dom'
import "../styles/header.css"

export default function Header() {
    return (
        <>
            <header className='second-color flex-far content-font'>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/portfolio">Portfolio</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
                <section>arcinfini.net</section>
            </header>
        </>
    )
}