// app/(tabs)/prelims/index.tsx
import { router } from 'expo-router';
import React from 'react';
import {
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

const PREVIEW =
  `(a) The "participatory model" which emphasises a transformative governance of the community is the mainstream of the strong juvenile and the maximisation of legal intervention in their lives.\n\nPrinciples under the Juvenile Justice (Care and Protection of Children) Act 2015\nThe JJ Act has dedicated our chapter to Principles, thus emphasising the importance of making the Act in the light of the principal while implementing the same.\n\n1 Principle of presumption of Innocence:\nEvery child shall be presumed to be an innocent of any malfeasance or misconduct, upto an age of eighteen years. The three principles of criminal responsibilisation as inclusive are:\n(a) That a child shall be allowed the prosecution to prove its case beyond reasonable doubt and it cannot derive any benefit from weakness or failure of the defence without affirmative proving the case.\n(b) That the onus of the prosecution apply.\n\nArticle 11 of the Principles of criminal responsibility is about ₹90,000 times: "Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence.\n\n2 Principle of dignity and worth: All human beings shall be treated with equal dignity and rights.`;

// ─────────────────────────────────
// CARD: explore-only
// preview text | title + 🔖 | Explore more btn
// ─────────────────────────────────
function ExploreCard({ item }: { item: PrelimsCard }) {
  return (
    <View style={s.card}>
      <View style={s.preview}>
        <Text style={s.previewTxt} numberOfLines={9}>{PREVIEW}</Text>
      </View>
      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={s.title}>{item.title}</Text>
          <Text style={s.bookmark}>🔖</Text>
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
  return (
    <View style={s.card}>
      <View style={s.preview}>
        <Text style={s.previewTxt} numberOfLines={9}>{PREVIEW}</Text>
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
  return (
    <View style={s.card}>
      {/* Preview with tags floating top-right */}
      <View style={s.preview}>
        <Text style={s.previewTxt} numberOfLines={9}>{PREVIEW}</Text>
        {item.tags && (
          <View style={s.tagsTopRight}>
            {item.tags.map((t, i) => (
              <View key={i} style={[s.tag, { backgroundColor: t.bg }]}>
                <Text style={[s.tagTxt, { color: t.color }]}>{t.label}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={s.body}>
        <View style={s.titleRow}>
          <Text style={[s.title, s.titleLarge]}>{item.title}</Text>
          <Text style={s.bookmark}>🔖</Text>
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
    padding: 12, maxHeight: 160, overflow: 'hidden',
    borderBottomWidth: 1, borderBottomColor: C.border,
    position: 'relative',
  },
  previewTxt: { fontSize: 11, color: C.textMuted, lineHeight: 17 },

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