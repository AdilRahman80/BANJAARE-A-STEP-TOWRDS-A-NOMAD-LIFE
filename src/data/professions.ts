import { NomadProfession } from '../types/trip';

export interface ProfessionMeta {
  id: NomadProfession;
  label: string;
  category: 'Tech' | 'Creative' | 'Business' | 'Education' | 'Emerging';
  emoji: string;
  avgMonthlyINR: number;  // Illustrative mid-range freelance/remote income in INR
  minWifiBandwidth: string; // e.g. '5 Mbps', '25 Mbps', '50 Mbps'
  toolsNeeded: string[];
  tagline: string;
}

export const PROFESSION_LIST: ProfessionMeta[] = [
  // Tech
  {
    id: 'software_engineer',
    label: 'Software Engineer',
    category: 'Tech',
    emoji: '💻',
    avgMonthlyINR: 90000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Stable Internet'],
    tagline: 'Ship code from mountains to beaches',
  },
  {
    id: 'frontend_developer',
    label: 'Frontend Developer',
    category: 'Tech',
    emoji: '🎨',
    avgMonthlyINR: 75000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Browser DevTools'],
    tagline: 'Build UIs with a view',
  },
  {
    id: 'devops_engineer',
    label: 'DevOps / Cloud Engineer',
    category: 'Tech',
    emoji: '⚙️',
    avgMonthlyINR: 100000,
    minWifiBandwidth: '15 Mbps',
    toolsNeeded: ['Laptop', 'VPN', 'Cloud Access'],
    tagline: 'Manage infra from a café',
  },
  {
    id: 'data_scientist',
    label: 'Data Scientist',
    category: 'Tech',
    emoji: '📊',
    avgMonthlyINR: 85000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Cloud Compute'],
    tagline: 'Run models, not errands',
  },
  {
    id: 'ai_ml_engineer',
    label: 'AI / ML Engineer',
    category: 'Tech',
    emoji: '🤖',
    avgMonthlyINR: 110000,
    minWifiBandwidth: '20 Mbps',
    toolsNeeded: ['Laptop', 'GPU Cloud Access'],
    tagline: 'Train models from any timezone',
  },
  {
    id: 'technical_writer',
    label: 'Technical Writer',
    category: 'Tech',
    emoji: '📝',
    avgMonthlyINR: 55000,
    minWifiBandwidth: '5 Mbps',
    toolsNeeded: ['Laptop'],
    tagline: 'Document the world while you explore it',
  },
  // Creative
  {
    id: 'ui_ux_designer',
    label: 'UI / UX Designer',
    category: 'Creative',
    emoji: '🖌️',
    avgMonthlyINR: 70000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Figma / Adobe Cloud'],
    tagline: 'Design beautiful things in beautiful places',
  },
  {
    id: 'video_editor',
    label: 'Video Editor / Reels Creator',
    category: 'Creative',
    emoji: '🎬',
    avgMonthlyINR: 60000,
    minWifiBandwidth: '50 Mbps',
    toolsNeeded: ['Laptop', 'External SSD', 'Strong WiFi'],
    tagline: 'The travel is the content',
  },
  {
    id: 'content_writer',
    label: 'Content Writer / Copywriter',
    category: 'Creative',
    emoji: '✍️',
    avgMonthlyINR: 45000,
    minWifiBandwidth: '5 Mbps',
    toolsNeeded: ['Laptop'],
    tagline: 'Write from anywhere, sell everywhere',
  },
  {
    id: 'social_media_manager',
    label: 'Social Media Manager',
    category: 'Creative',
    emoji: '📱',
    avgMonthlyINR: 50000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Smartphone'],
    tagline: 'Manage brands on the move',
  },
  {
    id: 'photographer',
    label: 'Photographer / Videographer',
    category: 'Creative',
    emoji: '📸',
    avgMonthlyINR: 55000,
    minWifiBandwidth: '20 Mbps',
    toolsNeeded: ['Camera', 'Laptop', 'External SSD'],
    tagline: 'Your portfolio grows with every km',
  },
  // Business
  {
    id: 'digital_marketer',
    label: 'Digital Marketing Specialist',
    category: 'Business',
    emoji: '📈',
    avgMonthlyINR: 65000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Ad Platforms Access'],
    tagline: 'Run campaigns from co-working cafés',
  },
  {
    id: 'seo_specialist',
    label: 'SEO Specialist',
    category: 'Business',
    emoji: '🔍',
    avgMonthlyINR: 50000,
    minWifiBandwidth: '5 Mbps',
    toolsNeeded: ['Laptop'],
    tagline: 'Rank pages while you rank destinations',
  },
  {
    id: 'virtual_assistant',
    label: 'Virtual Assistant',
    category: 'Business',
    emoji: '🤝',
    avgMonthlyINR: 35000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Reliable WiFi'],
    tagline: 'Assist globally, live freely',
  },
  {
    id: 'project_manager',
    label: 'Project Manager (Remote Agile)',
    category: 'Business',
    emoji: '🗂️',
    avgMonthlyINR: 80000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Notion / Jira'],
    tagline: 'Lead distributed teams, pick your timezone',
  },
  {
    id: 'financial_analyst',
    label: 'Financial Analyst (Freelance)',
    category: 'Business',
    emoji: '💹',
    avgMonthlyINR: 70000,
    minWifiBandwidth: '5 Mbps',
    toolsNeeded: ['Laptop', 'Excel / Python'],
    tagline: 'Model finances, not commutes',
  },
  // Education
  {
    id: 'online_tutor',
    label: 'Online Tutor / EdTech Educator',
    category: 'Education',
    emoji: '🎓',
    avgMonthlyINR: 40000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Webcam', 'Microphone'],
    tagline: 'Teach from peaceful places',
  },
  {
    id: 'career_coach',
    label: 'Career / Life Coach',
    category: 'Education',
    emoji: '🧭',
    avgMonthlyINR: 60000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Zoom'],
    tagline: 'Guide others while you journey yourself',
  },
  // Emerging
  {
    id: 'web3_developer',
    label: 'Web3 / Blockchain Developer',
    category: 'Emerging',
    emoji: '⛓️',
    avgMonthlyINR: 120000,
    minWifiBandwidth: '15 Mbps',
    toolsNeeded: ['Laptop', 'Crypto Wallet'],
    tagline: 'Decentralized work, decentralized life',
  },
  {
    id: 'travel_blogger',
    label: 'Travel Blogger / Creator',
    category: 'Emerging',
    emoji: '🌍',
    avgMonthlyINR: 45000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop', 'Camera', 'Smartphone'],
    tagline: 'The journey is the job',
  },
  {
    id: 'other',
    label: 'Other / Custom Role',
    category: 'Business',
    emoji: '🚀',
    avgMonthlyINR: 60000,
    minWifiBandwidth: '10 Mbps',
    toolsNeeded: ['Laptop'],
    tagline: 'Define your own nomad path',
  },
];

export const PROFESSION_CATEGORIES = [
  'Tech',
  'Creative',
  'Business',
  'Education',
  'Emerging',
] as const;

export function getProfessionMeta(id: NomadProfession): ProfessionMeta {
  return PROFESSION_LIST.find((p) => p.id === id) ?? PROFESSION_LIST[PROFESSION_LIST.length - 1];
}

/** Illustrative avg monthly income by profession ID */
export const PROFESSION_AVG_INCOME: Record<NomadProfession, number> = Object.fromEntries(
  PROFESSION_LIST.map((p) => [p.id, p.avgMonthlyINR])
) as Record<NomadProfession, number>;
