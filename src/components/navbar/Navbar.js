import React from "react";
import './Navbar.css'
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="head">
                <div class="logo"><span>INNOWASH</span></div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>
                </div>
            </div>
            <div className="nav-links">
                <NavLink to="/"><span>HOME</span></NavLink>
                <NavLink to="/types"><span>TYPES</span></NavLink>
                <NavLink to="/booking"><span>BOOKING</span></NavLink>
                <NavLink to="/status"><span>STATUS</span></NavLink>
            </div>
            <div className="details">
                <div>
                    USER#123
                </div>
                <div>
                    <img src="/img/user.jpg" />
                </div>
            </div>
        </div>
    );
}