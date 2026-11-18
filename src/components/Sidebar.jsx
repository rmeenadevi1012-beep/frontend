import{ Link }from "react-router-dom";

function Sidebar(){

    return(
        <aside className="sidebar">

            <h3 style={{ color:'red' }}>JOB TRACK</h3>

            <nav>
                <p>
                <Link className="nav-link" to="/dashboard">
                    📊 Dashboard
                </Link>
                </p>

                <p>
                    <Link className="nav-link" to="/application">
                        💼 Application
                    </Link>
                </p>

                <p>
                    <Link className="nav-link" to="/add-job">
                        ➕ Add job
                    </Link>
                </p>

                <p>
                    <Link className="nav-link" to="/settings">
                        ⚙️ settings
                    </Link>
                </p>
            </nav>
        </aside>
    )
}
export default Sidebar