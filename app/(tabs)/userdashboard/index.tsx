// app/(tabs)/userdashboard/index.tsx

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

// ── Reusable progress bar
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={pb.track}>
      <View style={[pb.fill, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}
const pb = StyleSheet.create({
  track: { height: 7, backgroundColor: '#E0E0E0', borderRadius: 4, flex: 1, overflow: 'hidden' },
  fill:  { height: '100%', borderRadius: 4 },
});

// ── Circle score widget
function ScoreCircle({ score }: { score: number }) {
  return (
    <View style={sc.wrap}>
      <View style={sc.outer}>
        <View style={sc.inner}>
          <Text style={sc.score}>{score}</Text>
        </View>
      </View>
    </View>
  );
}
const sc = StyleSheet.create({
  wrap:  { alignItems: 'center', justifyContent: 'center' },
  outer: {
    width: 72, height: 72, borderRadius: 36,
    borderWidth: 5, borderColor: GOLD,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  inner: { alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 26, fontWeight: '900', color: '#fff' },
});

const SUBJECT_PROGRESS = [
  { label: 'JCJ full course', pct: 50, color: NAVY,    route: '/(tabs)/userdashboard/study-analysis' },
  { label: 'Prelims prepa',   pct: 40, color: GOLD,    route: '/(tabs)/userdashboard/prelims-prep' },
  { label: 'Mains prepa',     pct: 70, color: CRIMSON, route: '/(tabs)/userdashboard/mains-prep' },
];

export default function UserDashboardScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Dashboard</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Overall Score card */}
        <View style={s.scoreCard}>
          <ScoreCircle score={56} />
          <View style={s.scoreInfo}>
            <Text style={s.scoreTitle}>Overall Score</Text>
            <Text style={s.scoreNext}>Next Challenge:</Text>
            <Text style={s.scoreChallenge}>Unlock your best!</Text>
            <TouchableOpacity style={s.startBtn}>
              <Text style={s.startBtnTxt}>Start Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Course Overview + Goal Tracker row */}
        <View style={s.twoCol}>
          {/* Course Overview */}
          <TouchableOpacity
            style={s.courseCard}
            onPress={() => router.push('/(tabs)/userdashboard/study-analysis' as any)}
          >
            <Text style={s.courseCardTitle}>Course Overview</Text>
            <View style={s.shieldWrap}>
              <Text style={s.shieldEmoji}>🛡️</Text>
            </View>
            <Text style={s.courseTitle}>JCJ Full Course</Text>
            <Text style={s.courseMeta}>Joined on: 30/12/2023</Text>
            <Text style={s.courseMeta}>Subject Completed: 12/21</Text>
            <Text style={s.courseMeta}>Last Activity: 10 Hours ago</Text>
          </TouchableOpacity>

          {/* Goal Tracker */}
          <View style={s.goalCard}>
            <Text style={s.goalTitle}>Goal Tracker</Text>
            <View style={s.targetWrap}>
              <Text style={s.targetEmoji}>🎯</Text>
            </View>
            <Text style={s.goalText}>Today's Goal:</Text>
            <Text style={s.goalText}>2Hrs Stud + 20MCQ's</Text>
            <Text style={s.goalText}>Progress:</Text>
            <Text style={s.goalText}>1Hr 15 mins done**</Text>
          </View>
        </View>

        {/* Subject Progress */}
        <View style={s.progressCard}>
          <Text style={s.progressTitle}>Subject Progress</Text>
          {SUBJECT_PROGRESS.map((item, i) => (
            <View key={i} style={s.progressRow}>
              <Text style={s.progressLabel}>{item.label}</Text>
              <View style={s.progressBarWrap}>
                <ProgressBar pct={item.pct} color={item.color} />
              </View>
              <Text style={s.progressPct}>{item.pct}%</Text>
              <TouchableOpacity
                onPress={() => router.push(item.route as any)}
                hitSlop={8}
              >
                <Text style={s.launchIcon}>↗</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

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

  scroll: { padding: 14, gap: 14 },

  // Score card
  scoreCard: {
    backgroundColor: NAVY,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  scoreInfo: { flex: 1 },
  scoreTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 4 },
  scoreNext: { fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  scoreChallenge: { fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 10 },
  startBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 20, paddingVertical: 8,
    borderRadius: 20, alignSelf: 'flex-start',
  },
  startBtnTxt: { fontSize: 13, fontWeight: '700', color: '#fff' },

  // Two column
  twoCol: { flexDirection: 'row', gap: 12 },

  // Course card
  courseCard: {
    flex: 1, backgroundColor: GOLD,
    borderRadius: 14, padding: 14,
  },
  courseCardTitle: { fontSize: 13, fontWeight: '800', color: '#fff', marginBottom: 8 },
  shieldWrap: { alignItems: 'center', marginVertical: 8 },
  shieldEmoji: { fontSize: 40 },
  courseTitle: { fontSize: 14, fontWeight: '800', color: '#fff', marginBottom: 4 },
  courseMeta: { fontSize: 10, color: 'rgba(255,255,255,0.85)', lineHeight: 16 },

  // Goal card
  goalCard: {
    flex: 1, backgroundColor: CRIMSON,
    borderRadius: 14, padding: 14,
  },
  goalTitle: { fontSize: 13, fontWeight: '800', color: '#fff', marginBottom: 8 },
  targetWrap: { alignItems: 'center', marginVertical: 8 },
  targetEmoji: { fontSize: 40 },
  goalText: { fontSize: 10, color: 'rgba(255,255,255,0.9)', lineHeight: 16 },

  // Progress card
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 16,
    elevation: 2,
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
  },
  progressTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', marginBottom: 14 },
  progressRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 8, marginBottom: 12,
  },
  progressLabel: { fontSize: 12, color: '#555', width: 90 },
  progressBarWrap: { flex: 1 },
  progressPct: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', width: 36, textAlign: 'right' },
  launchIcon: { fontSize: 16, color: '#888' },
});