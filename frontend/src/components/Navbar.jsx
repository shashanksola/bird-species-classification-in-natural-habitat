import { Link } from "react-router-dom";
import { useState } from "react";
import SideBarModal from "./SidebarModal";

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
    const [visible, setVisible] = useState(false);

    return <>
        <nav className="fixed top-0 left-0 flex justify-around items-center p-4 bg-transparent backdrop-blur-3xl w-screen z-30" id="nav">
            <svg onClick={() => setVisible(true)} className="hidden max-md:block" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#000" fillRule="evenodd" /></svg>
            <div className="flex flex-row justify-around w-screen items-center text-white font-semibold text-xl">
                <a onClick={() => scrollToTop()} className="text-4xl flex items-center" style={{ fontFamily: "sans-serif", fontWeight: '700' }}>
                    <i className="max-md:hidden">Birdz</i>
                    <img src="https://d9gp6f6sved89.cloudfront.net/_website_images/logo.png" alt="Birdz" width={'100px'} />
                </a>
                <a onClick={() => scrollToFindABird()}>Find A Bird</a>
                <a onClick={() => scrollToFindABird()}>Classify a Bird</a>
                <a onClick={() => scrollToBottom()}>About</a>
            </div>
        </nav>
        <SideBarModal visible={visible} updateVisible={setVisible} />
    </>
}

export default Navbar;