import "./styles.css";

const MarqueSlider = () => {
    return <>
        <div className="wrapper">
            <div className="itemLeft item1 bg-[url('/src/assets/b1.jpg')] bg-cover bg-center"></div>
            <div className="itemLeft item2 bg-[url('/src/assets/b2.jpg')] bg-cover bg-center"></div>
            <div className="itemLeft item3 bg-[url('/src/assets/b3.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="wrapper">
            <div className="itemSlow itemLeft item1 bg-[url('/src/assets/b4.jpg')] bg-cover bg-center"></div>
            <div className="itemSlow itemLeft item2 bg-[url('/src/assets/b5.jpg')] bg-cover bg-center"></div>
            <div className="itemSlow itemLeft item3 bg-[url('/src/assets/b6.jpg')] bg-cover bg-center"></div>
        </div>
    </>
}

export default MarqueSlider;