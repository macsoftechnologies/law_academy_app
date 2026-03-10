// app/referandearn/index.tsx

import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView, StatusBar, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const CRIMSON = '#8B1A1A';
const GOLD = '#C9A227';
const REFERRAL_CODE = 'XD$EF5';

export default function ReferAndEarnScreen() {
  const handleCopy = () => {
    Alert.alert('Copied!', `Referral code ${REFERRAL_CODE} copied.`);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Refer & Earn</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <View style={s.illustrationWrap}>
          <View style={s.illustrationBox}>
            <Text style={s.illustrationEmoji}>⚖️</Text>
            <View style={s.scaleRow}>
              <View style={s.scalePan}>
                <Text style={s.scalePanEmoji}>💰</Text>
              </View>
              <Text style={s.scalePole}>|</Text>
              <View style={s.scalePan}>
                <Text style={s.scalePanEmoji}>✅</Text>
              </View>
            </View>
            <View style={s.peopleRow}>
              <Text style={s.personEmoji}>👔</Text>
              <Text style={s.personEmoji}>🧑‍💼</Text>
            </View>
          </View>
        </View>

        {/* Referral code */}
        <View style={s.codeRow}>
          <View style={s.codeBox}>
            <Text style={s.codeText}>{REFERRAL_CODE}</Text>
            <TouchableOpacity onPress={handleCopy} hitSlop={8}>
              <Text style={s.copyIcon}>⧉</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Info */}
        <View style={s.infoSection}>
          <Text style={s.infoTitle}>🎉 Invite Friends, Get Bonuses</Text>
          <Text style={s.infoSub}>
            Refer your Friend and get a coupon worth 1000/- on their successful purchase of ANY FULL COURSE.
          </Text>
        </View>

        {/* Action cards */}
        <TouchableOpacity
          style={[s.actionCard, { backgroundColor: CRIMSON }]}
          onPress={() => router.push('/referandearn/earnings' as any)}
        >
          <Text style={s.actionIcon}>💰</Text>
          <View style={s.actionInfo}>
            <Text style={s.actionTitle}>My Earnings</Text>
            <Text style={s.actionSub}>Tap to check your referral earnings</Text>
          </View>
          <Text style={s.actionChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[s.actionCard, { backgroundColor: GOLD }]}
          onPress={() => Alert.alert('Share', 'Opening share sheet...')}
        >
          <Text style={s.actionIcon}>📤</Text>
          <View style={s.actionInfo}>
            <Text style={s.actionTitle}>Share to your network</Text>
            <Text style={s.actionSub}>tap to share with your network</Text>
          </View>
          <Text style={s.actionChevron}>›</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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

  scroll: { paddingHorizontal: 16, gap: 16 },

  illustrationWrap: { alignItems: 'center', paddingVertical: 16 },
  illustrationBox: { alignItems: 'center', gap: 8 },
  illustrationEmoji: { fontSize: 48 },
  scaleRow: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  scalePan: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: '#D0D8F0',
    alignItems: 'center', justifyContent: 'center',
  },
  scalePanEmoji: { fontSize: 28 },
  scalePole: { fontSize: 48, color: '#888', fontWeight: '100' },
  peopleRow: { flexDirection: 'row', gap: 20 },
  personEmoji: { fontSize: 36 },

  codeRow: { alignItems: 'center' },
  codeBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1.5, borderColor: '#C0C0C0',
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  codeText: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', letterSpacing: 2 },
  copyIcon: { fontSize: 20, color: '#888' },

  infoSection: { gap: 6 },
  infoTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },
  infoSub: { fontSize: 13, color: '#555', lineHeight: 20 },

  actionCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 14, padding: 16, gap: 12,
  },
  actionIcon: { fontSize: 24 },
  actionInfo: { flex: 1 },
  actionTitle: { fontSize: 14, fontWeight: '800', color: '#fff' },
  actionSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  actionChevron: { fontSize: 22, color: '#fff', fontWeight: '300' },
});