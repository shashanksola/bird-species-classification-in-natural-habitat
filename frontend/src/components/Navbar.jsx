import { Link } from "react-router-dom";
import { useState } from "react";
import SideBarModal from "./SidebarModal";

const pages = ["All", "Nearby", "About", "Find-a-Bird"];

// <div className='header'>
//     <input placeholder="Find your favourite birdie here!" className="search-bar" />
//     <div className="index-items">{pages.map((each) => <Link to={'/' + each} key={each}>{each}</Link>)}</div>
// </div>

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return <>
        <nav className="flex justify-around items-center p-4 dark:bg-slate-800">
            <svg onClick={() => setVisible(true)} className="hidden max-md:block" width="16" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M16 12v3H0v-3h16Zm0-6v3H0V6h16Zm0-6v3H0V0h16Z" fill="#69707D" fillRule="evenodd" /></svg>
            <div className="flex flex-row justify-around w-4/6 items-center">
                <a href="/" className="dark:text-slate-300" style={{ fontFamily: "sans-serif", fontWeight: '700', fontSize: '25px' }}>Birdz</a>
                {pages.map((page) => {
                    return (
                        <Link className="text-gray-400 max-md:hidden" aria-current="page" key={page} to={'/' + page}>{page}</Link>
                    )
                })}
            </div>
            <div className="flex justify-between items-center">
                <input className="rounded-md dark:bg-slate-800 border-slate-400 border py-2 px-4" placeholder="Find you favourite birdie" />
            </div>
        </nav>
        <SideBarModal visible={visible} updateVisible={setVisible} />
    </>
}

export default Navbar;