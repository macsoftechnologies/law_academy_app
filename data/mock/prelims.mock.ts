// data/mock/prelims.mock.ts

export type PrelimsCardType = 'explore-only' | 'buy' | 'open';

export interface PrelimsCard {
  id: string;
  title: string;
  price?: string;
  type: PrelimsCardType;
  tags?: { label: string; bg: string; color: string }[];
  subtitle?: string;
  detailRoute: string;
  openRoute: string;
}

export const PRELIMS_CARDS: PrelimsCard[] = [
  // ── explore-only: AP JCJ Prelims
  {
    id: 'ap-jcj',
    title: 'AP JCJ Prelims',
    type: 'explore-only',
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── buy: AP DDJ Prelims
  {
    id: 'ap-ddj',
    title: 'AP DDJ Prelims',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── buy: TS JCJ Prelims
  {
    id: 'ts-jcj',
    title: 'TS JCJ Prelims',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── buy: TS DDJ Prelims
  {
    id: 'ts-ddj',
    title: 'TS DDJ Prelims',
    price: '₹499',
    type: 'buy',
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── open: Andhra Pradesh JCJ Prelims
  {
    id: 'ap-jcj-open',
    title: 'Andhra Pradesh JCJ\nPrelims',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── open: Andhra Pradesh DDJ Prelims
  {
    id: 'ap-ddj-open',
    title: 'Andhra Pradesh DDJ\nPrelims',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── open: Telangana DDJ Prelims
  {
    id: 'ts-ddj-open',
    title: 'Telangana DDJ\nPrelims',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
  // ── open: Telangana DDJ Prelims (2nd)
  {
    id: 'ts-ddj-open2',
    title: 'Telangana DDJ Prelims',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    detailRoute: '/(tabs)/prelims/course-detail',
    openRoute:   '/(tabs)/prelims/sections',
  },
];

// ── Course detail data (Images 3, 4, 5)
export const PRELIMS_COURSE_DETAIL = {
  headerTitle: 'AP DDJ Prelims',
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
export const PRELIMS_SECTIONS_LIST = [
  {
    id: 'pyq',
    title: 'Previous Year Questions',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/prelims/previous-year-questions',
  },
  {
    id: 'mock',
    title: 'Subject Wise Mock Tests',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/prelims/subject-wise-mock-tests',
  },
  {
    id: 'grand',
    title: 'Grand Tests',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/prelims/grand-tests',
  },
  {
    id: 'quiz',
    title: 'Quizzes',
    questions: 200, mins: 150,
    image: require('../../assets/images/combo_civil.png'),
    route: '/(tabs)/prelims/quizzes',
  },
];

// ── Section item screens (Image 7)
export const PYQ_ITEMS = [
  { id: 'p1', label: 'Previous Year Questions 24-25', questions: 200, mins: 150 },
  { id: 'p2', label: 'Previous Year Questions 23-24', questions: 200, mins: 150 },
  { id: 'p3', label: 'Previous Year Questions 23-24', questions: 200, mins: 150 },
  { id: 'p4', label: 'Previous Year Questions 23-24', questions: 200, mins: 150 },
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