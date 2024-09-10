import { Link } from "react-router-dom";

const pages = ["All", "Nearby", "Following", "Favourites"];

const Header = () => {
    return (
        <div className='header'>
            <input placeholder="Find your favourite birdie here!" className="search-bar" />
            <div className="index-items">{pages.map((each) => <Link to={'/' + each} key={each}>{each}</Link>)}</div>
        </div>
    )
}

export default Header;