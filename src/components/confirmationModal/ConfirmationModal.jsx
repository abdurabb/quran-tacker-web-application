import React from 'react'
import { useNavigate } from 'react-router-dom';

const icons = {
    delete: (
        <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="51.5" cy="51.5" r="51.5" fill="#EF5F5F" fill-opacity="0.1" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M47.9142 28.4375H56.086C56.609 28.4372 57.0646 28.4369 57.4948 28.5056C59.1944 28.777 60.6652 29.8371 61.4602 31.3637C61.6614 31.7501 61.8052 32.1824 61.9702 32.6786L62.2399 33.488C62.2856 33.6249 62.2987 33.6637 62.3097 33.6943C62.733 34.8642 63.8302 35.6551 65.0739 35.6866C65.1066 35.6875 65.1467 35.6876 65.2918 35.6876H72.5418C73.5428 35.6876 74.3543 36.4991 74.3543 37.5001C74.3543 38.5011 73.5428 39.3126 72.5418 39.3126H31.4583C30.4572 39.3126 29.6458 38.5011 29.6458 37.5001C29.6458 36.4991 30.4572 35.6876 31.4583 35.6876H38.7085C38.8536 35.6876 38.8936 35.6875 38.9263 35.6866C40.1701 35.6551 41.2673 34.8643 41.6905 33.6943C41.7016 33.6636 41.7144 33.6256 41.7603 33.488L42.03 32.6787C42.1951 32.1825 42.3389 31.7501 42.5401 31.3637C43.335 29.8371 44.8058 28.777 46.5054 28.5056C46.9357 28.4369 47.3913 28.4372 47.9142 28.4375ZM44.7696 35.6876C44.8941 35.4435 45.0044 35.1898 45.0993 34.9274C45.1281 34.8477 45.1564 34.7629 45.1927 34.654L45.4339 33.9304C45.6542 33.2694 45.705 33.1346 45.7553 33.038C46.0203 32.5291 46.5105 32.1757 47.0771 32.0853C47.1847 32.0681 47.3286 32.0626 48.0253 32.0626H55.9749C56.6717 32.0626 56.8156 32.0681 56.9232 32.0853C57.4897 32.1757 57.98 32.5291 58.245 33.038C58.2953 33.1346 58.346 33.2694 58.5663 33.9304L58.8074 34.6535L58.9009 34.9275C58.9958 35.1898 59.1061 35.4435 59.2306 35.6876H44.7696Z" fill="#EF5F5F" />
            <path d="M37.2947 43.4212C37.2281 42.4224 36.3645 41.6667 35.3657 41.7333C34.3669 41.7999 33.6112 42.6635 33.6777 43.6623L34.7977 60.4623C35.0044 63.5623 35.1713 66.0663 35.5627 68.0312C35.9697 70.0741 36.6618 71.7804 38.0915 73.1179C39.5212 74.4555 41.2698 75.0326 43.3352 75.3028C45.3218 75.5627 47.8313 75.5626 50.938 75.5626H53.062C56.1688 75.5626 58.6785 75.5627 60.665 75.3028C62.7305 75.0326 64.479 74.4555 65.9087 73.1179C67.3384 71.7804 68.0306 70.0741 68.4375 68.0312C68.829 66.0663 68.9959 63.5623 69.2025 60.4624L70.3225 43.6623C70.3891 42.6635 69.6334 41.7999 68.6346 41.7333C67.6358 41.6667 66.7721 42.4224 66.7055 43.4212L65.594 60.094C65.3768 63.3514 65.2221 65.6178 64.8824 67.323C64.5529 68.9771 64.0929 69.8526 63.4322 70.4708C62.7714 71.089 61.8672 71.4897 60.1949 71.7084C58.4708 71.934 56.1991 71.9376 52.9346 71.9376H51.0656C47.8011 71.9376 45.5294 71.934 43.8054 71.7084C42.133 71.4897 41.2288 71.089 40.5681 70.4708C39.9073 69.8526 39.4473 68.9771 39.1178 67.323C38.7781 65.6178 38.6234 63.3514 38.4062 60.094L37.2947 43.4212Z" fill="#EF5F5F" />
            <path d="M45.7781 47.7799C46.7742 47.6803 47.6624 48.407 47.762 49.4031L48.9703 61.4864C49.0699 62.4825 48.3432 63.3707 47.3472 63.4703C46.3511 63.5699 45.4629 62.8432 45.3633 61.8471L44.155 49.7638C44.0554 48.7677 44.7821 47.8795 45.7781 47.7799Z" fill="#EF5F5F" />
            <path d="M58.2222 47.7799C59.2182 47.8795 59.9449 48.7677 59.8453 49.7638L58.637 61.8471C58.5374 62.8432 57.6492 63.5699 56.6531 63.4703C55.6571 63.3707 54.9304 62.4825 55.03 61.4864L56.2383 49.4031C56.3379 48.407 57.2261 47.6803 58.2222 47.7799Z" fill="#EF5F5F" />
        </svg>
    ),
    logOut: (
        <svg
            width="103"
            height="103"
            viewBox="0 0 103 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="51.5" cy="51.5" r="51.5" fill="#FFDDDD" />
            <path
                d="M52.2344 23.4199V34.9461"
                stroke="#D42B2B"
                strokeWidth="4.32232"
                strokeLinecap="round"
            />
            <path
                d="M42.1493 28.3359C32.8363 32.2707 26.3008 41.49 26.3008 52.2358C26.3008 66.5587 37.9118 78.1697 52.2347 78.1697C66.5576 78.1697 78.1686 66.5587 78.1686 52.2358C78.1686 41.49 71.6331 32.2707 62.3201 28.3359"
                stroke="#D42B2B"
                strokeWidth="4.32232"
                strokeLinecap="round"
            />
        </svg>
    ),
    Approve: (
        <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="51.5" cy="51.5" r="51.5" fill="#4CAF50" fillOpacity="0.1" />
            <path d="M73 38L45 66L30 51" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    Block: (
        <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="51.5" cy="51.5" r="51.5" fill="#FF6B6B" fillOpacity="0.1" />
            <path d="M30 30L73 73" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" />
            <path d="M73 30L30 73" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" />
        </svg>
    ),
    Unblock: (
        <svg width="103" height="103" viewBox="0 0 103 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="51.5" cy="51.5" r="51.5" fill="#FFC107" fillOpacity="0.1" />
            <path d="M30 51.5H73" stroke="#FFC107" strokeWidth="6" strokeLinecap="round" />
        </svg>
    )
};

function ConfirmationModal({ setClose, message, confirmFunction, type }) {
    const navigate = useNavigate()
    return (
        <div className="bg-white w-full max-w-[474px] font-urbanist text-center md:rounded-[30px] rounded-lg">
            <div className="p-6">
                <div className="flex justify-center">
                    {/* icon of the modal */}
                    {type ? icons[type] ? icons[type] : icons['logOut'] : icons['logOut']}
                </div>
                <p className="text-[16px] text-red-400  font-[400] leading-[19.2px] mt-[15px] mb-[21px]">
                    {message ? message : "Are you sure want to logout"}
                </p>
                <div className="flex items-center justify-center gap-[10px]">
                    <button onClick={() => setClose()} className="max-w-[172px] w-full text-[#D42B2B] rounded-md h-[56px] flex items-center justify-center border border-[#D42B2B]">
                        No
                    </button>
                    <button onClick={() => {
                        confirmFunction()
                    }} className="max-w-[172px] w-full text-white h-[56px] rounded-md bg-[#D42B2B] flex items-center justify-center border border-[#D42B2B]">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal
