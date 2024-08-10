import { Button, Avatar, Menu, MenuButton, MenuList, MenuItem, Tag, TagLabel, IconButton } from '@chakra-ui/react'
import { Icon, InputGroup, InputLeftElement, Input, Checkbox } from '@chakra-ui/react'
import { MdEmojiEvents, MdFileDownload, MdSearch, MdOutlineNotifications, MdExpandMore, MdTune, MdMoreHoriz, MdMoreVert, MdClose, MdAdd, MdStar, MdEmail, MdQuestionAnswer, MdCalendarMonth, MdFolder, MdPublic } from 'react-icons/md'
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';
import { useMsal } from "@azure/msal-react";
import api from "../../services/api";

function ReviewsFeed() {

    const Mdbuttons = () => {
        // document.getElementById('Mdbuttonswrap').style.height = 'auto';

        var mbtns = document.getElementById('Mdbuttonswrap');
        if (mbtns.style.height == 0 || mbtns.style.height == "0px") {
            mbtns.style.height = "auto";
        } else {
            mbtns.style.height = 0;
        }
    }

    const Mdbuttonshide = () => {
        document.getElementById('Mdbuttonswrap').style.height = '0';
    }

    const filterReplybtnsShow = () => {
        // document.getElementById('filter-replybtns').style.height = 'auto';
        var fbtns = document.getElementById('filter-replybtns');
        if (fbtns.style.height == 0 || fbtns.style.height == "0px") {
            fbtns.style.height = "auto";
        } else {
            fbtns.style.height = 0;
        }
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState()
    const [reviews, setReviews] = useState([])

    const [reply, setReply] = useState();
    const [reviewID, setReviewID] = useState("");
    const [hist, setHist] = useState([]);
    const [load, setLoad] = useState(false);
    const [repl1, setReply1] = useState();
    const [replyLoad, setReplyLoad] = useState(false);

    const { instance } = useMsal();

    const generateProfileName = (name) => {
        const parts = name.split(' ');
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }

    // Generate profile abbreviation
    const profileName = generateProfileName(localStorage.getItem("name"));
    // const profileName = generateProfileName("Ravi Vaka")

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
        navigate("/login")
    }

    const Appdata = async () => {
        try {
            setLoad(true);
            let res = await api({
                url: "/appdata",
                method: "POST",
                responseType: "json",
            });
            if (res?.status === "SUCCESS") {
                if (res?.code === 200) {
                    // console.log(res);
                    setdata(res.data.appData);
                    setReviews(res.data.reviews.data);
                    setHist(res.data.appData.histogram);
                    setLoad(false);
                }
            } else {
                if (res?.data?.code === 400) {
                    alert(res?.data?.message);
                }
            }
        } catch (error) {
            if (error?.response?.status === 401) navigate("/");
        }
    };

    useEffect(() => {
        // console.log(localStorage.getItem("token"));
        if (
            localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== undefined
        ) {
            Appdata();
        } else {
            navigate("/login");
        }
    }, []);

    const formattedreviews = (number) => {
        return new Intl.NumberFormat("en-US", {
            notation: "compact",
            compactDisplay: "short",
        }).format(number);
    };

    const generateReply = async (item) => {
        setReply("");
        setReplyLoad(true);
        try {
            let res = await api({
                url: "/appdata/reply",
                method: "POST",
                responseType: "json",
                data: {
                    userName: item.userName,
                    review: item.text,
                },
            });
            if (res.status === "SUCCESS") {
                if (res.code === 200) {
                    setReviewID(item.id);
                    setReply(res.data);
                    setReplyLoad(false);
                }
            } else {
                if (res?.code === 400) {
                    alert(res?.message);
                }
            }
        } catch (error) {
            if (error?.response?.status === 401) navigate("/");
        }
    };

    const [appName, setAppName] = useState("");
    const [data1, setData1] = useState("");
    const [appId, setAppId] = useState("");

    const searchApp = async (appname) => {
        if (appname.length > 3) {
            try {
                let res = await api({
                    url: "/search_app",
                    method: "POST",
                    responseType: "json",
                    data: {
                        appname,
                    },
                });
                if (res?.code === 200) {
                    setData1(res.data);
                }
            } catch (error) {
                if (error.response.status === 401) navigate("/");
            }
        }
        if (appname.length < 4) {
            setData1("");
        }
    };
    const [typingIndex, setTypingIndex] = useState(0);
    const startTypingAnimation = () => {
        const typingInterval = setInterval(() => {
            setTypingIndex((prevIndex) => prevIndex + 1);
        }, 90);
        setTimeout(() => {
            clearInterval(typingInterval);
        }, reply.length * 100);
        setTypingIndex(0);
    };

    useEffect(() => {
        if (reply) {
            startTypingAnimation();
        }
    }, [reply]);

    const navmenu = () => {
        document.getElementById('dashboard-sidebar').style.left = 0;
        document.getElementById('menu-overlay').style.display = 'block';
        document.getElementById('menu-close').style.display = 'block';
    }


    return (
        <>
            <main className=''>
                <header className="flex items-center gap-sm lg:gap-base border-b border-slate-200 h-16 px-4 md:px-md mb-base">
                    <img src="./images/menu-icon.png" alt="" class="lg:hidden mnav w-4 md:w-6 cursor-pointer" onClick={navmenu} />
                    <div className="w-[180px] md:w-[300px] lg:w-[500px] mr-auto">
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <Icon as={MdSearch} />
                            </InputLeftElement>
                            <Input type='search' placeholder='Search here' />
                        </InputGroup>
                    </div>
                    <Icon as={MdOutlineNotifications} boxSize={5} />
                    <aside className="flex items-center gap-xs mheadericons">
                        <Avatar size="sm" name='Ravi Vaka' src='https://bit.ly/dan-abramov' />
                        <Menu>
                            <MenuButton as={Button} rightIcon={<Icon as={MdExpandMore} />} size="sm" variant="ghost">
                                {localStorage.getItem("name")}
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Download</MenuItem>
                                <MenuItem onClick={() => { LogOut() }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                        <div class="relative z-10 lg:hidden shrink-0">
                            <span className="cursor-pointer"><img src="./images/dots.png" alt="" className="w-1" onClick={Mdbuttons} /></span>
                            <div id="Mdbuttonswrap" className="rounded shadow-md bg-white absolute top-[100%] right-[-10px] overflow-hidden h-0 transition-all duration-1000">
                                <div className="p-1.5 flex flex-col">
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdEmail} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdQuestionAnswer} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdCalendarMonth} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdFolder} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdPublic} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdAdd} />} />
                                    <IconButton colorScheme='gray' variant="ghost" size="md" icon={<Icon as={MdEmail} />} />
                                </div>
                            </div>
                        </div>
                    </aside>
                </header>
                <header className='flex flex-wrap justify-between items-center pb-md px-3 md:px-md' onClick={Mdbuttonshide}>
                    <h2>Reviews feed</h2>
                    <aside className='flex gap-base'>
                        <Button leftIcon={<Icon as={MdEmojiEvents} />} colorScheme='blue' variant='ghost' size="sm">
                            Advanced tools
                        </Button>
                        <Button leftIcon={<Icon as={MdFileDownload} />} colorScheme='blue' size="sm">
                            Export Report
                        </Button>
                    </aside>
                </header>
                <section className='flex flex-wrap gap-md mb-md px-3 md:px-md' onClick={Mdbuttonshide}>
                    <div className='bg-stone-100 p-base flex items-start gap-base w-full lg:w-auto'>
                        <aside>
                            <img src={data?.icon} alt="" className='h-8 w-8' />
                        </aside>
                        <div>
                            <h6>{data?.title}</h6>
                            <p>{data?.summary}</p>
                            <div>
                                <strong>{data?.score?.toFixed(2)} &nbsp;</strong>
                                <span>{formattedreviews(data?.ratings)} reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-stone-100 p-base w-full md:w-auto'>
                        <h6>Total Reviews</h6>
                        <p className="text-xs text-stone-500 mb-xs">Including Positive & Negative</p>
                        <div className='flex gap-sm items-center'>
                            <span className="h4">12k</span>
                            <Tag colorScheme='green'>+50%</Tag>
                        </div>
                    </div>
                    <div className='bg-stone-100 p-base w-full md:w-auto'>
                        <h6>Average Rating</h6>
                        <div className='flex gap-sm items-center mt-xs'>
                            <span className="h4">3.9</span>
                            <Tag colorScheme='green'>+8.2k</Tag>
                        </div>
                    </div>
                </section>

                <section className='flex justify-between mb-md px-3 md:px-md items-end sm:items-center' onClick={Mdbuttonshide}>
                    <div className='flex flex-wrap sm:flex-nowrap justify-between items-center'>
                        <h6 className='mr-md w-full sm:w-auto'>All Reviews (20)</h6>
                        <div className="flex gap-0.5 sm:gap-xs items-center"><span>Sort by :</span>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<Icon as={MdExpandMore} />} colorScheme="blue" size="sm" variant="ghost">
                                    Newest first
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Download</MenuItem>
                                    <MenuItem>Create a Copy</MenuItem>
                                </MenuList>
                            </Menu></div>
                    </div>
                    <aside className='flex gap-0.5 sm:gap-base filter-buttons justify-end md:justify-normal relative'>
                        <Button colorScheme='blue' variant="ghost" leftIcon={<Icon as={MdTune} />} size="sm">New filter</Button>
                        <Button className="more-btn" colorScheme='blue' size="sm">Reply all</Button>
                        <Button className="more-btn" colorScheme='blue' variant="outline" size="sm">Generate AI replies</Button>
                        <Button className="more-btn" colorScheme='grey' variant="outline" size="sm">Add tag</Button>
                        <IconButton className="filterReplybtns-desk" colorScheme='blue' variant="outline" size="sm" aria-label='Search database' icon={<Icon as={MdMoreHoriz} />} />
                        <IconButton className="filterReplybtns-mbl" colorScheme='blue' variant="outline" size="sm" aria-label='Search database' icon={<Icon as={MdMoreHoriz} />} onClick={filterReplybtnsShow} />
                        <div id="filter-replybtns" className='absolute top-[100%] right-0 bg-white rounded shadow-md h-0 overflow-hidden transition-all duration-500'>
                            <div className='p-3 flex flex-col items-center gap-3'><Button colorScheme='blue' size="sm">Reply all</Button>
                                <Button colorScheme='blue' variant="outline" size="sm">Generate AI replies</Button>
                                <Button colorScheme='grey' variant="outline" size="sm">Add tag</Button></div>
                        </div>
                    </aside>
                </section>

                <section className='grid grid-cols-2 w-full px-3 md:px-md' onClick={Mdbuttonshide}>
                    <div className='col-span-2'>
                        <div className='flex gap-xs flex-col'>
                            <div>
                                <Checkbox defaultChecked></Checkbox>
                            </div>
                            {reviews?.map((item, index) => {
                                return (
                                    <div className='flex flex-wrap w-full' key={index}>
                                        <div className='border-amber-600 border-l-2 px-sm py-1 xl:flex-1 w-full xl:w-auto'>
                                            <header className='flex flex-wrap gap-base items-center mb-sm'>
                                                <div className="flex gap-1 items-center">
                                                    {Array.from({ length: item.score }, (_, index) => (
                                                        <Icon key={index} colorScheme='yellow' size="sm" as={MdStar} />
                                                    ))}
                                                    <span>{item.userName}</span>
                                                </div>
                                                <span>{item.date}</span>
                                                <div className='flex gap-xs items-center'>
                                                    <span>App version:</span>
                                                    <span>{item.version}</span>
                                                </div>
                                            </header>
                                            <div className="mb-sm">
                                                <p>{item.text}</p>
                                            </div>
                                        </div>
                                        <div className='space-y-sm lg:flex-1 w-full xl:w-auto mb-5 xl:mb-0'>
                                            <div className='bg-teal-50 p-sm flex gap-1'>
                                                {reply ? (
                                                    <div className='flex-1'>
                                                        <textarea name="" id="" className='w-full resize-none' value={
                                                            item?.id === reviewID ? reply.slice(0, typingIndex) : ""
                                                        }
                                                            onChange={(e) => setReply1(e.target.value)}></textarea>
                                                        <div className='flex justify-between'>
                                                            <span className='text-xs text-violet-600'>*AI generated reply</span>
                                                            <Button colorScheme='blue' size="xs">Send Reply</Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className='flex-1'>
                                                        <textarea name="" id="" className='w-full resize-none'></textarea>
                                                        <div className='flex justify-between'>
                                                            <Menu>
                                                                <Button colorScheme="blue" size="xs" onClick={() => {
                                                                    generateReply(item);
                                                                }} disabled={replyLoad}>
                                                                    Generate AI Reply
                                                                </Button>
                                                            </Menu>
                                                            <Button colorScheme='blue' size="xs">Send Reply</Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>


            </main>
        </>
    )
}
export default ReviewsFeed;