import Marquee from 'react-fast-marquee'



const MarqueSlider = () => {
    const scrollSpeed = 40;
    return (<div className="max-sm:hidden py-12 bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classift-invert-bg.svg')] bg-cover">
        <h1>Explore Our Dataset</h1>
        <Marquee speed={scrollSpeed} pauseOnClick={true}>
            <div className='flex justify-around w-screen'>
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b1.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b2.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b3.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
            </div >
        </Marquee >
        <Marquee direction='right' speed={scrollSpeed} className='mt-10' pauseOnClick={true}>
            <div className='flex justify-around w-screen'>
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b4.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b5.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b6.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1>Bird</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos vel aliquid accusamus esse modi obcaecati!</p>
                    </div >
                </div >
            </div>
        </Marquee>
    </div >)
}

export default MarqueSlider;