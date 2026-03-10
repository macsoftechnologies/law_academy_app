// app/(tabs)/userdashboard/study-analysis.tsx

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

function SubjectRow({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <View style={sr.wrap}>
      <Text style={sr.label}>{label}</Text>
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
  wrap:   { marginBottom: 12 },
  label:  { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pct:    { fontSize: 12, fontWeight: '700', color: '#555', width: 36, textAlign: 'right' },
  metaRow:{ flexDirection: 'row', justifyContent: 'space-between' },
  meta:   { fontSize: 11, color: '#888' },
});

const SECTIONS = [
  {
    title: 'Total Video lessons - 500',
    subjects: [
      { label: 'Civil laws',    pct: 48, color: GOLD },
      { label: 'Criminal laws', pct: 48, color: GOLD },
    ],
  },
  {
    title: 'Total Short Notes - 500',
    subjects: [
      { label: 'Civil laws',    pct: 48, color: CRIMSON },
      { label: 'Criminal laws', pct: 48, color: CRIMSON },
    ],
  },
];

export default function StudyAnalysisScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Hi Tony,</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Course info card */}
        <View style={s.courseCard}>
          <View style={s.courseRow}>
            <View style={s.courseInfo}>
              <Text style={s.courseInfoTxt}>Course name: JCJ Full</Text>
              <Text style={s.courseInfoTxt}>Course Joined on: 30/10/2025</Text>
              <Text style={s.courseInfoTxt}>Last Activity: 10 Hours ago</Text>
            </View>
            <View style={s.courseIcons}>
              <Text style={s.courseIcon}>📖</Text>
              <Text style={s.courseIcon}>🕐</Text>
            </View>
          </View>
        </View>

        <Text style={s.sectionTitle}>Study Analysis</Text>

        {/* Progress sections */}
        {SECTIONS.map((sec, si) => (
          <View key={si} style={s.card}>
            <Text style={s.cardTitle}>{sec.title}</Text>
            {sec.subjects.map((sub, i) => (
              <SubjectRow key={i} label={sub.label} pct={sub.pct} color={sub.color} />
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

  courseCard: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 16,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  courseInfo: { gap: 4 },
  courseInfoTxt: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  courseIcons: { gap: 8, alignItems: 'flex-end' },
  courseIcon: { fontSize: 20 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', marginBottom: 4 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 16,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#1A1A2E', marginBottom: 14 },
});