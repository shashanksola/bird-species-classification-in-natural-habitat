const pages = ["All", "Nearby", "Following", "Favourites"];

const Header = () => {
    return (
        <div className='header'>
            <input placeholder="Search" className="search-bar" />
            <div className="index-items">{pages.map((each) => <a href={each} key={each}>{each}</a>)}</div>
        </div>
    )
}

export default Header;