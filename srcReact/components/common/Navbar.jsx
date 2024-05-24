// import React from 'react';
// import { Link } from 'react-router-dom';
// import UserService from '../service/UserService';

// function Navbar() {
//     const isAuthenticated = UserService.isAuthenticated();
//     const isAdmin = UserService.isAdmin();



//     const handleLogout = () => {
//         const confirmDelete = window.confirm('Are you sure you want to logout this user?');
//         if (confirmDelete) {
//             UserService.logout();
//         }
//     };


//     return (
//         <nav>
//             <ul>
//                 {!isAuthenticated && <li><Link to="/">Phegon Dev</Link></li>}
//                 {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
//                 {isAdmin && <li><Link to="/admin/user-management">User Management</Link></li>}
//                 {isAuthenticated && <li><Link to="/" onClick={handleLogout}>Logout</Link></li>}
//             </ul>
//         </nav>
//     );
// }

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css'; 

function Navbar({ isLoggedIn, onLogout, isAdmin }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    
    const isHome = location.pathname === '/home';

    if (isHome) {
        return null; 
    }

    return (
        <nav className="navbar">
            <ul className="nav-menu">
                {isLoggedIn ? (
    <>  <li className="nav-item3">sportarena</li>
        <li className="nav-item"><Link to="/profile" className="nav-link">Profile</Link></li>
        {isAdmin ? (
            <>
                <li className="nav-item"><Link to="/admin/user-management" className="nav-link">User </Link></li>
                <li className="nav-item"><Link to="/admin/news-management" className="nav-link">News </Link></li>
                <li className="nav-item"><Link to="/admin/category-management" className="nav-link">Category </Link></li>
            </>
        ) : 
        <>
                <li className="nav-item"><Link to="/football" className="nav-link">Футбол</Link></li>
                <li className="nav-item"><Link to="/basketball" className="nav-link">Баскетбол</Link></li>
                <li className="nav-item"><Link to="/boxes" className="nav-link">Бокс</Link></li>
                <li className="nav-item"><Link to="/tennis" className="nav-link">Теннис</Link></li>
                <li className="nav-item">Другие</li>
            </>
      }
        <li className="nav-item"><button onClick={handleLogout} className="logout-btn">Logout</button></li>
    </>
) : (
    <>
        <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
    </>
)}

            </ul>
        </nav>
    );
}

export default Navbar;





