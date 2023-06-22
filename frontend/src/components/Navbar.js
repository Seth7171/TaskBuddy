import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import '../style/NavBar.css';

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleClick = () => {
        logout()
    }

    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return (
        <header>
            <div className="container">
                {user && (
                <div className="burger-menu" onClick={toggleSidebar}>
                    <div className={`line ${isSidebarOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isSidebarOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isSidebarOpen ? 'open' : ''}`}></div>
                    {isSidebarOpen && (
                    <div className="sidebar">                   
                        <ul>
                        <li>
                            <Link to="/mytasks">My Tasks</Link>
                        </li>
                        <li>
                            <Link to="/completed-tasks">Completed Tasks</Link>
                        </li>
                        {/* Add more sidebar menu items */}
                        </ul>
                    </div>
                    )}
                </div>
                )}
                <Link className="title" to = "/">
                    <h1 >Task Buddy</h1>
                </Link>
                <nav>
                    {user && (
                    <div className="nameandlogout">
                        <span>{user.fullName || user.email}</span>
                        <button className="logoutbutton" onClick={handleClick}>Log out</button>
                    </div>
                    )}
                    {!user && (
                    <div>
                        <Link to = "/login">Login</Link>
                        <Link to = "/signup">Signup</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar

