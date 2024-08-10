import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import api from '../../services/api';


function GoogleLoginComp() {

    const navigate = useNavigate();

    const handleLoginSuccess = async (credentialResponse) => {
        // Toast('success', 'Logged in Succesfully')
        var decoded = jwtDecode(credentialResponse.credential);
        console.log(decoded, "---------------------------->decodedGoogle")
        const mail = decoded.email;
        try {
            let res = await api({
                url: '/auth/googlelogin',
                method: "POST",
                responseType: "json",
                data: {
                    mail,
                    name: decoded.name
                },
            });
            if (res.code === 200) {
                // localStorage.setItem('userEmail', mail);
                localStorage.setItem("token", res?.data?.authorization);
                localStorage.setItem("login_type", "google")
                localStorage.setItem("name", res?.data?.name)
                if (res?.data?.message === "reg_done") {
                    navigate("/reviews-feed")
                }
                else {
                    navigate("/about-org")
                }
            }
        } catch (error) {
            if (error.response.status === 401) navigate("/");
        }
    };
    const handleLoginError = () => {
        // Toast("error", "Login Failed Try Again!!!")
        console.log('Login Failed');
    }

    return (
        // <img className="social-login-icon" src="/google.png" alt="Google" onClick={() => login()} />
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
        />

    );
}

export default GoogleLoginComp;