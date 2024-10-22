import { Link } from "react-router-dom";
import { useState } from "react";
import SideBarModal from "./SidebarModal";

const pages = ["Find-a-Bird", "Classify-Bird", "About"];

// <div className='header'>
//     <input placeholder="Find your favourite birdie here!" className="search-bar" />
//     <div className="index-items">{pages.map((each) => <Link to={'/' + each} key={each}>{each}</Link>)}</div>
// </div>

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <nav className="fixed top-0 left-0 flex justify-around items-center p-4 bg-trasparent backdrop-blur-3xl w-screen z-30">
            <svg onClick={() => setVisible(true)} className="hidden max-md:block" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#fff" fillRule="evenodd" /></svg>
            <div className="flex flex-row justify-around w-4/6 items-center">
                <Link to="/" className="text-slate-200 text-4xl flex items-center" style={{ fontFamily: "sans-serif", fontWeight: '700' }}>
                    <i className="max-md:hidden">Birdz</i>
                    <img src="https://d9gp6f6sved89.cloudfront.net/_website_images/logo.png" alt="Birdz" width={'100px'} />

                </Link>
                {pages.map((page) => {
                    return (
                        <Link className="text-slate-300 max-md:hidden font-semibold" aria-current="page" key={page} to={'/' + page}>{page}</Link>
                    )
                })}
            </div>
            <div className="flex justify-between items-center">
                <input className="rounded-md bg-transparent border-slate-100 border py-2 px-4 text-slate-100 max-md:w-40" placeholder="Find you favourite birdie" />
            </div>
        </nav>
        <SideBarModal visible={visible} updateVisible={setVisible} />
    </>
}

export default Navbar;