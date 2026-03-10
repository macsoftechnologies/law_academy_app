// app/(tabs)/notes/printed-notes/checkout.tsx
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Colors from '../../../../constants/colors';
import { MOCK_ADDRESSES, MOCK_CARDS, PRINTED_NOTE_DETAIL } from '../../../../data/mock/printed-notes.mock';

const C = Colors;
const D = PRINTED_NOTE_DETAIL;

export default function CheckoutScreen() {
  const defaultAddress = MOCK_ADDRESSES.find(a => a.isDefault)!;
  const defaultCard    = MOCK_CARDS.find(c => c.isDefault)!;
  const total = D.pricing.price + D.pricing.shipping;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <Text style={s.backArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Check Out</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 110 }}>

        {/* Shipping address */}
        <Text style={s.sectionLabel}>Shipping address</Text>
        <View style={s.infoCard}>
          <View style={s.infoCardRow}>
            <Text style={s.infoName}>{defaultAddress.name}</Text>
            <TouchableOpacity onPress={() => router.push('/notes/printed-notes/shipping-addresses' as any)}>
              <Text style={s.changeBtn}>Change</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.infoAddr}>{defaultAddress.address}</Text>
          <Text style={s.infoAddr}>{defaultAddress.city}</Text>
        </View>

        {/* Payment */}
        <View style={s.infoCardRow}>
          <Text style={s.sectionLabel}>Payment</Text>
          <TouchableOpacity onPress={() => router.push('/notes/printed-notes/payment-methods' as any)}>
            <Text style={s.changeBtn}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={s.infoCard}>
          <View style={s.cardRow}>
            <View style={s.cardIconWrap}>
              <Text style={s.cardTypeIcon}>{defaultCard.type === 'mastercard' ? '💳' : '💳'}</Text>
            </View>
            <Text style={s.cardMask}>{'**** **** **** ' + defaultCard.last4}</Text>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={s.priceBox}>
          <Text style={s.priceBoxTitle}>Price Breakdown</Text>
          {[
            { label: 'MRP',           val: D.pricing.mrp     },
            { label: 'Price',         val: D.pricing.price   },
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

      </ScrollView>

      {/* Submit Order sticky button */}
      <View style={s.stickyBottom}>
        <TouchableOpacity
          style={s.submitBtn}
          onPress={() => router.push('/notes/printed-notes/success' as any)}
        >
          <Text style={s.submitBtnTxt}>Submit Order</Text>
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
  headerTitle: { fontSize: 18, fontWeight: '800', color: C.textDark },

  sectionLabel: { fontSize: 15, fontWeight: '700', color: C.textDark, marginBottom: 10 },

  infoCard: {
    backgroundColor: C.cardBg, borderRadius: 14,
    padding: 16, marginBottom: 18,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  infoCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  infoName: { fontSize: 15, fontWeight: '700', color: C.textDark },
  infoAddr: { fontSize: 13, color: C.textMuted, lineHeight: 20 },
  changeBtn:{ fontSize: 13, fontWeight: '700', color: C.crimson },

  cardRow:     { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardIconWrap:{ width: 44, height: 30, backgroundColor: '#F0F0F0', borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  cardTypeIcon:{ fontSize: 20 },
  cardMask:    { fontSize: 14, fontWeight: '600', color: C.textDark, letterSpacing: 1 },

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

  stickyBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 28,
    backgroundColor: C.cardBg, borderTopWidth: 1, borderTopColor: C.border,
  },
  submitBtn:    { backgroundColor: C.primary, paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  submitBtnTxt: { fontSize: 15, fontWeight: '700', color: C.white },
});