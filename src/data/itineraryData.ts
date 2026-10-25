export interface ItineraryTimeBlock {
  time: string;
  type: 'wellness' | 'deep_work' | 'lunch_recharge' | 'async_calls' | 'exploration' | 'nightlife';
  title: string;
  description: string;
  venueRecommendation: string;
  wifiTestedMbps?: number;
  tags: string[];
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  blocks: ItineraryTimeBlock[];
}

export interface DestinationItinerary {
  destinationId: string;
  destinationName: string;
  vibe: string;
  recommendedDurationDays: number;
  bestMonths: string;
  days: DayPlan[];
}

export const DESTINATION_ITINERARIES: Record<string, DestinationItinerary> = {
  'goa-india': {
    destinationId: 'goa-india',
    destinationName: 'Goa',
    vibe: 'Coastal Workation & Creative Pulse',
    recommendedDurationDays: 14,
    bestMonths: 'October to May',
    days: [
      {
        dayNumber: 1,
        theme: 'Settling in & Coastal Ocean Focus',
        blocks: [
          {
            time: '07:30 - 09:00',
            type: 'wellness',
            title: 'Anjuna Beachfront Stride & Smoothie Bowl',
            description: 'Begin the day with a brisk morning beach walk followed by fresh pitaya smoothie bowls at Artjuna.',
            venueRecommendation: 'Artjuna Lifestyle Cafe, Anjuna',
            tags: ['Wellness', 'Breakfast'],
          },
          {
            time: '09:30 - 13:30',
            type: 'deep_work',
            title: 'High-Focus Deep Work Block (Sprint 1)',
            description: 'Tackle core technical deliverables, coding, or proposal writing under air-conditioned high-speed fiber.',
            venueRecommendation: 'NomadGao Coworking Villa, Assagao',
            wifiTestedMbps: 220,
            tags: ['Deep Work', 'Air-Conditioned', 'Ergonomic'],
          },
          {
            time: '13:30 - 15:00',
            type: 'lunch_recharge',
            title: 'Portuguese-Goan Fish Thali & Power Nap',
            description: 'Savor traditional Goan red rice and coconut curry at a heritage home taverna.',
            venueRecommendation: 'Vinayak Family Restaurant, Assagao',
            tags: ['Local Cuisine', 'Recharge'],
          },
          {
            time: '15:30 - 17:30',
            type: 'async_calls',
            title: 'Collaborative Syncs & Client Communications',
            description: 'Attend video meetings or Slack discussions in soundproof phone pods overlooking garden palms.',
            venueRecommendation: 'Clay Cafe Sunken Garden, Anjuna',
            wifiTestedMbps: 120,
            tags: ['Meetings', 'Outdoor Seating'],
          },
          {
            time: '18:00 - 21:30',
            type: 'exploration',
            title: 'Vagator Sunset Cliffs & Live Acoustic Jam',
            description: 'Watch the sun sink into the Arabian Sea from the Chapora red laterite cliffs, followed by woodfired sourdough pizza.',
            venueRecommendation: 'Titlie Culinary Bar, Vagator',
            tags: ['Sunset', 'Live Music', 'Nomad Mixer'],
          },
        ],
      },
      {
        dayNumber: 2,
        theme: 'Heritage Architecture & Productive Sprints',
        blocks: [
          {
            time: '08:00 - 09:30',
            type: 'wellness',
            title: 'Fontainhas Heritage Quarter Photography Stroll',
            description: 'Wander through Portuguese colonial yellow and indigo alleys in Panjim before morning heat.',
            venueRecommendation: 'Confeitaria 31 de Janeiro, Panaji',
            tags: ['Culture', 'Photography'],
          },
          {
            time: '10:00 - 14:00',
            type: 'deep_work',
            title: 'Heritage Cafe Focus & Architecture Design',
            description: 'Work alongside fellow architects and product managers in a restored 19th-century courtyard.',
            venueRecommendation: 'Old Quarter Hostel & Cafe, Fontainhas',
            wifiTestedMbps: 150,
            tags: ['Focus', 'Specialty Coffee'],
          },
          {
            time: '14:30 - 16:30',
            type: 'lunch_recharge',
            title: 'Latin Quarter Lunch & Book Browsing',
            description: 'Enjoy handcrafted pasta and artisan coffee while reading local history books.',
            venueRecommendation: 'Joseph Bar & Bodega Panjim',
            tags: ['Books', 'Artisan Coffee'],
          },
          {
            time: '17:30 - 21:00',
            type: 'nightlife',
            title: 'Mandovi River Sunset Cruise & Jazz Lounge',
            description: 'Network with visiting remote startup founders over jazz beats and artisanal feni cocktails.',
            venueRecommendation: 'For the Record Vinyl Bar, Panaji',
            tags: ['Vinyl Records', 'Networking'],
          },
        ],
      },
    ],
  },
  'manali-hp': {
    destinationId: 'manali-hp',
    destinationName: 'Manali, Himachal Pradesh',
    vibe: 'Pine Valley Serenity & High-Altitude Focus',
    recommendedDurationDays: 21,
    bestMonths: 'March to June, September to November',
    days: [
      {
        dayNumber: 1,
        theme: 'Cedar Mist & Deep Flow State',
        blocks: [
          {
            time: '07:30 - 09:00',
            type: 'wellness',
            title: 'Hadimba Deodar Forest Morning Walk',
            description: 'Breathe in pure mountain cedar air with a mindful stroll through centuries-old deodar trees.',
            venueRecommendation: 'Hadimba Temple Forest Trail, Old Manali',
            tags: ['Nature', 'Breathing'],
          },
          {
            time: '09:30 - 13:30',
            type: 'deep_work',
            title: 'Alpine High-Speed Engineering Sprint',
            description: 'Ship code by the woodfire chimney with 160 Mbps fiber and mountain valley vistas.',
            venueRecommendation: 'AltLife Himalayan Coworking Lounge',
            wifiTestedMbps: 160,
            tags: ['Deep Focus', 'Mountain View', 'Heated'],
          },
          {
            time: '13:30 - 15:00',
            type: 'lunch_recharge',
            title: 'Himalayan Trout & Apple Crumble',
            description: 'Fresh local river trout with lemon butter paired with fresh Kullu apple crumble pie.',
            venueRecommendation: 'Cafe 1947 by the Stream, Old Manali',
            tags: ['River View', 'Himalayan Food'],
          },
          {
            time: '15:30 - 17:30',
            type: 'async_calls',
            title: 'Afternoon Client Check-ins & Code Reviews',
            description: 'Host standups with the murmur of the Manalsu river in the background.',
            venueRecommendation: 'The Lazy Dog Lounge, Old Manali',
            wifiTestedMbps: 85,
            tags: ['Outdoor Patio', 'Coffee'],
          },
          {
            time: '18:00 - 21:00',
            type: 'exploration',
            title: 'Jogini Waterfall Golden Hour Hike & Firepit',
            description: 'Short 45-minute hike through apple orchards to Jogini falls, followed by evening bonfire with nomads.',
            venueRecommendation: 'Vashisht Hot Spring Village',
            tags: ['Trek', 'Hot Springs', 'Bonfire'],
          },
        ],
      },
    ],
  },
  'rishikesh-uttarakhand': {
    destinationId: 'rishikesh-uttarakhand',
    destinationName: 'Rishikesh, Uttarakhand',
    vibe: 'Ganges Calm & Spiritual Clarity',
    recommendedDurationDays: 14,
    bestMonths: 'October to April',
    days: [
      {
        dayNumber: 1,
        theme: 'River Prana & Writing Flow',
        blocks: [
          {
            time: '07:00 - 08:30',
            type: 'wellness',
            title: 'Sunrise Hatha Yoga on the Ganges White Sands',
            description: 'Practice surya namaskar as temple bells ring across the riverbanks.',
            venueRecommendation: 'Tapovan Ghat, Rishikesh',
            tags: ['Yoga', 'Meditation'],
          },
          {
            time: '09:00 - 13:00',
            type: 'deep_work',
            title: 'Rooftop River-Facing Deep Work Sprint',
            description: 'Uninterrupted creative writing or coding on a quiet rooftop with 140 Mbps fiber.',
            venueRecommendation: 'The Hosteller Rooftop Workspace, Tapovan',
            wifiTestedMbps: 140,
            tags: ['River View', 'High Speed'],
          },
          {
            time: '13:30 - 15:00',
            type: 'lunch_recharge',
            title: 'Organic Ayurvedic Thali & Masala Chai',
            description: 'Fresh farm-to-table organic vegetables, brown rice, and herbal digestive teas.',
            venueRecommendation: 'Ramana\'s Garden Organic Cafe',
            tags: ['Organic', 'Ayurveda'],
          },
          {
            time: '18:00 - 19:30',
            type: 'exploration',
            title: 'Parmarth Niketan Ganga Aarti & Sunset',
            description: 'Experience the world-renowned chanting and floating earthen oil lamps at dusk.',
            venueRecommendation: 'Parmarth Niketan Ashram, Swargashram',
            tags: ['Spiritual', 'Ceremony', 'Must-See'],
          },
        ],
      },
    ],
  },
};
