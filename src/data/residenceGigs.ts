export interface ResidenceGig {
  id: string;
  propertyTitle: string;
  organization: string;
  city: string;
  state: string;
  imageUrl: string;
  stayOffer: string;      // e.g. "Private Pool Villa Suite + All Organic Meals"
  stipendINR: number;     // e.g. ₹45,000/mo
  durationWeeks: number;  // e.g. 4 weeks
  hoursPerWeek: number;   // e.g. 12 hrs/week
  skillsRequired: string[];
  deliverables: string[];
  amenitiesIncluded: string[];
  hostBio: string;
  spotsAvailable: number;
}

export const RESIDENCE_GIGS_DATA: ResidenceGig[] = [
  {
    id: 'res-1',
    propertyTitle: 'Himalayan Orchard Boutique Estate',
    organization: 'CloudMist Eco-Resort',
    city: 'Manali',
    state: 'Himachal Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80',
    stayOffer: 'Private Pine Cottage with Fireplace + Farm-to-Table Meals',
    stipendINR: 45000,
    durationWeeks: 4,
    hoursPerWeek: 12,
    skillsRequired: ['Short-Form Video', 'Drone Photography', 'Instagram Reels'],
    deliverables: [
      '8 High-definition reels showcasing orchard harvests and misty valley views',
      '20 Edited photos for our direct booking website',
      'Weekly Instagram takeover during apple picking season',
    ],
    amenitiesIncluded: ['160 Mbps Starlink Wi-Fi', '24/7 Room Heater & Firewood', 'Organic Farm Meals', 'Complimentary Apple Cider'],
    hostBio: 'Family-run organic apple orchard since 1974, newly converted into a luxury slow-living sanctuary for thinkers and creators.',
    spotsAvailable: 1,
  },
  {
    id: 'res-2',
    propertyTitle: 'Heritage Portuguese Taverna & Suites',
    organization: 'Casa de Flores Collection',
    city: 'Assagao, Goa',
    state: 'Goa',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    stayOffer: 'Private Heritage Portuguese Suite + Garden Pool Access + Chef Breakfast',
    stipendINR: 65000,
    durationWeeks: 6,
    hoursPerWeek: 15,
    skillsRequired: ['Web Redesign (React / Tailwind)', 'SEO Optimization', 'Copywriting'],
    deliverables: [
      'Modernize direct booking web interface with editorial luxury design',
      'Set up local SEO for Assagao luxury stay searches',
      'Craft story-driven menu and history booklet for guests',
    ],
    amenitiesIncluded: ['200 Mbps Redundant Fiber', 'Private Swimming Pool', 'Scooter Rental Included', 'Daily Espresso Barista'],
    hostBio: 'Restored 19th-century Portuguese estate known for intimate jazz dinners and lush tropical courtyard garden.',
    spotsAvailable: 2,
  },
  {
    id: 'res-3',
    propertyTitle: 'Varkala Cliffside Yoga Sanctuary',
    organization: 'Prana Vedic Shala',
    city: 'Varkala',
    state: 'Kerala',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    stayOffer: 'Cliff-Edge Ocean View Suite + Ayurvedic Panchakarma Meals',
    stipendINR: 40000,
    durationWeeks: 4,
    hoursPerWeek: 10,
    skillsRequired: ['Brand Identity', 'Email Newsletter Automation', 'Community Hosting'],
    deliverables: [
      'Design monthly email digest sequence for visiting European yogis',
      'Host twice-weekly sunset breathwork circle for in-house guests',
      'Update retreat brochure and welcome package',
    ],
    amenitiesIncluded: ['140 Mbps BSNL FTTH', 'Daily Yoga & Meditation Classes', 'Ayurvedic Massage Weekly', 'Private Sea View Balcony'],
    hostBio: 'Holistic wellness sanctuary on North Cliff offering traditional ayurvedic therapies and spiritual rejuvenation.',
    spotsAvailable: 1,
  },
  {
    id: 'res-4',
    propertyTitle: 'Bir Billing Paraglider Nomad Den',
    organization: 'Thermal Winds Alpine Lodge',
    city: 'Bir Billing',
    state: 'Himachal Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    stayOffer: 'Panoramic Glider View Studio + Tibetan Breakfast & Dinner',
    stipendINR: 50000,
    durationWeeks: 4,
    hoursPerWeek: 14,
    skillsRequired: ['Full-stack App / Web Development', 'Local Experience Curation'],
    deliverables: [
      'Build pilot booking app for local certified tandem paragliders',
      'Document secret waterfall and monastery bike routes on digital map',
      'Organize weekly bonfire networking night for remote pilots and devs',
    ],
    amenitiesIncluded: ['150 Mbps Fiber', 'Solar Heated Water', 'Tandem Paragliding Flight', 'Tea Estate Bicycle'],
    hostBio: 'Cozy stone-and-timber mountain lodge located 300 meters from the world-famous Billing landing ground.',
    spotsAvailable: 2,
  },
];
