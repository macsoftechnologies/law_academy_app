export const MOCK_COMBO_CATEGORIES = [
  {
    id: 'civil',
    title: 'Civil Laws',
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'criminal',
    title: 'Criminal Laws',
    image: require('../../assets/images/combo_civil.png'),
  },
  
];

// Screen 2: Subjects under a category
export const MOCK_COMBO_SUBJECTS: Record<string, ComboSubject[]> = {
  civil: [
    {
      id: 'cpc',
      title: 'Civil Procedure Code',
      image: require('../../assets/images/combo_civil.png'),
    },
    {
      id: 'evidence',
      title: 'Indian Evidence Act',
      image: require('../../assets/images/combo_civil.png'),
    },
  ],
  criminal: [
    {
      id: 'crpc',
      title: 'Criminal Procedure Code',
      image: require('../../assets/images/combo_civil.png'),
    },
    {
      id: 'ni-act',
      title: 'Negotiable Instruments Act',
      image: require('../../assets/images/combo_civil.png'),
    },
  ],
};

export type ComboSubject = {
  id: string;
  title: string;
  image: { uri: string };
};

// Screen 3: Lectures under a subject
// paid: true  → no lock overlay, clean thumbnail
// paid: false → dark overlay + lock icon
export const MOCK_COMBO_LECTURES: ComboLecture[] = [
  {
    id: 'l1',
    number: 1,
    title: 'Introduction Of Civil Procedure Code',
    instructor: 'Srinivas',
    paid: true,
    image: require('../../assets/images/combo_civil.png'),
    duration: '2:52:02',
  },
  {
    id: 'l2',
    number: 2,
    title: 'Title Description',
    instructor: 'Srinivas',
    paid: false,
    image: require('../../assets/images/combo_civil.png'),
    duration: '1:45:00',
  },
  {
    id: 'l3',
    number: 3,
    title: 'Section 1 - Section 25',
    instructor: 'Srinivas',
    paid: false,
    image: require('../../assets/images/combo_civil.png'),
    duration: '2:44:00',
  },
];

export type ComboLecture = {
  id: string;
  number: number;
  title: string;
  instructor: string;
  paid: boolean;
  image: { uri: string };
  duration: string;
};

// Screen 4: Lecture detail
export const MOCK_COMBO_LECTURE_DETAIL = {
  title: 'Introduction Of Civil Procedure Code',
  description:
    'This introductory video class provides a foundational understanding of the Code of Civil Procedure, 1908 (CPC), the cornerstone legislation governing civil justice administration in India.\n\nStart your journey to becoming a Junior Civil Judge in Andhra Pradesh with the right guidance and resources!',
  image: require('../../assets/images/combo_civil.png'),
  duration: '2:52:02',
};

// Screen 5–8: Combo course detail
export const MOCK_COMBO_COURSE = {
  headerTitle: 'Combo of AP Civil & Criminal',
  title: 'Andhra Pradesh JCJ Civil & Criminal',
  price: 45000,
  originalPrice: 90000,
  discount: 40,
  description:
    'Boost your exam preparation with our comprehensive AP JCJ Civil & Criminal Combo Course, thoughtfully designed to cover all essential subjects in one powerful package.',
  whatsIncluded: [
    {
      category: 'AP JCJ Civil',
      items: ['Civil Procedure Code (CPC)', 'Indian Evidence Act'],
    },
    {
      category: 'AP JCJ Criminal',
      items: ['Criminal Procedure Code (CrPC)', 'Negotiable Instruments Act (NI Act)'],
    },
  ],
  learningMaterials: { files: 250, videos: 200, tests: 500 },
  highlights: [
    'Separate classes for Civil & Criminal Laws',
    'Covers Prelims and Mains',
    'Comprehensive notes provided',
    'Expert guidance for complete exam preparation',
  ],
  productOffering: [
    { icon: '🎬', count: '390',  label: 'Videos'          },
    { icon: '❓', count: 'Dobu', label: 'Solving'         },
    { icon: '💻', count: '',     label: 'Available on PC' },
  ],
  image: require('../../assets/images/combo_civil.png'),
};

export const MOCK_COMBO_PLANS = [
  { id: 'p1', price: 45000,  originalPrice: 90000,  duration: 'for 1 year' },
  { id: 'p2', price: 90000,  originalPrice: 130000, duration: 'for 2 year' },
  { id: 'p3', price: 135000, originalPrice: 175000, duration: 'for 3 year' },
];