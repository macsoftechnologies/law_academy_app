// app/mycart/index.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, ScrollView, StatusBar, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';
const CRIMSON = '#8B1A1A';

type CartItem = { id: string; title: string; price: string; original: string };

const COURSE_ITEMS: CartItem[] = [
  { id: 'ci1', title: 'Andhra Pradesh JCJ Course', price: '₹45,000', original: '₹90,000' },
  { id: 'ci2', title: 'Telangana JCJ Course',       price: '₹45,000', original: '₹90,000' },
  { id: 'ci3', title: 'Telangana JCJ Course',       price: '₹45,000', original: '₹90,000' },
  { id: 'ci4', title: 'Combo of JCJ & DDJ',         price: '₹45,000', original: '₹90,000' },
];

const BOOK_ITEMS: CartItem[] = [
  { id: 'bi1', title: 'Andhra Pradesh JCJ Course', price: '₹45,000', original: '₹90,000' },
  { id: 'bi2', title: 'Telangana JCJ Course',       price: '₹45,000', original: '₹90,000' },
  { id: 'bi3', title: 'Telangana JCJ Course',       price: '₹45,000', original: '₹90,000' },
];

const TC_POINTS = [
  'Are you sure you want to start the Civil Laws Mains Test?',
  'Once the test begins, you must complete it within 3 hours.',
  'After submission time, you\'ll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.',
  'Once started, the test cannot be paused or restarted.',
];

// Price rows per tab — each tab has its own set
const COURSE_PRICE_ROWS = [
  { label: 'MRP',         value: '₹3,60,000', strike: true  },
  { label: 'Price',       value: '₹1,80,000', strike: false },
  { label: 'Total Price', value: '₹1,80,000', strike: false },
];

const BOOK_PRICE_ROWS = [
  { label: 'MRP',            value: '₹599',  strike: true  },
  { label: 'Price',          value: '₹499',  strike: false },
  { label: 'Shipping Price', value: '₹50',   strike: false },
  { label: 'Total Price',    value: '₹549',  strike: false },
];

export default function MyCartScreen() {
  const [tab, setTab] = useState<'courses' | 'books'>('courses');

  // ── Courses — independent state ──────────────────────────────────────────
  const [courseItems,      setCourseItems]      = useState(COURSE_ITEMS);
  const [courseTcAccepted, setCourseTcAccepted] = useState(false);
  const [courseTcExpanded, setCourseTcExpanded] = useState(false);

  // ── Books — independent state ─────────────────────────────────────────────
  const [bookItems,      setBookItems]      = useState(BOOK_ITEMS);
  const [bookTcAccepted, setBookTcAccepted] = useState(false);
  const [bookTcExpanded, setBookTcExpanded] = useState(false);

  const isBooks    = tab === 'books';
  const items      = isBooks ? bookItems      : courseItems;
  const tcAccepted = isBooks ? bookTcAccepted : courseTcAccepted;
  const tcExpanded = isBooks ? bookTcExpanded : courseTcExpanded;
  const priceRows  = isBooks ? BOOK_PRICE_ROWS : COURSE_PRICE_ROWS;
  const bottomTotal = isBooks ? '₹549' : '₹1,80,000';

  const removeItem = (id: string) => {
    if (isBooks) setBookItems(prev => prev.filter(i => i.id !== id));
    else         setCourseItems(prev => prev.filter(i => i.id !== id));
  };

  const toggleTc = () => {
    if (isBooks) {
      setBookTcAccepted(v => !v);
      setBookTcExpanded(v => !v);
    } else {
      setCourseTcAccepted(v => !v);
      setCourseTcExpanded(v => !v);
    }
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>My Cart</Text>
      </View>

      {/* Tab switcher */}
      <View style={s.tabBar}>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'courses' && s.tabBtnActive]}
          onPress={() => setTab('courses')}
        >
          <Text style={[s.tabTxt, tab === 'courses' && s.tabTxtActive]}>My Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.tabBtn, tab === 'books' && s.tabBtnActive]}
          onPress={() => setTab('books')}
        >
          <Text style={[s.tabTxt, tab === 'books' && s.tabTxtActive]}>Printed Books</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Delivery address (books only) */}
        {isBooks && (
          <View style={s.deliveryCard}>
            <View style={s.deliveryInfo}>
              <Text style={s.deliveryName}>Deliver to:  Allu Krishna..., 533002</Text>
              <View style={s.homeTag}>
                <Text style={s.homeTagTxt}>Home</Text>
              </View>
            </View>
            <TouchableOpacity style={s.changeBtn}>
              <Text style={s.changeTxt}>Change</Text>
            </TouchableOpacity>
            <Text style={s.deliveryAddr}>Visakhopatnam, Andhrapradesh</Text>
          </View>
        )}

        {/* Cart items */}
        {items.map(item => (
          <View key={item.id} style={s.itemCard}>
            <View style={s.itemThumb}>
              <Text style={s.itemThumbEmoji}>🏛️</Text>
            </View>
            <View style={s.itemInfo}>
              <Text style={s.itemTitle}>{item.title}</Text>
              <View style={s.priceRow}>
                <Text style={s.price}>{item.price}</Text>
                <Text style={s.original}>{item.original}</Text>
              </View>
              <View style={s.itemBtns}>
                <TouchableOpacity
                  style={s.removeBtn}
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={s.removeTxt}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.buyNowBtn}>
                  <Text style={s.buyNowTxt}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Buy More & Save More */}
        <View style={s.saveMoreCard}>
          <Text style={s.saveMoreTitle}>Buy More & Save More</Text>
          <View style={s.saveMoreRow}>
            <Text style={s.saveMoreTag}>
              {isBooks
                ? '🏷 Add 1 more book(s) to get extra 5% off'
                : '🏷 Add 1 more course(s) to get extra 5% off'}
            </Text>
          </View>
          <View style={s.addMoreRow}>
            <View style={s.addBox}>
              <Text style={s.addPlus}>+</Text>
            </View>
            <Text style={s.plusSign}>+</Text>
            <View style={s.addThumb}>
              <Text style={s.addThumbEmoji}>🏛️</Text>
              <View style={s.checkBadge}><Text style={s.checkTxt}>✓</Text></View>
            </View>
            <Text style={s.plusSign}>+</Text>
            <View style={s.addThumb}>
              <Text style={s.addThumbEmoji}>🏛️</Text>
              <View style={s.checkBadge}><Text style={s.checkTxt}>✓</Text></View>
            </View>
          </View>
        </View>

        {/* Price Details — each tab has its own rows */}
        <View style={s.priceCard}>
          <Text style={s.priceCardTitle}>Price Details</Text>
          <View style={s.divider} />
          {priceRows.map((row, i) => (
            <View key={i} style={s.priceRow2}>
              <Text style={s.priceLabel}>{row.label}</Text>
              <Text style={[s.priceValue, row.strike && s.priceStrike]}>{row.value}</Text>
            </View>
          ))}
          <TouchableOpacity style={s.couponBtn}>
            <Text style={s.couponTxt}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>

        {/* T&C checkbox — independent per tab */}
        <TouchableOpacity
          style={s.tcRow}
          onPress={toggleTc}
          activeOpacity={0.8}
        >
          <View style={[s.checkbox, tcAccepted && s.checkboxChecked]}>
            {tcAccepted && <Text style={s.checkmark}>✓</Text>}
          </View>
          <Text style={s.tcLabel}>I accept Terms & Conditions</Text>
          <Text style={s.tcChevron}>{tcExpanded ? '∧' : '∨'}</Text>
        </TouchableOpacity>

        {/* Expanded T&C */}
        {tcExpanded && (
          <View style={s.tcPoints}>
            {TC_POINTS.map((pt, i) => (
              <View key={i} style={s.tcPointRow}>
                <Text style={s.tcNum}>{i + 1}. </Text>
                <Text style={s.tcPt}>{pt}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom bar — total & button reflect active tab */}
      <View style={s.bottomBar}>
        <View>
          <Text style={s.totalAmt}>{bottomTotal}</Text>
          <TouchableOpacity>
            <Text style={s.viewDetails}>View Details ∧</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[s.buyBtn, !tcAccepted && s.buyBtnDisabled]}
          disabled={!tcAccepted}
          onPress={() => Alert.alert('Order', isBooks ? 'Order placed!' : 'Proceeding to payment...')}
        >
          <Text style={s.buyBtnTxt}>{isBooks ? 'Place Order' : 'Buy Now'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },

  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16, marginBottom: 14,
    backgroundColor: '#fff', borderRadius: 12, padding: 4,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 4, shadowOffset: { width: 0, height: 1 },
  },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabBtnActive: { backgroundColor: NAVY },
  tabTxt: { fontSize: 14, fontWeight: '700', color: NAVY },
  tabTxtActive: { color: '#fff' },

  scroll: { paddingHorizontal: 14, gap: 12 },

  // Delivery (books)
  deliveryCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
  },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  deliveryName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', flexShrink: 1 },
  homeTag: {
    backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  homeTagTxt: { fontSize: 10, fontWeight: '700', color: NAVY },
  changeBtn: {
    position: 'absolute', right: 14, top: 14,
    backgroundColor: '#E8EAF0', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8,
  },
  changeTxt: { fontSize: 12, fontWeight: '700', color: '#1A1A2E' },
  deliveryAddr: { fontSize: 12, color: '#888' },

  // Cart item
  itemCard: {
    backgroundColor: '#fff', borderRadius: 12,
    flexDirection: 'row', padding: 12, gap: 10,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
  },
  itemThumb: {
    width: 70, height: 70, borderRadius: 10,
    backgroundColor: '#C8D8E8',
    alignItems: 'center', justifyContent: 'center',
  },
  itemThumbEmoji: { fontSize: 28 },
  itemInfo: { flex: 1, gap: 4 },
  itemTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  priceRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  price: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },
  original: { fontSize: 12, color: '#888', textDecorationLine: 'line-through' },
  itemBtns: { flexDirection: 'row', gap: 8, marginTop: 4 },
  removeBtn: {
    borderWidth: 1, borderColor: '#E0E0E0',
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
  },
  removeTxt: { fontSize: 12, fontWeight: '600', color: '#555' },
  buyNowBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8,
  },
  buyNowTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },

  // Save more
  saveMoreCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
    gap: 10,
  },
  saveMoreTitle: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },
  saveMoreRow: {
    backgroundColor: '#F0FFF4', borderRadius: 8, padding: 8,
  },
  saveMoreTag: { fontSize: 12, color: '#2E7D32', fontWeight: '600' },
  addMoreRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addBox: {
    width: 50, height: 50, borderRadius: 8,
    backgroundColor: '#EEF2FF', borderWidth: 1.5,
    borderColor: NAVY, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  addPlus: { fontSize: 22, color: NAVY, fontWeight: '700' },
  plusSign: { fontSize: 18, color: '#888', fontWeight: '700' },
  addThumb: {
    width: 50, height: 50, borderRadius: 8,
    backgroundColor: '#C8D8E8',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  addThumbEmoji: { fontSize: 22 },
  checkBadge: {
    position: 'absolute', bottom: -4, right: -4,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: '#4CAF50',
    alignItems: 'center', justifyContent: 'center',
  },
  checkTxt: { fontSize: 10, color: '#fff', fontWeight: '800' },

  // Price details
  priceCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
    gap: 8,
  },
  priceCardTitle: { fontSize: 14, fontWeight: '800', color: '#1A1A2E' },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  priceRow2: { flexDirection: 'row', justifyContent: 'space-between' },
  priceLabel: { fontSize: 13, color: '#555' },
  priceValue: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  priceStrike: { textDecorationLine: 'line-through', color: '#999', fontWeight: '400' },
  couponBtn: {
    backgroundColor: NAVY, paddingVertical: 12,
    borderRadius: 10, alignItems: 'center', marginTop: 4,
  },
  couponTxt: { fontSize: 14, fontWeight: '700', color: '#fff' },

  // T&C
  tcRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
  },
  checkbox: {
    width: 20, height: 20, borderWidth: 2, borderColor: CRIMSON,
    borderRadius: 4, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: CRIMSON },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  tcLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  tcChevron: { fontSize: 14, color: '#888', fontWeight: '700' },

  tcPoints: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, gap: 8,
  },
  tcPointRow: { flexDirection: 'row' },
  tcNum: { fontSize: 12, fontWeight: '700', color: '#555' },
  tcPt:  { flex: 1, fontSize: 12, color: '#555', lineHeight: 18 },

  // Bottom bar
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    elevation: 12,
    shadowColor: '#000', shadowOpacity: 0.1,
    shadowRadius: 8, shadowOffset: { width: 0, height: -4 },
  },
  totalAmt: { fontSize: 17, fontWeight: '900', color: '#1A1A2E' },
  viewDetails: { fontSize: 12, color: '#888', marginTop: 2 },
  buyBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 32, paddingVertical: 14,
    borderRadius: 10,
  },
  buyBtnDisabled: { backgroundColor: '#D4C4A0' },
  buyBtnTxt: { fontSize: 15, fontWeight: '800', color: '#fff' },
});