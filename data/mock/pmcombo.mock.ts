// data/mock/pmcombo.mock.ts

export const PMCOMBO_CARDS = [
  {
    id: 'civil-notes',
    title: 'AP JCJ Civil Laws Notes',
    image: require('../../assets/images/combo_civil.png'),
    route: '/combo/pmcombo/civil-notes',
    price: null,
  },
  {
    id: 'prelims',
    title: 'AP JCJ Prelims',
    image: require('../../assets/images/combo_civil.png'),
    route: '/combo/pmcombo/prelims',
    price: null,
  },
  {
    id: 'mains',
    title: 'AP JCJ Mains',
    image: require('../../assets/images/combo_civil.png'),
    route: '/combo/pmcombo/mains',
    price: '₹499',
  },
];

// Screen 2 — Civil Laws Notes subjects list
export const PMCOMBO_CIVIL_NOTES = [
  {
    id: 'demo',
    title: 'Demo Notes',
    locked: false,
    pdf: require('../../assets/demo.pdf'), 
  },
  { id: 'cpc', title: 'Civil Procedure Code Notes', locked: true },
  { id: 'evidence', title: 'Indian Evidence Act', locked: true },
  { id: 'transfer', title: 'Transfer Of Property Act', locked: true },
  { id: 'relief', title: 'Specific Relief Act', locked: true },
  { id: 'lim', title: 'Limitation Act', locked: true },
];

// Screen 4 — AP JCJ Prelims sections
export const PMCOMBO_PRELIMS_SECTIONS = [
  {
    id: 'pyq',
    title: 'Previous Year Questions',
    subtitle: null,
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'mock',
    title: 'Subject Wise Mock Tests',
    subtitle: null,
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'grand',
    title: 'Grand Tests',
    subtitle: null,
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'quiz',
    title: 'Quizzs',
    subtitle: null,
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
];

// Screen 6 — AP JCJ Mains sections
export const PMCOMBO_MAINS_SECTIONS = [
  {
    id: 'qa',
    title: 'Mains Question & Answers',
    subtitle: 'Practice With Model Answers',
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'essay',
    title: 'Mains Essay & Translation',
    subtitle: 'Improve The Skills',
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'series',
    title: 'Mains Test Series',
    subtitle: 'Simulate Exams & Track Progress',
    questions: 200,
    mins: 150,
    image: require('../../assets/images/combo_civil.png'),
  },
];

// Subjects inside a Prelims/Mains section
export const PMCOMBO_SECTION_SUBJECTS = [
  { id: 's1', title: 'Demo Content',         locked: false, tags: ['25 Topics', '5 Tests'] },
  { id: 's2', title: 'Civil Procedure Code', locked: true,  tags: ['40 Topics', '10 Tests'] },
  { id: 's3', title: 'Indian Evidence Act',  locked: true,  tags: ['30 Topics', '8 Tests'] },
  { id: 's4', title: 'Transfer Of Property', locked: true,  tags: ['22 Topics', '6 Tests'] },
  { id: 's5', title: 'Specific Relief Act',  locked: true,  tags: ['18 Topics', '4 Tests'] },
];

// Screen 8 — course detail / buy
export const PMCOMBO_COURSE_DETAIL = {
  title: 'Andhra Pradesh JCJ Notes, Prelims & Mains',
  image: require('../../assets/images/combo_civil.png'),
  price: 45000,
  originalPrice: 90000,
  discount: 40,

  description:
    'Boost your exam preparation with our comprehensive AP JCJ Civil & Criminal Combo Course, thoughtfully designed to cover all essential subjects in one powerful package.',

  includes: [
    'AP JCJ Civil',
    'Civil Procedure Code (CPC)',
    'Indian Evidence Act',
    'AP JCJ Criminal',
    'Criminal Procedure Code (CrPC)',
    'Negotiable Instruments Act (NI Act)',
  ],

  highlights: [
    '100+ Learning Materials — 250 files, 200 Video, 500 Tests',
    'Separate classes for Civil & Criminal Laws',
    'Covers Prelims and Mains',
    'Comprehensive notes provided',
    'Expert guidance for complete exam preparation',
  ],

  // ✅ FIXED — Now array (so .map works)
  stats: [
    { icon: '📝', value: '390+', label: 'Test Series' },
    { icon: '❓', value: null,    label: 'Doubt Solving' },
    { icon: '💻', value: null,    label: 'Available on PC' },
  ],

  // ✅ ADDED — So D.termsItems.map works
  termsItems: [
    'Course access is valid only for selected duration.',
    'No refund will be provided after purchase.',
    'Content is strictly for personal use.',
    'Sharing login credentials is prohibited.',
  ],

  plans: [
    { id: '1y', label: '1 year', price: 45000,  originalPrice: 90000  },
    { id: '2y', label: '2 year', price: 90000,  originalPrice: 130000 },
    { id: '3y', label: '3 year', price: 135000, originalPrice: 175000 },
  ],

  internetHandlingFee: 53,
};