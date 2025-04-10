import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";

const scrollToTop = () => {
    document.getElementById("nav").scrollIntoView({ behavior: 'smooth' })
}

const scrollToFindABird = () => {
    document.getElementById("process").scrollIntoView({ behavior: 'smooth' })
}

const scrollToBottom = () => {
    document.getElementById("footer").scrollIntoView({ behavior: 'smooth' });
}

const Navbar = () => {
    const { t } = useTranslation();
    
    return (
        <nav className="fixed top-0 left-0 flex justify-around items-center p-4 bg-transparent backdrop-blur-3xl w-screen z-30 animate-slidein300" id="nav">
            <div className="flex flex-row justify-around w-screen items-center text-white font-semibold text-xl">
                <Link to="/" className="text-4xl flex items-center hover:cursor-pointer" style={{ fontFamily: "sans-serif", fontWeight: '700' }}>
                    <i className="max-md:hidden">Birdz</i>
                  {/* //<img src="https://d9gp6f6sved89.cloudfront.net/_website_images/logo.png" alt="" width={'100px'} /> */}
                </Link>
                
                <a onClick={() => scrollToFindABird()} className="hover:cursor-pointer">
                    {t('navbar.findABird')}
                </a>
                
                <a onClick={() => scrollToFindABird()} className="hover:cursor-pointer">
                    {t('navbar.classifyABird')}
                </a>
                
                <Link to="/location" className="hover:cursor-pointer">
                    {t('navbar.birdzNearYou')}
                </Link>
                
                <LanguageSwitcher />
                
                <a onClick={() => scrollToBottom()} className="hover:cursor-pointer">
                    {t('navbar.aboutUs')}
                </a>
            </div>
        </nav>
    )
}

export default Navbar;