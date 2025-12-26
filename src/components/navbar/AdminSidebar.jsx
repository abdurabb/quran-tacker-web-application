import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import ConfirmationModal from "../../components/confirmationModal/ConfirmationModal";
import { toggleSidebar } from "../../redux/rootReducer";


function AdminSideBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isLogOut, setIsLogOut] = useState(false);

    const handleClose = () => {
        setIsLogOut(false);
    }

    const confirmation = () => {
        localStorage.clear();
        navigate("/");
        setIsLogOut(false);
    }

    const toggleSidebarState = useSelector((state) => state.root.toggleSidebar);

    const handleChange = (path) => {
        navigate(path)
        dispatch(toggleSidebar());
    }



    return (
        <aside
            id="logo-sidebar"
            className={`fixed  top-0 left-0 z-30  w-64 h-screen pt-20 transition-transform 
             ${toggleSidebarState ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 bg-white border-r border-gray-200   `} // Use hidden and sm:block to control visibility
            aria-label="Sidebar"
        >
            <Modal
                open={isLogOut}
                onClose={() => setIsLogOut(false)}
                className="flex items-center justify-center p-4 outline-none"
            >
                <ConfirmationModal setClose={handleClose} message={'Do You Want Logout'} confirmFunction={confirmation} type={'logout'} />
            </Modal>


            <div
                className="h-full relative  pb-4 overflow-y-auto "
                style={{ scrollbarWidth: "none" }}
            >


                <ul class="space-y-3 font-medium p-5">
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/admin-home" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/admin-home')
                            }}
                        >
                            <div className="flex items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path d="M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.70914 2.5 10.5 4.29086 10.5 6.5C10.5 8.70914 8.70914 10.5 6.5 10.5C4.29086 10.5 2.5 8.70914 2.5 6.5Z" stroke={window.location.pathname === "/admin-home" ? "white" : "black"} />
                                        <path d="M13.5 17.5C13.5 15.2909 15.2909 13.5 17.5 13.5C19.7091 13.5 21.5 15.2909 21.5 17.5C21.5 19.7091 19.7091 21.5 17.5 21.5C15.2909 21.5 13.5 19.7091 13.5 17.5Z" stroke={window.location.pathname === "/admin-home" ? "white" : "black"} />
                                        <path d="M21.5 6.5C21.5 4.61438 21.5 3.67157 20.9142 3.08579C20.3284 2.5 19.3856 2.5 17.5 2.5C15.6144 2.5 14.6716 2.5 14.0858 3.08579C13.5 3.67157 13.5 4.61438 13.5 6.5C13.5 8.38562 13.5 9.32843 14.0858 9.91421C14.6716 10.5 15.6144 10.5 17.5 10.5C19.3856 10.5 20.3284 10.5 20.9142 9.91421C21.5 9.32843 21.5 8.38562 21.5 6.5Z" stroke={window.location.pathname === "/admin-home" ? "white" : "black"} />
                                        <path d="M10.5 17.5C10.5 15.6144 10.5 14.6716 9.91421 14.0858C9.32843 13.5 8.38562 13.5 6.5 13.5C4.61438 13.5 3.67157 13.5 3.08579 14.0858C2.5 14.6716 2.5 15.6144 2.5 17.5C2.5 19.3856 2.5 20.3284 3.08579 20.9142C3.67157 21.5 4.61438 21.5 6.5 21.5C8.38562 21.5 9.32843 21.5 9.91421 20.9142C10.5 20.3284 10.5 19.3856 10.5 17.5Z" stroke={window.location.pathname === "/admin-home" ? "white" : "black"} />
                                    </g>
                                </svg>

                                <span className={`${window.location.pathname === "/admin-home" ? "text-white" : "text-black"} font-thin ms-7`}>Dashboard</span>
                            </div>
                        </a>
                    </li>

                    {/* classes */}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/class" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/class')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke={window.location.pathname === "/class" ? "white" : "black"}
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0l3-3m-3 3l-3-3m9 7.5v.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25v-.75M12 3.75a8.25 8.25 0 018.25 8.25v3.75a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 15.75V12a8.25 8.25 0 017.5-8.25z"
                                    />
                                </svg>
                                <span className={`font-thin ms-7 ${window.location.pathname === "/class" ? "text-white" : "text-black"}`}>Class</span>
                            </div>
                        </a>
                    </li>

                    {/* teachers */}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/teachers" || window.location.pathname === "/teacher-details" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/teachers')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={window.location.pathname === "/teachers" || window.location.pathname === "/teacher-details" ? "white" : "black"}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6 text-black"
                                >
                                    <path d="M4 4h16v12H4z" />
                                    <path d="M16 16l3 5" />
                                    <circle cx="12" cy="18" r="1" />
                                    <circle cx="8" cy="18" r="1" />
                                    <circle cx="16" cy="18" r="1" />
                                </svg>

                                <span className={`font-thin ms-7 ${window.location.pathname === "/teachers" || window.location.pathname === "/teacher-details" ? "text-white" : "text-black"} `}>Teachers</span>
                            </div>
                        </a>
                    </li>

                    {/* students */}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/students" || window.location.pathname === "/student-details" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/students')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke={window.location.pathname === "/students" || window.location.pathname === "/student-details" ? "white" : "black"}
                                    className="w-6 h-6 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 14c2.5 0 4.5-2 4.5-4.5S14.5 5 12 5s-4.5 2-4.5 4.5S9.5 14 12 14z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 20c0-2.21 3.134-4 7-4s7 1.79 7 4"
                                    />
                                </svg>

                                <span className={`font-thin ms-7 ${window.location.pathname === "/students" || window.location.pathname === "/student-details" ? "text-white" : "text-black"} `}>Students</span>
                            </div>
                        </a>
                    </li>

                    {/* lessons and mark */}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/lessons-mark" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/lessons-mark')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={window.location.pathname === "/lessons-mark" ? "white" : "black"}
                                    className="w-6 h-6 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 8h12M6 16h12"
                                    />
                                </svg>


                                <span className={`font-thin ms-7 ${window.location.pathname === "/lessons-mark" ? "text-white" : "text-black"} `}>Lessons And Mark</span>
                            </div>
                        </a>
                    </li>

                    {/* daily-reports */}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/daily-reports" || window.location.pathname === "/report-details" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/daily-reports')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={window.location.pathname === "/daily-reports" || window.location.pathname === "/report-details" ? "white" : "black"}
                                    className="w-6 h-6 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 2v2m12-2v2M3.5 9.5h17M4 7h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 13l2 2l4-4"
                                    />
                                </svg>


                                <span className={`font-thin ms-7 ${window.location.pathname === "/daily-reports" || window.location.pathname === "/report-details" ? "text-white" : "text-black"} `}>Daily Reports</span>
                            </div>
                        </a>
                    </li>



                    {/* Attendance*/}
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/attendance" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/attendance')
                            }}
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke={window.location.pathname === "/attendance" ? "white" : "black"}
                                    className="w-6 h-6 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 2.25h6M9 2.25A2.25 2.25 0 006.75 4.5v1.125M15 2.25a2.25 2.25 0 012.25 2.25v1.125M6.75 5.625h10.5M18.75 9.75v9a2.25 2.25 0 01-2.25 2.25H7.5A2.25 2.25 0 015.25 18.75v-9"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 13.5l1.5 1.5L15 10.5"
                                    />
                                </svg>
                                <span className={`font-thin ms-7 ${window.location.pathname === "/attendance" ? "text-white" : "text-black"} `}>Attendance</span>
                            </div>
                        </a>
                    </li>




                    {/* Logout button */}
                    <li
                        className=" flex hover:cursor-pointer"
                        onClick={() => {
                            setIsLogOut(true);
                        }}
                    >
                        <a className="text-red-700 font-bold text-center mb-5 w-full">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default AdminSideBar;
