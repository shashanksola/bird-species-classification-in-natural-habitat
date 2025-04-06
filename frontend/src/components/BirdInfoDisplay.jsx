import { useState, useEffect } from 'react';

export default function BirdInfoDisplay({ name }) {
  const [birdData, setBirdData] = useState(null);
  
  // Bird information database
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
    }
  };
  useEffect(() => {
    // Get bird data for the provided name
    if (name && bird_info[name]) {
      setBirdData({ name: name, ...bird_info[name] });
    }
  }, [name]);

  if (!name || !bird_info[name]) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
          <div className="text-red-500 text-5xl mb-4">🦅</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Bird Not Found</h3>
          <p className="text-gray-600">We couldn't find information about "{name}". Please check the name and try again.</p>
        </div>
      </div>
    );
  }

  if (!birdData) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-700 font-medium">Loading bird information...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch(status) {
      case "Least Concern":
        return "bg-green-100 text-green-800";
      case "Near Threatened":
        return "bg-yellow-100 text-yellow-800";
      case "Vulnerable":
        return "bg-orange-100 text-orange-800";
      case "Endangered":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 mt-5">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
       
         
        
          <div className="md:w-3/5 p-6 md:p-8">
            <div className="flex justify-between items-start">
            <h1 style={{
  fontSize: '1.875rem',
  fontWeight: 'bold',
  color: '#1f2937',
  marginBottom: '0.5rem'
}} className="md:text-4xl">
  {birdData.name}
</h1>
              <a 
                href={birdData.wiki_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Learn More
              </a>
            </div>
            
            <div className="border-b border-gray-200 my-4"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Habitat
                </h2>
                <p className="text-gray-600 pl-7">{birdData.habitat}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                  </svg>
                  Distribution
                </h2>
                <p className="text-gray-600 pl-7">{birdData.distribution}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Diet
                </h2>
                <p className="text-gray-600 pl-7">{birdData.food}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Conservation Status
                </h2>
                <p className="text-gray-600 pl-7">
                  <span className={`px-2 py-1 rounded-md text-sm ${getStatusColor(birdData.conservation_status)}`}>
                    {birdData.conservation_status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
</svg>
                Fun Fact
              </h2>
              <p className="text-gray-700 pl-7 italic">"{birdData.fun_fact}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}