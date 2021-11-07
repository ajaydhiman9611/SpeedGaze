import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export const Navbar = () => {
    const themeContext = useContext(ThemeContext);
    const { themeState } = themeContext;

    console.log("themeContext : ", themeContext, themeState);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" >
            <span className="nav-link">Navbar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <span className="nav-link">Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="sr-only">(current)</span></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link">Link</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
