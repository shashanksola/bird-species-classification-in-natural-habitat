import Navbar from "./Navbar";
import Footer from "./Footer";

import MarqueSlider from "./MarqueSlider";
import BirdAction from "./BirdAction";

const birds = [
    {
        birdName: "Indian Peafowl",
        birdOriginArea: "Indian Subcontinent",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Peacock_Phumdi_Keibul.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Indian_peafowl",
        birdShortDescription: "The Indian Peafowl is known for its colorful and iridescent feathers, especially the elaborate tail used in courtship displays."
    },
    {
        birdName: "Sarus Crane",
        birdOriginArea: "Northern India, Southeast Asia, Australia",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Sarus_Crane_pair.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Sarus_crane",
        birdShortDescription: "The Sarus Crane is the tallest flying bird and is symbolic of eternal life and marital fidelity in Indian culture."
    },
    {
        birdName: "Greater Flamingo",
        birdOriginArea: "Africa, Southern Europe, Indian Subcontinent",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Greater_flamingo_in_flight_-_Wakodahatchee.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Greater_flamingo",
        birdShortDescription: "These graceful, pink-hued birds are commonly found in Indian wetlands during the winter migration period."
    },
    {
        birdName: "Amur Falcon",
        birdOriginArea: "Siberia, China, and Eastern Asia",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Amur_Falcon_Male_at_Lower_Dibang_Valley%2C_Arunachal_Pradesh.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Amur_falcon",
        birdShortDescription: "A long-distance migratory raptor that travels from Siberia to Africa, making a stopover in India."
    },
    {
        birdName: "Black-necked Stork",
        birdOriginArea: "Indian Subcontinent, Southeast Asia, Australia",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Black-necked_Stork_%28Ephippiorhynchus_asiaticus%29_Photograph_By_Shantanu_Kuveskar.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Black-necked_stork",
        birdShortDescription: "This large stork, known for its contrasting black-and-white plumage, is commonly found in India's marshes."
    },
    {
        birdName: "Pied Avocet",
        birdOriginArea: "Europe, Asia, Africa",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/25/Pied_avocet_in_flight.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Pied_avocet",
        birdShortDescription: "A wader bird with a distinct upturned bill, the Pied Avocet frequents coastal regions and is seen in Indian wetlands during the winter."
    },
    {
        birdName: "Himalayan Monal",
        birdOriginArea: "Himalayas, India, Nepal, Bhutan",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Himalayan_Monal_by_Dr._Raju_Kasambe_DSCN1257_%28cropped%29.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Himalayan_monal",
        birdShortDescription: "The Himalayan Monal is a brightly colored pheasant commonly seen in the forests of the Indian Himalayas."
    },
    {
        birdName: "Bar-headed Goose",
        birdOriginArea: "Central Asia",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Bar-headed_goose_in_flight.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Bar-headed_goose",
        birdShortDescription: "Known for its high-altitude flights over the Himalayas, the Bar-headed Goose is a common winter migrant to Indian wetlands."
    },
    {
        birdName: "Common Kingfisher",
        birdOriginArea: "Europe, Asia, North Africa",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Common_Kingfisher.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Common_kingfisher",
        birdShortDescription: "A small, brightly colored bird, often seen near rivers and lakes in India, where it hunts for fish."
    },
    {
        birdName: "Painted Stork",
        birdOriginArea: "Indian Subcontinent, Southeast Asia",
        birdImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Mycteria_leucocephala_-_Keoladeo_National_Park_-_Dr._Rajesh_Ganesan_-_Painted_Stork_3.jpg",
        birdWikipediaPageUrl: "https://en.wikipedia.org/wiki/Painted_stork",
        birdShortDescription: "A large wading bird with distinct pink feathers, commonly seen in the wetlands of India."
    }
];

const birdImages = [
    {
        src: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-2',
    },
    {
        src: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-1',
    },
    {
        src: 'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800&auto=format&fit=crop&q=60',
        span: 'col-span-1',
    },
]

const scrollToFindABird = () => {
    document.getElementById("process").scrollIntoView({ behavior: 'smooth' })
}

const Home = () => {

    return (
        <>
            <div className="bg-beige">
                <Navbar />
                <section className="max-md:h-[60vh] h-dvh bg-cover bg-center flex flex-col p-40 max-md:p-8 bg-[url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/layered-steps-haikei.svg')]" style={{ marginTop: '-10px' }}>
                    <h1 className="text-nowrap max-md:mt-20 text-6xl md:text-9xl font-sans font-extrabold text-white animate-slidein600">Find Your <br></br> <i className="text-white">Bird</i></h1>
                    <button onClick={scrollToFindABird} className="animate-slidein900 max-md:w-1/2 mt-8 border p-4 border-white hover:bg-white hover:text-slate-900 rounded-md bg-transparent text-slate-50 w-1/4 hover:shadow-2xl transition delay-200 font-bold drop-shadow-sm">Validate & Classify</button>
                </section >

                <MarqueSlider />

                <BirdAction />
                <Footer />
            </div >
        </>
    )
}

export default Home;