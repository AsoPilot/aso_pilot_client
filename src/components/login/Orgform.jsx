import React, { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';


const OrgForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [jobFunction, setJobFunction] = useState("");
    const [country, setCountry] = useState("");
    const [appName, setAppName] = useState("");
    const [data, setData] = useState("");
    const [appId, setAppId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
        } else {
            navigate("/reg_success");

            // Handle submission for step 2
            console.log("Form submitted:", {
                fullName,
                companyName,
                jobFunction,
                country,
                appName,
            });
            try {
                let res = await api({
                    url: "/auth/register",
                    method: "POST",
                    responseType: "json",
                    data: {
                        fullName,
                        companyName,
                        jobFunction,
                        country,
                        appName,
                        appId,
                    },
                });
                if (res?.code === 200) {
                    localStorage.setItem("name", fullName)
                    setFullName("");
                    setCompanyName("");
                    setJobFunction("");
                    setCountry("");
                    setAppName("");
                    navigate("/reg_success");
                }
                if (res?.data?.code === 400) {
                    alert("Registration done previously");
                    // navigate("/reg_success");
                }
            } catch (error) {
                if (error.response.status === 401) navigate("/");
            }
        }
    };

    const searchApp = async (appname) => {
        if (appname.length > 3) {
            try {
                let res = await api({
                    url: "/search_app",
                    method: "POST",
                    responseType: "json",
                    data: {
                        appname,
                        country: country,
                    },
                });
                if (res?.code === 200) {
                    setData(res.data);
                }
            } catch (error) {
                if (error.response.status === 401) navigate("/");
            }
        }
    };

    return (
        <div>
            <main className="container mx-auto h-full grid place-content-center">

                <div className='inline-flex place-items-center bg-white rounded-3xl m-4 gap-5'>
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
                    <form onSubmit={handleSubmit}>

                        <section className="w-96 h-full">
                            <header className="mb-20">
                                <img src="./images/logo.png" alt="" className="mx-auto" />
                            </header>
                            {step === 1 && (
                                <>
                                    <div className="mb-md">
                                        <label htmlFor="" className="block mb-xs">Full Name</label>
                                        <div>
                                            <input
                                                type="text"
                                                id="fullName"
                                                className="form-input"
                                                placeholder="Full Name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-md">
                                        <label htmlFor="" className="block mb-xs">Company Name</label>
                                        <div>
                                            <input
                                                type="text"
                                                id="companyName"
                                                className="form-input"
                                                placeholder="Company Name"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-md">
                                        <label htmlFor="" className="block mb-xs">Job function</label>
                                        {/* <div>
                                        <select name="job" id="" className="form-select">
                                            <option value="select">select</option>
                                        </select>
                                    </div> */}

                                        <input
                                            type="text"
                                            id="jobFunction"
                                            placeholder="Job Function"
                                            value={jobFunction}
                                            className="form-select"
                                            onChange={(e) => setJobFunction(e.target.value)}
                                        />
                                    </div>
                                    <div className='mb-md'>
                                        <button className="btn-primary is-lg" type='submit'>Save & Proceed</button>
                                    </div>
                                    <div className='mb-md'>
                                        <button className="is-lg text-blue-500 mx-auto" onClick={() => { navigate('/login') }}>
                                            <ChevronLeft size={16} />
                                            Back
                                        </button>
                                    </div>
                                </>
                            )}

                            {step === 2 && (

                                <section className="w-96 h-full">

                                    <div className="mb-md">
                                        <p className="h3">Choose modal app</p>
                                        <p className="text-slate-400">Add an app to discover user feedback and market intelligence.</p>
                                    </div>

                                    <div className="mb-md">
                                        <label htmlFor="" className="block mb-xs">Select Your Country</label>
                                        <div>
                                            <select
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">Select your country</option>
                                                <option value="IN">India</option>
                                                <option value="US">United States</option>
                                                <option value="CN">Canada</option>
                                                {/* Add more country options here */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-base mb-md'>
                                        <div className='col-span-2 h-48 flex flex-col overflow-auto'>
                                            <h6 className='mb-1'>Do you have an app?</h6>
                                            <div className='shadow-sm border border-slate-300 p-xs rounded-md'>
                                                <header>
                                                    <input
                                                        type="text"
                                                        id="appName"
                                                        className="form-input"
                                                        placeholder="Search for your app"
                                                        value={appName}
                                                        onChange={(e) => {
                                                            setAppName(e.target.value);
                                                            searchApp(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                </header>
                                                {data &&
                                                    data.map((item) => (
                                                        // <div className="search-inner">
                                                        //     <img
                                                        //         className="icon"
                                                        //         src={item.icon}
                                                        //         alt="icon"
                                                        //         onClick={() => {
                                                        //             setAppName(item.title);
                                                        //             setAppId(item.appId);
                                                        //         }}
                                                        //     />
                                                        // </div>
                                                        <section className='mt-sm flex-1 overflow-auto'>
                                                            <div className='flex gap-sm items-center border-b border-slate-300 py-1' onClick={() => {
                                                                setAppName(item.title);
                                                                setAppId(item.appId);
                                                            }}>
                                                                <img
                                                                    className="icon w-4 h-4"
                                                                    src={item.icon}
                                                                    alt="icon"

                                                                />
                                                                <aside className='flex-1 truncate'>
                                                                    <p className='text-xs'>{item.title}</p>
                                                                    <span className='text-xs'>{item.scoreText}</span>
                                                                </aside>
                                                            </div>
                                                        </section>

                                                    ))}

                                                {/* <section className='mt-sm flex-1 overflow-auto'>
                                                <div className='flex gap-sm items-center border-b border-slate-300 py-1'>
                                                    <img src="./images/app1.png" alt="" />
                                                    <aside className='flex-1 truncate'>
                                                        <p className='text-xs'>CarWale: Buy & Sell New/Usedcars</p>
                                                        <span className='text-xs'>4.3</span>
                                                    </aside>
                                                </div>
                                            </section> */}
                                            </div>
                                        </div>

                                        <div className='col-span-1 h-48 flex flex-col overflow-auto'>
                                            <h6 className='mb-1'>Dont have?</h6>
                                            <div className='shadow-sm border border-slate-300 p-xs rounded-md'>
                                                <header className='text-xs text-slate-400 mb-sm'>
                                                    Add a popular app to see how it works?
                                                </header>
                                                <div className='grid grid-cols-2 gap-sm'>
                                                    <button className='p-0' onClick={() => {
                                                        setAppName("Instagram");
                                                        setAppId("com.instagram.android");
                                                    }}>
                                                        <img src="./images/insta.png" alt="" />
                                                    </button>
                                                    <button className='p-0' onClick={() => {
                                                        setAppName("Facebook");
                                                        setAppId("com.facebook.katana");
                                                    }} >
                                                        <img src="./images/facebook.png" alt="" />
                                                    </button>
                                                    <button className='p-0' onClick={() => {
                                                        setAppName("Amazon Shopping");
                                                        setAppId("com.amazon.mShop.android.shopping");
                                                    }}>
                                                        <img src="./images/amazon.png" alt="" />
                                                    </button>
                                                    <button className='p-0' onClick={() => {
                                                        setAppName("Flipkart Online Shopping App");
                                                        setAppId("com.flipkart.android");
                                                    }}>
                                                        <img src="./images/flipkart.png" alt="" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-md'>
                                        <button className="btn-primary is-lg" type='submit'>Save & Proceed</button>
                                    </div>
                                    <p className='mb-md text-xs text-slate-400 text-center'>
                                        You also can add apps, games or products from Amazon, Mac App Store, Apple Arcade, Discord, App Gallery and Microsoft Store later.
                                    </p>
                                    <div className='mb-md'>
                                        <button className="is-lg text-blue-500 mx-auto" onClick={() => { setStep(1) }}>
                                            <ChevronLeft size={16} />
                                            Back
                                        </button>
                                    </div>

                                </section>
                            )}
                        </section>
                    </form>
                </div>

            </main>
        </div>
    );
};

export default OrgForm;
