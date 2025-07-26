import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function Content() {
    return (
        <div className="pt-8 md:pt-4 mt-4 md:mt-8  sm:ml-64  ">
            {/* border-2 border-gray-200 border-dashed dark:border-gray-700  */}
            <div class=" rounded-lg mt-8">
                <Outlet />
            </div>
        </div>
    );
}

export default Content;
