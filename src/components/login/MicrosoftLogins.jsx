import React from 'react'
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { useNavigate } from "react-router-dom";
import api from '../../services/api';

function MicrosoftLogins() {
    const navigate = useNavigate();
    const { instance } = useMsal();

    const handleLogin = async (loginType) => {
        if (loginType === "popup") {

            try {
                let result = await instance.loginPopup(loginRequest);
                console.log(result, "------------------->LoginFResult")

                let res = await api({
                    url: '/auth/microsoftlogin',
                    method: "POST",
                    responseType: "json",
                    data: {
                        mail: result?.account?.username,
                        name: result?.account?.name
                    },
                });
                console.log(res, "------------------>response")
                if (res.code === 200) {
                    // localStorage.setItem('userEmail', mail);
                    localStorage.setItem("token", res?.data?.authorization);
                    localStorage.setItem("login_type", "microsoft")
                    localStorage.setItem("name", res?.data?.name)
                    if (res?.data?.message === "reg_done") {
                        navigate("/reviews-feed")
                    }
                    else {
                        navigate("/about-org")
                    }
                }
            } catch (error) {
                console.error("Error @ MicrosoftLogin", error)
                if (error.response.status === 401) navigate("/");
            }

        }
    }          // } else if (loginType === "redirect") {
    //     instance.loginRedirect(loginRequest).catch((e) => {
    //         console.log(e);
    //     });

    return (
        <>
            <button onClick={() => handleLogin("popup")}><img src="./images/microsoft.png" alt="" /></button>
            {/* <button onClick={() => handleLogin("redirect")}>
                Sign in using Redirect
            </button> */}

        </>

    );
}

export default MicrosoftLogins