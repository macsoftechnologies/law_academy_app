
import { router } from 'expo-router';
import React from 'react';
import {
  Image, StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenWrapper from '../../components/ScreenWrapper';
import Colors from '../../constants/colors';
import { MOCK_JCJ_COURSES, MOCK_JCJ_PURCHASED } from '../../data/mock/jcj.mock';

// ─── Unpurchased course card (Image 1) ───────────────────────────────────────
function CourseCard({ item }: { item: typeof MOCK_JCJ_COURSES[0] }) {
  return (
    <View style={s.card}>
      <Image source={item.image} style={s.cardImg} resizeMode="cover" />
      <View style={s.cardBody}>
        <Text style={s.cardTitle}>{item.title}</Text>
        <View style={s.priceRow}>
          <Text style={s.price}>₹{item.price.toLocaleString('en-IN')}</Text>
          <Text style={s.originalPrice}>₹{item.originalPrice.toLocaleString('en-IN')}</Text>
        </View>
        <View style={s.btnRow}>
          <TouchableOpacity
            style={s.btnOutline}
            onPress={() => router.push('/jcj/course-detail' as any)}
          >
            <Text style={s.btnOutlineTxt}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.btnPrimary}
           onPress={() => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push('/(tabs)/dashboard');
  }
}}
          >
            <Text style={s.btnPrimaryTxt}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Purchased course card (Image 2) ─────────────────────────────────────────
function PurchasedCard({ item }: { item: typeof MOCK_JCJ_PURCHASED[0] }) {
  return (
    <View style={s.card}>
      <Image source={item.image} style={s.cardImg} resizeMode="cover" />
      <View style={s.cardBody}>
        <View style={s.purchasedTopRow}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.endsOn}>Ends on {item.endsOn}</Text>
          </View>
          <View style={s.tagsCol}>
            <View style={s.tagPill}>
              <Text style={s.tagPillTxt}>{item.timeLeft}</Text>
            </View>
            <View style={[s.tagPill, s.tagPillOutline]}>
              <Text style={s.tagPillOutlineTxt}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={s.openBtn}
          onPress={() => router.push('/jcj/subjects' as any)}
        >
          <Text style={s.openBtnTxt}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function JCJScreen() {
  const onRefresh = async () => {
  await new Promise(res => setTimeout(res, 1200));
};
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Junior Civil Judge</Text>
      </View>

      <ScreenWrapper onRefresh={onRefresh}>
  <View style={s.scroll}>
    {MOCK_JCJ_COURSES.map(item => (
      <CourseCard key={item.id} item={item} />
    ))}

    {MOCK_JCJ_PURCHASED.map(item => (
      <PurchasedCard key={item.id} item={item} />
    ))}

    <View style={{ height: 30 }} />
  </View>
</ScreenWrapper>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    backgroundColor: Colors.screenBg,
  },
  backBtn: { marginRight: 12 },
  backArrow: { fontSize: 26, color: Colors.textDark, fontWeight: '300', lineHeight: 30 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: Colors.textDark },

  card: {
    backgroundColor: Colors.cardBg, borderRadius: 16,
    overflow: 'hidden', marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardImg:  { width: '100%', height: 180 },
  cardBody: { padding: 14 },

  cardTitle: {
  fontSize: 16,   
  fontWeight: '700',
  color: Colors.textDark,
  marginBottom: 12,
},
  priceRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  price:         { fontSize: 16, fontWeight: '800', color: Colors.primary },
  originalPrice: { fontSize: 12, color: Colors.textMuted, textDecorationLine: 'line-through' },
  btnRow:        { flexDirection: 'row', gap: 12 },
  btnOutline: {
  flex: 1,
  paddingVertical: 13,   // match combo
  borderRadius: 10,
  backgroundColor: Colors.screenBg,
  borderWidth: 1,
  borderColor: Colors.border,
  alignItems: 'center',
  justifyContent: 'center',   // ✅ ADD THIS
},
  btnOutlineTxt: { fontSize: 15, fontWeight: '700', color: Colors.primary },
  btnPrimary: {
  flex: 1,
  paddingVertical: 13, // changed from 8
  borderRadius: 10,
  backgroundColor: Colors.primary,
  alignItems: 'center',
},

openBtn: {
  backgroundColor: Colors.primary,
  paddingVertical: 13,
  borderRadius: 10,
  alignItems: 'center',
},
  btnPrimaryTxt: {
  fontSize: 15, 
  fontWeight: '700',
  color: Colors.white,
},

openBtnTxt: {
  fontSize: 15, 
  fontWeight: '700',
  color: Colors.white,
},

  // Purchased card
  purchasedTopRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  endsOn:          { fontSize: 12, color: Colors.primary, fontWeight: '600', marginTop: 3 },
  tagsCol:         { gap: 6, marginLeft: 8 },
  tagPill: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 20,
  },
  tagPillTxt: { fontSize: 11, fontWeight: '700', color: '#E65100' },
  tagPillOutline: {
    backgroundColor: Colors.screenBg,
    borderWidth: 1, borderColor: Colors.border,
  },
  tagPillOutlineTxt: { fontSize: 12, fontWeight: '600', color: Colors.textMuted },
  
});