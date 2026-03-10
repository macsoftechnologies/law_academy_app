// app/(tabs)/notes/printed-notes/index.tsx
import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  StatusBar, ScrollView, FlatList, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';
import { PRINTED_BEST_SELLERS, PRINTED_NOTES_LIST } from '../../../../data/mock/printed-notes.mock';

const C = Colors;
const { width: SW } = Dimensions.get('window');
const CARD_W = SW * 0.65;

export default function PrintedNotesIndexScreen() {
  const [bsIndex, setBsIndex] = useState(0);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>PrintedNotes</Text>
        <TouchableOpacity style={s.cartBtn}>
          <Text style={s.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Best Seller horizontal carousel */}
        <View style={s.bsSection}>
          <View style={s.bsHeader}>
            <View style={s.bsBar} />
            <Text style={s.bsSectionTitle}>Best Seller</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PRINTED_BEST_SELLERS}
            keyExtractor={i => i.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[s.bsCard, { width: CARD_W }]}
                onPress={() => router.push('/notes/printed-notes/detail' as any)}
              >
                <Image source={item.image} style={s.bsImg} resizeMode="cover" />
                <View style={s.bsInfo}>
                  <Text style={s.bsTitle} numberOfLines={2}>{item.title}</Text>
                  <View style={s.bsPriceRow}>
                    <Text style={s.bsPrice}>₹{item.price}</Text>
                    <Text style={s.bsOrig}>₹{item.originalPrice}</Text>
                    <Text style={s.bsOff}>({item.discount}% off)</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Main list cards */}
        {PRINTED_NOTES_LIST.map(item => (
          <View key={item.id} style={s.card}>
            {/* Book image(s) side by side */}
            <View style={s.cardImgRow}>
              <Image source={item.image} style={s.cardImg} resizeMode="cover" />
              <Image source={item.image} style={s.cardImg} resizeMode="cover" />
            </View>

            <View style={s.cardBody}>
              <Text style={s.cardTitle}>{item.title}</Text>
              <Text style={s.cardPrice}>₹{item.price}</Text>
              <View style={s.btnRow}>
                <TouchableOpacity
                  style={s.btnOutline}
                  onPress={() => router.push('/notes/printed-notes/detail' as any)}
                >
                  <Text style={s.btnOutlineTxt}>Add to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.btnPrimary}
                  onPress={() => router.push('/notes/printed-notes/detail' as any)}
                >
                  <Text style={s.btnPrimaryTxt}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },
  scroll: { paddingBottom: 20 },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: C.textDark },
  cartBtn:     { padding: 4 },
  cartIcon:    { fontSize: 20 },

  // Best Seller
  bsSection: { marginBottom: 16 },
  bsHeader:  { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 10 },
  bsBar:     { width: 4, height: 20, backgroundColor: C.gold, borderRadius: 2, marginRight: 8 },
  bsSectionTitle: { fontSize: 17, fontWeight: '800', color: C.textDark },

  bsCard: {
    backgroundColor: C.cardBg, borderRadius: 12, overflow: 'hidden',
    flexDirection: 'row', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  bsImg:  { width: 90, height: 90 },
  bsInfo: { flex: 1, padding: 10 },
  bsTitle: { fontSize: 13, fontWeight: '600', color: C.textDark, marginBottom: 8, lineHeight: 18 },
  bsPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  bsPrice:    { fontSize: 14, fontWeight: '800', color: C.textDark },
  bsOrig:     { fontSize: 11, color: C.textMuted, textDecorationLine: 'line-through' },
  bsOff:      { fontSize: 11, color: C.green, fontWeight: '600' },

  // Main list cards
  card: {
    backgroundColor: C.cardBg, borderRadius: 16, overflow: 'hidden',
    marginHorizontal: 16, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.07,
    shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
  },
  cardImgRow: { flexDirection: 'row' },
  cardImg:    { flex: 1, height: 160 },

  cardBody:  { padding: 14 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 4 },
  cardPrice: { fontSize: 16, fontWeight: '800', color: C.textDark, marginBottom: 12 },

  btnRow: { flexDirection: 'row', gap: 10 },
  btnOutline: {
    flex: 1, borderWidth: 1.5, borderColor: C.border,
    paddingVertical: 11, borderRadius: 10, alignItems: 'center',
    backgroundColor: C.screenBg,
  },
  btnOutlineTxt: { fontSize: 14, fontWeight: '700', color: C.textDark },
  btnPrimary: {
    flex: 1, backgroundColor: C.primary,
    paddingVertical: 11, borderRadius: 10, alignItems: 'center',
  },
  btnPrimaryTxt: { fontSize: 14, fontWeight: '700', color: C.white },
});