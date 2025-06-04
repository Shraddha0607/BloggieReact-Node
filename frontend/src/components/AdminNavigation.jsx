import { Link } from "react-router-dom"

function AdminNavigation() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mb-5">
                            <Link className="nav-link active" aria-current="page" to="">Add Tag</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="Admin">Show All Tag</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="Admin">Add Blog Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="Admin">Show All Blog Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="users">Show All User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AdminNavigation
