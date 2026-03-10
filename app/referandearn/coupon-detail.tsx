// app/referandearn/coupon-detail.tsx

import { router } from 'expo-router';
import React from 'react';
import {
    Alert, StatusBar, StyleSheet, Text,
    TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NAVY = '#1A2E6E';
const GOLD = '#C9A227';
const CRIMSON = '#8B1A1A';
const COUPON_CODE = 'XD$EF5';

export default function CouponDetailScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={GOLD} />

      {/* Back button floating over the banner */}
      <TouchableOpacity style={s.backBtn} onPress={() => router.back()} hitSlop={12}>
        <Text style={s.backTxt}>‹</Text>
      </TouchableOpacity>

      {/* Large yellow coupon banner */}
      <View style={s.banner}>
        <View style={s.discountSection}>
          <Text style={s.discountBig}>50</Text>
          <Text style={s.discountPct}>%</Text>
        </View>
        <View style={s.divider} />
        <View style={s.shopSection}>
          <Text style={s.shopTxt}>SHOP</Text>
          <Text style={s.shopTxt}>NOW</Text>
          <Text style={s.websiteTxt}>YOURWEBSITEHERE</Text>
          {/* Text repeat rows */}
          {[...Array(6)].map((_, i) => (
            <Text key={i} style={s.repeatTxt} numberOfLines={1}>
              YOUR TEXT HERE  YOUR TEXT HERE  YOUR TEXT HERE  YOUR TEXT HERE
            </Text>
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={s.content}>
        <Text style={s.mainTitle}>
          Unlock massive savings—apply the coupon and get up to 50% off!
        </Text>
        <Text style={s.subTitle}>
          Enjoy seamless and easy access to your unlocked course—start learning now!
        </Text>

        <Text style={s.generatedLabel}>Generated Coupon Code</Text>

        <View style={s.codeRow}>
          <View style={s.couponIconBox}>
            <Text style={s.couponIcon}>🏷</Text>
          </View>
          <Text style={s.codeVal}>{COUPON_CODE}</Text>
          <TouchableOpacity
            onPress={() => Alert.alert('Copied!', `${COUPON_CODE} copied`)}
            hitSlop={8}
          >
            <Text style={s.copyIcon}>⧉</Text>
          </TouchableOpacity>
        </View>

        <View style={s.expireRow}>
          <Text style={s.calendarIcon}>📅</Text>
          <Text style={s.expireTxt}>Expire on 20 Dec, 2025, 11:59 pm</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F5F5F5' },

  backBtn: {
    position: 'absolute', top: 48, left: 16, zIndex: 10,
  },
  backTxt: { fontSize: 28, color: '#1A1A2E', fontWeight: '300', lineHeight: 32 },

  banner: {
    backgroundColor: GOLD,
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 16,
    overflow: 'hidden',
  },
  discountSection: { flexDirection: 'row', alignItems: 'flex-start' },
  discountBig: { fontSize: 72, fontWeight: '900', color: '#fff', lineHeight: 80 },
  discountPct: { fontSize: 28, fontWeight: '900', color: '#fff', marginTop: 16 },
  divider: { width: 2, height: 120, backgroundColor: 'rgba(255,255,255,0.5)' },
  shopSection: { flex: 1, gap: 2 },
  shopTxt: { fontSize: 28, fontWeight: '900', color: '#fff', lineHeight: 32 },
  websiteTxt: { fontSize: 9, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, marginTop: 4 },
  repeatTxt: { fontSize: 7, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 },

  content: { padding: 20, gap: 14 },

  mainTitle: {
    fontSize: 15, fontWeight: '800', color: '#1A1A2E', lineHeight: 22,
  },
  subTitle: { fontSize: 13, color: '#555', lineHeight: 20 },

  generatedLabel: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },

  codeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 10,
    borderStyle: 'dashed', padding: 12,
    backgroundColor: '#fff',
  },
  couponIconBox: {
    width: 32, height: 32, borderRadius: 6,
    backgroundColor: CRIMSON, alignItems: 'center', justifyContent: 'center',
  },
  couponIcon: { fontSize: 16 },
  codeVal: { flex: 1, fontSize: 16, fontWeight: '800', color: '#1A1A2E', letterSpacing: 2 },
  copyIcon: { fontSize: 20, color: '#888' },

  expireRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  calendarIcon: { fontSize: 16 },
  expireTxt: { fontSize: 13, color: '#555' },
});