import Marquee from 'react-fast-marquee'



const MarqueSlider = () => {
    const scrollSpeed = 40;
    return (<div className="max-sm:hidden py-12 bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classift-invert-bg.svg')] bg-cover">
        <h1 className="text-xl font-bold mb-2">Explore Our Dataset</h1>
        <Marquee speed={scrollSpeed} pauseOnClick={true}>
            <div className='flex justify-around w-screen'>
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b1.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    <div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Little Cormorant</h1>
                        <p>A small cormorant with a distinctive white throat patch. It is a skilled diver and fisher, often seen diving for fish in shallow water.</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b2.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    <div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Spot-billed Pelican</h1>
                        <p>A large waterbird with a distinctive yellow-orange bill and a large pouch. It is a skilled fisher that often hunts in groups, using its pouch to scoop up fish.</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b3.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Asian Openbill</h1>
                        <p>A large stork with a unique, open-billed appearance. It has a specialized diet of snails and mollusks. Its distinctive bill helps it to extract prey from shells.</p>
                    </div >
                </div >
            </div >
        </Marquee >
        <Marquee direction='right' speed={scrollSpeed} className='mt-10' pauseOnClick={true}>
            <div className='flex justify-around w-screen'>
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b4.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Yellow Wattled Lapwing</h1>
                        <p>A large, noisy wading bird with a distinctive yellow wattle on its head. It is often seen foraging in flocks, and it is known for its aggressive territorial behavior.</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b5.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Ashy Crowned Sparrow Lark</h1>
                        <p>A small, ground-dwelling bird with a distinctive ash-grey crown. Known for its melodious song and characteristic flight pattern. It is often found in open, arid regions.</p>
                    </div >
                </div >
                <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b6.jpg')] bg-cover text-white rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px]" >
                    < div className='group-hover:backdrop-blur-md p-4 rounded-xl opacity-0 group-hover:opacity-100' >
                        <h1 className="text-xl font-bold mb-2">Paddyfield Pipit</h1>
                        <p>A small, brown bird often found in agricultural fields. It is a ground-dwelling bird that feeds on insects and seeds, often foraging in flocks.</p>
                    </div >
                </div >
            </div>
        </Marquee>
    </div >)
}

export default MarqueSlider;