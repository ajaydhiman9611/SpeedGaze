import React, { useEffect, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import logo from "../../assets/brand_Logo.png"

import "./Navbar.css"
import "../../App.css"

export const Navbar = () => {
    const themeContext = useContext(ThemeContext);
    const { themeState } = themeContext;

    useEffect(() => {
        // document.addEventListener("DOMContentLoaded", function () {
        //     window.addEventListener('scroll', function () {
        //         if (window.scrollY > 0) {
        //             document.getElementById('navbar_top').classList.add('fixed-top');
        //             // add padding top to show content behind navbar
        //             let navbar_height = document.querySelector('.navbar').offsetHeight;
        //             document.body.style.paddingTop = navbar_height + 'px';
        //         } else {
        //             if (document.getElementById('navbar_top')) {
        //                 document.getElementById('navbar_top').classList.remove('fixed-top');
        //                 // remove padding top from body
        //                 document.body.style.paddingTop = '0';
        //             }
        //         }
        //     });
        // });
        // return () => {
        //     document.removeEventListener("DOMContentLoaded", () => { });
        // }
    }, [])

    const changeTheme = () => {
        themeContext.setThemeState(themeState === "light" ? "darker" : "light");
        document.body.classList.remove(`bg-${themeState}`)
        document.body.classList.add(`bg-${themeState === `light` ? `darker` : `light`}`)
    }

    return (
        <nav
            style={{ padding: "0px", position: "fixed", overflow: "hidden", top: "0", width: "100%", zIndex: "999" }}
            className="navbar navbar-expand-lg navbar-light shadow_custom bg-white navbar-fixed-top">
            <a class="navbar-brand brand_logo">
                <img src={logo} alt="" className="img-fluid" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto navbar_right" style={{ marginRight: "20px"}}>
                    {/* <li className="nav-item active mr-lg-4">
                        <span className="nav-link"><input class="form-control mr-sm-2 headerSearch" type="search" placeholder="Search" aria-label="Search" /></span>
                    </li> */}
                    <li className="nav-item themeBar">
                        <span className="nav-link d-flex align-items-center">
                            {themeState === "darker"
                                ?
                                <WbSunnyIcon id="theme-icon" onClick={changeTheme} style={{ color: "grey", cursor: "pointer" }} />
                                :
                                <NightsStayIcon id="theme-icon" onClick={changeTheme} style={{ color: "grey", cursor: "pointer" }} />
                            }
                            <span htmlFor="theme-icon" id="hideOnLargerScreen" onClick={changeTheme}>Toggle Theme</span>
                        </span>
                    </li>
                    <li className="nav-item ">
                        <span className="nav-link d-flex align-items-center">
                            <AccountTreeIcon />
                            <span id="hideOnLargerScreen">Project and Jobs</span>
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link d-flex align-items-center">
                            <SettingsIcon />
                            <span id="hideOnLargerScreen">Settings</span>
                        </span>
                    </li>
                    <li className="nav-item ">
                        <span className="nav-link d-flex align-items-center">
                            <NotificationsIcon />
                            <span id="hideOnLargerScreen">Notifications</span>
                        </span>
                    </li>
                    <li class="nav-item dropdown">
                        <span className="nav-link d-flex align-items-center">
                            <PersonIcon /> <span id="hideOnLargerScreen">Hello Rahul</span>
                        </span>
                        {/* <a class="nav-link dropdown-toggle d-flex align-items-center" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                        {/* </a>
                        <div class="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item">Profile</a>
                            <a class="dropdown-item">Logout</a>
                        </div> */}
                    </li>
                </ul>
            </div>
        </nav >
    )
}
