
export const MOCK_SUBJECT_STATES = [
  {
    id: 'ap-jcj',
    title: 'Andhra Pradesh Junior Civil Judge',
    image: require('../../assets/images/jcj2.png'),
  },
  {
    id: 'ts-jcj',
    title: 'Telangana Junior Civil Judge',
    image: require('../../assets/images/jcj2.png'),
  },
];

// Screen 2/3: Grid subjects per tab
export type GridSubject = {
  id: string;
  title: string;
  purchased: boolean;
  image: { uri: string };
};

export const MOCK_GRID_SUBJECTS: Record<'civil' | 'criminal', GridSubject[]> = {
  civil: [
    { id: 'cs1', title: 'N.I Act',        purchased: false, image: require('../../assets/images/jcj2.png') },
    { id: 'cs2', title: 'Limitation Act', purchased: true,  image: require('../../assets/images/jcj2.png') },
    { id: 'cs3', title: 'N.I Act',        purchased: false, image: require('../../assets/images/jcj2.png') },
    { id: 'cs4', title: 'Limitation Act', purchased: false, image: require('../../assets/images/jcj2.png') },
  ],
  criminal: [
    { id: 'cr1', title: 'N.I Act',        purchased: false, image: require('../../assets/images/jcj2.png') },
    { id: 'cr2', title: 'Limitation Act', purchased: true,  image: require('../../assets/images/jcj2.png') },
    { id: 'cr3', title: 'N.I Act',        purchased: false, image: require('../../assets/images/jcj2.png') },
    { id: 'cr4', title: 'Limitation Act', purchased: false, image: require('../../assets/images/jcj2.png') },
  ],
};

// Screen 4: Civil Laws subject list
export const MOCK_CIVIL_SUBJECTS = [
  {
    id: 'cpc',
    title: 'Civil Procedure Code',
    purchased: true,
    endsOn: '26th Jan',
    timeLeft: '2months left',
    duration: '2 years Course',
    image: require('../../assets/images/jcj2.png'),
  },
  {
    id: 'evidence',
    title: 'Indian Evidence Act',
    purchased: false,
    endsOn: null, timeLeft: null, duration: null,
    image: require('../../assets/images/jcj2.png'),
  },
  {
    id: 'property',
    title: 'Transfer Of Property Act',
    purchased: false,
    endsOn: null, timeLeft: null, duration: null,
    image: require('../../assets/images/jcj2.png'),
  },
  {
    id: 'relief',
    title: 'Specific Relief Act',
    purchased: false,
    endsOn: null, timeLeft: null, duration: null,
    image: require('../../assets/images/jcj2.png'),
  },
];

// Screen 5–8: Course detail
export const MOCK_SUBJECT_COURSE = {
  headerTitle: 'Andhra Pradesh JCJ Subject(Subject List)',
  title: 'Andhra Pradesh Junior Civil Judge Course',
  price: 45000,
  originalPrice: 90000,
  discount: 40,
  description:
    'Prepare effectively for the AP Junior Civil Judge Exam (Prelims & Mains) with our comprehensive course designed by expert faculty. The course offers separate classes for Civil Laws and Criminal Laws, ensuring clear understanding and focused learning.',
  highlights: [
    'Separate classes for Civil & Criminal Laws',
    'Covers Prelims and Mains',
    'Comprehensive notes provided',
    'Expert guidance for complete exam preparation',
  ],
  learningMaterials: { files: 250, videos: 200, tests: 500 },
  productOffering: [
    { icon: '📝', count: '14064', label: 'Mock Tests' },
    { icon: '📗', count: '250',   label: 'E-Books'   },
    { icon: '🎬', count: '390',   label: 'Videos'    },
    { icon: '❓', count: 'Dobut',  label: 'Solving'    },
  ],
  image: require('../../assets/images/jcj2.png'),
};

export const MOCK_SUBJECT_PLANS = [
  { id: 'p1', price: 45000,  originalPrice: 90000,  duration: 'for 1 year' },
  { id: 'p2', price: 90000,  originalPrice: 130000, duration: 'for 2 year' },
  { id: 'p3', price: 135000, originalPrice: 175000, duration: 'for 3 year' },
];