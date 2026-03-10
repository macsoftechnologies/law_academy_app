// data/mock/jcj.mock.ts

export const MOCK_JCJ_COURSES = [
  {
    id: 'ap-jcj',
    title: 'Andhra Pradesh Junior Civil Judge',
    price: 90000,
    originalPrice: 130000,
    purchased: false,
    image: require('../../assets/images/jcj2.png'),
  },
];

export const MOCK_JCJ_PURCHASED = [
  {
    id: 'ap-jcj-p',
    title: 'Andhra Pradesh Junior Civil Judge',
    endsOn: '26th Jan',
    timeLeft: '2months left',
    duration: '2 years Course',
    image: require('../../assets/images/jcj1.png'),
  },
];

export const MOCK_COURSE_DETAIL = {
  id: 'ap-jcj-detail',
  title: 'Andhra Pradesh Junior Civil Judge Course',
  price: 45000,
  originalPrice: 90000,
  rating: 4.2,
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
  extras: [
    { icon: '🎓', label: 'Guest Lectures', sub: 'Learn by top advocates' },
    { icon: '💻', label: 'Available on PC', sub: 'Wider screen, sharper quality' },
  ],
  image: require('../../assets/images/jcj2.png'),
};

export const MOCK_PLANS = [
  { id: 'p1', price: 45000,  originalPrice: 90000,  duration: 'for 1 year' },
  { id: 'p2', price: 90000,  originalPrice: 130000, duration: 'for 2 year' },
  { id: 'p3', price: 135000, originalPrice: 175000, duration: 'for 3 year' },
];

export const MOCK_SUBJECT_CATEGORIES = [
  {
    id: 'civil',
    title: 'Civil Laws',
    image: require('../../assets/images/jcj2.png'),
  },
  {
    id: 'criminal',
    title: 'Criminal Laws',
    image: require('../../assets/images/jcj2.png'),
  },
];

export const MOCK_SUBJECTS = [
  {
    id: 'cpc',
    title: 'Civil Procedure Code',
    image: require('../../assets/images/jcj2.png'),
    favorited: false,
  },
  {
    id: 'evidence',
    title: 'Indian Evidence Act',
   image: require('../../assets/images/jcj2.png'),
    favorited: false,
  },
  {
    id: 'property',
    title: 'Transfer Of Property Act',
    image: require('../../assets/images/jcj2.png'),
    favorited: false,
  },
  {
    id: 'relief',
    title: 'Specific Relief Act',
    image: require('../../assets/images/jcj2.png'),
    favorited: false,
  },
];

export const MOCK_LECTURES = [
  {
    id: 'l1',
    number: 1,
    title: 'Introduction Of Civil Procedure Code',
    instructor: 'Srinivas',
    locked: false,
    image: require('../../assets/images/jcj2.png'),
    duration: '2:52:02',
  },
  {
    id: 'l2',
    number: 2,
    title: 'Title Description',
    instructor: 'Srinivas',
    locked: true,
    image: require('../../assets/images/jcj2.png'),
    duration: '1:45:00',
  },
  {
    id: 'l3',
    number: 3,
    title: 'Section 1 - Section 25',
    instructor: 'Srinivas',
    locked: true,
    image: require('../../assets/images/jcj2.png'),
    duration: '2:44:00',
  },
  {
    id: 'l4',
    number: 4,
    title: 'Section 26 - Order 1',
    instructor: 'Srinivas',
    locked: true,
    image: require('../../assets/images/jcj2.png'),
    duration: '3:10:00',
  },
];

export const MOCK_LECTURE_DETAIL = {
  id: 'l1',
  number: 1,
  title: 'Introduction Of Civil Procedure Code',
  description:
    'This introductory video class provides a foundational understanding of the Code of Civil Procedure, 1908 (CPC), the cornerstone legislation governing civil justice administration in India.\n\nStart your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right guidance and resources!',
  image: require('../../assets/images/jcj2.png'),
  duration: '2:52:02',
  hasNotesPDF: true,
};