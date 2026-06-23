import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Colors from '../../../constants/colors';
import {
  MOCK_BANNERS,
  MOCK_BEST_SELLERS,
  MOCK_CATEGORIES,
  MOCK_COMBO_COURSES,
  MOCK_SUBJECT_LIST,
  MOCK_USER,
} from '../../../data/mock/dashboard.mock';

const { width: SW } = Dimensions.get('window');
const BANNER_W = SW - 32; 

// ─────────────────────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────────────────────
function Header({ onMenuPress }: { onMenuPress: () => void }) {
  return (
    <View style={s.header}>
      <TouchableOpacity style={s.menuBtn} onPress={onMenuPress}>
        {/* Hamburger with red dot */}
        <View style={s.hamburger}>
          <View style={s.hLine} />
          <View style={s.hLine} />
          <View style={s.hLine} />
        </View>
        <View style={s.menuDot} />
      </TouchableOpacity>

      <View style={s.headerTitle}>
        <Text style={s.hHello}>Hello 👋</Text>
        <Text style={s.hName}>{MOCK_USER.name}</Text>
      </View>

      <View style={s.headerRight}>
        <TouchableOpacity
          style={s.hIconBtn}
          onPress={() => router.push('/(tabs)/dashboard/search')}
        >
          <Text style={s.hIcon}>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.hIconBtn}
          onPress={() => router.push('/(tabs)/dashboard/notifications')}
        >
          <Text style={s.hIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Banner Carousel
// ─────────────────────────────────────────────────────────────────────────────
function BannerCarousel() {
  const flatRef = useRef<FlatList>(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % MOCK_BANNERS.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / BANNER_W);
    if (idx !== active) setActive(idx);
  };

  return (
    <View style={s.bannerWrap}>
      <FlatList
        ref={flatRef}
        data={MOCK_BANNERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={i => i.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: BANNER_W, offset: BANNER_W * index, index,
        })}
        renderItem={({ item }) => (
          <View style={[s.bannerSlide, { width: BANNER_W }]}>
            <Image
              source={item.localImage}
              style={s.bannerImg}
              resizeMode="cover"
            />
          </View>
        )}
      />
      {/* Dot indicators */}
      <View style={s.dots}>
        {MOCK_BANNERS.map((_, i) => (
          <View key={i} style={[s.dot, i === active && s.dotActive]} />
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Title
// ─────────────────────────────────────────────────────────────────────────────
const SectionTitle = ({ title }: { title: string }) => (
  <Text style={s.sectionTitle}>{title}</Text>
);

// ─────────────────────────────────────────────────────────────────────────────
// Category Card  – image left, info right, button inside info
// ─────────────────────────────────────────────────────────────────────────────
function CategoryCard({ item }: { item: typeof MOCK_CATEGORIES[0] }) {
  return (
    <View style={s.catCard}>
      <Image source={item.localImage} style={s.catImg} resizeMode="cover" />
      <View style={s.catInfo}>
        <Text style={s.catTitle}>{item.title}</Text>
        <Text style={s.catSub}>{item.subtitle}</Text>
        <TouchableOpacity
          style={[s.catBtn, { backgroundColor: item.buttonColor }]}
          onPress={() => router.push(item.route as any)}
        >
          <Text
  style={[
    s.catBtnTxt,
    item.buttonColor === '#FFF7E0'
      ? { color: Colors.primary }
      : { color: Colors.white },
  ]}
>
            {item.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Subject Card  – same layout as category
// ─────────────────────────────────────────────────────────────────────────────
function SubjectCard({ item }: { item: typeof MOCK_SUBJECT_LIST[0] }) {
  return (
    <View style={s.subCard}>
      <Image source={item.localImage} style={s.subImg} resizeMode="cover" />
      <View style={s.subInfo}>
        <Text style={s.subTitle}>{item.title}</Text>
        <Text style={s.subSub}>{item.subtitle}</Text>
        <TouchableOpacity
          style={[s.subBtn, { backgroundColor: item.buttonColor }]}
          onPress={() => router.push(item.route as any)}
        >
          <Text
  style={[
    s.catBtnTxt,
    item.buttonColor === '#FFF7E0'
      ? { color: Colors.primary }
      : { color: Colors.white },
  ]}
>
            {item.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Best Seller section title  – gold left bar accent
// ─────────────────────────────────────────────────────────────────────────────
const BestSellerTitle = () => (
  <View style={s.bsHeader}>
    <View style={s.bsBar} />
    <Text style={s.sectionTitle}>Best Seller</Text>
  </View>
);

// ─────────────────────────────────────────────────────────────────────────────
// Best Seller Card
// ─────────────────────────────────────────────────────────────────────────────
function BestSellerCard({ item }: { item: typeof MOCK_BEST_SELLERS[0] }) {
  return (
    <TouchableOpacity style={s.bsCard}>
      <Image source={item.localImage} style={s.bsImg} resizeMode="cover" />

      <View style={{ flex: 1, padding: 8 }}>
        <Text style={s.bsTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={s.bsPriceRow}>
          <Text style={s.bsPrice}>₹{item.price}</Text>
          <Text style={s.bsOrig}>₹{item.originalPrice}</Text>
          <Text style={s.bsOff}>({item.discount}% off)</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Combo Card  – white card: thumbnail image, "Combo Offer" + bookmark icon,
//               bold title, price, 2 buttons
// ─────────────────────────────────────────────────────────────────────────────
function ComboCard({ item }: { item: typeof MOCK_COMBO_COURSES[0] }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  if (item.openCard) {
    return (
      <View style={s.comboCard}>
        <Image source={item.localImage} style={s.comboImg} resizeMode="cover" />
        <View style={{ paddingHorizontal: 12, paddingTop: 10 }}>
          <Text style={s.comboTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={s.comboSubtitleTxt}>{item.subtitle}</Text>
          <View style={s.comboTagRow}>
            {item.tags?.map((tag, i) => (
              <View key={i} style={s.comboTag}>
                <Text style={s.comboTagTxt}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={s.comboBtnRow}>
          <TouchableOpacity
            style={[s.comboBtnOutline, { flex: 1 }]}
            onPress={() => router.push(item.exploreRoute as any)}
          >
            <Text style={s.comboBtnOutlineTxt}>Open</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Cards 1 & 2: standard combo card
  return (
    <View style={s.comboCard}>
      <Image source={item.localImage} style={s.comboImg} resizeMode="cover" />
      <View style={s.comboTopRow}>
        <Text style={s.comboOfferTxt}>Combo Offer</Text>
        <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
          <Image
            source={require('../../../assets/images/Component15.png')}
            style={[s.bookmarkIcon, isBookmarked && { tintColor: Colors.primary }]}
          />
        </TouchableOpacity>
      </View>
      <Text style={s.comboTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.title}
      </Text>
      <Text style={s.comboPrice}>₹{item.price}</Text>
      <View style={s.comboBtnRow}>
  {/* Explore More */}
  

  {/* Get This Course */}
  <TouchableOpacity
    style={s.comboBtnOutline}
    onPress={() => router.push(item.getCourseRoute as any)}
  >
    <Text style={s.comboBtnOutlineTxt}>Get This Course</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={s.comboBtnPrimary}
    onPress={() => router.push(item.exploreRoute as any)}
  >
    <Text style={s.comboBtnPrimaryTxt}>Explore More</Text>
  </TouchableOpacity>
</View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardScreen() {
  const handleRefresh = async () => {
    console.log('Refreshing dashboard...');
  };
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />
      {/* ── Sticky Header — lives outside the scroll view ── */}
      <Header onMenuPress={() => router.push('/(tabs)/dashboard/side-menu')} />
      <ScreenWrapper onRefresh={handleRefresh}>
        <BannerCarousel />

        {/* Categories */}
        <View style={s.section}>
          <SectionTitle title="Categories" />
          <View style={s.cardGroup}>
            {MOCK_CATEGORIES.map(item => <CategoryCard key={item.id} item={item} />)}
          </View>
        </View>

        {/* Subject List */}
        <View style={s.section}>
          <SectionTitle title="Subject List" />
          <View style={s.cardGroup}>
            {MOCK_SUBJECT_LIST.map(item => <SubjectCard key={item.id} item={item} />)}
          </View>
        </View>

        {/* Best Seller */}
        <View style={s.section}>
          <BestSellerTitle />
          <FlatList
            horizontal showsHorizontalScrollIndicator={false}
            data={MOCK_BEST_SELLERS} keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => <BestSellerCard item={item} />}
          />
        </View>

        {/* Combo Courses */}
        <View style={s.section}>
          <SectionTitle title="Combo Courses" />
          <FlatList
            horizontal showsHorizontalScrollIndicator={false}
            data={MOCK_COMBO_COURSES} keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 14, paddingBottom: 4 }}
            renderItem={({ item }) => <ComboCard item={item} />}
          />
        </View>

        <View style={{ height: 90 }} />
      </ScreenWrapper>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { paddingBottom: 20 },

  // ── Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12,
    backgroundColor: Colors.screenBg,
  },
  menuBtn:  { width: 36, height: 36, justifyContent: 'center', marginRight: 10 },
  hamburger:{ gap: 4 },
  hLine:    { width: 22, height: 2.5, backgroundColor: Colors.textDark, borderRadius: 2 },
  menuDot:  {
    position: 'absolute', top: 2, right: 0,
    width: 9, height: 9, borderRadius: 5,
    backgroundColor: Colors.crimson, borderWidth: 1.5, borderColor: Colors.screenBg,
  },
  headerTitle: { flex: 1 },
  hHello:  { fontSize: 12, color: Colors.textMuted },
  hName:   { fontSize: 18, fontWeight: '800', color: Colors.textDark, letterSpacing: -0.3 },
  headerRight: { flexDirection: 'row', gap: 8 },
  hIconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  hIcon: { fontSize: 17 },

  // ── Banner
  bannerWrap: { marginHorizontal: 16, marginBottom: 6 },
  bannerSlide: {
    borderRadius: 14, overflow: 'hidden',
    height: 160,
  },
  bannerImg: { width: '100%', height: '100%' },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 6, marginTop: 10, marginBottom: 4,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: Colors.inputBorder,
  },
  dotActive: {
    backgroundColor: Colors.primary, width: 22, borderRadius: 4,
  },

  // ── Sections
  section:      { marginBottom: 6 },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: Colors.textDark,
    marginHorizontal: 16, marginBottom: 10, letterSpacing: -0.2,
  },
  cardGroup: { gap: 0 },

  // ── Category card
  catCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  catImg:    { width: 150, height: 110 },
  catInfo:   { flex: 1, padding: 12, justifyContent: 'center' },
  catTitle:  { fontSize: 16, fontWeight: '700', color: Colors.textDark, marginBottom: 3 },
  catSub:    { fontSize: 12, color: Colors.textMuted, marginBottom: 10 },
  catBtn:    { alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  catBtnTxt: { fontSize: 13, fontWeight: '700' },

  // ── Subject card (same dimensions as category)
  subCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBg,
    marginHorizontal: 16, marginBottom: 10,
    borderRadius: 14, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  subImg:    { width: 150, height: 110 },
  subInfo:   { flex: 1, padding: 12, justifyContent: 'center' },
  subTitle:  { fontSize: 16, fontWeight: '700', color: Colors.crimson, marginBottom: 3 },
  subSub:    { fontSize: 12, color: Colors.textMuted, marginBottom: 10 },
  subBtn:    { alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  subBtnTxt: { fontSize: 13, fontWeight: '700' },

  // ── Best Seller header
  bsHeader: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10 },
  bsBar:    { width: 4, height: 20, backgroundColor: Colors.gold, borderRadius: 2, marginRight: 8 },

  // ── Best Seller card
 bsCard: {
  width: 290,
marginRight: 6,             
  flexDirection: 'row',          
  alignItems: 'center',
  backgroundColor: Colors.cardBg,
  borderRadius: 12,
  overflow: 'hidden',
  shadowColor: '#000',
  shadowOpacity: 0.06,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},
  bsImg: {
  width: 100,        
  height: 100,
},
  bsTitle:    { fontSize: 14, fontWeight: '600', color: Colors.textDark, padding: 8, lineHeight: 16 },
  bsPriceRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingBottom: 10, gap: 4, flexWrap: 'wrap' },
  bsPrice:    { fontSize: 14, fontWeight: '800', color: Colors.textDark },
  bsOrig:     { fontSize: 11, color: Colors.textMuted, textDecorationLine: 'line-through' },
  bsOff:      { fontSize: 11, color: Colors.green, fontWeight: '600' },

  comboCard: {
    width: 230,
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  comboImg: { width: '100%', height: 120 },
  comboTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 12, paddingTop: 10, paddingBottom: 2,
  },
  comboOfferTxt: { fontSize: 11, color: Colors.crimson, fontWeight: '600' },
  bookmarkIcon: {
  width: 20,
  height: 20,
  resizeMode: 'contain',
},
  comboTitle: {
    fontSize: 15, fontWeight: '800', color: Colors.textDark,
    paddingHorizontal: 12, marginBottom: 2, lineHeight: 20,
  },
  comboSubtitleTxt: {
    fontSize: 11, color: Colors.textMuted,
    paddingHorizontal: 0, marginBottom: 8,   
  },
  comboTagRow: {
    flexDirection: 'row', gap: 6,
    marginBottom: 10, alignItems: 'center',
  },
  comboTag: {
    backgroundColor: Colors.screenBg,
    borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 4,
    borderWidth: 1, borderColor: Colors.border,
  },
  comboTagTxt: {
    fontSize: 10, fontWeight: '600', color: Colors.textDark,
  },
  comboPrice: {
    fontSize: 17, fontWeight: '800', color: Colors.textDark,
    paddingHorizontal: 12, marginBottom: 12,
  },
  comboBtnRow: {
    flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 14, gap: 8,
  },
  comboBtnPrimary: {
    flex: 1, backgroundColor: Colors.screenBg,
    paddingVertical: 10, borderRadius: 8, alignItems: 'center',
  },
  comboBtnPrimaryTxt: { fontSize: 10, fontWeight: '700', color: Colors.primary },
  comboBtnOutline: {
    flex: 1, backgroundColor: Colors.primary,
    paddingVertical: 8, borderRadius: 8, alignItems: 'center',
  },
  comboBtnOutlineTxt: { fontSize: 10, fontWeight: '700', color: Colors.white },
});