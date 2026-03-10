// app/referandearn/earnings.tsx

import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert, ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const CRIMSON = '#8B1A1A';
const GOLD = '#C9A227';

type CouponStatus = 'active' | 'expired' | 'used';
type Coupon = { id: string; discount: string; status: CouponStatus; validUntil: string; redeemedOn?: string };

const MOCK_COUPONS: Coupon[] = [
  { id: 'cp1', discount: '50%', status: 'active',  validUntil: 'Dec 20, 2025' },
  { id: 'cp2', discount: '50%', status: 'active',  validUntil: 'Dec 20, 2025' },
  { id: 'cp3', discount: '50%', status: 'expired', validUntil: 'Dec 20, 2025' },
  { id: 'cp4', discount: '50%', status: 'used',    validUntil: 'Dec 20, 2025', redeemedOn: 'Nov 14, 2025' },
];

function CouponCard({ coupon, onPress }: { coupon: Coupon; onPress: () => void }) {
  const isExpired = coupon.status === 'expired';
  const isUsed    = coupon.status === 'used';
  const isActive  = coupon.status === 'active';

  return (
    <TouchableOpacity
      style={[cc.card, isExpired && cc.cardExpired]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Timer badge */}
      {isActive && (
        <View style={cc.timerBadge}>
          <Text style={cc.timerTxt}>⏱ 14d</Text>
        </View>
      )}
      {/* Banner */}
      <View style={[cc.banner, isExpired && cc.bannerExpired]}>
        <Text style={cc.discountTxt}>{coupon.discount}</Text>
        <View style={cc.dividerLine} />
        <View>
          <Text style={cc.shopTxt}>SHOP</Text>
          <Text style={cc.shopTxt}>NOW</Text>
        </View>
      </View>
      {/* Footer */}
      <View style={cc.footer}>
        {isExpired ? (
          <>
            <Text style={cc.expiredLabel}>Expired</Text>
            <View style={cc.expiredBadge}><Text style={cc.expiredBadgeTxt}>Expired</Text></View>
          </>
        ) : isUsed ? (
          <>
            <Text style={cc.expireLabel}>Expire Soon</Text>
            <View style={cc.usedBadge}><Text style={cc.usedBadgeTxt}>Used</Text></View>
          </>
        ) : (
          <>
            <Text style={cc.expireLabel}>Expire Soon</Text>
            <TouchableOpacity style={cc.useNowBtn}><Text style={cc.useNowTxt}>Use Now</Text></TouchableOpacity>
          </>
        )}
      </View>
      <Text style={cc.validTxt}>
        {isUsed ? `Redeemed on: ${coupon.redeemedOn}` : `Validity until: ${coupon.validUntil}`}
      </Text>
    </TouchableOpacity>
  );
}

const cc = StyleSheet.create({
  card: {
    flex: 1, borderRadius: 12, overflow: 'hidden',
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.08,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  cardExpired: { opacity: 0.7 },
  timerBadge: {
    position: 'absolute', top: 8, right: 8, zIndex: 2,
    backgroundColor: NAVY, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6,
  },
  timerTxt: { fontSize: 9, color: '#fff', fontWeight: '700' },
  banner: {
    backgroundColor: GOLD, padding: 10,
    flexDirection: 'row', alignItems: 'center', gap: 8,
    height: 80,
  },
  bannerExpired: { backgroundColor: '#888' },
  discountTxt: { fontSize: 24, fontWeight: '900', color: '#fff' },
  dividerLine: { width: 1, height: '80%', backgroundColor: 'rgba(255,255,255,0.5)' },
  shopTxt: { fontSize: 13, fontWeight: '900', color: '#fff', lineHeight: 16 },
  footer: {
    backgroundColor: '#fff', paddingHorizontal: 8, paddingTop: 6,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  expiredLabel: { fontSize: 11, fontWeight: '700', color: '#888' },
  expiredBadge: {
    backgroundColor: '#E0E0E0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  expiredBadgeTxt: { fontSize: 10, color: '#888', fontWeight: '700' },
  expireLabel: { fontSize: 11, fontWeight: '700', color: '#1A1A2E' },
  useNowBtn: {
    backgroundColor: NAVY, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  useNowTxt: { fontSize: 10, color: '#fff', fontWeight: '700' },
  usedBadge: {
    backgroundColor: '#E8EAF0', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6,
  },
  usedBadgeTxt: { fontSize: 10, color: NAVY, fontWeight: '700' },
  validTxt: {
    fontSize: 10, color: '#888', backgroundColor: '#fff',
    paddingHorizontal: 8, paddingBottom: 8,
  },
});

export default function MyEarningsScreen() {
  const [amount, setAmount] = useState('');
  const [generatedCode, setGeneratedCode] = useState('XD$EF5');
  const [converted, setConverted] = useState(true);

  const handleConvert = () => {
    if (!amount) { Alert.alert('Error', 'Please enter an amount'); return; }
    setConverted(true);
    Alert.alert('Success', 'Coupon code generated!');
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={NAVY} />

      {/* Navy top section */}
      <View style={s.topSection}>
        <View style={s.topHeader}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
            <Text style={s.backWhite}>‹</Text>
          </TouchableOpacity>
          <Text style={s.topTitle}>My Earnings</Text>
          <View style={s.moneyBagEmoji}>
            <Text style={{ fontSize: 40 }}>💰</Text>
          </View>
        </View>
        <Text style={s.totalLabel}>Total Earnings</Text>
        <Text style={s.totalAmt}>₹5000</Text>
        <TouchableOpacity style={s.earnMoreBtn}>
          <Text style={s.earnMoreTxt}>Earn More</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Breakdown */}
        <Text style={s.sectionTitle}>Earning Breakdown</Text>
        <View style={s.breakdownRow}>
          {[
            { label: 'MY REFERRALS',      value: '05', bg: '#F5E6E6' },
            { label: 'Earnings Claimed',  value: '2000', bg: '#FDF9ED' },
            { label: 'Earnings Remaining', value: '3000', bg: '#EEF2FF' },
          ].map((b, i) => (
            <View key={i} style={[s.breakdownCard, { backgroundColor: b.bg }]}>
              <Text style={s.breakdownLabel}>{b.label}</Text>
              <Text style={s.breakdownValue}>{b.value}</Text>
            </View>
          ))}
        </View>

        {/* Manage coupons */}
        <View style={s.manageCard}>
          <Text style={s.manageTitle}>Manage Coupons</Text>
          <View style={s.amountRow}>
            <TouchableOpacity style={s.minusBtn}>
              <Text style={s.minusTxt}>−</Text>
            </TouchableOpacity>
            <View style={s.amountInput}>
              <Text style={s.coinEmoji}>🪙</Text>
              <TextInput
                style={s.amountTxt}
                placeholder="Enter Amount"
                placeholderTextColor="#AAACB0"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
            </View>
            <TouchableOpacity style={s.plusBtn}>
              <Text style={s.plusTxt}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.convertBtn} onPress={handleConvert}>
            <Text style={s.convertTxt}>Convert to coupon code</Text>
          </TouchableOpacity>

          {/* Generated code */}
          {converted && (
            <>
              <Text style={s.generatedLabel}>Generated Coupon Code</Text>
              <View style={s.codeRow}>
                <View style={s.couponIconBox}>
                  <Text style={s.couponIcon}>🏷</Text>
                </View>
                <Text style={s.codeVal}>{generatedCode}</Text>
                <TouchableOpacity
                  onPress={() => Alert.alert('Copied!', `${generatedCode} copied`)}
                  hitSlop={8}
                >
                  <Text style={s.copyIcon}>⧉</Text>
                </TouchableOpacity>
              </View>
              <View style={s.successRow}>
                <Text style={s.successDot}>✅</Text>
                <Text style={s.successMsg}>Coupon Created Successful Use within 15 days.</Text>
              </View>
            </>
          )}
        </View>

        {/* Coupons grid */}
        <Text style={s.sectionTitle}>Coupons</Text>
        <View style={s.grid}>
          {MOCK_COUPONS.map((coupon, i) => (
            i % 2 === 0 ? (
              <View key={coupon.id} style={s.gridRow}>
                <CouponCard
                  coupon={coupon}
                  onPress={() => router.push({ pathname: '/referandearn/coupon-detail', params: { id: coupon.id } } as any)}
                />
                {MOCK_COUPONS[i + 1] ? (
                  <CouponCard
                    coupon={MOCK_COUPONS[i + 1]}
                    onPress={() => router.push({ pathname: '/referandearn/coupon-detail', params: { id: MOCK_COUPONS[i+1].id } } as any)}
                  />
                ) : <View style={{ flex: 1 }} />}
              </View>
            ) : null
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  topSection: {
    backgroundColor: NAVY, paddingHorizontal: 16,
    paddingTop: 8, paddingBottom: 24,
  },
  topHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backWhite: { fontSize: 28, color: '#fff', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  topTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: '#fff' },
  moneyBagEmoji: {},

  totalLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
  totalAmt: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 12 },
  earnMoreBtn: {
    backgroundColor: CRIMSON,
    alignSelf: 'flex-start',
    paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8,
  },
  earnMoreTxt: { fontSize: 13, fontWeight: '700', color: '#fff' },

  scroll: { padding: 16, gap: 14 },

  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E' },

  breakdownRow: { flexDirection: 'row', gap: 10 },
  breakdownCard: {
    flex: 1, borderRadius: 10, padding: 10, gap: 4,
  },
  breakdownLabel: { fontSize: 10, fontWeight: '700', color: '#555', textTransform: 'uppercase' },
  breakdownValue: { fontSize: 18, fontWeight: '900', color: '#1A1A2E' },

  manageCard: {
    backgroundColor: '#fff', borderRadius: 14, padding: 16, gap: 12,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  manageTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', textAlign: 'center' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  minusBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: NAVY, alignItems: 'center', justifyContent: 'center',
  },
  minusTxt: { fontSize: 20, color: '#fff', fontWeight: '700', lineHeight: 24 },
  amountInput: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 1.5, borderColor: GOLD, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  coinEmoji: { fontSize: 18 },
  amountTxt: { flex: 1, fontSize: 14, color: '#1A1A2E' },
  plusBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#E8EAF0', alignItems: 'center', justifyContent: 'center',
  },
  plusTxt: { fontSize: 20, color: NAVY, fontWeight: '700', lineHeight: 24 },
  convertBtn: {
    backgroundColor: NAVY, paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  convertTxt: { fontSize: 14, fontWeight: '700', color: '#fff' },

  generatedLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  codeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 10,
    borderStyle: 'dashed', padding: 10,
  },
  couponIconBox: {
    width: 32, height: 32, borderRadius: 6,
    backgroundColor: CRIMSON, alignItems: 'center', justifyContent: 'center',
  },
  couponIcon: { fontSize: 16 },
  codeVal: { flex: 1, fontSize: 16, fontWeight: '800', color: '#1A1A2E', letterSpacing: 2 },
  copyIcon: { fontSize: 20, color: '#888' },
  successRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  successDot: { fontSize: 14 },
  successMsg: { fontSize: 12, color: '#555', flex: 1 },

  grid: { gap: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },
});