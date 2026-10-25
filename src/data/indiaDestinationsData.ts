import { Destination } from '../types/trip';

export const INDIA_DESTINATIONS: Destination[] = [
  // ==========================================
  // NORTH INDIA
  // ==========================================
  {
    id: 'rishikesh-uttarakhand',
    name: 'Rishikesh',
    country: 'India',
    state: 'Uttarakhand',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'The world capital of yoga on the sacred banks of the Ganges, famed for river rafting, serene ashrams, suspension bridges, and cliffside cafes.',
    tags: ['Adventure', 'Culture', 'Relaxation', 'Nature'],
    bestSeason: 'September – April (Pleasant weather & clear river)',
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.88,
    reviewsCount: 3200,
    costEstimates: {
      flightBaseUSD: 30, // ~₹2,500 train/bus equivalent
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 70 }, // ₹400 dorm, ₹1,650 mid hotel
      dailyFoodUSD: 5, // ~₹400 per person
      dailyActivitiesUSD: 6, // ~₹500 rafting / pass
      dailyTransitUSD: 2, // ~₹150 shared auto
    },
    recommendedDurationDays: { min: 2, max: 6 },
    isDayTripEligible: true,
    highlights: ['White-water Ganges river rafting (16km/24km)', 'Sunset Triveni Ghat Maha Aarti', 'Beatles Ashram (Chaurasi Kutia) murals', 'Bungee jumping at Mohan Chatti'],
    freeActivities: ['Evening Triveni Ghat Ganga Aarti', 'Walking across Ram Jhula and Lakshman Jhula', 'Dipping at secret Neer Garh stream', 'Morning yoga sessions on the riverbanks'],
    safetyTips: ['Avoid river swimming during monsoon due to strong currents', 'Watch out for monkeys near Jhulas', 'Book licensed rafting operators only'],
    accommodationOptions: [
      { id: 'rsh-1', name: 'Tapovan Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Tapovan', facilities: ['Free WiFi', 'Rooftop Cafe', 'Yoga Mats', 'Lockers'], suitableFor: 'Solo backpackers, students', isSampleEstimate: true },
      { id: 'rsh-2', name: 'Ganga View Travelers Guesthouse', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 850, neighborhood: 'Jonk', facilities: ['Ensuite Bath', 'Balcony', 'Hot Water'], suitableFor: 'Couples, peaceful stays', isSampleEstimate: true },
      { id: 'rsh-3', name: 'Riverside Boutique Retreat', type: 'mid_hotel', roomType: 'private_room', estPriceINRPerPerson: 2200, neighborhood: 'Badrinath Road', facilities: ['Swimming Pool', 'Buffet Breakfast', 'Spa'], suitableFor: 'Comfortable family travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Bridges & Riverbank Serenity', activities: ['Arrive in Tapovan', 'Ram Jhula walk', 'Cafe hopping', 'Triveni Ghat Aarti'] },
      { day: 2, title: 'Adrenaline on the Rapids', activities: ['Shivpuri white-water rafting', 'Neer Garh waterfall hike', 'Organic dinner'] }
    ]
  },
  {
    id: 'haridwar-uttarakhand',
    name: 'Haridwar',
    country: 'India',
    state: 'Uttarakhand',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'One of India’s seven holiest cities where the Ganges exits the Himalayas, famous for the mesmerizing Har Ki Pauri Ganga Aarti.',
    tags: ['Culture', 'Cuisine', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.82,
    reviewsCount: 2450,
    costEstimates: {
      flightBaseUSD: 20, // ~₹1,650 train
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 55 }, // ₹350 dharamshala/dorm
      dailyFoodUSD: 4, // ~₹300
      dailyActivitiesUSD: 2, // ~₹150
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Har Ki Pauri world-famous evening Ganga Aarti', 'Mansa Devi ropeway ride', 'Chandi Devi hilltop temple', 'Ancient Bazaar street sweets'],
    freeActivities: ['Witnessing floating earthen lamps at Har Ki Pauri', 'Temple bell walks along the ghats', 'Exploring Bara Bazaar vintage alleys'],
    safetyTips: ['Keep valuables secure in crowded ghats', 'Be prepared for steep stair climbs to hilltop shrines'],
    accommodationOptions: [
      { id: 'hrd-1', name: 'Ghatside Pilgrims Rest House', type: 'guesthouse', roomType: 'dormitory', estPriceINRPerPerson: 350, neighborhood: 'Har Ki Pauri', facilities: ['Filtered Water', 'Lockers', 'Luggage Hold'], suitableFor: 'Ultra-budget travelers, pilgrims', isSampleEstimate: true },
      { id: 'hrd-2', name: 'Railway Colony Budget Stay', type: 'budget_hotel', roomType: 'private_room', estPriceINRPerPerson: 750, neighborhood: 'Station Road', facilities: ['AC', 'Hot Water', 'Room Service'], suitableFor: 'Budget transit travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Ghats & Divine Lights', activities: ['Morning holy bath', 'Mansa Devi temple ropeway', 'Bara Bazaar kachori tasting', 'Har Ki Pauri Aarti'] }
    ]
  },
  {
    id: 'mussoorie-uttarakhand',
    name: 'Mussoorie',
    country: 'India',
    state: 'Uttarakhand',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
    description: 'The Queen of Hills overlooking the Doon Valley, offering colonial charm, cascading Kempty Falls, pine walks, and stunning Himalayan panoramas.',
    tags: ['Nature', 'Relaxation', 'City'],
    bestSeason: 'March – June & September – November',
    bestMonths: ['March', 'April', 'May', 'June', 'September', 'October', 'November'],
    rating: 4.79,
    reviewsCount: 1980,
    costEstimates: {
      flightBaseUSD: 35,
      nightlyLodgingUSD: { budget: 6, mid: 25, luxury: 80 },
      dailyFoodUSD: 6,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['Mall Road evening stroll & bakeries', 'Gun Hill cable car viewpoint', 'Kempty Falls dip', 'Camel’s Back Road nature walk'],
    freeActivities: ['Sunset at Camel’s Back Road', 'Heritage stroll past colonial libraries and churches', 'Doon valley panoramic night view'],
    safetyTips: ['Weekend traffic jams can occur on hill roads from Dehradun', 'Carry light woollens even in summer evenings'],
    accommodationOptions: [
      { id: 'mus-1', name: 'Hills View Backpacker Dorm', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 550, neighborhood: 'Library Chowk', facilities: ['WiFi', 'Terrace', 'Heaters'], suitableFor: 'Students, young backpackers', isSampleEstimate: true },
      { id: 'mus-2', name: 'Colonial Ridge Homestay', type: 'homestay', roomType: 'private_room', estPriceINRPerPerson: 1100, neighborhood: 'Landour', facilities: ['Home Food', 'Valley View', 'Quiet Garden'], suitableFor: 'Couples, writers, peace seekers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Mist & Mountains', activities: ['Arrival from Dehradun', 'Camel’s Back walk', 'Mall road baked treats', 'Gun Hill sunset'] }
    ]
  },
  {
    id: 'dehradun-uttarakhand',
    name: 'Dehradun',
    country: 'India',
    state: 'Uttarakhand',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    description: 'The scenic capital of Uttarakhand set in the Doon Valley, known for Robber’s Cave, bakeries, premier educational institutes, and gateway to hills.',
    tags: ['City', 'Nature', 'Cuisine'],
    bestSeason: 'Year-round (Best Oct – April)',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.75,
    reviewsCount: 1650,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 60 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Robber’s Cave (Guchhupani) knee-deep water walk', 'Forest Research Institute (FRI) Greco-Roman campus', 'Sahastradhara sulfur springs', 'Famous Doon rusks and bakeries'],
    freeActivities: ['Strolling the massive grounds of FRI', 'Paltan Bazaar spice and tea sampling', 'Tapkeshwar Mahadev river cave'],
    safetyTips: ['Wear slip-resistant footwear at Robber’s Cave'],
    accommodationOptions: [
      { id: 'ddn-1', name: 'Doon Student Hostel', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Rajpur Road', facilities: ['WiFi', 'Study Desk', 'Cafeteria'], suitableFor: 'Students, exam candidates, backpackers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Caves & Colonial Edifices', activities: ['FRI campus tour', 'Robber’s cave trek', 'Rajpur road cafe hopping'] }
    ]
  },
  {
    id: 'mcleod-ganj-dharamshala',
    name: 'McLeod Ganj & Dharamshala',
    country: 'India',
    state: 'Himachal Pradesh',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80',
    description: 'Little Lhasa in the Himalayas, home to the 14th Dalai Lama, Tibetan monasteries, Tibetan momos, and the iconic Triund mountain trek.',
    tags: ['Culture', 'Adventure', 'Cuisine', 'Nature'],
    bestSeason: 'March – June & September – November',
    bestMonths: ['March', 'April', 'May', 'June', 'September', 'October', 'November'],
    rating: 4.91,
    reviewsCount: 2890,
    costEstimates: {
      flightBaseUSD: 35,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 65 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 4,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 3, max: 7 },
    highlights: ['Tsuglagkhang Complex (Dalai Lama Temple)', 'Triund Ridge Trek with Dhauladhar views', 'Bhagsunag Waterfall & Shiva Cafe', 'Dharamshala HPCA International Cricket Stadium'],
    freeActivities: ['Spinning prayer wheels at Dalai Lama Temple', 'Walking meditation in cedar forests of Forsyth Ganj', 'St. John in the Wilderness church'],
    safetyTips: ['Check weather forecast before ascending Triund', 'Carry water and warm layers for ridge winds'],
    accommodationOptions: [
      { id: 'mcl-1', name: 'Bhagsu Backpacker Nest', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Upper Bhagsu', facilities: ['WiFi', 'Community Kitchen', 'Rooftop Cafe'], suitableFor: 'Solo hikers, international backpackers', isSampleEstimate: true },
      { id: 'mcl-2', name: 'Tibetan Heritage Guesthouse', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 900, neighborhood: 'Temple Road', facilities: ['Mountain Balcony', 'Hot Showers', 'Tibetan Tea'], suitableFor: 'Budget travelers, cultural enthusiasts', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Tibetan Peace & Temples', activities: ['Dalai Lama Temple', 'Tibet Museum', 'Bhagsu waterfall hike', 'Momos dinner'] },
      { day: 2, title: 'The Triund Ridge Ascent', activities: ['Triund day trek', '360 degree Dhauladhar snow view', 'Evening mountain tea'] }
    ]
  },
  {
    id: 'manali-himachal',
    name: 'Manali',
    country: 'India',
    state: 'Himachal Pradesh',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    description: 'High-altitude Himalayan valley nestled along the Beas River, renowned for snow sports, pine forests, hot springs, and lively Old Manali cafes.',
    tags: ['Adventure', 'Nature', 'Relaxation'],
    bestSeason: 'October – June (Dec–Feb for snow, March–June for pleasant weather)',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'],
    rating: 4.87,
    reviewsCount: 3800,
    costEstimates: {
      flightBaseUSD: 40,
      nightlyLodgingUSD: { budget: 6, mid: 24, luxury: 85 },
      dailyFoodUSD: 6,
      dailyActivitiesUSD: 7,
      dailyTransitUSD: 2.5,
    },
    recommendedDurationDays: { min: 3, max: 7 },
    highlights: ['Solang Valley paragliding & zorbing', 'Atal Tunnel engineering marvel to Sissu', 'Historic wooden Hadimba Temple in cedar grove', 'Old Manali live music & bohemian cafes'],
    freeActivities: ['Walking through Van Vihar pine sanctuary', 'Exploring stone-and-wood Himachali architecture in Vashisht', 'Dipping feet in Vashisht sulfur hot springs'],
    safetyTips: ['Check road conditions during heavy winter snowstorms', 'Acclimatize before undertaking high-altitude passes'],
    accommodationOptions: [
      { id: 'mnl-1', name: 'Old Manali Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'Old Manali', facilities: ['Free WiFi', 'Cafe & Bonfire', 'Guitar/Books'], suitableFor: 'Students, digital nomads', isSampleEstimate: true },
      { id: 'mnl-2', name: 'Beas Riverside Cottage', type: 'homestay', roomType: 'private_room', estPriceINRPerPerson: 1200, neighborhood: 'Aleo', facilities: ['River View', 'Kitchen Access', 'Heater'], suitableFor: 'Friends, small groups', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Old Manali Vibe', activities: ['Hadimba temple', 'Van Vihar walk', 'Old Manali cafe hopping'] },
      { day: 2, title: 'High Mountain Wonder', activities: ['Atal Tunnel drive to Sissu waterfall', 'Solang Valley adventure sports'] }
    ]
  },
  {
    id: 'kasol-himachal',
    name: 'Kasol & Parvati Valley',
    country: 'India',
    state: 'Himachal Pradesh',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
    description: 'Charming riverside hamlet in the lush Parvati Valley, beloved by backpackers, trekkers to Kheerganga, and fans of Israeli shakshuka.',
    tags: ['Adventure', 'Nature', 'Relaxation', 'Cuisine'],
    bestSeason: 'March – June & September – November',
    bestMonths: ['March', 'April', 'May', 'June', 'September', 'October', 'November'],
    rating: 4.84,
    reviewsCount: 2150,
    costEstimates: {
      flightBaseUSD: 35,
      nightlyLodgingUSD: { budget: 5, mid: 18, luxury: 55 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    highlights: ['Chalal village riverside pine trail', 'Manikaran Sahib natural hot springs & langar', 'Kheerganga hot spring alpine trek', 'Tosh village mountain vistas'],
    freeActivities: ['Walking along the roaring Parvati River', 'Free holy langar community meal at Manikaran Gurudwara', 'Stargazing in unpolluted mountain air'],
    safetyTips: ['Do not venture close to the raging Parvati river rapids', 'Do not trek after sunset in the valley'],
    accommodationOptions: [
      { id: 'ksl-1', name: 'Parvati Riverfront Dorms', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Kasol Market', facilities: ['River View', 'WiFi', 'Common Lounge'], suitableFor: 'Backpackers, budget trekkers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Pine Whispers & Hot Springs', activities: ['Chalal river bridge walk', 'Israeli cafe lunch', 'Manikaran Gurudwara hot springs'] }
    ]
  },
  {
    id: 'jaipur-rajasthan',
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The Pink City of royalty, featuring monumental amber forts, honeycomb palaces, vibrant bazaars, and mouthwatering Rajasthani cuisine.',
    tags: ['Culture', 'Cuisine', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.9,
    reviewsCount: 4200,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 85 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 4,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['Amber Fort mirror palace (Sheesh Mahal)', 'Hawa Mahal Palace of Winds', 'Nahargarh Fort panoramic city sunset', 'Johari and Bapu Bazaars shopping'],
    freeActivities: ['Photographing Hawa Mahal from street cafes', 'Jal Mahal water palace viewpoint', 'Exploring vibrant walled city pink gates'],
    safetyTips: ['Negotiate auto-rickshaw fares or use app-based cabs', 'Drink bottled/filtered water during street food tours'],
    accommodationOptions: [
      { id: 'jpr-1', name: 'Pink City Heritage Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'MI Road', facilities: ['WiFi', 'Rooftop Fort View', 'AC Dorms'], suitableFor: 'Solo travelers, students', isSampleEstimate: true },
      { id: 'jpr-2', name: 'Haveli Style Traditional Stay', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 1000, neighborhood: 'Bani Park', facilities: ['Courtyard', 'Traditional Breakfast', 'AC'], suitableFor: 'Couples, families', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Forts & Splendor', activities: ['Hawa Mahal morning photos', 'Amber Fort exploration', 'Jal Mahal view', 'Nahargarh sunset'] }
    ]
  },
  {
    id: 'pushkar-rajasthan',
    name: 'Pushkar',
    country: 'India',
    state: 'Rajasthan',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    description: 'A tranquil desert holy town wrapped around a sacred lake with 52 ghats, the rare Lord Brahma Temple, and rooftop falafel cafes.',
    tags: ['Culture', 'Relaxation', 'Cuisine'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.81,
    reviewsCount: 1540,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 16, luxury: 50 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Pushkar Holy Lake 52 ghats', 'Jagatpita Brahma Temple', 'Savitri Temple hilltop sunset hike', 'Desert sunset camel safaris'],
    freeActivities: ['Evening Aarti drums at Varaha Ghat', 'Wandering through bazaars with rose water & incense', 'Savitri temple hilltop climb for desert view'],
    safetyTips: ['Politely decline priests asking for donations on ghats', 'Strict vegetarian and alcohol-free sacred town'],
    accommodationOptions: [
      { id: 'psh-1', name: 'Desert Oasis Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 350, neighborhood: 'Lake Road', facilities: ['Swimming Pool', 'Rooftop Cafe', 'WiFi'], suitableFor: 'Students, backpackers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Ghats & Sunset Dunes', activities: ['Brahma temple visit', 'Ghat walk', 'Savitri temple hike for sunset', 'Falafel dinner'] }
    ]
  },
  {
    id: 'amritsar-punjab',
    name: 'Amritsar',
    country: 'India',
    state: 'Punjab',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80',
    description: 'The spiritual heart of Sikhism, home to the resplendent Golden Temple, the Wagah Border parade, and the rich culinary heritage of Punjab.',
    tags: ['Culture', 'Cuisine', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.96,
    reviewsCount: 4500,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 1.5,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Harmandir Sahib (Golden Temple) glowing at night', 'Wagah Border Beating Retreat ceremony', 'Jallianwala Bagh memorial garden', 'Authentic Amritsari Kulcha with melting butter'],
    freeActivities: ['Visiting Golden Temple & community Langar meal (open to all 24/7)', 'Free voluntary seva at temple kitchen', 'Historic street walks around Heritage Street'],
    safetyTips: ['Cover head with scarf/rumal inside Golden Temple', 'Arrive early for seats at Wagah Border'],
    accommodationOptions: [
      { id: 'asr-1', name: 'Heritage Street Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Golden Temple Road', facilities: ['Free WiFi', 'AC', 'Lockers'], suitableFor: 'Solo travelers, students', isSampleEstimate: true },
      { id: 'asr-2', name: 'Golden View Guesthouse', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 800, neighborhood: 'Town Hall', facilities: ['Ensuite Bath', 'WiFi'], suitableFor: 'Budget families, pairs', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Golden Splendor & Patriotism', activities: ['Morning Golden Temple visit & Langar', 'Jallianwala Bagh', 'Afternoon Wagah Border parade', 'Kulcha dinner'] }
    ]
  },
  {
    id: 'varanasi-uttar-pradesh',
    name: 'Varanasi',
    country: 'India',
    state: 'Uttar Pradesh',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80',
    description: 'The eternal spiritual capital of India on the banks of the sacred Ganges, where centuries of mysticism, classical music, and philosophy collide.',
    tags: ['Culture', 'Cuisine', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.92,
    reviewsCount: 3900,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 65 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Sunrise wooden rowing boat ride across 84 ghats', 'Grand evening Ganga Aarti at Dashashwamedh Ghat', 'Kashi Vishwanath Corridor temple', 'Sarnath deer park where Buddha taught'],
    freeActivities: ['Watching evening Ganga Aarti from ghat steps', 'Labyrinth street walk through old Vishwanath Gali', 'Exploring Assi Ghat morning music & yoga'],
    safetyTips: ['Watch your footing on slippery ghat steps', 'Negotiate sunrise boat prices beforehand'],
    accommodationOptions: [
      { id: 'vns-1', name: 'Assi Ghat Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Assi Ghat', facilities: ['Rooftop Ganga View', 'WiFi', 'Cafe'], suitableFor: 'Backpackers, artists, students', isSampleEstimate: true },
      { id: 'vns-2', name: 'Old City Riverside Stay', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 850, neighborhood: 'Kedar Ghat', facilities: ['Ganga View', 'Hot Water'], suitableFor: 'Budget travelers, cultural enthusiasts', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Sacred Waters & Alleys', activities: ['Sunrise boat ride', 'Kashi Vishwanath temple', 'Banarasi chaat tasting', 'Dashashwamedh Aarti'] }
    ]
  },
  {
    id: 'agra-uttar-pradesh',
    name: 'Agra',
    country: 'India',
    state: 'Uttar Pradesh',
    region: 'North India',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Home to the magnificent marble Taj Mahal, a world wonder on the Yamuna river, flanked by imposing Mughal forts and historic gardens.',
    tags: ['Culture', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.89,
    reviewsCount: 5100,
    costEstimates: {
      flightBaseUSD: 15, // ~₹1,200 fast Vande Bharat train from Delhi
      nightlyLodgingUSD: { budget: 4, mid: 20, luxury: 75 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 6, // Monument entry
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 2 },
    isDayTripEligible: true,
    highlights: ['Taj Mahal sunrise view', 'Agra Fort red sandstone palace', 'Mehtab Bagh moonlit sunset across Yamuna', 'Famous Agra Petha sweet tasting'],
    freeActivities: ['Viewing Taj Mahal from across the Yamuna riverbank', 'Strolling Sadar Bazaar night stalls'],
    safetyTips: ['Taj Mahal is closed on Fridays', 'Book ASI monument tickets online in advance to skip queues'],
    accommodationOptions: [
      { id: 'agr-1', name: 'Taj View Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Taj East Gate Road', facilities: ['Rooftop Taj View', 'AC', 'WiFi'], suitableFor: 'Students, international backpackers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Monument to Love', activities: ['Early Taj Mahal sunrise tour', 'Breakfast & petha tasting', 'Agra Fort tour', 'Mehtab Bagh sunset'] }
    ]
  },

  // ==========================================
  // SOUTH INDIA
  // ==========================================
  {
    id: 'hampi-karnataka',
    name: 'Hampi',
    country: 'India',
    state: 'Karnataka',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443b7e7?auto=format&fit=crop&w=1200&q=80',
    description: 'Surreal boulder-strewn landscape and UNESCO World Heritage ruins of the Vijayanagara Empire, with coracle boat rides and boulder sunsets.',
    tags: ['Culture', 'Adventure', 'Nature', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.95,
    reviewsCount: 3100,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 16, luxury: 55 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    highlights: ['Virupaksha Temple ancient active shrine', 'Stone Chariot at Vittala Temple complex', 'Matanga Hill 360-degree sunrise viewpoint', 'Sanapur Lake cliff jumps & coracle rides'],
    freeActivities: ['Climbing Matanga Hill for sunrise over ruins', 'Cycling through banana plantations and stone monoliths', 'Sunset at Hemakuta Hill temples'],
    safetyTips: ['Rent a bicycle or moped for easy exploration of sprawling ruins', 'Carry sun protection and plenty of water'],
    accommodationOptions: [
      { id: 'hmp-1', name: 'Boulders Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Hampi Bazaar', facilities: ['WiFi', 'Bicycle Rental', 'Roof Cafe'], suitableFor: 'Backpackers, students, climbers', isSampleEstimate: true },
      { id: 'hmp-2', name: 'Sanapur Lake Homestay', type: 'homestay', roomType: 'private_room', estPriceINRPerPerson: 900, neighborhood: 'Sanapur', facilities: ['Paddy View', 'Hammocks', 'Home Cooked Meals'], suitableFor: 'Relaxation seekers, couples', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Sacred Temples & River', activities: ['Virupaksha temple', 'Vittala stone chariot', 'Coracle ride', 'Hemakuta sunset'] },
      { day: 2, title: 'Boulders & Hills', activities: ['Matanga hill sunrise', 'Sanapur lake exploration', 'Anjaneya hill sunset'] }
    ]
  },
  {
    id: 'mysuru-karnataka',
    name: 'Mysuru',
    country: 'India',
    state: 'Karnataka',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1580835845971-a393b73bf370?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Palaces celebrated for illuminated royal palaces, rich sandalwood scents, silk sarees, and mouthwatering Mysore Pak.',
    tags: ['Culture', 'Cuisine', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.86,
    reviewsCount: 2600,
    costEstimates: {
      flightBaseUSD: 15, // ~₹600 local train/bus from Bengaluru
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Mysore Palace grand illumination (Sundays & holidays)', 'Chamundi Hill temple & Nandi monolith', 'Devaraja Market vibrant flower & spice stalls', 'Authentic Mylari Mysore Masala Dosa'],
    freeActivities: ['Witnessing palace exterior illumination from public lawns', 'Strolling through fragrance-filled Devaraja Market', 'Panoramic view from Chamundi Hill'],
    safetyTips: ['Palace illumination is on Sunday evenings and during Dasara only'],
    accommodationOptions: [
      { id: 'mys-1', name: 'Palace View Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Agrahara', facilities: ['WiFi', 'Common Area', 'Lockers'], suitableFor: 'Students, budget travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Royal Splendor', activities: ['Mysore Palace interior', 'Devaraja market', 'Chamundi hill', 'Palace illumination'] }
    ]
  },
  {
    id: 'coorg-karnataka',
    name: 'Coorg (Kodagu)',
    country: 'India',
    state: 'Karnataka',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    description: 'The Scotland of India draped in misty coffee plantations, spice estates, roaring Abbey Falls, and rich Kodava warrior culture.',
    tags: ['Nature', 'Relaxation', 'Adventure'],
    bestSeason: 'October – April',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.83,
    reviewsCount: 2400,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Abbey Falls and Iruppu Falls in deep woods', 'Dubare Elephant Camp river interactions', 'Raja’s Seat scenic sunset viewpoint', 'Coffee and spice plantation tours'],
    freeActivities: ['Walking through country coffee estate roads', 'Sunset views from Raja’s Seat public park', 'Visiting Namdroling Golden Temple in Bylakuppe'],
    safetyTips: ['Leaches can be present on jungle trails during monsoon; wear tall socks'],
    accommodationOptions: [
      { id: 'crg-1', name: 'Coffee Country Homestay', type: 'homestay', roomType: 'dormitory', estPriceINRPerPerson: 550, neighborhood: 'Madikeri', facilities: ['Estate Walk', 'Traditional Food', 'WiFi'], suitableFor: 'Backpackers, groups', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Coffee Aromas & Waterfalls', activities: ['Abbey falls', 'Madikeri fort', 'Plantation tour', 'Raja’s seat sunset'] }
    ]
  },
  {
    id: 'gokarna-karnataka',
    name: 'Gokarna',
    country: 'India',
    state: 'Karnataka',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    description: 'Laidback alternative to Goa where sacred temples meet pristine crescent beaches like Om Beach, Kudle Beach, and cliffside trekking trails.',
    tags: ['Beaches', 'Relaxation', 'Adventure', 'Culture'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.88,
    reviewsCount: 2300,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 18, luxury: 55 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    highlights: ['The 5-Beach Cliff Trek (Kudle to Paradise Beach)', 'Om Beach water sports and rock seating', 'Mahabaleshwar ancient Shiva temple', 'Beach shack fresh seafood & smoothies'],
    freeActivities: ['The famous beach trail hike connecting all 5 beaches', 'Watching bioluminescent waves on moonless nights at Paradise Beach', 'Beach volleyball and sunset watching at Kudle'],
    safetyTips: ['Avoid swimming at Half Moon & Paradise beaches during high swell without lifeguards'],
    accommodationOptions: [
      { id: 'gok-1', name: 'Kudle Beach Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Kudle Beach', facilities: ['Beachfront', 'WiFi', 'Shack Cafe'], suitableFor: 'Solo backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Beach Hopping & Shacks', activities: ['Kudle beach relaxation', '5-beach trail trek to Om & Half Moon beach', 'Sunset shack dinner'] }
    ]
  },
  {
    id: 'bengaluru-karnataka',
    name: 'Bengaluru',
    country: 'India',
    state: 'Karnataka',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'The vibrant Garden City and tech hub of India, renowned for sprawling green parks, craft microbreweries, indie music, and filter coffee.',
    tags: ['City', 'Cuisine', 'Culture'],
    bestSeason: 'Year-round (Pleasant climate)',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.76,
    reviewsCount: 3100,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Cubbon Park and Lalbagh Botanical Gardens', 'Bangalore Palace Tudor-style architecture', 'Indiranagar and Koramangala craft brewery crawl', 'Traditional breakfast at Vidyarthi Bhavan or CTR'],
    freeActivities: ['Morning jogging and pet-watching in Cubbon Park', 'Strolling Church Street bookstores and street art', 'Exploring National Gallery of Modern Art lawns'],
    safetyTips: ['Use Namma Metro to beat peak hour road traffic'],
    accommodationOptions: [
      { id: 'blr-1', name: 'Indiranagar Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'Indiranagar', facilities: ['Coworking', 'High-speed WiFi', 'Cafe'], suitableFor: 'Tech nomads, students, solo travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Parks, Cafes & Brews', activities: ['CTR butter masala dosa', 'Cubbon park stroll', 'Church street book shopping', 'Craft brewery evening'] }
    ]
  },
  {
    id: 'ooty-tamil-nadu',
    name: 'Ooty',
    country: 'India',
    state: 'Tamil Nadu',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Queen of the Nilgiris featuring UNESCO heritage toy train rides, rolling emerald tea estates, colonial bungalows, and homemade chocolates.',
    tags: ['Nature', 'Relaxation', 'Cuisine'],
    bestSeason: 'October – June',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'],
    rating: 4.8,
    reviewsCount: 2200,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 70 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Nilgiri Mountain Railway heritage Toy Train ride', 'Doddabetta Peak highest Nilgiri viewpoint', 'Ooty Lake boating & Botanical Gardens', 'Homemade chocolate and Nilgiri tea factory tour'],
    freeActivities: ['Walking through Government Tea Garden trails', 'Pine Forest nature walk in Wenlock Downs', 'Exploring historic St. Stephen’s Church'],
    safetyTips: ['Book Toy Train tickets well in advance on IRCTC as seats sell out quickly'],
    accommodationOptions: [
      { id: 'oty-1', name: 'Nilgiri Mist Backpacker Dorm', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Charing Cross', facilities: ['Fireplace', 'WiFi', 'Tea Station'], suitableFor: 'Students, young backpackers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Nilgiri Heritage & Tea', activities: ['Toy train ride from Coonoor', 'Tea factory visit', 'Botanical gardens', 'Chocolate tasting'] }
    ]
  },
  {
    id: 'kodaikanal-tamil-nadu',
    name: 'Kodaikanal',
    country: 'India',
    state: 'Tamil Nadu',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'The Princess of Hill Stations centered around a star-shaped lake, shrouded in dense mist, pine forests, and dramatic cliff viewpoints.',
    tags: ['Nature', 'Relaxation', 'Adventure'],
    bestSeason: 'September – May',
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    rating: 4.82,
    reviewsCount: 1950,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 65 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2.5,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Cycling around star-shaped Kodaikanal Lake', 'Coaker’s Walk cliffside panoramic stroll', 'Pillar Rocks 400ft stone pillars in mist', 'Dolphin’s Nose cliff rock trek'],
    freeActivities: ['Walking the misty Coaker’s Walk path', 'Pine Forest photography', 'Lake bank cycling and jogging'],
    safetyTips: ['Wear gripped shoes for the Dolphin’s Nose rocky descent'],
    accommodationOptions: [
      { id: 'kod-1', name: 'Pine Tree Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Lake Road', facilities: ['Heater', 'WiFi', 'Common Balcony'], suitableFor: 'Backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Misty Trails & Lakes', activities: ['Lake cycling', 'Coaker’s walk', 'Pillar rocks', 'Homemade fudge sampling'] }
    ]
  },
  {
    id: 'kochi-kerala',
    name: 'Kochi (Cochin)',
    country: 'India',
    state: 'Kerala',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    description: 'Historic coastal port where Dutch, Portuguese, Jewish, and British heritage blend beside cantilevered Chinese fishing nets and art cafes.',
    tags: ['Culture', 'Cuisine', 'Beaches', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.87,
    reviewsCount: 2800,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Fort Kochi iconic Chinese fishing nets sunset', 'Mattancherry Palace and Jewish Synagogue', 'Kathakali classical dance and Kalaripayattu martial arts show', 'Public ferry cruises on backwaters (₹6 per ride!)'],
    freeActivities: ['Strolling the colonial streets of Princess Street', 'Watching fisherman operate Chinese fishing nets', 'Visiting ancient churchyards including St. Francis Church'],
    safetyTips: ['Use government water ferries across islands for ultra-cheap transit'],
    accommodationOptions: [
      { id: 'koc-1', name: 'Fort Kochi Art Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Fort Kochi', facilities: ['WiFi', 'Air-conditioned Dorms', 'Art Cafe'], suitableFor: 'Solo travelers, art lovers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Colonial Spice Port', activities: ['Jew Town & Synagogue', 'Chinese fishing nets sunset', 'Kathakali performance', 'Seafood dinner'] }
    ]
  },
  {
    id: 'munnar-kerala',
    name: 'Munnar',
    country: 'India',
    state: 'Kerala',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
    description: 'Breathtaking hill resort in the Western Ghats surrounded by undulating tea plantations, mist-covered valleys, and rare Nilgiri Tahr wildlife.',
    tags: ['Nature', 'Relaxation', 'Adventure'],
    bestSeason: 'September – April',
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.9,
    reviewsCount: 3100,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    highlights: ['Eravikulam National Park endangered Nilgiri Tahr spotting', 'Tea Museum and orthodox processing demo', 'Mattupetty Dam boat safari and Echo Point', 'Top Station clouds floating below your feet'],
    freeActivities: ['Hiking through village tea trails in Lockhart Gap', 'Echo Point mountain echoes', 'Visiting spice plantations on walking paths'],
    safetyTips: ['Mountain roads have sharp hairpin bends; motion sickness remedies recommended'],
    accommodationOptions: [
      { id: 'mnr-1', name: 'Tea Valley Backpacker Dorm', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'Old Munnar', facilities: ['Tea Garden View', 'WiFi', 'Hot Showers'], suitableFor: 'Trekkers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Emerald Hills & Tea', activities: ['Eravikulam National Park', 'Tea museum tour', 'Mattupetty dam', 'Chai tasting'] }
    ]
  },
  {
    id: 'pondicherry-tamil-nadu',
    name: 'Pondicherry (Puducherry)',
    country: 'India',
    state: 'Puducherry',
    region: 'South India',
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    description: 'A French Riviera in India featuring vibrant mustard-yellow colonial villas, bougainvillea lanes, Promenade Beach, French croissants, and spiritual Auroville.',
    tags: ['Beaches', 'Culture', 'Cuisine', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.85,
    reviewsCount: 3400,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['White Town cycling through French heritage alleys', 'Promenade Beach evening pedestrian sunset stroll', 'Auroville Matrimandir golden dome of peace', 'French bakeries with fresh baguettes & crepes'],
    freeActivities: ['Evening oceanfront walk on Promenade Beach (no vehicles allowed after 6pm)', 'Visiting Auroville visitor center and gardens', 'Exploring colorful Tamil & French quarter streets on foot'],
    safetyTips: ['Swimming is restricted directly on Promenade rocks; head to Eden or Paradise beach for swimming'],
    accommodationOptions: [
      { id: 'pon-1', name: 'White Town Heritage Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'White Town', facilities: ['Cycle Rental', 'WiFi', 'French Courtyard'], suitableFor: 'Solo backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'French Quarters & Coast', activities: ['Bicycle rental', 'French bakery breakfast', 'White town walk', 'Promenade sunset'] }
    ]
  },

  // ==========================================
  // WEST INDIA
  // ==========================================
  {
    id: 'udaipur-rajasthan',
    name: 'Udaipur',
    country: 'India',
    state: 'Rajasthan',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    description: 'The Venice of the East, famed for shimmering Lake Pichola, floating white marble palaces, vibrant art galleries, and romantic sunsets.',
    tags: ['Culture', 'Cuisine', 'Relaxation', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.93,
    reviewsCount: 3600,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 85 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    highlights: ['City Palace the largest palace complex in Rajasthan', 'Lake Pichola sunset boat ride past Jag Mandir', 'Bagore Ki Haveli folk dance & puppet show', 'Saheliyon-ki-Bari royal fountain gardens'],
    freeActivities: ['Sunset at Ambrai Ghat overlooking illuminated City Palace', 'Walking the scenic footbridges across Lake Pichola', 'Exploring miniature painting artisan workshops'],
    safetyTips: ['Book Bagore Ki Haveli evening show tickets early as seats are limited'],
    accommodationOptions: [
      { id: 'udp-1', name: 'Lake Pichola Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Lal Ghat', facilities: ['Rooftop Lake View', 'WiFi', 'Sunset Yoga'], suitableFor: 'Solo travelers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Palaces on the Lake', activities: ['City Palace tour', 'Lake Pichola boat cruise', 'Ambrai Ghat sunset', 'Rajasthani thali dinner'] }
    ]
  },
  {
    id: 'jodhpur-rajasthan',
    name: 'Jodhpur',
    country: 'India',
    state: 'Rajasthan',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    description: 'The Sun City and Blue City crowned by the colossal Mehrangarh Fort rising dramatically above thousands of indigo-painted houses.',
    tags: ['Culture', 'Cuisine', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.88,
    reviewsCount: 2900,
    costEstimates: {
      flightBaseUSD: 28,
      nightlyLodgingUSD: { budget: 4.5, mid: 20, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 4,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Mehrangarh Fort towering over the city', 'Flying Fox zip-line over fort battlements and desert lakes', 'Blue City maze alleyway photography', 'Famous Makhaniya Lassi at Clock Tower'],
    freeActivities: ['Walking through the blue-washed Navchokiya neighborhood', 'Panoramic sunset views from Pachetia Hill', 'Sardar Market vibrant spice stalls'],
    safetyTips: ['Wear comfortable sneakers for steep stone paths up to the fort'],
    accommodationOptions: [
      { id: 'jdh-1', name: 'Blue City Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Old City', facilities: ['Fort View Roof', 'AC', 'WiFi'], suitableFor: 'Backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Blue Hues & Mighty Bastions', activities: ['Mehrangarh fort tour', 'Blue city alleys walk', 'Clock tower lassi', 'Rooftop fort view dinner'] }
    ]
  },
  {
    id: 'mount-abu-rajasthan',
    name: 'Mount Abu',
    country: 'India',
    state: 'Rajasthan',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'The only hill station in Rajasthan, home to world-renowned Dilwara Jain marble temples, serene Nakki Lake, and cool Aravalli breezes.',
    tags: ['Nature', 'Culture', 'Relaxation'],
    bestSeason: 'Year-round (Best Oct – April)',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.75,
    reviewsCount: 1700,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 65 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Dilwara Temples with translucent marble carvings', 'Boating on Nakki Lake and Toad Rock hike', 'Sunset Point panoramic views', 'Guru Shikhar highest Aravalli peak'],
    freeActivities: ['Hiking to Toad Rock', 'Strolling around Nakki Lake promenade in evening mist', 'Dilwara temple entry (free guided tour inside)'],
    safetyTips: ['Photography is strictly prohibited inside Dilwara temple sanctuaries'],
    accommodationOptions: [
      { id: 'mab-1', name: 'Aravalli Hills Budget Dorm', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Nakki Lake Road', facilities: ['WiFi', 'Lake Proximity'], suitableFor: 'Budget travelers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Temples & Lake Breezes', activities: ['Dilwara temples', 'Nakki lake boating', 'Toad rock hike', 'Sunset point'] }
    ]
  },
  {
    id: 'mumbai-maharashtra',
    name: 'Mumbai',
    country: 'India',
    state: 'Maharashtra',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Dreams, financial power engine, and Bollywood capital, known for Marine Drive sunsets, colonial Victorian Gothic architecture, and vada pav.',
    tags: ['City', 'Cuisine', 'Culture'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.84,
    reviewsCount: 4800,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 6, mid: 25, luxury: 90 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2.5,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 5 },
    isDayTripEligible: true,
    highlights: ['Marine Drive Queen’s Necklace evening sea breeze', 'Gateway of India and historic Taj Mahal Palace hotel', 'Elephanta Island UNESCO rock-cut caves ferry', 'Iconic street food: Vada Pav, Pav Bhaji, and Bombay Sandwich'],
    freeActivities: ['Sitting on Marine Drive promenade watching the Arabian Sea', 'Strolling the Art Deco buildings along Oval Maidan', 'Colaba Causeway street window shopping'],
    safetyTips: ['Avoid local trains during peak rush hours (8-10am & 6-8pm) if carrying luggage'],
    accommodationOptions: [
      { id: 'mum-1', name: 'Bandra Coastal Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 550, neighborhood: 'Bandra West', facilities: ['AC Dorms', 'WiFi', 'Cafe', 'Lockers'], suitableFor: 'Students, young creators, solo travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Heritage & Sea Front', activities: ['Gateway of India', 'Colaba causeway walk', 'Elephanta caves ferry', 'Marine Drive sunset'] }
    ]
  },
  {
    id: 'pune-maharashtra',
    name: 'Pune',
    country: 'India',
    state: 'Maharashtra',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
    description: 'The Oxford of the East and cultural capital of Maharashtra, known for historic Maratha fortresses, leafy student campuses, and lively cafes.',
    tags: ['Culture', 'City', 'Adventure', 'Cuisine'],
    bestSeason: 'Year-round (Best Oct – March & monsoon for treks)',
    bestMonths: ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'],
    rating: 4.78,
    reviewsCount: 2200,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4.5, mid: 18, luxury: 60 },
      dailyFoodUSD: 4.5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Shaniwar Wada Maratha empire historic palace fort', 'Sinhagad Fort monsoon trek with kanda bhaji and pithla bhakri', 'Aga Khan Palace where Mahatma Gandhi was interned', 'FC Road & Viman Nagar student cafe culture'],
    freeActivities: ['Trekking up Vetal Tekdi hill for sunrise', 'Exploring Osho Teerth peaceful park in Koregaon Park', 'Visiting historic Shaniwar Wada garden exterior'],
    safetyTips: ['Sinhagad fort steps can be slippery during monsoon; wear trekking shoes'],
    accommodationOptions: [
      { id: 'pne-1', name: 'FC Road Student Hostel', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Shivajinagar', facilities: ['Study Room', 'High-Speed WiFi', 'AC'], suitableFor: 'Students, backpackers, exam takers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Forts & Maratha Pride', activities: ['Shaniwar Wada', 'Aga Khan Palace', 'FC road street food', 'Sinhagad sunset'] }
    ]
  },
  {
    id: 'lonavala-maharashtra',
    name: 'Lonavala & Khandala',
    country: 'India',
    state: 'Maharashtra',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Popular Western Ghats twin hill retreat known for lush monsoon waterfalls, mist-shrouded viewpoints, ancient Karla Buddhist caves, and chikki.',
    tags: ['Nature', 'Adventure', 'Relaxation'],
    bestSeason: 'June – September (Monsoon greenery) & Oct – March',
    bestMonths: ['June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'],
    rating: 4.76,
    reviewsCount: 2700,
    costEstimates: {
      flightBaseUSD: 15, // ~₹150 local train from Mumbai/Pune!
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 65 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 2 },
    isDayTripEligible: true,
    highlights: ['Tiger’s Leap (Tiger Point) dramatic valley abyss view', 'Bhushi Dam overflowing steps in monsoon', 'Karla and Bhaja ancient 2nd-century BC rock-cut caves', 'Maganlal Lonavala chikki sampling'],
    freeActivities: ['Enjoying the cool mountain breeze at Tiger Point', 'Visiting Bhaja caves village trails', 'Picnicking by Pawna Lake banks'],
    safetyTips: ['Avoid stepping into deep reservoir currents at Bhushi Dam during heavy rains'],
    accommodationOptions: [
      { id: 'lnv-1', name: 'Pawna Lake Campsite & Dorm', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'Pawna Road', facilities: ['Lake View', 'Bonfire', 'Barbeque'], suitableFor: 'Students, young weekenders', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Monsoon Mist & Chikki', activities: ['Morning local train arrival', 'Tiger point mist', 'Karla caves', 'Chikki shopping', 'Return train'] }
    ]
  },
  {
    id: 'goa-india',
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s beach capital combining sun-kissed Arabian Sea beaches, Portuguese baroque churches, vibrant flea markets, water sports, and beach shacks.',
    tags: ['Beaches', 'Relaxation', 'Cuisine', 'Adventure'],
    bestSeason: 'October – April',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.92,
    reviewsCount: 5600,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 80 },
      dailyFoodUSD: 6,
      dailyActivitiesUSD: 5,
      dailyTransitUSD: 2.5, // Scooter rental ~₹350/day
    },
    recommendedDurationDays: { min: 3, max: 7 },
    highlights: ['Anjuna & Vagator cliff beaches and sunset shacks', 'Palolem serene crescent beach with kayak dolphin tours', 'Fort Aguada and Chapora Fort panoramic sea views', 'Basilica of Bom Jesus UNESCO world heritage church'],
    freeActivities: ['Watching sunset from Chapora Fort cliffs (Dil Chahta Hai point)', 'Strolling the colorful lanes of Fontainhas Latin Quarter', 'Relaxing on pristine South Goa sands of Agonda & Benaulim'],
    safetyTips: ['Always wear a helmet when riding rented mopeds/scooters; carry a valid license', 'Swim between red and yellow lifeguard flags only'],
    accommodationOptions: [
      { id: 'goa-1', name: 'Anjuna Beach Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Anjuna', facilities: ['Swimming Pool', 'Bar & Cafe', 'Scooter Rental', 'WiFi'], suitableFor: 'Solo backpackers, students', isSampleEstimate: true },
      { id: 'goa-2', name: 'Palolem Beach Shack Huts', type: 'guesthouse', roomType: 'private_room', estPriceINRPerPerson: 1000, neighborhood: 'Palolem', facilities: ['Beachfront', 'Hammocks', 'Sea View'], suitableFor: 'Couples, relaxed travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'North Goa Cliffs & Forts', activities: ['Chapora fort', 'Vagator beach', 'Anjuna flea market', 'Curries beach dinner'] },
      { day: 2, title: 'Heritage & Latin Quarters', activities: ['Old Goa churches', 'Fontainhas photo walk', 'Miramar beach sunset'] }
    ]
  },
  {
    id: 'nashik-maharashtra',
    name: 'Nashik',
    country: 'India',
    state: 'Maharashtra',
    region: 'West India',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'The Wine Capital of India on the holy Godavari River, famed for sprawling vineyards, Trimbakeshwar Jyotirlinga, and Ramkund ghats.',
    tags: ['Cuisine', 'Culture', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.79,
    reviewsCount: 1600,
    costEstimates: {
      flightBaseUSD: 20,
      nightlyLodgingUSD: { budget: 4.5, mid: 18, luxury: 60 },
      dailyFoodUSD: 4.5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Sula Vineyards wine tasting & vineyard tour', 'Trimbakeshwar Shiva Jyotirlinga temple', 'Panchavati and Sita Gufa mythological sites', 'Misal Pav tasting at famous local joints'],
    freeActivities: ['Walking along Godavari Ramkund holy ghats', 'Exploring Pandavleni 1st-century Buddhist rock caves', 'Panchavati temples walk'],
    safetyTips: ['Dress modestly when visiting Trimbakeshwar temple sanctuary'],
    accommodationOptions: [
      { id: 'nsk-1', name: 'Nashik City Travelers Stay', type: 'budget_hotel', roomType: 'private_room', estPriceINRPerPerson: 700, neighborhood: 'Gangapur Road', facilities: ['AC', 'WiFi', 'Vineyard Tour Desk'], suitableFor: 'Wine explorers, couples, friends', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Vineyards & Temples', activities: ['Panchavati ghats', 'Sula vineyards tour & tasting', 'Spicy Nashik Misal lunch'] }
    ]
  },

  // ==========================================
  // EAST & NORTHEAST INDIA
  // ==========================================
  {
    id: 'kolkata-west-bengal',
    name: 'Kolkata',
    country: 'India',
    state: 'West Bengal',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Joy and cultural capital, known for grand Victorian colonial buildings, Howrah Bridge, historic yellow cabs, and unforgettable street food.',
    tags: ['Culture', 'Cuisine', 'City'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.87,
    reviewsCount: 3800,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4.5, mid: 20, luxury: 75 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['Victoria Memorial white marble palace and gardens', 'Iconic Howrah Bridge crossing on foot', 'College Street Boi Para (world’s largest secondhand book market)', 'Famous street food: Kathi Rolls, Phuchka, and Mishti Doi'],
    freeActivities: ['Strolling the majestic grounds of Victoria Memorial outer gardens', 'Walking along Princep Ghat on the Hooghly riverbank', 'Browsing millions of vintage books on College Street'],
    safetyTips: ['Use Kolkata Metro and historic trams for affordable city exploration'],
    accommodationOptions: [
      { id: 'ccu-1', name: 'Park Street Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Park Street', facilities: ['WiFi', 'AC', 'Common Kitchen', 'Library'], suitableFor: 'Solo travelers, students, book lovers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Heritage & Flavors of Joy', activities: ['Victoria Memorial', 'Princep Ghat stroll', 'College street books', 'Park street dinner'] }
    ]
  },
  {
    id: 'darjeeling-west-bengal',
    name: 'Darjeeling',
    country: 'India',
    state: 'West Bengal',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Queen of the Hills nestled in the Eastern Himalayas, world-famous for champagne Darjeeling tea, Kanchenjunga sunrise views, and the Toy Train.',
    tags: ['Nature', 'Relaxation', 'Culture'],
    bestSeason: 'March – May & October – December',
    bestMonths: ['March', 'April', 'May', 'October', 'November', 'December'],
    rating: 4.88,
    reviewsCount: 2900,
    costEstimates: {
      flightBaseUSD: 35,
      nightlyLodgingUSD: { budget: 5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 3, max: 5 },
    highlights: ['Tiger Hill sunrise view illuminating Mount Kanchenjunga', 'UNESCO Darjeeling Himalayan Railway Joy Ride', 'Happy Valley Tea Estate aroma walk', 'Padmaja Naidu Himalayan Zoo with Red Pandas & Snow Leopards'],
    freeActivities: ['Watching sunset over Kanchenjunga from the Mall (Chowrasta)', 'Strolling the pine-shaded Governor’s House road', 'Observing tea pluckers on rolling hillsides'],
    safetyTips: ['Wake up at 3:30 AM for the Tiger Hill sunrise queue to beat tourist vehicle traffic'],
    accommodationOptions: [
      { id: 'daj-1', name: 'Mall Road Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Chowrasta', facilities: ['Fireplace', 'Mountain View', 'Tea Station'], suitableFor: 'Backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Peaks & Tea Gardens', activities: ['Tiger Hill sunrise', 'Batasia Loop toy train', 'Chowrasta tea tasting', 'Himalayan zoo'] }
    ]
  },
  {
    id: 'gangtok-sikkim',
    name: 'Gangtok',
    country: 'India',
    state: 'Sikkim',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?auto=format&fit=crop&w=1200&q=80',
    description: 'Clean, green capital of Sikkim overlooking the Kanchenjunga range, renowned for Buddhist monasteries, cable cars, and pedestrian MG Marg.',
    tags: ['Nature', 'Culture', 'Adventure', 'Cuisine'],
    bestSeason: 'March – June & September – November',
    bestMonths: ['March', 'April', 'May', 'June', 'September', 'October', 'November'],
    rating: 4.91,
    reviewsCount: 2600,
    costEstimates: {
      flightBaseUSD: 40,
      nightlyLodgingUSD: { budget: 5.5, mid: 22, luxury: 75 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 4,
      dailyTransitUSD: 2.5,
    },
    recommendedDurationDays: { min: 3, max: 6 },
    highlights: ['Glacial Tsomgo (Changu) Lake and Nathula Pass border', 'Rumtek Monastery seat of the Karmapa', 'Vehicle-free MG Marg evening cafe walk', 'Gangtok Ropeway cable car ride across valley'],
    freeActivities: ['Strolling the spotless flower-lined MG Marg promenade', 'Views of Kanchenjunga from Tashi Viewpoint at dawn', 'Visiting Enchey Monastery grounds'],
    safetyTips: ['Nathula Pass and Tsomgo lake require Inner Line Permits; carry passport photos & voter ID/passport'],
    accommodationOptions: [
      { id: 'gtk-1', name: 'MG Marg Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'MG Marg', facilities: ['Heated Rooms', 'WiFi', 'Permit Assistance'], suitableFor: 'Solo hikers, students, adventurers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Monasteries & Mountain Air', activities: ['Rumtek monastery', 'Ropeway ride', 'MG Marg walk', 'Sikkimese thukpa dinner'] }
    ]
  },
  {
    id: 'shillong-meghalaya',
    name: 'Shillong',
    country: 'India',
    state: 'Meghalaya',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'The Scotland of the East and rock music capital, surrounded by pine forests, crystal clear rivers, living root bridges, and roaring falls.',
    tags: ['Nature', 'Adventure', 'Culture'],
    bestSeason: 'September – May',
    bestMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    rating: 4.89,
    reviewsCount: 2100,
    costEstimates: {
      flightBaseUSD: 40,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 70 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2.5,
    },
    recommendedDurationDays: { min: 3, max: 6 },
    highlights: ['Umiam Lake vast turquoise reservoir boating', 'Cherrapunji & Nohkalikai waterfall expeditions', 'Living Root Bridges bio-engineering marvels in Nongriat', 'Laitlum Canyons edge-of-the-world abyss view'],
    freeActivities: ['Walking along peaceful Ward’s Lake botanical gardens', 'Exploring the musical cafes and guitar shops in Police Bazar', 'Panoramic view from Laitlum Grand Canyon'],
    safetyTips: ['Nongriat double-decker root bridge trek involves 3,000 stairs; good fitness required'],
    accommodationOptions: [
      { id: 'shl-1', name: 'Pine View Backpacker Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 500, neighborhood: 'Police Bazar', facilities: ['Guitar Jam Lounge', 'WiFi', 'Tour Desk'], suitableFor: 'Music lovers, backpackers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Lakes & Pine Trails', activities: ['Umiam lake view', 'Don Bosco museum', 'Police bazar walk', 'Live music cafe'] }
    ]
  },
  {
    id: 'guwahati-assam',
    name: 'Guwahati',
    country: 'India',
    state: 'Assam',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Gateway to the Northeast on the mighty Brahmaputra River, famed for ancient Kamakhya Shakti Peeth, river islands, and silk bazaars.',
    tags: ['Culture', 'Nature', 'City'],
    bestSeason: 'October – April',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    rating: 4.75,
    reviewsCount: 1800,
    costEstimates: {
      flightBaseUSD: 30,
      nightlyLodgingUSD: { budget: 4.5, mid: 18, luxury: 60 },
      dailyFoodUSD: 4.5,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Maa Kamakhya hilltop temple complex', 'Sunset cruise on the mighty Brahmaputra river', 'Umananda Peacock Island (smallest inhabited river island)', 'Assam State Museum & Sualkuchi silk weaving'],
    freeActivities: ['Walking along the riverfront ghats of Brahmaputra', 'Exploring traditional Fancy Bazar brass & handloom alleys'],
    safetyTips: ['Check ferry timings for Umananda island before departing'],
    accommodationOptions: [
      { id: 'gau-1', name: 'Brahmaputra Travelers Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Paltan Bazaar', facilities: ['WiFi', 'AC', 'Railway Station Proximity'], suitableFor: 'Transit travelers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Rivers & Ancient Shrines', activities: ['Kamakhya temple', 'Umananda island ferry', 'Brahmaputra sunset cruise', 'Assamese thali dinner'] }
    ]
  },
  {
    id: 'puri-odisha',
    name: 'Puri',
    country: 'India',
    state: 'Odisha',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
    description: 'Sacred coastal Char Dham pilgrim destination on the Bay of Bengal, famous for Lord Jagannath Temple, golden beaches, and Konark Sun Temple.',
    tags: ['Culture', 'Beaches', 'Cuisine'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.81,
    reviewsCount: 2900,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['Shree Jagannath Temple architecture and Mahaprasad', 'Golden Beach blue flag certified beach strolls', 'Konark Sun Temple stone chariot 35km away', 'Chilika Lake Irrawaddy dolphin boat safari'],
    freeActivities: ['Watching the evening sea waves and sand artists at Golden Beach', 'Observing temple flag changing ritual (Chuda Bandha) at dusk', 'Strolling the Grand Road (Bada Danda)'],
    safetyTips: ['Non-Hindus are not permitted inside Jagannath sanctum; grand view available from Raghunandan library roof'],
    accommodationOptions: [
      { id: 'pur-1', name: 'Golden Beach Travelers Inn', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 350, neighborhood: 'Marine Drive', facilities: ['Beachfront', 'WiFi', 'Roof Terrace'], suitableFor: 'Pilgrims, backpackers, budget groups', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Sacred Shores & Temples', activities: ['Jagannath temple darshan & Mahaprasad', 'Golden beach relaxation', 'Konark Sun Temple afternoon excursion'] }
    ]
  },
  {
    id: 'bhubaneswar-odisha',
    name: 'Bhubaneswar',
    country: 'India',
    state: 'Odisha',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'The Temple City of India boasting over 500 historic Kalinga-style stone temples, ancient rock-cut caves, and smart green avenues.',
    tags: ['Culture', 'City', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.77,
    reviewsCount: 1750,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 1.5,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Lingaraj Temple 11th-century soaring spire', 'Mukteshwar Temple gem of Odisha architecture', 'Udayagiri & Khandagiri ancient Jain cave hermitages', 'Dhauli Shanti Stupa peace pagoda overlooking Daya river'],
    freeActivities: ['Exploring Mukteshwar temple stone arched torana', 'Dhauli peace pagoda sunset views', 'Ekamra heritage guided Sunday walks'],
    safetyTips: ['Dress respectfully with shoulders and knees covered for temple visits'],
    accommodationOptions: [
      { id: 'bhu-1', name: 'Temple City Student Stay', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 380, neighborhood: 'Old Town', facilities: ['WiFi', 'AC', 'Mineral Water'], suitableFor: 'Students, budget history buffs', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Kalinga Stone Poetry', activities: ['Lingaraj & Mukteshwar temples', 'Khandagiri caves', 'Dhauli pagoda sunset', 'Chhena poda sweet tasting'] }
    ]
  },
  {
    id: 'ziro-valley-arunachal',
    name: 'Ziro Valley',
    country: 'India',
    state: 'Arunachal Pradesh',
    region: 'East & Northeast India',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    description: 'Enchanting UNESCO tentative landscape of terraced paddy fields, home to the warm Apatani tribal culture and the famous outdoor Ziro Music Festival.',
    tags: ['Nature', 'Culture', 'Adventure'],
    bestSeason: 'March – October (September for Ziro Festival)',
    bestMonths: ['March', 'April', 'May', 'September', 'October'],
    rating: 4.93,
    reviewsCount: 1100,
    costEstimates: {
      flightBaseUSD: 45,
      nightlyLodgingUSD: { budget: 6, mid: 20, luxury: 60 },
      dailyFoodUSD: 5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 3,
    },
    recommendedDurationDays: { min: 3, max: 6 },
    highlights: ['Apatani tribal villages (Hong & Hari) bamboo architecture', 'Terraced wet rice and fish agricultural fields', 'Ziro Festival of Music indie music pilgrimage', 'Tarin Fish Farm and pine forest nature walks'],
    freeActivities: ['Walking through picturesque Hong village bamboo bridges', 'Watching cloud shadows race across emerald rice terraces', 'Engaging with friendly Apatani village elders'],
    safetyTips: ['Inner Line Permit (ILP) is mandatory for Indian citizens; apply online before travel'],
    accommodationOptions: [
      { id: 'zir-1', name: 'Apatani Bamboo Homestay', type: 'homestay', roomType: 'dormitory', estPriceINRPerPerson: 600, neighborhood: 'Hong Village', facilities: ['Local Organic Food', 'Fireplace', 'Village Tour'], suitableFor: 'Cultural travelers, music lovers, backpackers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Paddy Terraces & Tribe Life', activities: ['Hong village walk', 'Paddy fish farm visit', 'Traditional home meal with rice brew'] }
    ]
  },

  // ==========================================
  // CENTRAL INDIA
  // ==========================================
  {
    id: 'bhopal-madhya-pradesh',
    name: 'Bhopal',
    country: 'India',
    state: 'Madhya Pradesh',
    region: 'Central India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'The City of Lakes combining grand Begum-era mosques, peaceful lakeside promenades, world heritage Sanchi Stupas, and rich tribal art.',
    tags: ['Culture', 'City', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.78,
    reviewsCount: 1850,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 2,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    isDayTripEligible: true,
    highlights: ['Upper Lake (Bada Talab) sunset boat cruise', 'UNESCO Sanchi Stupa ancient Buddhist monument (45km)', 'Taj-ul-Masajid one of Asia’s largest mosques', 'Bhimbetka pre-historic rock art caves (35km)'],
    freeActivities: ['Walking the VIP road lakeside promenade at sunset', 'Exploring Taj-ul-Masajid courtyards', 'Tribal Museum open-air cultural park'],
    safetyTips: ['Dress modestly when visiting Taj-ul-Masajid'],
    accommodationOptions: [
      { id: 'bhp-1', name: 'Lake City Student Hostel', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 380, neighborhood: 'MP Nagar', facilities: ['WiFi', 'AC', 'Near Bus Stand'], suitableFor: 'Students, backpackers, exam candidates', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Lakes & Great Stupas', activities: ['Sanchi stupa day excursion', 'Upper lake sunset', 'Chowk street food tasting'] }
    ]
  },
  {
    id: 'pachmarhi-madhya-pradesh',
    name: 'Pachmarhi',
    country: 'India',
    state: 'Madhya Pradesh',
    region: 'Central India',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'The Queen of Satpura, a secluded hill station nestled among waterfalls, pine groves, ancient Pandava rock caves, and dramatic red sandstone gorges.',
    tags: ['Nature', 'Adventure', 'Relaxation'],
    bestSeason: 'October – June',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    rating: 4.82,
    reviewsCount: 1650,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 5, mid: 20, luxury: 65 },
      dailyFoodUSD: 4.5,
      dailyActivitiesUSD: 3,
      dailyTransitUSD: 2,
    },
    recommendedDurationDays: { min: 2, max: 4 },
    highlights: ['Bee Falls 35-meter perennial cascade bath', 'Dhoopgarh highest peak of Satpura sunset view', 'Pandava Caves five rock-cut dwellings', 'Jata Shankar cave temple inside deep ravine'],
    freeActivities: ['Sunset viewing from Dhoopgarh plateau', 'Hiking through tranquil cantonment pine forests', 'Visiting Rajat Prapat viewpoint'],
    safetyTips: ['Gypsy vehicles are recommended to access rocky terrain in forest reserves'],
    accommodationOptions: [
      { id: 'pch-1', name: 'Satpura Forest Rest House', type: 'guesthouse', roomType: 'dormitory', estPriceINRPerPerson: 450, neighborhood: 'Civil Lines', facilities: ['Lawn', 'Hot Water', 'Quiet Surroundings'], suitableFor: 'Nature lovers, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Cascades & Sunsets', activities: ['Bee falls dip', 'Pandava caves', 'Dhoopgarh sunset view'] }
    ]
  },
  {
    id: 'khajuraho-madhya-pradesh',
    name: 'Khajuraho',
    country: 'India',
    state: 'Madhya Pradesh',
    region: 'Central India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'UNESCO World Heritage complex of medieval Hindu and Jain stone temples celebrating divine grace, architecture, sensuality, and spiritual liberation.',
    tags: ['Culture', 'Relaxation'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.89,
    reviewsCount: 2400,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 4,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Western Group of Temples intricate stone carving masterpieces', 'Kandariya Mahadeva soaring spires', 'Evening Sound & Light show on temple lawns', 'Raneh Falls canyon and crystal-clear Ken river'],
    freeActivities: ['Bicycling around the peaceful Eastern & Southern temple groups', 'Sunset views over Shivsagar Lake', 'Visiting local tribal and folk art museum'],
    safetyTips: ['Hire certified ASI guides to understand the symbolic philosophy of the sculptures'],
    accommodationOptions: [
      { id: 'khj-1', name: 'Temples Garden Hostel', type: 'backpacker_hostel', roomType: 'dormitory', estPriceINRPerPerson: 380, neighborhood: 'Western Group Gate', facilities: ['Bicycle Rental', 'WiFi', 'Garden'], suitableFor: 'Backpackers, history buffs, students', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Symphony in Stone', activities: ['Western group temples tour', 'Raneh falls trip', 'Sound & light show', 'Rooftop cafe dinner'] }
    ]
  },
  {
    id: 'indore-madhya-pradesh',
    name: 'Indore',
    country: 'India',
    state: 'Madhya Pradesh',
    region: 'Central India',
    imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8418b7d?auto=format&fit=crop&w=1200&q=80',
    description: 'India’s cleanest city and street food heaven, boasting Sarafa Bazaar midnight food market, royal Holkar palaces, and vibrant bazaars.',
    tags: ['Cuisine', 'City', 'Culture'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.83,
    reviewsCount: 2100,
    costEstimates: {
      flightBaseUSD: 25,
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 60 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 1.5,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Sarafa Bazaar jewelry market turning into midnight culinary street', 'Chappan Dukan 56 culinary shop promenade', 'Rajwada 7-story Holkar Dynasty royal palace', 'Poha Jalebi and Bhutte ka Kees authentic breakfast'],
    freeActivities: ['Walking through illuminated Sarafa Bazaar after 9 PM', 'Strolling the spotless avenues of Chappan Dukan', 'Rajwada palace facade photography'],
    safetyTips: ['Sarafa food market starts around 8:30 PM and peaks from 10 PM to 1 AM'],
    accommodationOptions: [
      { id: 'idr-1', name: 'Sarafa Backpacker Stay', type: 'dorm_hostel', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Rajwada', facilities: ['WiFi', 'AC', 'Near Food Street'], suitableFor: 'Foodies, students, budget travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Foodie Pilgrimage', activities: ['Morning Poha Jalebi', 'Rajwada palace visit', 'Chappan Dukan snacks', 'Sarafa midnight feast'] }
    ]
  },
  {
    id: 'orchha-madhya-pradesh',
    name: 'Orchha',
    country: 'India',
    state: 'Madhya Pradesh',
    region: 'Central India',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    description: 'Time-frozen medieval Bundela capital on the banks of the Betwa River, adorned with imposing palaces, chattris cenotaphs, and river rafting.',
    tags: ['Culture', 'Relaxation', 'Adventure'],
    bestSeason: 'October – March',
    bestMonths: ['October', 'November', 'December', 'January', 'February', 'March'],
    rating: 4.86,
    reviewsCount: 1600,
    costEstimates: {
      flightBaseUSD: 20, // ~₹300 auto/taxi from Jhansi railway junction
      nightlyLodgingUSD: { budget: 4, mid: 18, luxury: 55 },
      dailyFoodUSD: 4,
      dailyActivitiesUSD: 2.5,
      dailyTransitUSD: 1.5,
    },
    recommendedDurationDays: { min: 1, max: 3 },
    isDayTripEligible: true,
    highlights: ['Jahangir Mahal multi-tiered palace with stone jali screens', 'Betwa River sunset over 14 royal Chattris (cenotaphs)', 'Ram Raja Temple where Lord Rama is revered as king', 'Gentle river rafting on Betwa river rapids'],
    freeActivities: ['Sunset reflection photography of Chattris across Betwa river', 'Attending guard-of-honor police ceremony at Ram Raja temple', 'Exploring Orchha wildlife sanctuary trails'],
    safetyTips: ['Cross the narrow Betwa river causeway carefully during high water flows'],
    accommodationOptions: [
      { id: 'orc-1', name: 'Betwa Riverside Heritage Stay', type: 'guesthouse', roomType: 'dormitory', estPriceINRPerPerson: 400, neighborhood: 'Temple Road', facilities: ['River View', 'WiFi', 'Roof Terrace'], suitableFor: 'Backpackers, students, peaceful travelers', isSampleEstimate: true }
    ],
    sampleItinerary: [
      { day: 1, title: 'Medieval Bundela Grandeur', activities: ['Jahangir Mahal & Raja Mahal', 'Ram Raja temple darshan', 'Chattris sunset walk', 'Betwa river view dinner'] }
    ]
  }
];
