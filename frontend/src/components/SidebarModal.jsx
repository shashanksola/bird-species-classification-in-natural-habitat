import { Link } from "react-router-dom";

const pages = ["All", "Nearby", "About", "Find-a-Bird"];

const SideBarModal = ({ visible, updateVisible }) => {
    if (!visible) return null;

    return <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm overscroll-none z-40">
        <div className="bg-transparent w-3/4 h-full p-8">
            <svg onClick={() => { updateVisible(false) }} className="mb-4 fill-slate-100" width="14" height="15" xmlns="http://www.w3.org/2000/svg"><path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fillRule="evenodd" onClick={() => updateModalStatus(false)} /></svg>
            {pages.map((page) => {
                return (
                    <div key={page}>
                        <Link className="text-xl mb-4 text-slate-300" aria-current="page" to={'/' + page}>{page}</Link>
                        <br></br>
                    </div>
                )
            })}
        </div>
    </div>
}

export default SideBarModal;