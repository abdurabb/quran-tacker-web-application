import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
// import LogoutModal from "../../components/logoutModal/LogoutModal";
import { toggleTeacherSidebar } from "../../redux/rootReducer";


function TeacherSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isLogOut, setIsLogOut] = useState(false);

    const handleClose = () => {
        setIsLogOut(false);
    }
    const toggleTeacherSidebarState = useSelector((state) => state.root.toggleTeacherSidebar);

    const handleChange = (path) => {
        navigate(path)
        dispatch(toggleTeacherSidebar());
    }

    return (
        <aside
            id="logo-sidebar"
            className={`fixed  top-0 left-0 z-30  w-64 h-screen pt-20 transition-transform 
             ${toggleTeacherSidebar ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 bg-[#EAEAEA]   `} // Use hidden and sm:block to control visibility
            aria-label="Sidebar"
        >
            {/* <Modal
                open={isLogOut}
                onClose={() => setIsLogOut(false)}
                className="flex items-center justify-center p-4 outline-none"
            >
                <LogoutModal setClose={handleClose} />
            </Modal> */}


            <div
                className="h-full relative  pb-4 overflow-y-auto "
                style={{ scrollbarWidth: "none" }}
            >


                <ul class="space-y-3 font-medium p-5">
                    <li>
                        <a
                            href="#"
                            className={`flex text-black items-center relative p-3 rounded-xl group w-full ${window.location.pathname === "/" ? "bg-commonColor" : " "
                                } `}
                            onClick={() => {
                                handleChange('/')
                            }}
                        >
                            <div className="flex items-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.6">
                                        <path d="M2.5 6.5C2.5 4.29086 4.29086 2.5 6.5 2.5C8.70914 2.5 10.5 4.29086 10.5 6.5C10.5 8.70914 8.70914 10.5 6.5 10.5C4.29086 10.5 2.5 8.70914 2.5 6.5Z" stroke="black" />
                                        <path d="M13.5 17.5C13.5 15.2909 15.2909 13.5 17.5 13.5C19.7091 13.5 21.5 15.2909 21.5 17.5C21.5 19.7091 19.7091 21.5 17.5 21.5C15.2909 21.5 13.5 19.7091 13.5 17.5Z" stroke="black" />
                                        <path d="M21.5 6.5C21.5 4.61438 21.5 3.67157 20.9142 3.08579C20.3284 2.5 19.3856 2.5 17.5 2.5C15.6144 2.5 14.6716 2.5 14.0858 3.08579C13.5 3.67157 13.5 4.61438 13.5 6.5C13.5 8.38562 13.5 9.32843 14.0858 9.91421C14.6716 10.5 15.6144 10.5 17.5 10.5C19.3856 10.5 20.3284 10.5 20.9142 9.91421C21.5 9.32843 21.5 8.38562 21.5 6.5Z" stroke="black" />
                                        <path d="M10.5 17.5C10.5 15.6144 10.5 14.6716 9.91421 14.0858C9.32843 13.5 8.38562 13.5 6.5 13.5C4.61438 13.5 3.67157 13.5 3.08579 14.0858C2.5 14.6716 2.5 15.6144 2.5 17.5C2.5 19.3856 2.5 20.3284 3.08579 20.9142C3.67157 21.5 4.61438 21.5 6.5 21.5C8.38562 21.5 9.32843 21.5 9.91421 20.9142C10.5 20.3284 10.5 19.3856 10.5 17.5Z" stroke="black" />
                                    </g>
                                </svg>

                                <span className="font-thin ms-7">Dashboard</span>
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

export default TeacherSidebar;
