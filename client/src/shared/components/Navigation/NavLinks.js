import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);
    console.log(auth);

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        {auth.isLoggedIn && (
            <li>
                <NavLink to={`/users/${auth.user.id}/gardens`}>MY GARDEN</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/garden/new">ADD ITEM</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <NavLink to="/chat" exact>CHAT</NavLink>
            </li>
        )}
        {!auth.isLoggedIn && (
            <li>
                <NavLink to="/auth">LOGIN</NavLink>
            </li>
        )}
        {auth.isLoggedIn && (
            <li>
                <a href="#" onClick={auth.logout}>LOGOUT</a>
            </li>
        )}
    </ul>
};

export default NavLinks;
