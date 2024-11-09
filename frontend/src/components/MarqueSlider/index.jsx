import "./styles.css";

const MarqueSlider = () => {
    return <div>
        <div className="wrapper">
            <div className="itemLeft item1 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b1.jpg')] bg-cover bg-center"></div>
            <div className="itemLeft item2 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b2.jpg')] bg-cover bg-center"></div>
            <div className="itemLeft item3 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b3.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="wrapper">
            <div className="itemSlow itemLeft item1 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b4.jpg')] bg-cover bg-center"></div>
            <div className="itemSlow itemLeft item2 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b5.jpg')] bg-cover bg-center"></div>
            <div className="itemSlow itemLeft item3 bg-[url('https://d9gp6f6sved89.cloudfront.net/_website_images/b6.jpg')] bg-cover bg-center"></div>
        </div>
    </div>
}

export default MarqueSlider;