
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const MarqueSlider = () => {
    const { t } = useTranslation();
    const scrollSpeed = 40;
    
    return (
        <div className="max-md:hidden -mt-52 py-12 bg-gradient-to-b from-blue-50 to-slate-100">
            {/* <h1 className="text-xl font-bold mb-2 text-slate-800 ml-8">{t('marquee.exploreDataset')}</h1> */}
            <Marquee speed={scrollSpeed} pauseOnHover={true}>
                <div className='flex justify-around w-screen'>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b1.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.littleCormorant.name')}</h1>
                            <p className="text-slate-800">{t('birds.littleCormorant.description')}</p>
                        </div>
                    </div>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b2.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.spotbilledPelican.name')}</h1>
                            <p className="text-slate-800">{t('birds.spotbilledPelican.description')}</p>
                        </div>
                    </div>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b3.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.asianOpenbill.name')}</h1>
                            <p className="text-slate-800">{t('birds.asianOpenbill.description')}</p>
                        </div>
                    </div>
                </div>
            </Marquee>
            <Marquee direction='right' speed={scrollSpeed} className='mt-10' pauseOnHover={true}>
                <div className='flex justify-around w-screen'>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b4.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.yellowWattledLapwing.name')}</h1>
                            <p className="text-slate-800">{t('birds.yellowWattledLapwing.description')}</p>
                        </div>
                    </div>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b5.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.ashyCrownedSparrowLark.name')}</h1>
                            <p className="text-slate-800">{t('birds.ashyCrownedSparrowLark.description')}</p>
                        </div>
                    </div>
                    <div className="group bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/b6.jpg')] bg-cover text-slate-800 rounded-xl h-[40vh] w-[30vw] ml-2 max-lg:w-[250px] shadow-md overflow-hidden">
                        <div className='group-hover:backdrop-blur-md group-hover:bg-white/60 p-4 rounded-xl opacity-0 group-hover:opacity-100 h-full transition-all duration-300'>
                            <h1 className="text-xl font-bold mb-2 text-blue-700">{t('birds.paddyfieldPipit.name')}</h1>
                            <p className="text-slate-800">{t('birds.paddyfieldPipit.description')}</p>
                        </div>
                    </div>
                </div>
            </Marquee>
        </div>
    );
};

export default MarqueSlider;