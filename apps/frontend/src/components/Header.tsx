import { Link, NavLink } from "react-router"

export function Header() {
    return (
        <header>
            <Link to="/">
                <h1>Arkesia World</h1>
            </Link>

            <nav>
                <NavLink to="/"
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}>Home</NavLink>
                <NavLink to="/character/DraGooner"
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}>Personaje</NavLink>
            </nav>
        </header>

    )
}