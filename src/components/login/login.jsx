import { Check, ArrowLeft, X } from 'lucide-react';
import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import GoogleLoginComp from "./GoogleLogin";
import MicrosoftLog from "./MicrosoftLogins";
import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [tab, setTab] = useState('signup')
    // const [modalShow, setModalShow] = useState(false);

    const handleRegistration = async (e) => {
        setSubmit(true);
        e.preventDefault();
        if (validatePassword(password)) {
            // console.log("Registration successful");
            try {
                let res = await api({
                    url: "/auth/signup",
                    method: "POST",
                    responseType: "json",
                    data: {
                        email,
                        password,
                    },
                });
                if (res.code === 200) {
                    localStorage.setItem("token", res.data.authorization);
                    navigate("/about-org");
                }
                if (res?.data?.code === 400) {
                    alert(res?.data?.message);
                    navigate("/login");
                }
            } catch (error) {
                if (error.response.status === 401) navigate("/");
            }
        } else {
            alert("Password does not meet the requirements");
        }
    };

    // const handleSocialSignIn = () => {
    //   console.log("00000000");
    // };


    const handleLogin = async (e) => {
        navigate("/about-org");
        e.preventDefault();
        if (tab === 'signup') {
            if (validatePassword(password)) {
                // console.log("Registration successful");
                try {
                    let res = await api({
                        url: "/auth/signup",
                        method: "POST",
                        responseType: "json",
                        data: {
                            email,
                            password,
                        },
                    });
                    if (res.code === 200) {
                        localStorage.setItem("token", res.data.authorization);
                        navigate("/about-org");
                    }
                    if (res?.data?.code === 400) {
                        alert(res?.data?.message);
                        navigate("/login");
                    }
                } catch (error) {
                    if (error.response.status === 401) navigate("/");
                }
            } else {
                alert("Password does not meet the requirements");
            }
        }
        else {
            try {
                let res = await api({
                    url: "/auth/signin",
                    method: "POST",
                    responseType: "json",
                    data: {
                        email,
                        password,
                    },
                });

                console.log(res, "--------------------->signinres")
                if (res?.status === "SUCCESS") {
                    localStorage.setItem("token", res.data.authorization);
                    localStorage.setItem("name", res.data.name);

                    if (res?.code === 200) {
                        if (res.data.registered !== true) {
                            navigate("/about-org");
                        } else {
                            navigate("/dashboard");
                        }
                    }
                } else {
                    if (res?.data?.code === 400) {
                        if (res?.data?.message === "Error: Mail Not exist") {
                            alert(res?.data?.message);
                            setActiveTab("signup");
                        } else {
                            alert(res?.data?.message);
                        }
                    }
                }
            } catch (error) {
                if (error?.response?.status === 401) navigate("/");
            }
        }
    }

    const lowerCase = new RegExp("(?=.*[a-z])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const digit = new RegExp("(?=.*\\d)");
    const specialChar = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("[a-zA-Z\\d!@#$%^&*]{8,}");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const validatePassword = (password) => {
        const lowerCase = new RegExp("(?=.*[a-z])");
        const upperCase = new RegExp("(?=.*[A-Z])");
        const digit = new RegExp("(?=.*\\d)");
        const specialChar = new RegExp("(?=.*[!@#$%^&*])");
        const length = new RegExp("[a-zA-Z\\d!@#$%^&*]{8,}");

        return (
            lowerCase.test(password) &&
            upperCase.test(password) &&
            digit.test(password) &&
            specialChar.test(password) &&
            length.test(password)
        );
    };


    return (
        <>
            <main className="container mx-auto sm:max-w-full md:max-w-full lg:max-w-full h-full grid">
                <div className="flex bg-white rounded-3xl w-full max-w-[1920px] mx-auto items-center">
                    <section className="login-sidebar w-[50%] h-[100vh] max-h-[900px] hidden lg:flex">
                        <header>
                            <h1>Welcome to ASO Pilot </h1>
                            <p className='px-16'>Your Gateway to Effortless App Review Management System.</p>
                        </header>
                        <footer className='mt-auto'>
                            <p className='h3'>Seamless Collaboration </p>
                            <p>Effortlessly work together with your team in real-time.</p>
                        </footer>
                    </section>
                    {/* login */}
                    <section className="w-full lg:w-[50%] max-w-96 lg:max-w-none grid place-content-center mx-auto p-8">
                        <div className="w-full max-w-96 h-full ">
                            <header className="mb-20">
                                <img src="./images/logo.png" alt="" className="mx-auto" />
                            </header>
                            <div className="mb-md flex justify-center gap-base">
                                <button className={tab === 'signup' ? "btn-secondary flex-1" : "btn-tetriary flex-1"} onClick={() => { setTab('signup') }}>Sign Up</button>
                                <button className={tab === 'signin' ? "btn-secondary flex-1" : "btn-tetriary flex-1"} onClick={() => { setTab('signin') }}>Sign In</button>
                            </div>

                            <div className="mb-md">
                                <label htmlFor="" className="block mb-xs">Email Id</label>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='form-input'
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-md">
                                <div className="flex items-center justify-between mb-xs">
                                    <label htmlFor="">Password</label>
                                    <a target="_blank" className='text-xs text-violet-500'>Forgot Password?</a>
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        className='form-input'
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {
                                    tab === 'signup' ?
                                        <ul className="text-xs mt-sm space-y-xs">
                                            {/* <li className='flex gap-xs items-center'>
                                                <Check className="text-slate-400" size={16} /> Password Strength: {validatePassword(password) ? "Strong" : "Weak"}
                                            </li> */}
                                            <li className={`flex gap-xs items-center ${lowerCase.test(password) ? "valid" : "invalid"}`}>
                                                <Check className={`text-${lowerCase.test(password) ? "green-400" : "slate-400"}`} size={16} />
                                                Contains lowercase letter
                                            </li>
                                            <li className={`flex gap-xs items-center ${upperCase.test(password) ? "valid" : "invalid"}`}>
                                                <Check className={`text-${upperCase.test(password) ? "green-400" : "slate-400"}`} size={16} />
                                                Contains uppercase letter
                                            </li>
                                            <li className={`flex gap-xs items-center ${digit.test(password) ? "valid" : "invalid"}`}>
                                                <Check className={`text-${digit.test(password) ? "green-400" : "slate-400"}`} size={16} />
                                                Contains a number
                                            </li>
                                            <li className={`flex gap-xs items-center ${specialChar.test(password) ? "valid" : "invalid"}`}>
                                                <Check className={`text-${specialChar.test(password) ? "green-400" : "slate-400"}`} size={16} />
                                                Contains a special character
                                            </li>
                                            <li className={`flex gap-xs items-center ${length.test(password) ? "valid" : "invalid"}`}>
                                                <Check className={`text-${length.test(password) ? "green-400" : "slate-400"}`} size={16} />
                                                At least 8 characters long
                                            </li>
                                        </ul>
                                        : null}
                            </div>
                            {tab === 'signin' ? <div className="mb-md text-center">
                                <span className="text-stone-400">Dont have an account?</span> <a target="_blank" className="text-blue-500 underline" onClick={() => { setTab('signup') }}>Create Now</a>
                            </div> : null}
                            <div className='mb-md'>
                                <button className="btn-primary is-lg" onClick={handleLogin}>Log In</button>
                            </div>
                            <div className='mb-md text-center'>
                                <strong className='text-slate-400 text-xs'>OR</strong>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-base mb-md">
                                <button className='btn-tetriary login-google-btn bordered w-[86px] lg:w-[180px] is-lg'>
                                    <GoogleOAuthProvider>
                                        <GoogleLoginComp />
                                    </GoogleOAuthProvider>
                                    {/* <img src="./images/google.png" alt="" /> */}
                                </button>
                                <button className='btn-tetriary bordered !w-[86px] is-lg'>
                                    <img src="./images/apple.png" alt="" />
                                </button>
                                <button className='btn-tetriary bordered w-[86px] is-lg'>
                                    <MicrosoftLog />
                                    {/* <img src="./images/microsoft.png" alt="" /> */}
                                </button>
                            </div>
                            <p className='text-xs text-center px-10 text-slate-500'>By signing up to create an account I accept Company’s <a className='text-blue-500' target='_blank'>Terms of use & Privacy Policy.</a></p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Login;
