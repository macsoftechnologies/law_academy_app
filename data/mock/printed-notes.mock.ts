// data/mock/printed-notes.mock.ts

export const PRINTED_BEST_SELLERS = [
  {
    id: 'bs1',
    title: 'Andhra Pradesh Junior Civil Judge Notes',
    price: 499,
    originalPrice: 599,
    discount: 44,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'bs2',
    title: 'AP DDJ Civil Judge Notes',
    price: 499,
    originalPrice: 699,
    discount: 30,
    image: require('../../assets/images/combo_civil.png'),
  },
];

export const PRINTED_NOTES_LIST = [
  {
    id: 'ap-jcj',
    title: 'AP JCJ Notes',
    price: 499,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'ap-ddj',
    title: 'AP DDJ Notes',
    price: 499,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'ts-jcj',
    title: 'TS JCJ Notes',
    price: 499,
    image: require('../../assets/images/combo_civil.png'),
  },
  {
    id: 'ts-ddj',
    title: 'TS DDJ Notes',
    price: 499,
    image: require('../../assets/images/combo_civil.png'),
  },
];

export const PRINTED_NOTE_DETAIL = {
  headerTitle: 'PrintedNotes',
  title: 'AP Junior Civil Judge Notes',
  image: require('../../assets/images/combo_civil.png'),
  aboutEmoji: '📕',
  aboutDesc:
    'The essential books for the AP Junior Civil Judge exam are the Bare Acts for statutory accuracy, Standard Textbooks for conceptual depth and case law, and dedicated Judicial Services Manuals for exam-specific practice.',
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
  pricing: { mrp: 598, price: 499, shipping: 50 },
  termsItems: [
    'Are you sure you want to start the Civil Laws Mains Test?',
    'Once the test begins, you must complete it within 3 hours.',
    "After submission time, you'll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.",
    'Once started, the test cannot be paused or restarted.',
  ],
};

export const MOCK_ADDRESSES = [
  { id: 'a1', name: 'Jane Doe',  address: '3 Newbridge Court', city: 'Chino Hills, CA 91709, United States', isDefault: true  },
  { id: 'a2', name: 'John Doe',  address: '3 Newbridge Court', city: 'Chino Hills, CA 91709, United States', isDefault: false },
  { id: 'a3', name: 'John Doe',  address: '51 Riverside',      city: 'Chino Hills, CA 91709, United States', isDefault: false },
];

export const MOCK_CARDS = [
  { id: 'c1', last4: '3947', holder: 'Jennyfer Doe', expiry: '05/23', type: 'mastercard', isDefault: true,  dark: true  },
  { id: 'c2', last4: '4546', holder: 'Jennyfer Doe', expiry: '11/22', type: 'visa',       isDefault: false, dark: false },
];