import React from "react";
import { useNavigate } from "react-router-dom";

const RegSuccess = () => {
    const naviagte = useNavigate();
    const handleLoginClick = () => {
        naviagte("/dashboard");
    };

    return (
        <>
            <main className="container mx-auto h-full grid place-content-center">
                <div className='inline-flex place-items-center bg-white rounded-3xl'>
                    <section className="login-sidebar">
                        <header>
                            <h1>Welcome to ASO Pilot </h1>
                            <p className='px-16'>Your Gateway to Effortless App Review Management System.</p>
                        </header>
                        <footer className='mt-auto'>
                            <p className='h3'>Seamless Collaboration </p>
                            <p>Effortlessly work together with your team in real-time.</p>
                        </footer>
                    </section>
                    <div className='flex flex-col gap-lg py-20 px-32 place-items-center bg-white rounded-xl'>
                        <img src="./images/logo.png" alt="" />
                        <h2>Account created successfully!</h2>
                        <img src="./images/badge.png" alt="" />
                        <p className='h5 px-20 text-slate-500'>Welcome aboard! Start your success journey with ASO Pilot!</p>
                        <div>
                            <button className='btn-primary is-md' onClick={handleLoginClick}>Let’s Start</button>
                        </div>
                    </div>
                </div>
            </main>

        </>

    );
};

export default RegSuccess;
