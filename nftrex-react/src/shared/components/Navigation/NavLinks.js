import React, { useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { HashconnectContext } from "../../context/auth-context";

import './NavLinks.css';


const NavLinks = props => {
    let { accountId } = useContext(HashconnectContext);
    const { topic } = useContext(HashconnectContext);
    
    return <ul className="nav-links">
        <NavLink to="/">rex</NavLink>
        <NavLink to="/privacy">about</NavLink>
        <NavLink to="/projects">data</NavLink>
        <a href="https://hashlotto.titorlabs.io" target="_blank" rel="noreferrer" className='footer-link'>titorlabs.io</a>
    </ul>
};

export default NavLinks;