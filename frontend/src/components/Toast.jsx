/* eslint-disable react/prop-types */
const bird_info = {
    "Ashy crowned sparrow lark": {
        "habitat": "Grasslands and open fields",
        "distribution": "South Asia",
        "food": "Seeds and insects",
        "conservation_status": "Least Concern",
        "fun_fact": "Known for its melodious song during the breeding season.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ashy-crowned_Sparrow_Lark_%28Eremopterix_griseus%29_at_Talegaon_MH_28.JPG/800px-Ashy-crowned_Sparrow_Lark_%28Eremopterix_griseus%29_at_Talegaon_MH_28.JPG",
        "wiki_link": "https://en.wikipedia.org/wiki/Ashy-crowned_sparrow_lark"
    },
    "Asian Openbill": {
        "habitat": "Wetlands and marshes",
        "distribution": "South and Southeast Asia",
        "food": "Mainly snails",
        "conservation_status": "Least Concern",
        "fun_fact": "Has a distinctive gap in its bill, adapted for eating snails.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Asian_Openbill_Anastomus_oscitans.jpg/800px-Asian_Openbill_Anastomus_oscitans.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Asian_openbill"
    },
    "Black-headed ibis": {
        "habitat": "Wetlands and agricultural areas",
        "distribution": "South Asia",
        "food": "Insects, frogs, and fish",
        "conservation_status": "Near Threatened",
        "fun_fact": "Often seen wading in shallow water, probing for food.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Threskiornis_melanocephalus_Kolkata_2011-06-19_002.jpg/800px-Threskiornis_melanocephalus_Kolkata_2011-06-19_002.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Black-headed_ibis"
    },
    "Crow": {
        "habitat": "Varied, including urban areas",
        "distribution": "Widespread",
        "food": "Omnivorous",
        "conservation_status": "Least Concern",
        "fun_fact": "Highly intelligent birds, known for their problem-solving abilities.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Corvus_splendens_Bangalore.jpg/800px-Corvus_splendens_Bangalore.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Crow"
    },
    "Eurasian Coot": {
        "habitat": "Lakes and ponds",
        "distribution": "Europe, Asia, Africa, Australia",
        "food": "Aquatic plants and small animals",
        "conservation_status": "Least Concern",
        "fun_fact": "Known for its distinctive white forehead shield.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Fulica_atra_atra_eating_algae.jpg/800px-Fulica_atra_atra_eating_algae.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Eurasian_coot"
    },
    "Indian Roller": {
        "habitat": "Open grasslands and scrublands",
        "distribution": "South Asia",
        "food": "Insects and small vertebrates",
        "conservation_status": "Least Concern",
        "fun_fact": "Famous for its vibrant blue plumage and acrobatic aerial displays.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Indian_Roller_%28Coracias_benghalensis%29.jpg/800px-Indian_Roller_%28Coracias_benghalensis%29.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Indian_roller"
    },
    "Large-billed Crow": {
        "habitat": "Forests, cultivation, and urban areas",
        "distribution": "Asia",
        "food": "Omnivorous",
        "conservation_status": "Least Concern",
        "fun_fact": "Adaptable and resourceful, often seen scavenging for food.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Corvus_macrorhynchos_050820-002.JPG/800px-Corvus_macrorhynchos_050820-002.JPG",
        "wiki_link": "https://en.wikipedia.org/wiki/Large-billed_crow"
    },
    "Little Cormorant": {
        "habitat": "Wetlands, lakes, and rivers",
        "distribution": "South Asia",
        "food": "Fish",
        "conservation_status": "Least Concern",
        "fun_fact": "Often seen drying its wings after diving for fish.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/LittleCormorant.jpg/800px-LittleCormorant.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Little_cormorant"
    },
    "Paddyfield pipit": {
        "habitat": "Open grasslands and agricultural fields",
        "distribution": "South Asia",
        "food": "Insects and seeds",
        "conservation_status": "Least Concern",
        "fun_fact": "Known for its upright stance and wagging tail.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Paddyfield_Pipit_Anthus_rufulus.jpg/800px-Paddyfield_Pipit_Anthus_rufulus.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Paddyfield_pipit"
    },
    "Painted Stork": {
        "habitat": "Wetlands and rivers",
        "distribution": "Parts of Asia",
        "food": "Fish, frogs, and snakes",
        "conservation_status": "Near Threatened",
        "fun_fact": "Named for their pinkish plumage.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Painted_Stork_Ranganthittu_CD.jpg/800px-Painted_Stork_Ranganthittu_CD.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Painted_stork"
    },
    "Red-wattled lapwing": {
        "habitat": "Wetlands, fields, and grasslands",
        "distribution": "South Asia",
        "food": "Insects and other invertebrates",
        "conservation_status": "Least Concern",
        "fun_fact": "Known for its loud, distinctive call and red facial wattles.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Red-wattled_Lapwing_at_Sultanpur_National_Park.jpg/800px-Red-wattled_Lapwing_at_Sultanpur_National_Park.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Red-wattled_lapwing"
    },
    "Spot-billed Pelican": {
        "habitat": "Large water bodies",
        "distribution": "Southern Asia",
        "food": "Fish",
        "conservation_status": "Near Threatened",
        "fun_fact": "Has a large pouch on its bill for catching fish.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Spot-billed_Pelican_Pelecanus_philippensis.jpg/800px-Spot-billed_Pelican_Pelecanus_philippensis.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Spot-billed_pelican"
    },
    "White-breasted Waterhen": {
        "habitat": "Marshes, ponds, and streams",
        "distribution": "South and Southeast Asia",
        "food": "Insects, seeds, and aquatic plants",
        "conservation_status": "Least Concern",
        "fun_fact": "Often seen walking on floating vegetation.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/White-breasted_Waterhen_RJP.jpg/800px-White-breasted_Waterhen_RJP.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/White-breasted_waterhen"
    },
    "Yellow wattled lapwing": {
        "habitat": "Dry grasslands and open fields",
        "distribution": "India",
        "food": "Insects and small invertebrates",
        "conservation_status": "Least Concern",
        "fun_fact": "Characterized by its bright yellow wattles and loud calls.",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Yellow-wattled_Lapwing.jpg/800px-Yellow-wattled_Lapwing.jpg",
        "wiki_link": "https://en.wikipedia.org/wiki/Yellow-wattled_lapwing"
    },
};

const Toast = ({ bird, onClose }) => {
    // To handle case sensitivity and different formatting of the bird name
    // We'll try to find the best match in our bird_info object
    const findBirdData = (birdName) => {
        if (!birdName) return null;
        
        // First try direct match
        if (bird_info[birdName]) {
            return bird_info[birdName];
        }
        
        // Try case-insensitive match
        const birdNameLower = birdName.toLowerCase();
        const keys = Object.keys(bird_info);
        
        const match = keys.find(key => key.toLowerCase() === birdNameLower);
        if (match) {
            return bird_info[match];
        }
        
        // Try partial match (if the input is part of a bird name)
        const partialMatch = keys.find(key => 
            key.toLowerCase().includes(birdNameLower) || 
            birdNameLower.includes(key.toLowerCase())
        );
        if (partialMatch) {
            return bird_info[partialMatch];
        }
        
        return null;
    };
    
    const birdData = findBirdData(bird);
    
    if (!birdData) return null;
    
    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden transition-all duration-300 transform translate-y-0 opacity-100">
            <div className="relative">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                
                {/* Image header */}
                <div className="h-40 w-full bg-gray-700">
                    <img 
                        src={birdData.image_url} 
                        alt={bird} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=Bird+Image';
                        }}
                    />
                </div>
                
                {/* Content */}
                <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2">{bird}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-300">
                        <p className="flex items-start">
                            <span className="font-medium text-gray-200 mr-2">Habitat:</span>
                            <span>{birdData.habitat}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-medium text-gray-200 mr-2">Distribution:</span>
                            <span>{birdData.distribution}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-medium text-gray-200 mr-2">Food:</span>
                            <span>{birdData.food}</span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-medium text-gray-200 mr-2">Status:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                birdData.conservation_status === 'Least Concern' 
                                    ? 'bg-green-900 text-green-200' 
                                    : 'bg-yellow-900 text-yellow-200'
                            }`}>
                                {birdData.conservation_status}
                            </span>
                        </p>
                        <p className="flex items-start">
                            <span className="font-medium text-gray-200 mr-2">Fun fact:</span>
                            <span>{birdData.fun_fact}</span>
                        </p>
                    </div>
                    
                    <div className="mt-4">
                        <a 
                            href={birdData.wiki_link}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Toast;