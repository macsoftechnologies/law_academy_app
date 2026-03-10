// data/mock/notes.mock.ts

export type NoteCardType = 'explore-only' | 'buy' | 'buy-printed' | 'open' | 'open-printed';

export interface NoteCard {
  id: string;
  title: string;
  price: string;
  type: NoteCardType;
  tags?: { label: string; bg: string; color: string }[];
  subtitle?: string;
  image: any;
  detailRoute: string;
  openRoute: string;
}

export const NOTES_LIST: NoteCard[] = [
  // ── Card 1: explore-only — single Explore more button
  {
    id: 'jcj',
    title: 'AP JCJ Notes',
    price: '₹499',
    type: 'explore-only',
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/detail',
    openRoute: '/notes/subjects',
  },

  // ── Card 2: buy — [Explore More | Add to cart] + Buy Now, no badge
  {
    id: 'ddj',
    title: 'AP DDJ Notes',
    price: '₹499',
    type: 'buy',
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/detail',
    openRoute: '/notes/subjects',
  },

  // ── Card 3: buy-printed — same as buy but has Printed Notes badge
  //    ALL buttons redirect to /notes/printed-notes
  {
    id: 'ddj-printed',
    title: 'AP DDJ Notes',
    price: '₹499',
    type: 'buy-printed',
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/printed-notes',
    openRoute: '/notes/printed-notes',
  },

  // ── Card 4: buy — TS JCJ, no badge
  {
    id: 'ts-jcj',
    title: 'TS JCJ Notes',
    price: '₹499',
    type: 'buy',
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/detail',
    openRoute: '/notes/subjects',
  },

  // ── Card 5: open — Andhra Pradesh JCJ, with tags, Open button
  {
    id: 'ap-jcj-open',
    title: 'Andhra Pradesh JCJ\nNotes',
    price: '₹499',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/detail',
    openRoute: '/notes/subjects',
  },

  // ── Card 6: open-printed — Andhra Pradesh DDJ, with tags + Printed Notes badge
  //    Open button → /notes/printed-notes
  {
    id: 'ap-ddj-open',
    title: 'Andhra Pradesh DDJ\nNotes',
    price: '₹499',
    type: 'open-printed',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/printed-notes',
    openRoute: '/notes/printed-notes',
  },

  // ── Card 7: open — Telangana JCJ, with tags, Open button
  {
    id: 'ts-jcj-open',
    title: 'Telangana JCJ Notes',
    price: '₹499',
    type: 'open',
    subtitle: 'Ends on 26th Jan',
    tags: [
      { label: '2months left',   bg: '#FFF3E0', color: '#E65100' },
      { label: '2 years Course', bg: '#E3F2FD', color: '#1565C0' },
    ],
    image: require('../../assets/images/combo_civil.png'),
    detailRoute: '/notes/detail',
    openRoute: '/notes/subjects',
  },
];

// ── Detail screen data
export const NOTE_DETAIL = {
  headerTitle: 'AP DDJ Notes',
  previewText: `(a) The "participatory model" which emphasises a transformative governance of the community is the mainstream of the strong juvenile and the maximisation of legal intervention in their lives.\n\nPrinciples under the Juvenile Justice (Care and Protection of Children) Act 2015`,
  aboutTitle: 'AP Direct District Judge Notes',
  aboutEmoji: '📕',
  aboutDesc: 'The essential books for the AP Junior Civil Judge exam are the Bare Acts for statutory accuracy, Standard Textbooks for conceptual depth and case law, and dedicated Judicial Services Manuals for exam-specific practice.',
  topicsTitle: 'Total topics covered in this book',
  topics: [
    {
      section: 'I. Civil Laws',
      items: [
        'Code of Civil Procedure, 1908 (CPC)',
        'Indian Contract Act, 1872',
        'Transfer of Property Act, 1882 (TPA)',
        'Specific Relief Act, 1963',
        'Indian Easement Act, 1882',
        'The Limitation Act, 1963',
        'The Indian Evidence Act, 1872 (Common to both Civil and Criminal)',
        'The Hindu Marriage Act, 1955',
        'The Hindu Succession Act, 1956',
        'The Registration Act, 1908',
        'The Indian Stamp Act, 1899',
        'The Andhra Pradesh Land Encroachment Act, 1905',
        'The Civil Rules of Practice',
      ],
    },
    {
      section: 'II. Criminal Laws',
      items: [
        'Code of Criminal Procedure, 1973 (CrPC)',
        'The Indian Penal Code, 1860 (IPC)',
        'The Indian Evidence Act, 1872 (Common to both Civil and Criminal)',
        'The Negotiable Instruments Act, 1881 (Relevant sections, especially Dishonour of Cheques)',
        'The Protection of Women from Domestic Violence Act, 2005',
        'The Juvenile Justice (Care and Protection of Children) Act, 2015',
        'The Andhra Pradesh Excise Act, 1968',
        'The Andhra Pradesh Gaming Act, 1974',
        'The Criminal Rules of Practice',
      ],
    },
  ],
  pricing: { mrp: 599, price: 499, shipping: 50 },
  plans: [
    { id: '1y', label: '1 year',  price: 45000,  originalPrice: 90000  },
    { id: '2y', label: '2 year',  price: 90000,  originalPrice: 130000 },
    { id: '3y', label: '3 year',  price: 135000, originalPrice: 175000 },
  ],
  internetHandlingFee: 53,
  summaryTitle: 'Andhra Pradesh Junior Civil Judge Course',
  summaryPrice: 90000,
  termsItems: [
    'Are you sure you want to start the Civil Laws Mains Test?',
    'Once the test begins, you must complete it within 3 hours.',
    "After submission time, you'll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.",
    'Once started, the test cannot be paused or restarted.',
  ],
};

// ── Subjects screen data (Image 8)
export const NOTE_SUBJECT_CATEGORIES = [
  { id: 'civil',    title: 'Civil Laws',    image: require('../../assets/images/combo_civil.png') },
  { id: 'criminal', title: 'Criminal Laws', image: require('../../assets/images/combo_civil.png') },
];

// ── Subject items screen data (Image 9)
export const NOTE_SUBJECT_ITEMS = [
  { id: 'demo',     title: 'Demo Notes',                 locked: false },
  { id: 'cpc',      title: 'Civil Procedure Code Notes', locked: true  },
  { id: 'evidence', title: 'Indian Evidence Act',        locked: true  },
  { id: 'transfer', title: 'Transfer Of Property Act',   locked: true  },
  { id: 'relief',   title: 'Specific Relief Act',        locked: true  },
];