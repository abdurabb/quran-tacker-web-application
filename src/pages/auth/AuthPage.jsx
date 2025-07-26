import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login';


function AuthPage() {
    const locationPath = useLocation().pathname
    return <div className='flex items-center justify-center text-white h-screen overflow-auto object-contain'
        style={{ backgroundImage: 'url(/authBg.png)' }}
    > <Login /> </div>;
}

export default AuthPage
