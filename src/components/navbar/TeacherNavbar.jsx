import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTeacherSidebar } from "../../redux/rootReducer";
import { useNavigate } from "react-router-dom";


function TeacherNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <>
            <nav className={`fixed top-0 z-50 w-full   bg-white border-b border-gray-200 `}>
                <div className="px-3 py-3 lg:px-5 lg:pl-3 h-14 lg:h-18  flex justify-between ">
                    {/* <Notification /> */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">

                            {/* Toggle Button to Open Side bar */}
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex  items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={() => {
                                    dispatch(toggleTeacherSidebar());
                                }}
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>

                        </div>
                    </div>

                    <div className="flex justify-end  ">
                        {/* Notification and Profile */}
                        <div class="flex items-end ">
                            {/* Icons */}
                            <ul className="flex">
                                <button
                                    onClick={() => {
                                        navigate('/')
                                    }}
                                    className="bg-commonColor text-white px-4 py-2 rounded hover:bg-commonColor/80">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12 11.204 3.5a1.5 1.5 0 0 1 1.592 0L21.75 12M4.5 9.75V19.5A1.5 1.5 0 0 0 6 21h4.5v-4.5A1.5 1.5 0 0 1 12 15h0a1.5 1.5 0 0 1 1.5 1.5V21H18a1.5 1.5 0 0 0 1.5-1.5V9.75"
                                        />
                                    </svg>

                                </button>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
        </>
    );
}

export default TeacherNavbar;

