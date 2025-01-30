import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import axiosInstance from "../../utils/api";

export default function Navbar() {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem("accessToken");

            if (token) {
                try {
                    const response = await axiosInstance.get("/api/user/getuser");
                    setUserDetails(response.data.response);
                } catch (err) {
                    setError("Failed to get the user");
                    console.error("Error Fetching User Details:", err);
                }
            }
            setIsLoading(false);
        };

        fetchUserDetails();
    }, []);

    // Toggle mobile nav
    const toggleNav = () => {
        setNavOpen((prev) => !prev);
    };

    return (
        <div className="Navbar">
            <div className="head">
                <div className="logo">
                    <span>INNOWASH</span>
                </div>
                <div className="burger-menu" onClick={toggleNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            fill="#ffffff"
                            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
                        />
                    </svg>
                </div>
            </div>

            <div className="nav">
                <div className="nav-links">
                    <NavLink to="/"><span>HOME</span></NavLink>
                    <NavLink to="/types"><span>TYPES</span></NavLink>
                    <NavLink to="/booking"><span>BOOKING</span></NavLink>
                    <NavLink to="/status"><span>STATUS</span></NavLink>
                </div>

                <div className="details">
                    {isLoading ? <p>Loading user details...</p> : (
                        error ? <p>{error}</p> : (
                            userDetails ? (
                                <>
                                    <div>{userDetails.username?.toUpperCase() || userDetails.email || 'USER'}</div>
                                    <div>
                                        <img src={userDetails.profilePicture || "/img/user.jpg"} alt="User" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>Login</div>
                                    <div>
                                        <img src="/img/user.jpg" alt="Default User" />
                                    </div>
                                </>
                            )
                        )) }
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="mobile-nav">
                <div className="nav-links" id="navBar" style={{ height: navOpen ? "8rem" : "0rem" }}>
                    <NavLink to="/"><span>HOME</span></NavLink>
                    <NavLink to="/types"><span>TYPES</span></NavLink>
                    <NavLink to="/booking"><span>BOOKING</span></NavLink>
                    <NavLink to="/status"><span>STATUS</span></NavLink>
                </div>
                <div className="details">
                    {isLoading ? <p>Loading user details...</p> : (
                        error ? <p>{error}</p> : (
                            userDetails ? (
                                <>
                                    <div>{userDetails.username?.toUpperCase() || userDetails.email || 'USER'}</div>
                                    <div>
                                        <img src={userDetails.profilePicture || "/img/user.jpg"} alt="User" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>Login</div>
                                    <div>
                                        <img src="/img/user.jpg" alt="Default User" />
                                    </div>
                                </>
                            )
                        )) }
                </div>
                <div>
                    <img className="navBtn" src="/img/burger_nav.png" alt="Menu Toggle" onClick={toggleNav} />
                </div>
            </div>
        </div>
    );
}
