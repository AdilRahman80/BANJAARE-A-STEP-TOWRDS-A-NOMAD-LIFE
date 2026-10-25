export interface IndianOrigin {
  name: string;
  state: string;
  region: 'North India' | 'South India' | 'West India' | 'East & Northeast India' | 'Central India';
  isMajorHub: boolean;
  hubType: 'metro' | 'tier2' | 'student_hub';
}

export const INDIAN_ORIGINS: IndianOrigin[] = [
  // North India
  { name: 'New Delhi (NCR)', state: 'Delhi', region: 'North India', isMajorHub: true, hubType: 'metro' },
  { name: 'Chandigarh', state: 'Punjab/Haryana', region: 'North India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Jaipur', state: 'Rajasthan', region: 'North India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Lucknow', state: 'Uttar Pradesh', region: 'North India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Dehradun', state: 'Uttarakhand', region: 'North India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Amritsar', state: 'Punjab', region: 'North India', isMajorHub: false, hubType: 'tier2' },

  // South India
  { name: 'Bengaluru', state: 'Karnataka', region: 'South India', isMajorHub: true, hubType: 'metro' },
  { name: 'Chennai', state: 'Tamil Nadu', region: 'South India', isMajorHub: true, hubType: 'metro' },
  { name: 'Hyderabad', state: 'Telangana', region: 'South India', isMajorHub: true, hubType: 'metro' },
  { name: 'Kochi', state: 'Kerala', region: 'South India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Coimbatore', state: 'Tamil Nadu', region: 'South India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Mysuru', state: 'Karnataka', region: 'South India', isMajorHub: false, hubType: 'student_hub' },

  // West India
  { name: 'Mumbai', state: 'Maharashtra', region: 'West India', isMajorHub: true, hubType: 'metro' },
  { name: 'Pune', state: 'Maharashtra', region: 'West India', isMajorHub: true, hubType: 'student_hub' },
  { name: 'Ahmedabad', state: 'Gujarat', region: 'West India', isMajorHub: false, hubType: 'metro' },
  { name: 'Surat', state: 'Gujarat', region: 'West India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Nagpur', state: 'Maharashtra', region: 'West India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Goa', state: 'Goa', region: 'West India', isMajorHub: false, hubType: 'student_hub' },

  // East & Northeast India
  { name: 'Kolkata', state: 'West Bengal', region: 'East & Northeast India', isMajorHub: true, hubType: 'metro' },
  { name: 'Bhubaneswar', state: 'Odisha', region: 'East & Northeast India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Patna', state: 'Bihar', region: 'East & Northeast India', isMajorHub: false, hubType: 'tier2' },
  { name: 'Guwahati', state: 'Assam', region: 'East & Northeast India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Ranchi', state: 'Jharkhand', region: 'East & Northeast India', isMajorHub: false, hubType: 'tier2' },

  // Central India
  { name: 'Bhopal', state: 'Madhya Pradesh', region: 'Central India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Indore', state: 'Madhya Pradesh', region: 'Central India', isMajorHub: false, hubType: 'student_hub' },
  { name: 'Raipur', state: 'Chhattisgarh', region: 'Central India', isMajorHub: false, hubType: 'tier2' },
];

export const POPULAR_INDIAN_ORIGINS = [
  'New Delhi (NCR)',
  'Bengaluru',
  'Mumbai',
  'Pune',
  'Kolkata',
  'Hyderabad',
  'Chennai',
  'Jaipur',
  'Chandigarh',
  'Ahmedabad',
];
