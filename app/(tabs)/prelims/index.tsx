// app/(tabs)/prelims/index.tsx
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { PRELIMS_CARDS, PrelimsCard } from '../../../data/mock/prelims.mock';

const C = Colors;

// ─────────────────────────────────
// CARD: explore-only
// preview text | title + 🔖 | Explore more btn
// ─────────────────────────────────
function ExploreCard({ item }: { item: PrelimsCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={s.card}>
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />
</View>
      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={s.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Image source={require('../../../assets/images/Component15.png')} style={[s.bookmarkIcon, isBookmarked && { tintColor: C.primary }]} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={s.btnPrimary}
          onPress={() => router.push(item.detailRoute as any)}
        >
          <Text style={s.btnPrimaryTxt}>Explore more</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────
// CARD: buy
// preview text | title + "Add to cart" top-right + 🔖 | price | [Explore More | Buy Now]
// ─────────────────────────────────
function BuyCard({ item }: { item: PrelimsCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={s.card}>
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />
</View>
      <View style={s.body}>
        {/* Title row with Add to cart badge top-right */}
        <View style={s.buyTitleRow}>
          <Text style={s.title}>{item.title}</Text>
          <TouchableOpacity
            style={s.addCartBadge}
            onPress={() => router.push(item.detailRoute as any)}
          >
            <Text style={s.addCartTxt}>Add to cart</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.price}>{item.price}</Text>
        {/* [Explore More outline | Buy Now blue] */}
        <View style={s.btnRow}>
          <TouchableOpacity
            style={s.btnOutline}
            onPress={() => router.push(item.detailRoute as any)}
          >
            <Text style={s.btnOutlineTxt}>Explore More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.btnPrimary2}
            onPress={() => router.push(item.detailRoute as any)}
          >
            <Text style={s.btnPrimaryTxt}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────
// CARD: open
// preview text + tags top-right | large title | subtitle | Open btn
// ─────────────────────────────────
function OpenCard({ item }: { item: PrelimsCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={s.card}>
      {/* Preview with tags floating top-right */}
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />

  {item.tags && (
    <View style={s.tagsTopRight}>
      {item.tags.map((t, i) => (
        <View
          key={`${t.label}-${i}`}
          style={[s.tag, { backgroundColor: t.bg }]}
        >
          <Text style={[s.tagTxt, { color: t.color }]}>
            {t.label}
          </Text>
        </View>
      ))}
    </View>
  )}
</View>
      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={[s.title, s.titleLarge]}>{item.title}</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Image source={require('../../../assets/images/Component15.png')} style={[s.bookmarkIcon, isBookmarked && { tintColor: C.primary }]} />
          </TouchableOpacity>
        </View>
        {item.subtitle && <Text style={s.subtitle}>{item.subtitle}</Text>}
        <TouchableOpacity
          style={[s.btnPrimary, { marginTop: 14 }]}
          onPress={() => router.push(item.openRoute as any)}
        >
          <Text style={s.btnPrimaryTxt}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────
// Screen
// ─────────────────────────────────
export default function PrelimsIndexScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Prelims Preparation</Text>
        <TouchableOpacity><Text style={{ fontSize: 22 }}>🛒</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {PRELIMS_CARDS.map(item => {
          if (item.type === 'explore-only') return <ExploreCard key={item.id} item={item} />;
          if (item.type === 'buy')          return <BuyCard     key={item.id} item={item} />;
          if (item.type === 'open')         return <OpenCard    key={item.id} item={item} />;
          return null;
        })}
        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  headerTitle: { fontSize: 20, fontWeight: '900', color: C.textDark },

  // ── Card shell
  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },

  // ── Preview area
  preview: {
  height: 180,
  overflow: 'hidden',
  position: 'relative',
  borderBottomWidth: 1,
  borderBottomColor: C.border,
},

previewImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},

  // Tags top-right in preview (open cards)
  tagsTopRight: {
    position: 'absolute', top: 10, right: 10,
    alignItems: 'flex-end', gap: 5,
  },
  tag:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagTxt: { fontSize: 10, fontWeight: '700' },

  // ── Body
  body: { padding: 14 },

  // Title rows
  titleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', marginBottom: 10,
  },
  buyTitleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', marginBottom: 4,
  },
  title: {
    fontSize: 15, fontWeight: '800', color: C.textDark,
    flex: 1, marginRight: 8, lineHeight: 22,
  },
  titleLarge: { fontSize: 20, lineHeight: 28 },
  bookmark:   { fontSize: 20 },
  bookmarkIcon: { width: 20, height: 20, resizeMode: 'contain' },
  subtitle:   { fontSize: 12, color: C.textMuted, marginTop: 2 },

  // Add to cart badge (buy cards, top-right)
  addCartBadge: {
    backgroundColor: C.screenBg, borderWidth: 1, borderColor: C.border,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5,
  },
  addCartTxt: { fontSize: 11, fontWeight: '700', color: C.textDark },

  price: { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 12 },

  // ── Buttons
  btnRow: { flexDirection: 'row', gap: 10 },

  btnPrimary: {
    backgroundColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnPrimary2: {
    flex: 1, backgroundColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnPrimaryTxt: { fontSize: 14, fontWeight: '700', color: C.white },

  btnOutline: {
    flex: 1, borderWidth: 1.5, borderColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnOutlineTxt: { fontSize: 14, fontWeight: '700', color: C.primary },
});