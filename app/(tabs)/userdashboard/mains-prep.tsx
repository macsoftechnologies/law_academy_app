// app/(tabs)/userdashboard/mains-prep.tsx

import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView, StatusBar, StyleSheet, Text,
    TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const GOLD = '#C9A227';
const CRIMSON = '#8B1A1A';

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={pb.track}>
      <View style={[pb.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}
const pb = StyleSheet.create({
  track: { height: 7, backgroundColor: '#E8E0D0', borderRadius: 4, overflow: 'hidden', flex: 1 },
  fill:  { height: '100%', borderRadius: 4 },
});

function SubjectRow({ label, pct, color, icon }: { label: string; pct: number; color: string; icon?: string }) {
  return (
    <View style={sr.wrap}>
      <View style={sr.labelRow}>
        <Text style={sr.label}>{label}</Text>
        {icon && <Text style={sr.icon}>{icon}</Text>}
      </View>
      <View style={sr.barRow}>
        <ProgressBar pct={pct} color={color} />
        <Text style={sr.pct}>{pct}%</Text>
      </View>
      <View style={sr.metaRow}>
        <Text style={sr.meta}>Completed-12</Text>
        <Text style={sr.meta}>Pending-13</Text>
      </View>
    </View>
  );
}
const sr = StyleSheet.create({
  wrap:    { marginBottom: 14 },
  labelRow:{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  label:   { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  icon:    { fontSize: 14 },
  barRow:  { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pct:     { fontSize: 12, fontWeight: '700', color: '#555', width: 36, textAlign: 'right' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  meta:    { fontSize: 11, color: '#888' },
});

const SECTIONS = [
  {
    title: 'Mains Q & A',
    subjects: [
      { label: 'PDFs',   pct: 48, color: NAVY,    icon: '📄' },
      { label: 'Videos', pct: 48, color: NAVY,    icon: '▶️' },
    ],
  },
  {
    title: 'Essay & Translataion',
    subjects: [
      { label: 'PDFs',   pct: 48, color: CRIMSON, icon: '📄' },
      { label: 'Videos', pct: 48, color: CRIMSON, icon: '▶️' },
    ],
  },
  {
    title: 'Mains Test Series',
    subjects: [
      { label: 'Mains test series',  pct: 48, color: GOLD },
      { label: 'Criminal Laws',      pct: 48, color: GOLD, icon: '⚖️' },
      { label: 'Essay & Translation',pct: 48, color: GOLD },
    ],
  },
];

export default function MainsPrepScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Mains Prep</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {SECTIONS.map((sec, si) => (
          <View key={si} style={s.card}>
            <Text style={s.cardTitle}>{sec.title}</Text>
            {sec.subjects.map((sub, i) => (
              <SubjectRow
                key={i}
                label={sub.label}
                pct={sub.pct}
                color={sub.color}
                icon={sub.icon}
              />
            ))}
          </View>
        ))}

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

  scroll: { padding: 14, gap: 12 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 16,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', marginBottom: 14 },
});