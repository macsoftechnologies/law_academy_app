// app/(tabs)/notes/index.tsx
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
import { NOTES_LIST, NoteCard } from '../../../data/mock/notes.mock';

const C = Colors;


// ─────────────────────────────────────
// Card type: explore-only  (AP JCJ Notes)
// Layout: preview | title+price+bookmark | Explore more btn
// ─────────────────────────────────────
function ExploreCard({ item }: { item: NoteCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  return (
    <View style={s.card}>
      {/* Preview text */}
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />
</View>

      {/* Body */}
      <View style={s.body}>
        {/* Title row */}
        <View style={s.titleRow}>
          <Text style={s.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Image source={require('../../../assets/images/Component15.png')} style={[s.bookmarkIcon, isBookmarked && { tintColor: C.primary }]} />
          </TouchableOpacity>
        </View>
        <Text style={s.price}>{item.price}</Text>

        {/* Button */}
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

// ─────────────────────────────────────
// Card type: buy  (AP DDJ, TS JCJ Notes)
// Layout: preview (+optional Printed Notes badge) | title+price+bookmark | [Explore More | Add to cart] | Buy Now
// ─────────────────────────────────────
function BuyCard({ item }: { item: NoteCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isPrinted = item.type === 'buy-printed';

  // Clicking ANY button on a printed card → printed-notes index
  const handlePress = () => {
    if (isPrinted) {
      router.push('/notes/printed-notes' as any);
    } else {
      router.push(item.detailRoute as any);
    }
  };

  return (
    <View style={s.card}>
      {/* Preview text + optional Printed Notes badge bottom-right */}
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />

  {isPrinted && (
    <TouchableOpacity
      style={s.printedBadge}
      onPress={() => router.push('/notes/printed-notes' as any)}
    >
      <Text style={s.printedBadgeTxt}>Printed Notes</Text>
    </TouchableOpacity>
  )}
</View>

      {/* Body */}
      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={s.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Image source={require('../../../assets/images/Component15.png')} style={[s.bookmarkIcon, isBookmarked && { tintColor: C.primary }]} />
          </TouchableOpacity>
        </View>
        <Text style={s.price}>{item.price}</Text>

        {/* Two-button row */}
        <View style={s.twoBtn}>
          <TouchableOpacity style={s.btnOutline} onPress={handlePress}>
            <Text style={s.btnOutlineTxt}>Explore More</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnGray} onPress={handlePress}>
            <Text style={s.btnGrayTxt}>Add to cart</Text>
          </TouchableOpacity>
        </View>

        {/* Buy Now */}
        <TouchableOpacity style={[s.btnPrimary, { marginTop: 10 }]} onPress={handlePress}>
          <Text style={s.btnPrimaryTxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// Card type: open  (Andhra Pradesh JCJ, Telangana JCJ Notes)
// Layout: preview+tags-top-right | big title | subtitle | Open btn
// ─────────────────────────────────────
function OpenCard({ item }: { item: NoteCard }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isPrinted = item.type === 'open-printed';

  return (
    <View style={s.card}>
      {/* Preview text — tags float top-right inside preview */}
      <View style={s.preview}>
  <Image
    source={require('../../../assets/images/cat_ddj.png')}
    style={s.previewImage}
  />

  {item.tags && item.tags.length > 0 && (
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

  {isPrinted && (
    <TouchableOpacity
      style={s.printedBadge}
      onPress={() => router.push('/notes/printed-notes' as any)}
    >
      <Text style={s.printedBadgeTxt}>Printed Notes</Text>
    </TouchableOpacity>
  )}
</View>

      {/* Body */}
      <View style={s.body}>
        {/* Large bold title */}
        <View style={s.titleRow}>
          <Text style={[s.title, s.titleLarge]}>{item.title}</Text>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Image source={require('../../../assets/images/Component15.png')} style={[s.bookmarkIcon, isBookmarked && { tintColor: C.primary }]} />
          </TouchableOpacity>
        </View>

        {/* Subtitle below title */}
        {item.subtitle && (
          <Text style={s.subtitle}>{item.subtitle}</Text>
        )}

        {/* Open button */}
        <TouchableOpacity
          style={[s.btnPrimary, { marginTop: 14 }]}
          onPress={() =>
            isPrinted
              ? router.push('/notes/printed-notes' as any)
              : router.push(item.openRoute as any)
          }
        >
          <Text style={s.btnPrimaryTxt}>Open</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// Screen
// ─────────────────────────────────────
export default function NotesIndexScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <Text style={s.headerTitle}>Notes</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 22 }}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {NOTES_LIST.map(item => {
          if (item.type === 'explore-only')                          return <ExploreCard key={item.id} item={item} />;
          if (item.type === 'buy' || item.type === 'buy-printed')   return <BuyCard     key={item.id} item={item} />;
          if (item.type === 'open' || item.type === 'open-printed') return <OpenCard    key={item.id} item={item} />;
          return null;
        })}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─────────────────────────────────────
// Styles
// ─────────────────────────────────────
const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { padding: 16 },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: C.textDark },

  // ── Card shell
  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },

  // ── Preview area (top section of card)
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

  // Tags — absolute top-right inside preview
  tagsTopRight: {
    position: 'absolute', top: 10, right: 10,
    gap: 6,
  },
  tag:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  tagTxt: { fontSize: 10, fontWeight: '700' },

  // Printed Notes badge — absolute bottom-right inside preview
  printedBadge: {
    position: 'absolute', bottom: 10, right: 10,
    backgroundColor: C.gold,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8,
  },
  printedBadgeTxt: { fontSize: 11, fontWeight: '800', color: C.white },

  // ── Body
  body: { padding: 14 },

  titleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', marginBottom: 4,
  },
  title: {
    fontSize: 15, fontWeight: '800', color: C.textDark,
    flex: 1, marginRight: 8, lineHeight: 20,
  },
  titleLarge: { fontSize: 20, lineHeight: 26, marginBottom: 2 },
  bookmark:   { fontSize: 20 },
  bookmarkIcon: { width: 20, height: 20, resizeMode: 'contain' },

  price:    { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 12 },
  subtitle: { fontSize: 12, color: C.textMuted, marginTop: 2 },

  // ── Buttons
  twoBtn: { flexDirection: 'row', gap: 10 },

  btnPrimary: {
    backgroundColor: C.primary,
    paddingVertical: 13, borderRadius: 10, alignItems: 'center',
  },
  btnPrimaryTxt: { fontSize: 15, fontWeight: '700', color: C.white },

  btnOutline: {
    flex: 1, borderWidth: 1.5, borderColor: C.primary,
    paddingVertical: 11, borderRadius: 10, alignItems: 'center',
  },
  btnOutlineTxt: { fontSize: 13, fontWeight: '700', color: C.primary },

  btnGray: {
    flex: 1, backgroundColor: C.screenBg,
    borderWidth: 1, borderColor: C.border,
    paddingVertical: 11, borderRadius: 10, alignItems: 'center',
  },
  btnGrayTxt: { fontSize: 13, fontWeight: '700', color: C.textDark },
});