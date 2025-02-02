import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import axiosInstance from "../../utils/api";

export default function Navbar() {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [navOpen, setNavOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        function getUsername(input) {
            // Regular expression to check for email pattern
            const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
          
            if (emailRegex.test(input)) {
              // Extract username part from email
              return input.split('@')[0];
            }
          
            // Return input as-is if it's a username
            return input;
          }
          function shortenUsername(username) {
            if (username.length > 10) {
              return username.slice(0, 9) + '...';
            }
            return username;
          }
        const fetchUserDetails = async () => {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem("accessToken");

            if (token) {
                try {
                    const response = await axiosInstance.get("/api/user/getuser");
                    let data = response.data.response
                    data.username = getUsername(data.username)
                    data.shortname = shortenUsername(data.username)
                    setUserDetails(data);
                } catch (err) {
                    setError("Failed to get the user");
                    localStorage.removeItem('accessToken');
                    console.log('Logged out successfully');
                    window.location.href = '/'
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

    const toggleDetails = () => {
        setDetailsOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // Delete access token key from localStorage
        localStorage.removeItem('accessToken');
        console.log('Logged out successfully');
        window.location.href = '/'
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

                <div className="details" onClick={toggleDetails}>
                    {isLoading ? <p>Loading user details...</p> : (
                        error ? <p>{error}</p> : (
                            userDetails ? (
                                <>
                                    <div>{userDetails.shortname?.toUpperCase() || userDetails.email || 'USER'}</div>
                                    <div>
                                        <img src={userDetails.profilePicture || "/img/user.jpg"} alt="User" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to={'/login'}  className="no-underline"><div>Login</div></Link>
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
                <div className="details" onClick={toggleDetails}>
                    {isLoading ? <p>Loading user details...</p> : (
                        error ? <p>{error}</p> : (
                            userDetails ? (
                                <>
                                    <div>{userDetails.shortname?.toUpperCase()   || 'USER'}</div>
                                    <div>
                                        <img src={userDetails.profilePicture || "/img/user.jpg"} alt="User" />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to={'/login'}  className="no-underline"><div>Login</div></Link>
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
            <div className="side-nav" style={{ width: detailsOpen ? "25%" : "0"}}>
                {isLoading ? <p>Loading user details...</p> : (
                            error ? <p>{error}</p> : (
                                userDetails ? (
                                    <>
                                        <div className="side-nav-container">
                                            <div>{userDetails.username?.toUpperCase() || 'USER'}</div>
                                            <div>Admission No: {userDetails.admission_no}</div>
                                            <div>Current bill: {userDetails.current_bill} </div>
                                            <button className="cancel-btn" onClick={handleLogout}>Log out</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>Login for details</div>
                                    </>
                                )
                            )) }
            </div>
        </div>
    );
}
