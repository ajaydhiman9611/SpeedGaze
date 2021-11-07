import React, { useEffect } from 'react'

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

import logo from "../../assets/brand_Logo.png"

import "./Navbar.css"

export const Navbar = () => {

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", function () {
            window.addEventListener('scroll', function () {
                if (window.scrollY > 0) {
                    document.getElementById('navbar_top').classList.add('fixed-top');
                    // add padding top to show content behind navbar
                    let navbar_height = document.querySelector('.navbar').offsetHeight;
                    document.body.style.paddingTop = navbar_height + 'px';
                } else {
                    if (document.getElementById('navbar_top')) {
                        document.getElementById('navbar_top').classList.remove('fixed-top');
                        // remove padding top from body
                        document.body.style.paddingTop = '0';
                    }
                }
            });
        });
        return () => {
            document.removeEventListener("DOMContentLoaded", () => { });
        }
    }, [])

    return (
        <nav id="navbar_top" className="navbar navbar-expand-lg navbar-light bg-light bg_custom_dark">
            <a class="navbar-brand brand_logo" href="#">
                <img src={logo} alt="" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ">
                    <li className="nav-item">
                        <span className="nav-link">
                            <select class="custom-select" id="regionSelection">
                                <option selected>Choose...</option>
                                <option value="1">CPU Region</option>
                            </select>
                        </span>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto ">
                    <li className="nav-item active mr-lg-4">
                        <span className="nav-link"><input class="form-control mr-sm-2 headerSearch" type="search" placeholder="Search" aria-label="Search" /></span>
                    </li>
                    <li className="nav-item ">
                        <span className="nav-link"><AccountTreeIcon /></span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link"><SettingsIcon /></span>
                    </li>
                    <li className="nav-item ">
                        <span className="nav-link"><NotificationsIcon /></span>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <PersonIcon /> <span></span> Hello Rahul
                        </a>
                        <div class="dropdown-menu dropdown-menu-right " aria-labelledby="navbarDropdownMenuLink">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
