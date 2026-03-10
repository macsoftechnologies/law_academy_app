

export type MainsCardType = 'explore-only' | 'buy' | 'open';

export interface MainsCard {
  id: string;
  title: string;
  price?: string;
  type: MainsCardType;
  tags?: { label: string; bg: string; color: string }[];
  subtitle?: string;
  detailRoute: string;
  openRoute: string;
}

export const MAINS_CARDS: MainsCard[] = [

  {
    id: 'ap-jcj',
    title: 'AP Junior Civil Judge ',
    type: 'explore-only',
    detailRoute: '/(tabs)/mains/course-details',
    openRoute:   '/(tabs)/mains/sections',
  },
 
  {
    id: 'ap-ddj',
    title: 'AP Direct District Judge ',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/mains/course-details',
 
    openRoute:   '/(tabs)/mains/sections',
  },
 
  {
    id: 'ts-jcj',
    title: 'TS Junior Civil Judge ',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/main/course-detail',
    openRoute:   '/(tabs)/mains/sections',
  },
 
  {
    id: 'ts-ddj',
    title: 'TS Direct District Judge ',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/main/course-detail',
    openRoute:   '/(tabs)/mains/sections',
  },
  
  {
    id: 'ap-jcj-open',
    title: 'Andhra Pradesh DDJ Mains',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/mains/course-details',
    openRoute:   '/(tabs)/mains/sections',
  },
  
  {
    id: 'ap-ddj-open',
    title: 'Telangana DDJ Mains',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/mains/course-details',
    openRoute:   '/(tabs)/mains/sections',
  },
  
  {
    id: 'ts-ddj-open',
    title: 'Telangana DDJ Mains',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/mains/course-details',
    openRoute:   '/(tabs)/mains/sections',
  },
  
  {
    id: 'ts-ddj-open2',
    title: 'Telangana DDJ Mains',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/mains/course-details',
    openRoute:   '/(tabs)/mains/sections',
  },
];


export const MAINS_COURSE_DETAIL = {
  headerTitle: 'AP DDJ Mains',
  heroImage:   require('../../assets/images/combo_civil.png'),
  title:       'Andhra Pradesh Direct District\nJudge Course',
  price:       45000,
  originalPrice: 90000,
  discountPct: 40,
  aboutDesc:
    'Prepare effectively for the AP Junior Civil Judge Exam (Prelims & Mains) with our comprehensive course designed by expert faculty. The course offers separate classes for Civil Laws and Criminal Laws, ensuring clear understanding and focused learning.',
  learningMaterials: '100+ Learning Materials\n250 files, 200 Video, 500 Tests',
  bulletPoints: [
    'Separate classes for Civil & Criminal Laws',
    'Covers Prelims and Mains',
    'Comprehensive notes provided',
    'Expert guidance for complete exam preparation',
  ],
  extras: [
    { icon: '🎓', title: 'Guest Lectures', sub: 'Learn by top advocates' },
    { icon: '🖥️', title: 'Available on PC', sub: 'Wider screen, sharper quality' },
  ],
  extrasCta: 'Start your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right guidance and resources!',
  termsItems: [
    'Are you sure you want to start the Civil Laws Mains Test?',
    'Once the test begins, you must complete it within 3 hours.',
    "After submission time, you'll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.",
    'Once started, the test cannot be paused or restarted.',
  ],
  plans: [
    { id: '1y', label: '1 year', price: 45000,  originalPrice: 90000  },
    { id: '2y', label: '2 year', price: 90000,  originalPrice: 130000 },
    { id: '3y', label: '3 year', price: 135000, originalPrice: 175000 },
  ],
  summaryTitle:        'Andhra Pradesh Junior Civil Judge Course',
  summaryPrice:        90000,
  internetHandlingFee: 53,
};

// ── Sections screen (Image 6)
export const MAINS_SECTIONS_LIST = [
  {
    id: 'pyq',
    title: 'Mains Question & Answers',
    subtitle: 'Practice with model answers',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/mains/mainsprepqa',
  },
  {
    id: 'mock',
    title: 'Mains Essay & Translation',
    subtitle: 'Improve the skills',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/mains/mainsprepqa',
  },
  {
    id: 'grand',
    title: 'Mains Test Series',
    subtitle: 'Simulate exmas &track progress',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/mains/mains-test-series',
  },
];

// ── Section item screens (Image 7)
export const PYQ_ITEMS = [
  { id: 'p1', label: 'Mains Q&A-1', questions: 200, mins: 150 },
  { id: 'p2', label: 'Mains Q&A-2', questions: 200, mins: 150 },
  { id: 'p3', label: 'Mains Q&A-3', questions: 200, mins: 150 },
  
];
export const MOCK_TEST_ITEMS = [
  { id: 'm1', label: 'Subject Wise Mock Test - Civil',     questions: 200, mins: 150 },
  { id: 'm2', label: 'Subject Wise Mock Test - Criminal',  questions: 200, mins: 150 },
  { id: 'm3', label: 'Subject Wise Mock Test - Evidence',  questions: 200, mins: 150 },
  { id: 'm4', label: 'Subject Wise Mock Test - Property',  questions: 200, mins: 150 },
];
export const GRAND_TEST_ITEMS = [
  { id: 'g1', label: 'Grand Test - Series 1', questions: 200, mins: 150 },
  { id: 'g2', label: 'Grand Test - Series 2', questions: 200, mins: 150 },
  { id: 'g3', label: 'Grand Test - Series 3', questions: 200, mins: 150 },
  { id: 'g4', label: 'Grand Test - Series 4', questions: 200, mins: 150 },
];
export const QUIZ_ITEMS = [
  { id: 'q1', label: 'Quiz - Civil Laws',    questions: 200, mins: 150 },
  { id: 'q2', label: 'Quiz - Criminal Laws', questions: 200, mins: 150 },
  { id: 'q3', label: 'Quiz - Evidence Act',  questions: 200, mins: 150 },
  { id: 'q4', label: 'Quiz - Property Laws', questions: 200, mins: 150 },
];

export const TEST_SUBJECTS = [
  {
    id: 'civil',
    title: 'Civil Law Test Series -1',
    questions: 30,
    hours: 3,
    subjectName: 'Civil Laws',
  },
  {
    id: 'criminal',
    title: 'Criminal Law Test Series -1',
    questions: 30,
    hours: 3,
    subjectName: 'Criminal Laws',
  },
  {
    id: 'essay',
    title: 'Essay & Translation Test Series -1',
    questions: 30,
    hours: 3,
    subjectName: 'Essay & Translation',
  },
];

