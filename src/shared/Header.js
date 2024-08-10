import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useMsal } from "@azure/msal-react";



function Header() {
    const navigate = useNavigate();
    const { instance } = useMsal();

    const generateProfileName = (name) => {
        const parts = name.split(' ');
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }

    // Generate profile abbreviation
    const profileName = generateProfileName(localStorage.getItem("name"));

    const LogOut = () => {
        if (localStorage.getItem("login_type") === "google") {
            console.log("Inside Google logout")
            googleLogout();
        }
        if (localStorage.getItem("login_type") === "microsoft") {
            console.log("Inside Microsoft Login")
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/",
            });
        }
        localStorage.removeItem("token");
        localStorage.removeItem("login_type");
        localStorage.removeItem("name");
        navigate("/signin")
    }

    return (<>
        <div className="d-flex justify-content-end m-2 dropdown"> <div className="circular-profile">
            {profileName}
        </div> <h5 className='m-3 dropbtn'>{localStorage.getItem("name")}</h5>
            <div class="dropdown-content">
                <a >Profile</a>
                <a >User Management</a>
                <a onClick={() => { LogOut() }}>Log Out</a>
            </div></div>
    </>)
}

export default Header