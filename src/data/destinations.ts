import { Destination, CurrencyConfig, Currency } from '../types/trip';
import { INDIA_DESTINATIONS } from './indiaDestinationsData';

export { INDIA_DESTINATIONS };

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rateToUSD: 83.5, label: 'INR (₹)' },
  USD: { code: 'USD', symbol: '$', rateToUSD: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rateToUSD: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rateToUSD: 0.79, label: 'GBP (£)' },
};

export const INTERNATIONAL_DESTINATIONS: Destination[] = [
  {
    id: 'bali-indonesia',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'An enchanting tropical paradise known for emerald rice terraces, cliffside temples, world-class surf, and spiritual wellness retreats.',
    tags: ['Beaches', 'Culture', 'Relaxation', 'Nature'],
    bestSeason: 'April – October (Dry Season)',
    rating: 4.9,
    reviewsCount: 1420,
    costEstimates: {
      flightBaseUSD: 650,
      nightlyLodgingUSD: {
        budget: 25,
        mid: 75,
        luxury: 240,
      },
      dailyFoodUSD: 20,
      dailyActivitiesUSD: 25,
      dailyTransitUSD: 10,
    },
    highlights: [
      'Uluwatu Sunset Temple & Kecak Fire Dance',
      'Tegallalang Terraced Rice Fields in Ubud',
      'Snorkeling with Manta Rays in Nusa Penida',
      'Artisanal beach clubs in Canggu & Seminyak'
    ],
    recommendedDurationDays: { min: 5, max: 14 },
    sampleItinerary: [
      { day: 1, title: 'Arrival & Ubud Cultural Heart', activities: ['Check-in', 'Campuhan Ridge Walk', 'Organic café dinner'] },
      { day: 2, title: 'Temples & Waterfalls', activities: ['Tirta Empul cleansing ritual', 'Tibumana waterfall dip', 'Ubud Royal Palace'] },
      { day: 3, title: 'Cliffs & Sunset Magic', activities: ['Transfer to Uluwatu', 'Padang Padang beach', 'Cliffside seafood banquet at Jimbaran'] }
    ]
  },
  {
    id: 'kyoto-japan',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    description: 'The cultural capital of Japan featuring thousands of classical Buddhist temples, serene zen gardens, bamboo groves, and traditional wooden geisha districts.',
    tags: ['Culture', 'Cuisine', 'City', 'Nature'],
    bestSeason: 'March – May & October – November',
    rating: 4.95,
    reviewsCount: 2150,
    costEstimates: {
      flightBaseUSD: 850,
      nightlyLodgingUSD: {
        budget: 45,
        mid: 140,
        luxury: 380,
      },
      dailyFoodUSD: 45,
      dailyActivitiesUSD: 35,
      dailyTransitUSD: 12,
    },
    highlights: [
      'Fushimi Inari Shrine 10,000 Vermilion Torii Gates',
      'Arashiyama Bamboo Forest & Tenryu-ji Zen Garden',
      'Authentic Kaiseki Multicourse Dinner in Gion',
      'Golden Pavilion (Kinkaku-ji) reflection pond'
    ],
    recommendedDurationDays: { min: 4, max: 10 },
    sampleItinerary: [
      { day: 1, title: 'Ancient Spirits of Fushimi', activities: ['Early morning hike through Torii gates', 'Gion historic district walk', 'Matcha tasting'] },
      { day: 2, title: 'Bamboo & Zen Whispers', activities: ['Arashiyama bamboo path', 'Monkey Park Iwatayama', 'Traditional ryokan bath'] },
      { day: 3, title: 'Gilded Wonders & Markets', activities: ['Kinkaku-ji Golden Pavilion', 'Nishiki Food Market tastings', 'Philosopher’s Path stroll'] }
    ]
  },
  {
    id: 'interlaken-switzerland',
    name: 'Interlaken & Lauterbrunnen',
    country: 'Switzerland',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Heart of the Swiss Alps nestled between turquoise Lake Thun and Lake Brienz, surrounded by 72 roaring waterfalls and dramatic snow-capped peaks.',
    tags: ['Adventure', 'Nature', 'Relaxation'],
    bestSeason: 'June – September (Hiking) or Dec – March (Skiing)',
    rating: 4.88,
    reviewsCount: 980,
    costEstimates: {
      flightBaseUSD: 800,
      nightlyLodgingUSD: {
        budget: 65,
        mid: 190,
        luxury: 450,
      },
      dailyFoodUSD: 60,
      dailyActivitiesUSD: 55,
      dailyTransitUSD: 25,
    },
    highlights: [
      'Jungfraujoch – Top of Europe cogwheel railway',
      'Lauterbrunnen Valley waterfalls & Staubbach Falls',
      'Tandem paragliding over alpine pastures',
      'Lake Brienz panoramic boat cruise'
    ],
    recommendedDurationDays: { min: 4, max: 10 },
    sampleItinerary: [
      { day: 1, title: 'Alpine Gateway & Lakes', activities: ['Arrival in Interlaken', 'Harder Kulm funicular viewpoint', 'Swiss cheese fondue night'] },
      { day: 2, title: 'Valley of 72 Waterfalls', activities: ['Lauterbrunnen valley bike ride', 'Trümmelbach glacial cave falls', 'Mürren car-free village'] },
      { day: 3, title: 'Mountain Peaks Expedition', activities: ['Jungfraujoch summit expedition', 'Ice Palace walk', 'Sunset cruise on Lake Thun'] }
    ]
  },
  {
    id: 'santorini-greece',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic Cycladic white-washed villages cascading down dramatic volcanic caldera cliffs with world-famous Aegean Sea sunsets.',
    tags: ['Beaches', 'Relaxation', 'Culture', 'Cuisine'],
    bestSeason: 'May – October',
    rating: 4.85,
    reviewsCount: 1650,
    costEstimates: {
      flightBaseUSD: 750,
      nightlyLodgingUSD: {
        budget: 50,
        mid: 160,
        luxury: 420,
      },
      dailyFoodUSD: 50,
      dailyActivitiesUSD: 40,
      dailyTransitUSD: 18,
    },
    highlights: [
      'Oia Cliffside Blue Domes & Golden Hour Sunset',
      'Volcanic Red Beach & Perissa Black Sand Beach',
      'Private caldera sailing catamaran cruise with BBQ',
      'Assyrtiko wine tasting at cliffside vineyards'
    ],
    recommendedDurationDays: { min: 3, max: 7 },
    sampleItinerary: [
      { day: 1, title: 'Caldera Vistas & Oia', activities: ['Arrival & settlement in Fira', 'Fira to Oia caldera rim trek', 'Sunset drinks overlooking Aegean'] },
      { day: 2, title: 'Volcanic Seas & Catamaran', activities: ['Caldera hot springs swim', 'Snorkeling at White Beach', 'Onboard Greek feast'] },
      { day: 3, title: 'Wineries & Ancient Ruins', activities: ['Akrotiri prehistoric bronze-age ruins', 'Santo Wines tasting session', 'Red Beach relaxation'] }
    ]
  },
  {
    id: 'cusco-machu-picchu',
    name: 'Cusco & Machu Picchu',
    country: 'Peru',
    region: 'Americas',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    description: 'The ancient capital of the Inca Empire nestled in the Andes mountains, leading to the mist-shrouded wonder of the citadel of Machu Picchu.',
    tags: ['Adventure', 'Culture', 'Nature'],
    bestSeason: 'May – October (Dry Season)',
    rating: 4.93,
    reviewsCount: 1890,
    costEstimates: {
      flightBaseUSD: 700,
      nightlyLodgingUSD: {
        budget: 28,
        mid: 85,
        luxury: 280,
      },
      dailyFoodUSD: 25,
      dailyActivitiesUSD: 50,
      dailyTransitUSD: 15,
    },
    highlights: [
      'Machu Picchu Citadel sunrise exploration',
      'Sacred Valley Incan terraces of Moray & Maras salt mines',
      'Rainbow Mountain high-altitude trek (5,036m)',
      'Traditional Peruvian culinary tour (Ceviche & Lomo Saltado)'
    ],
    recommendedDurationDays: { min: 5, max: 12 },
    sampleItinerary: [
      { day: 1, title: 'Imperial Capital Acclimatization', activities: ['Cusco Plaza de Armas walk', 'San Pedro local market', 'Coca tea & acclimatization'] },
      { day: 2, title: 'The Sacred Valley', activities: ['Pisac market & fortress', 'Ollantaytambo living Incan town', 'Scenic Vistadome train to Aguas Calientes'] },
      { day: 3, title: 'Machu Picchu Majesty', activities: ['Early morning bus to citadel', 'Guided lost city tour', 'Climb Huayna Picchu or Sun Gate'] }
    ]
  },
  {
    id: 'banff-canada',
    name: 'Banff National Park',
    country: 'Canada',
    region: 'Americas',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Jaw-dropping turquoise glacial lakes, soaring jagged peaks of the Canadian Rockies, wildlife safaris, and pristine alpine wilderness.',
    tags: ['Nature', 'Adventure', 'Relaxation'],
    bestSeason: 'June – September (Hiking) or Dec – April (Skiing)',
    rating: 4.91,
    reviewsCount: 1310,
    costEstimates: {
      flightBaseUSD: 450,
      nightlyLodgingUSD: {
        budget: 55,
        mid: 175,
        luxury: 390,
      },
      dailyFoodUSD: 45,
      dailyActivitiesUSD: 35,
      dailyTransitUSD: 20,
    },
    highlights: [
      'Canoeing on iridescent turquoise Lake Louise',
      'Moraine Lake & the Valley of the Ten Peaks',
      'Icefields Parkway scenic drive & Columbia Glacier walk',
      'Banff Upper Hot Springs thermal soak'
    ],
    recommendedDurationDays: { min: 4, max: 10 },
    sampleItinerary: [
      { day: 1, title: 'Alpine Gateway & Lake Louise', activities: ['Drive through Bow Valley', 'Canoe rental on Lake Louise', 'Tea House alpine hike'] },
      { day: 2, title: 'Moraine Lake & Ten Peaks', activities: ['Sunrise at Moraine Lake Rockpile', 'Consolation Lakes trail', 'Banff town evening exploration'] },
      { day: 3, title: 'Icefields & Hot Springs', activities: ['Icefields Parkway excursion', 'Athabasca Glacier adventure', 'Soak in Banff Upper Hot Springs'] }
    ]
  },
  {
    id: 'cape-town-south-africa',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    imageUrl: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
    description: 'A dazzling convergence of Atlantic and Indian oceans with dramatic flat-topped Table Mountain, wine estates, penguin beaches, and cosmopolitan energy.',
    tags: ['Adventure', 'Nature', 'Cuisine', 'City', 'Beaches'],
    bestSeason: 'November – April (Summer)',
    rating: 4.87,
    reviewsCount: 1120,
    costEstimates: {
      flightBaseUSD: 900,
      nightlyLodgingUSD: {
        budget: 30,
        mid: 95,
        luxury: 260,
      },
      dailyFoodUSD: 30,
      dailyActivitiesUSD: 30,
      dailyTransitUSD: 14,
    },
    highlights: [
      'Table Mountain Aerial Cableway & Lion’s Head hike',
      'Boulders Beach African Penguin Colony',
      'Cape Point & Cape of Good Hope rugged coastal drive',
      'Stellenbosch & Franschhoek world-class wine tram tour'
    ],
    recommendedDurationDays: { min: 5, max: 14 },
    sampleItinerary: [
      { day: 1, title: 'Iconic Peaks & City Center', activities: ['Table Mountain cable car summit', 'Bo-Kaap colorful neighborhood', 'V&A Waterfront dinner'] },
      { day: 2, title: 'Cape Peninsula Coastal Loop', activities: ['Chapman’s Peak scenic drive', 'Boulders Beach penguins', 'Cape of Good Hope nature reserve'] },
      { day: 3, title: 'Winelands & Culinary Bliss', activities: ['Franschhoek Wine Tram tour', 'Gourmet cellar door lunch', 'Kirstenbosch Botanical Gardens'] }
    ]
  },
  {
    id: 'barcelona-spain',
    name: 'Barcelona',
    country: 'Spain',
    region: 'Europe',
    imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80',
    description: 'Gaudí’s surreal architectural masterpieces, sun-drenched Mediterranean beaches, vibrant tapas culture, and labyrinthine Gothic alleys.',
    tags: ['Culture', 'City', 'Cuisine', 'Beaches'],
    bestSeason: 'May – June & September – October',
    rating: 4.89,
    reviewsCount: 2400,
    costEstimates: {
      flightBaseUSD: 650,
      nightlyLodgingUSD: {
        budget: 40,
        mid: 130,
        luxury: 320,
      },
      dailyFoodUSD: 40,
      dailyActivitiesUSD: 30,
      dailyTransitUSD: 8,
    },
    highlights: [
      'Basílica de la Sagrada Família & Park Güell',
      'Gothic Quarter tapas bar crawl & flamenco show',
      'Barceloneta beach promenade & fresh paella',
      'Mercat de la Boqueria fresh food market'
    ],
    recommendedDurationDays: { min: 3, max: 8 },
    sampleItinerary: [
      { day: 1, title: 'Gaudí’s Modernist Wonders', activities: ['Sagrada Família audio tour', 'Passeig de Gràcia Casa Batlló', 'Tapas on Plaça Reial'] },
      { day: 2, title: 'Colors of Park Güell & Gothic Vibes', activities: ['Park Güell morning stroll', 'Gothic Quarter alleyways', 'Picasso Museum'] },
      { day: 3, title: 'Mediterranean Coast & Sunset', activities: ['Mercat de la Boqueria tasting', 'Barceloneta beach relaxation', 'Sunset catamaran cruise'] }
    ]
  },
  {
    id: 'queenstown-new-zealand',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    description: 'The world’s adventure capital framed by Lake Wakatipu and the dramatic Remarkables mountain range, with fjord expeditions close by.',
    tags: ['Adventure', 'Nature', 'Relaxation'],
    bestSeason: 'December – February (Summer) or July – August (Snow)',
    rating: 4.94,
    reviewsCount: 880,
    costEstimates: {
      flightBaseUSD: 1100,
      nightlyLodgingUSD: {
        budget: 45,
        mid: 150,
        luxury: 360,
      },
      dailyFoodUSD: 50,
      dailyActivitiesUSD: 70,
      dailyTransitUSD: 16,
    },
    highlights: [
      'Milford Sound Fjord day cruise with waterfalls & dolphins',
      'Shotover Jet Boat canyon thrill ride',
      'Skyline Gondola & Luge overlooking Lake Wakatipu',
      'Central Otago Pinot Noir boutique winery tasting'
    ],
    recommendedDurationDays: { min: 5, max: 14 },
    sampleItinerary: [
      { day: 1, title: 'Lakeside Welcome & Thrills', activities: ['Arrival & lakeside walk', 'Shotover Canyon jet boat', 'Famous Fergburger dinner'] },
      { day: 2, title: 'Eighth Wonder: Milford Sound', activities: ['Scenic alpine drive through Homer Tunnel', 'Milford Sound cruise', 'Stargazing in Queenstown'] },
      { day: 3, title: 'Skyline & Onsen Serenity', activities: ['Skyline Gondola & luge runs', 'Onsen Hot Pools cedar tub soak', 'Winery tour in Gibbston Valley'] }
    ]
  },
  {
    id: 'rajasthan-india',
    name: 'Jaipur & Udaipur',
    country: 'India',
    region: 'Asia',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'Royal palaces, glowing pink sandstone fortresses, tranquil desert lakes, vibrant artisanal bazaars, and legendary Rajasthani hospitality.',
    tags: ['Culture', 'Cuisine', 'City', 'Relaxation'],
    bestSeason: 'October – March (Pleasant Winter)',
    rating: 4.9,
    reviewsCount: 1780,
    costEstimates: {
      flightBaseUSD: 550,
      nightlyLodgingUSD: {
        budget: 20,
        mid: 60,
        luxury: 220,
      },
      dailyFoodUSD: 15,
      dailyActivitiesUSD: 20,
      dailyTransitUSD: 8,
    },
    highlights: [
      'Amber Fort elephant pathways and Sheesh Mahal mirror palace',
      'Hawa Mahal (Palace of Winds) honeycomb facade',
      'Lake Pichola sunset boat ride past Lake Palace Udaipur',
      'Traditional Rajasthani thali dining with folk musicians'
    ],
    recommendedDurationDays: { min: 4, max: 10 },
    sampleItinerary: [
      { day: 1, title: 'The Pink City Splendor', activities: ['Hawa Mahal morning photos', 'City Palace museum tour', 'Johari Bazaar gem shopping'] },
      { day: 2, title: 'Mighty Fortresses', activities: ['Amber Fort climb', 'Nahargarh Fort sunset view over Jaipur', 'Chokhi Dhani cultural village'] },
      { day: 3, title: 'Romantic City of Lakes', activities: ['Transfer to Udaipur', 'Udaipur City Palace complex', 'Sunset boat cruise on Lake Pichola'] }
    ]
  }
];

export const SAMPLE_DESTINATIONS: Destination[] = [
  ...INTERNATIONAL_DESTINATIONS,
  ...INDIA_DESTINATIONS,
];
