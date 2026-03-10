

import Colors from '../../constants/colors';

export const MOCK_USER = {
  name: 'Test User',
};

export const MOCK_BANNERS = [
  {
    id: 'b1',
    localImage: require('../../assets/images/banner1.png'),
  },
  {
    id: 'b2',
    localImage: require('../../assets/images/banner2.png'),
  },
  {
    id: 'b3',
    localImage: require('../../assets/images/banner3.png'),
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────
export const MOCK_CATEGORIES = [
  {
    id: 'jcj',
    title: 'Junior Civil Judge',
    subtitle: 'Path way to Justice',
    route: '/jcj',
    buttonLabel: 'Explore Now',
    buttonColor: Colors.primary, 
    localImage: require('../../assets/images/cat_jcj.png'),
  },
  {
    id: 'ddj',
    title: 'Direct District Judge',
    subtitle: 'The Step to Fairness',
    route: '/ddj',
    buttonLabel: 'Explore Now',
    buttonColor: Colors.gold, 
    localImage: require('../../assets/images/cat_ddj.png'),
  },
  {
    id: 'guest',
    title: 'Guest Lectures',
    subtitle: 'Guiding Hand of the Court',
    route: '/guest-lecturer',
    buttonLabel: 'Explore Now',
    buttonColor: '#FFF7E0', 
    localImage: require('../../assets/images/cat_guest.png'),
  },
];

// ─── Subject List ─────────────────────────────────────────────────────────────
export const MOCK_SUBJECT_LIST = [
  {
    id: 'jcj-sub',
    title: 'JCJ Subject list',
    subtitle: 'Path way to Justice',
    route: '/sub-list',
    buttonLabel: 'View All',
    buttonColor: '#1A3C8B',
    localImage: require('../../assets/images/cat_jcj.png'),
  },
  {
    id: 'dj-sub',
    title: 'DJ Subject List',
    subtitle: 'The Step to Fairness',
    route: '/sub-list',
    buttonLabel: 'View All',
    buttonColor: '#C9A227',
    localImage: require('../../assets/images/cat_ddj.png'),
  },
];

// ─── Best Sellers ─────────────────────────────────────────────────────────────
export const MOCK_BEST_SELLERS = [
  {
    id: 'bs1',
    title: 'Andhra Pradesh Junior Civil Judge Notes',
    price: 499,
    originalPrice: 599,
    discount: 16,
    localImage: require('../../assets/images/book_jcj.png'),
  },
  {
    id: 'bs2',
    title: 'AP Civil Judge Practice Papers',
    price: 499,
    originalPrice: 599,
    discount: 16,
    localImage: require('../../assets/images/book_jcj.png'),
  },
  {
    id: 'bs3',
    title: 'Judiciary Complete Guide 2025',
    price: 799,
    originalPrice: 999,
    discount: 20,
    localImage: require('../../assets/images/book_jcj.png'),
  },
];

// ─── Combo Courses ────────────────────────────────────────────────────────────
export const MOCK_COMBO_COURSES = [
  {
    id: 'cc1',
    title: 'Combo of AP Civil & Criminal',
    price: 499,
    localImage: require('../../assets/images/combo_civil.png'),
    exploreRoute: '/combo',
    getCourseRoute: '/combo/course-detail',  
    openCard: false,
    tags: [],
    subtitle: '',
  },
  {
    id: 'cc2',
    title: 'Combo of No Objection Courses',
    price: 499,
    localImage: require('../../assets/images/combo_civil.png'),
    exploreRoute: '/combo/pmcombo',
    getCourseRoute: '/combo/pmcombo/course-detail', 
    openCard: false,
    tags: [],
    subtitle: '',
  },
  {
    id: 'cc3',
    title: 'Combo of AP Civil & Criminal',
    localImage: require('../../assets/images/combo_civil.png'),
    exploreRoute: '/combo',
    openCard: true,
    subtitle: 'Ends on 26th Jan',
    tags: ['2months left', '2 years Course'],
  },
  {
    id: 'cc3',
    title: 'Combo of AP Civil & Criminal',
    localImage: require('../../assets/images/combo_civil.png'),
    exploreRoute: '/combo/pmcombo',
    openCard: true,
    subtitle: 'Ends on 26th Jan',
    tags: ['2months left', '2 years Course'],
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'batch',
    title: 'New Batch Starting Soon',
    message: 'Junior Civil Judge batch starts on 3rd November 2025. Enroll now!',
    time: '2 hours ago',
    read: false,
    icon: '📚',
  },
  {
    id: 'n2',
    type: 'offer',
    title: 'Limited Time Offer',
    message: 'Get 16% off on AP Junior Civil Judge Notes.',
    time: '5 hours ago',
    read: false,
    icon: '🎁',
  },
  {
    id: 'n3',
    type: 'result',
    title: 'Prelims Result Announced',
    message: 'AP Judiciary Prelims 2024 results are out. Check your score now.',
    time: '1 day ago',
    read: true,
    icon: '🏆',
  },
  {
    id: 'n4',
    type: 'lecture',
    title: 'Guest Lecture Today',
    message: 'Honorable Justice K. Ramakrishna will conduct a session at 6 PM today.',
    time: '1 day ago',
    read: true,
    icon: '🎓',
  },
  {
    id: 'n5',
    type: 'update',
    title: 'Study Material Updated',
    message: 'New chapters added to DJ Subject List. Download the latest version.',
    time: '2 days ago',
    read: true,
    icon: '📄',
  },
  {
    id: 'n6',
    type: 'exam',
    title: 'Mock Test Available',
    message: 'Free mock test for JCJ 2025 is now available. Attempt before Nov 10.',
    time: '3 days ago',
    read: true,
    icon: '📝',
  },
  {
    id: 'n7',
    type: 'exam',
    title: 'new Mock Test Available',
    message: 'Free mock test for JCJ 2025 is now available. Attempt before Nov 10.',
    time: '3 days ago',
    read: true,
    icon: '📝',
  },
];

// ─── Search ───────────────────────────────────────────────────────────────────
export const MOCK_TRENDING_SEARCHES = [
  'JCJ Notes',
  'Guest Lectures',
  'Mains Test',
  'Civil Procedure Code',
  'AP Judiciary 2025',
];

export const MOCK_SEARCH_RESULTS = [
  {
    id: 'sr1',
    category: 'courses',
    title: 'Junior Civil Judge Complete Course',
    subtitle: 'JCJ · 48 Subjects · 320 Videos',
    price: 2499,
    badge: 'Bestseller',
    badgeColor: '#C9A227',
  },
  {
    id: 'sr2',
    category: 'courses',
    title: 'Direct District Judge Crash Course',
    subtitle: 'DDJ · 30 Subjects · 180 Videos',
    price: 1999,
    badge: 'New',
    badgeColor: '#00BF3F',
  },
  {
    id: 'sr3',
    category: 'subjects',
    title: 'Civil Procedure Code (CPC)',
    subtitle: 'Subject · JCJ & DDJ · 24 Videos',
    price: 399,
    badge: null,
    badgeColor: null,
  },
  {
    id: 'sr4',
    category: 'notes',
    title: 'AP Junior Civil Judge Notes',
    subtitle: 'Notes · 250 Pages PDF',
    price: 499,
    badge: '16% Off',
    badgeColor: '#00BF3F',
  },
  {
    id: 'sr5',
    category: 'tests',
    title: 'JCJ Prelims Mock Test Series',
    subtitle: 'Tests · 20 Full-Length Tests',
    price: 799,
    badge: 'Popular',
    badgeColor: '#6C1E1E',
  },
];