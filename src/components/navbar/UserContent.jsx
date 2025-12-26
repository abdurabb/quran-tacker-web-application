import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function UserContent() {
    return (
        <div className="   ">
            {/*border-2 border-gray-200 border-dashed  rounded-lg */}
            <div className="   dark:border-gray-700 ">
                <Outlet />
            </div>
        </div>
    );
}

export default UserContent;
