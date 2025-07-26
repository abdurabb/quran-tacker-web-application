import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function TeacherContent() {
    return (
        <div className="pt-8 md:pt-4 mt-4 md:mt-8  sm:ml-64  ">
            {/* border-2 border-gray-200 border-dashed  */}
            <div class=" rounded-lg dark:border-gray-700 mt-8">
                <Outlet />
            </div>
        </div>
    );
}

export default TeacherContent;
