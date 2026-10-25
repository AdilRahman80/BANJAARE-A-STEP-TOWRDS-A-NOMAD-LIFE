export interface NomadMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  currentCity: string;
  skills: string[];
  bio: string;
  workHours: string;
  status: 'Working from cafe' | 'Coworking space' | 'Free for coffee' | 'Hiking weekend';
}

export interface CommunityEvent {
  id: string;
  title: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  attendeesCount: number;
  category: 'Mastermind' | 'Co-work Sprint' | 'Sunset Mixer' | 'Outdoor Hike' | 'Dinner & Jam';
  description: string;
}

export interface CompanionRequest {
  id: string;
  authorName: string;
  authorRole: string;
  destination: string;
  timeframe: string;
  targetBudgetINR: number;
  lookingFor: 'Coliving Villa Split' | 'Coworking Partner' | 'Weekend Trek Companion';
  details: string;
  postedAgo: string;
}

export const NOMAD_MEMBERS_DATA: NomadMember[] = [
  {
    id: 'member-1',
    name: 'Devika Sen',
    role: 'Staff UI/UX Designer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    currentCity: 'Goa (Assagao)',
    skills: ['Figma', 'Design Systems', 'Micro-Interactions'],
    bio: 'Ex-Bangalore, now designing global travel products from northern Goan cafes. Morning swimmer, afternoon builder.',
    workHours: '09:00 - 14:00 IST',
    status: 'Coworking space',
  },
  {
    id: 'member-2',
    name: 'Rohan Mehta',
    role: 'Distributed Systems Engineer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    currentCity: 'Manali (Old Manali)',
    skills: ['Rust', 'Go', 'Kubernetes', 'Alpine Hiking'],
    bio: 'Working async with a Berlin startup. Love high-altitude trail running and cedar mist mornings.',
    workHours: '13:00 - 19:00 IST (CET overlap)',
    status: 'Working from cafe',
  },
  {
    id: 'member-3',
    name: 'Kabir & Tara',
    role: 'Travel Creators & Videographers',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    currentCity: 'Varkala, Kerala',
    skills: ['Cinematography', 'Drone Piloting', 'Color Grading'],
    bio: 'Documenting ocean cliffs and boutique stays. Sunset surf sessions every single day at North Cliff.',
    workHours: '10:00 - 15:00 IST',
    status: 'Free for coffee',
  },
  {
    id: 'member-4',
    name: 'Ananya Verma',
    role: 'Technical Writer & Web3 Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    currentCity: 'Rishikesh (Tapovan)',
    skills: ['Documentation', 'Ethereum', 'Smart Contracts'],
    bio: 'Daily morning pranayama on the Ganges followed by quiet deep writing sprints in riverside bakeries.',
    workHours: '08:00 - 13:00 IST',
    status: 'Coworking space',
  },
];

export const COMMUNITY_EVENTS_DATA: CommunityEvent[] = [
  {
    id: 'event-1',
    title: 'North Goa Sunset Nomad Mastermind',
    city: 'Goa',
    venue: 'Titlie Culinary Deck, Vagator',
    date: 'Every Thursday',
    time: '18:00 - 20:30',
    attendeesCount: 28,
    category: 'Sunset Mixer',
    description: 'Casual networking over drinks and woodfired pizza. Share revenue milestones, client lead swaps, and trade tips.',
  },
  {
    id: 'event-2',
    title: 'Old Manali High-Focus Deep Work Silent Sprint',
    city: 'Manali',
    venue: 'AltLife Himalayan Lounge',
    date: 'Every Tuesday & Friday',
    time: '10:00 - 13:30',
    attendeesCount: 16,
    category: 'Co-work Sprint',
    description: 'Zero interruptions, woodfire chimney, 160 Mbps fiber. 50-minute pomodoro cycles for deep engineering flow.',
  },
  {
    id: 'event-3',
    title: 'Varkala Ocean Cliff Morning Surf & Standup',
    city: 'Varkala',
    venue: 'Soul & Surf Lawn, North Cliff',
    date: 'Saturday Morning',
    time: '07:00 - 09:30',
    attendeesCount: 14,
    category: 'Outdoor Hike',
    description: 'Catch clean sunrise waves followed by a collective coconut water check-in with fellow coastal nomads.',
  },
  {
    id: 'event-4',
    title: 'Tapovan Riverside Acoustic Jam & Networking',
    city: 'Rishikesh',
    venue: 'Ganga View Terrace Tapovan',
    date: 'Sunday Evening',
    time: '19:00 - 21:30',
    attendeesCount: 22,
    category: 'Dinner & Jam',
    description: 'Live guitars, herbal tea, bonfire, and authentic conversations about living life on your own terms.',
  },
];

export const COMPANION_REQUESTS_DATA: CompanionRequest[] = [
  {
    id: 'comp-1',
    authorName: 'Siddharth P.',
    authorRole: 'Full-stack Rails / React Developer',
    destination: 'Manali, Himachal Pradesh',
    timeframe: 'Nov 15 - Dec 20 (5 Weeks)',
    targetBudgetINR: 28000,
    lookingFor: 'Coliving Villa Split',
    details: 'Looking to split a 2BHK heated wooden cottage in Old Manali. Must appreciate quiet focus hours during the day and weekend treks.',
    postedAgo: '3 hours ago',
  },
  {
    id: 'comp-2',
    authorName: 'Pooja Nair',
    authorRole: 'Growth Marketing Lead',
    destination: 'North Goa (Assagao / Siolim)',
    timeframe: 'Next 2 Months',
    targetBudgetINR: 35000,
    lookingFor: 'Coliving Villa Split',
    details: 'Renting a serene Portuguese heritage villa with private pool and 200 Mbps leased line. Looking for 1-2 chill remote professionals.',
    postedAgo: 'Yesterday',
  },
  {
    id: 'comp-3',
    authorName: 'Arjun K.',
    authorRole: 'Mobile App Developer',
    destination: 'Bir Billing, Himachal Pradesh',
    timeframe: 'October - November',
    targetBudgetINR: 24000,
    lookingFor: 'Weekend Trek Companion',
    details: 'Working weekdays from tea estate cafes. Looking for buddies to do the Rajgundha valley trek and tandem paragliding.',
    postedAgo: '2 days ago',
  },
];
