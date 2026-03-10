// app/(tabs)/notes/printed-notes/detail.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity,
  StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';
import { PRINTED_NOTE_DETAIL } from '../../../../data/mock/printed-notes.mock';

const C = Colors;
const D = PRINTED_NOTE_DETAIL;

export default function PrintedNoteDetailScreen() {
  const [agreed, setAgreed]   = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);

  const total = D.pricing.price + D.pricing.shipping;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{D.headerTitle}</Text>
        <TouchableOpacity style={s.cartBtn}>
          <Text style={s.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>

        {/* Book images side by side */}
        <View style={s.imgRow}>
          <Image source={D.image} style={s.bookImg} resizeMode="cover" />
          <Image source={D.image} style={s.bookImg} resizeMode="cover" />
        </View>

        <View style={s.body}>
          <Text style={s.noteTitle}>{D.title}</Text>

          {/* About */}
          <Text style={s.sectionHead}>{D.aboutEmoji} About the book</Text>
          <Text style={s.aboutDesc}>{D.aboutDesc}</Text>

          {/* Topics */}
          <Text style={s.sectionHead}>Total topics covered in this book</Text>
          {D.topics.map((sec, si) => (
            <View key={si} style={{ marginBottom: 10 }}>
              <Text style={s.topicSection}>{sec.section}</Text>
              {sec.items.map((item, ii) => (
                <Text key={ii} style={s.topicItem}>{`  ${ii + 1}. ${item}`}</Text>
              ))}
            </View>
          ))}

          {/* Delivery */}
          <Text style={s.sectionHead}>Delivery details</Text>
          <TouchableOpacity style={s.deliveryRow}>
            <Text style={s.deliveryPin}>📍</Text>
            <Text style={s.deliveryTxt}>Select delivery location</Text>
            <Text style={s.deliveryChev}>›</Text>
          </TouchableOpacity>

          {/* Price breakdown */}
          <View style={s.priceBox}>
            <Text style={s.priceBoxTitle}>Price Breakdown</Text>
            {[
              { label: 'MRP',           val: D.pricing.mrp    },
              { label: 'Price',         val: D.pricing.price  },
              { label: 'Shipping Price',val: D.pricing.shipping },
            ].map(r => (
              <View key={r.label} style={s.priceRow}>
                <Text style={s.priceKey}>{r.label}</Text>
                <Text style={s.priceVal}>₹{r.val}</Text>
              </View>
            ))}
            <View style={[s.priceRow, s.totalRow]}>
              <Text style={[s.priceKey, s.totalTxt]}>Total Price</Text>
              <Text style={[s.priceVal, s.totalTxt]}>₹{total}</Text>
            </View>
            <TouchableOpacity style={s.couponBtn}>
              <Text style={s.couponBtnTxt}>Apply Coupon</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={s.termsRow}
            onPress={() => { setAgreed(v => !v); setTermsOpen(false); }}
            activeOpacity={0.8}
          >
            <View style={[s.checkbox, agreed && s.checkboxChecked]}>
              {agreed && <Text style={s.checkmark}>✓</Text>}
            </View>
            <Text style={[s.termsTxt, { color: agreed ? C.primary : C.textDark }]}>
              I accept Terms &amp; Conditions
            </Text>
            <TouchableOpacity onPress={() => setTermsOpen(v => !v)} style={s.chevron}>
              <Text style={s.chevronTxt}>{termsOpen ? '∧' : '∨'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {termsOpen && (
            <View style={s.termsList}>
              {D.termsItems.map((t, i) => (
                <Text key={i} style={s.termsItem}>{`${i + 1}. ${t}`}</Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Buy Now */}
      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={[s.buyBtn, !agreed && s.btnDisabled]}
          disabled={!agreed}
          onPress={() => router.push('/notes/printed-notes/checkout' as any)}
        >
          <Text style={s.buyBtnTxt}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: C.screenBg },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, backgroundColor: C.screenBg,
  },
  backBtn:     { marginRight: 12 },
  backArrow:   { fontSize: 28, color: C.textDark, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: C.textDark },
  cartBtn:     { padding: 4 },
  cartIcon:    { fontSize: 20 },

  imgRow:   { flexDirection: 'row', marginHorizontal: 16, gap: 10, marginBottom: 0 },
  bookImg:  { flex: 1, height: 180, borderRadius: 12 },

  body: { padding: 16 },
  noteTitle: { fontSize: 17, fontWeight: '800', color: C.textDark, marginBottom: 14, marginTop: 6 },

  sectionHead: { fontSize: 14, fontWeight: '800', color: C.textDark, marginBottom: 8, marginTop: 4 },
  aboutDesc:   { fontSize: 13, color: C.textMuted, lineHeight: 20, marginBottom: 14 },

  topicSection: { fontSize: 13, fontWeight: '700', color: C.textDark, marginBottom: 4 },
  topicItem:    { fontSize: 12, color: C.textMuted, lineHeight: 20 },

  deliveryRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: C.cardBg, borderRadius: 12,
    padding: 14, marginBottom: 14,
  },
  deliveryPin:  { fontSize: 16 },
  deliveryTxt:  { flex: 1, fontSize: 13, fontWeight: '600', color: C.textDark },
  deliveryChev: { fontSize: 18, color: C.textMuted },

  priceBox: {
    backgroundColor: C.cardBg, borderRadius: 14,
    padding: 16, marginBottom: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  priceBoxTitle: { fontSize: 15, fontWeight: '800', color: C.textDark, marginBottom: 12 },
  priceRow:  { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalRow:  { borderTopWidth: 1, borderTopColor: C.border, paddingTop: 10, marginTop: 2 },
  priceKey:  { fontSize: 13, color: C.textMuted },
  priceVal:  { fontSize: 13, color: C.textMuted },
  totalTxt:  { fontWeight: '800', color: C.textDark },

  couponBtn: {
    backgroundColor: C.primary, paddingVertical: 12,
    borderRadius: 10, alignItems: 'center', marginTop: 8,
  },
  couponBtnTxt: { fontSize: 14, fontWeight: '700', color: C.white },

  termsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: C.cardBg, borderRadius: 12,
    padding: 14, marginBottom: 8,
  },
  checkbox:        { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: C.inputBorder, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: C.primary, borderColor: C.primary },
  checkmark:       { fontSize: 13, color: C.white, fontWeight: '800' },
  termsTxt:        { flex: 1, fontSize: 13, fontWeight: '600' },
  chevron:         { padding: 4 },
  chevronTxt:      { fontSize: 14, color: C.textMuted, fontWeight: '700' },
  termsList:       { backgroundColor: C.cardBg, borderRadius: 12, padding: 14, marginBottom: 16 },
  termsItem:       { fontSize: 12, color: C.textMuted, lineHeight: 20, marginBottom: 8 },

  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 28,
    backgroundColor: C.cardBg, borderTopWidth: 1, borderTopColor: C.border,
  },
  buyBtn:     { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  buyBtnTxt:  { fontSize: 15, fontWeight: '700', color: C.white },
  btnDisabled:{ opacity: 0.35 },
});