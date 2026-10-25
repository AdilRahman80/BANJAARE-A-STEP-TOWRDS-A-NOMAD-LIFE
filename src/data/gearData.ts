export interface GearItem {
  id: string;
  name: string;
  category: 'tech' | 'ergonomics' | 'documents' | 'essentials';
  description: string;
  isPacked: boolean;
  isEssential: boolean;
  recommendationNote?: string;
}

export const INITIAL_NOMAD_GEAR: GearItem[] = [
  // Tech & Connectivity
  {
    id: 'gear-1',
    name: 'Universal Travel Adapter (GaN 65W+)',
    category: 'tech',
    description: 'Fast-charges laptop and phone simultaneously from one wall outlet.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Look for multi-plug US/EU/UK/IN pins with dual USB-C ports.',
  },
  {
    id: 'gear-2',
    name: 'Airline-Compliant Power Bank (20,000 mAh / <100Wh)',
    category: 'tech',
    description: 'Safe for flight carry-on (under DGCA & TSA 100Wh limit) to survive mountain power cuts.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Crucial for remote Himachal & Kerala monsoon power cuts.',
  },
  {
    id: 'gear-3',
    name: 'Noise-Cancelling Headphones (ANC)',
    category: 'tech',
    description: 'Vital for client meetings from busy beach shacks and noisy cafes.',
    isPacked: false,
    isEssential: true,
    recommendationNote: 'Sony WH-1000XM or Bose QuietComfort recommended.',
  },
  {
    id: 'gear-4',
    name: 'Backup Mobile Hotspot / Dual-SIM (Jio + Airtel)',
    category: 'tech',
    description: 'Having both networks ensures 4G/5G backup when local broadband goes down.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Airtel has superior mountain coverage; Jio leads coastal areas.',
  },
  {
    id: 'gear-5',
    name: 'Portable USB-C External Monitor (15.6")',
    category: 'tech',
    description: 'Doubles screen real estate for coding and multitasking from hotel desks.',
    isPacked: false,
    isEssential: false,
    recommendationNote: 'Lightweight (under 800g) matte screen models work best.',
  },

  // Ergonomics & Workstation
  {
    id: 'gear-6',
    name: 'Ultra-Light Laptop Stand (Roost / Nexstand)',
    category: 'ergonomics',
    description: 'Elevates laptop screen to eye level to prevent cervical neck pain.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Folds to the size of a baton, under 200 grams.',
  },
  {
    id: 'gear-7',
    name: 'Compact Wireless Bluetooth Keyboard & Mouse',
    category: 'ergonomics',
    description: 'Enables natural typing posture paired with the elevated laptop stand.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Logitech Pebble or MX Keys Mini are traveler favorites.',
  },
  {
    id: 'gear-8',
    name: 'Multi-Plug Surge Protector Strip (3-Outlet)',
    category: 'ergonomics',
    description: 'Old homestays and hostel dorms rarely have more than 1 socket near the bed.',
    isPacked: false,
    isEssential: true,
  },

  // Documents & Banking
  {
    id: 'gear-9',
    name: 'Zero-Forex Markup Debit / Credit Card',
    category: 'documents',
    description: 'Niyo Global, Scapia, or OneCard to save 3.5% foreign currency exchange markup.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'Save ₹3,500 on every ₹1 Lakh international transaction.',
  },
  {
    id: 'gear-10',
    name: 'Inner Line Permit (ILP) Copies / Passport Photos',
    category: 'documents',
    description: 'Mandatory for Ladakh, Spiti, Sikkim, and Northeast border checkpoints.',
    isPacked: false,
    isEssential: true,
    recommendationNote: 'Keep 6 physical passport photos and 5 photocopies of Govt ID.',
  },
  {
    id: 'gear-11',
    name: 'Medical & Nomad Travel Insurance Document',
    category: 'documents',
    description: 'Coverage for trekking accidents, hospital stays, and gear theft.',
    isPacked: true,
    isEssential: true,
    recommendationNote: 'SafetyWing Nomad Insurance or domestic emergency health policy.',
  },

  // Essentials & Climate
  {
    id: 'gear-12',
    name: 'Waterproof Dry Bag & Backpack Rain Cover',
    category: 'essentials',
    description: 'Protects laptops, cameras, and drives during monsoon treks and boat transfers.',
    isPacked: true,
    isEssential: true,
  },
  {
    id: 'gear-13',
    name: 'Microfiber Quick-Dry Towel',
    category: 'essentials',
    description: 'Compact, antimicrobial, and dries in under an hour in beach shacks.',
    isPacked: false,
    isEssential: false,
  },
  {
    id: 'gear-14',
    name: 'UV Water Purifier Bottle (LifeStraw / LARQ)',
    category: 'essentials',
    description: 'Safe hydration across remote trails without buying single-use plastic bottles.',
    isPacked: false,
    isEssential: true,
  },
];
