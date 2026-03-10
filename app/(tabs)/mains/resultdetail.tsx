// app/(tabs)/mains/resultdetail.tsx

import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';

const C = Colors;

// Semi-circle progress using border trick
function SemiCircle({ pct, color, label, value }: { pct: number; color: string; label: string; value: string }) {
  return (
    <View style={sc.wrap}>
      {/* Outer ring */}
      <View style={[sc.ring, { borderColor: '#E8E8E8' }]}>
        {/* Colored arc overlay - left half */}
        <View style={sc.arcContainer}>
          <View style={[sc.arc, { borderTopColor: color, borderLeftColor: color, borderRightColor: 'transparent', borderBottomColor: 'transparent' }]} />
        </View>
      </View>
      {/* Center text */}
      <View style={sc.center}>
        <Text style={[sc.value, { color: '#1A1A2E' }]}>{value}</Text>
      </View>
      <Text style={sc.label}>{label}</Text>
    </View>
  );
}

const sc = StyleSheet.create({
  wrap: { alignItems: 'center', width: 120 },
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  arcContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  arc: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    position: 'absolute',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 32,
  },
  value: { fontSize: 14, fontWeight: '800' },
  label: { fontSize: 12, color: '#888', marginTop: 8, textAlign: 'center' },
});

export default function ResultDetailScreen() {
  const {
    subject = 'Civil Laws',
    examType = 'Mains Test-1',
    scored = '50',
    totalMarks = '100',
    rank = '4',
    outOf = '120',
    attemptDate = 'Nov 14, 2025',
    status = 'Evaluated',
  } = useLocalSearchParams<{
    subject?: string;
    examType?: string;
    scored?: string;
    totalMarks?: string;
    rank?: string;
    outOf?: string;
    attemptDate?: string;
    status?: string;
  }>();

  const scoredNum = Number(scored);
  const totalNum = Number(totalMarks);
  const pct = totalNum > 0 ? Math.round((scoredNum / totalNum) * 100) : 0;

  const getGrade = () => {
    if (pct >= 80) return 'Excellent';
    if (pct >= 70) return 'Good';
    if (pct >= 50) return 'Average';
    return 'Below Average';
  };

  // Evaluation date = attempt + 13 days (mock)
  const evalDate = 'Nov 27, 2025';

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F5" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP JCJ Mains Test-1 Results</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Pills */}
        <View style={s.pillsRow}>
          <View style={s.pillRed}>
            <Text style={s.pillTxt}>Exam Type: {examType}</Text>
          </View>
          <View style={s.pillYellow}>
            <Text style={s.pillYellowTxt}>Subject: {subject}</Text>
          </View>
        </View>

        {/* Date cards */}
        <View style={s.dateRow}>
          <View style={s.dateCard}>
            <View style={s.dateTop}>
              <Text style={s.dateIcon}>📅</Text>
              <Text style={s.dateSmall}>Date of Submission:</Text>
            </View>
            <Text style={s.dateBig}>{attemptDate}</Text>
          </View>
          <View style={s.dateCard}>
            <View style={s.dateTop}>
              <Text style={s.dateIcon}>📅</Text>
              <Text style={s.dateSmall}>Date of Evaluation:</Text>
            </View>
            <Text style={s.dateBig}>{evalDate}</Text>
          </View>
        </View>

        {/* Performance overview card */}
        <View style={s.perfCard}>
          <Text style={s.perfTitle}>Performance overview</Text>
          <View style={s.perfCircles}>
            <SemiCircle
              pct={pct}
              color="#4DD9C0"
              label="Marks Secured"
              value={`${scored}/${totalMarks}`}
            />
            <SemiCircle
              pct={pct}
              color="#C47EC4"
              label="Overall Percentage"
              value={`${scored}/${totalMarks}`}
            />
          </View>
          <View style={s.gradePill}>
            <Text style={s.gradeTxt}>{getGrade()}</Text>
          </View>
        </View>

        {/* Teacher's Feedback */}
        <View style={s.feedbackCard}>
          <Text style={s.feedbackTitle}>Teacher's Feedback:</Text>
          <Text style={s.feedbackTxt}>
            "You have shown strong conceptual understanding in Property and Contract Law. However, answers can be structured better with proper case law citations and section references. Please focus on time management and clarity in handwriting for upcoming tests."
          </Text>
        </View>

        {/* Strengths & Areas to improve */}
        <View style={s.swotRow}>
          <View style={s.strengthCard}>
            <Text style={s.strengthTitle}>Strengths</Text>
            <View style={s.swotItem}>
              <Text style={s.checkGreen}>✓</Text>
              <Text style={s.swotTxt}>Strong knowledge of core civil law principles</Text>
            </View>
            <View style={s.swotItem}>
              <Text style={s.checkGreen}>✓</Text>
              <Text style={s.swotTxt}>Clear reasoning and explanation</Text>
            </View>
          </View>

          <View style={s.improveCard}>
            <Text style={s.improveTitle}>Areas to improve</Text>
            <View style={s.swotItem}>
              <Text style={s.warnIcon}>⚠</Text>
              <Text style={s.swotTxt}>Case law referencing</Text>
            </View>
            <View style={s.swotItem}>
              <Text style={s.warnIcon}>⚠</Text>
              <Text style={s.swotTxt}>Presentation & structure of long answers</Text>
            </View>
          </View>
        </View>

        {/* Next Challenge banner */}
        <View style={s.challengeCard}>
          <View style={s.challengeLeft}>
            <Text style={s.trophyIcon}>🏆</Text>
          </View>
          <View style={s.challengeCenter}>
            <Text style={s.challengeTitle}>Next Challenge: Master in Civil Laws</Text>
            <Text style={s.challengeSub}>Evaluated by: Prof. Ramesh</Text>
          </View>
        </View>

        <Text style={s.aimTxt}>Aim for 90+ Marks in test-2</Text>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EEF0F5' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', flexShrink: 1 },

  scroll: { padding: 14, gap: 14 },

  // Pills
  pillsRow: { flexDirection: 'row', gap: 10 },
  pillRed: {
    backgroundColor: '#F5E6E6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillTxt: { fontSize: 12, fontWeight: '700', color: '#8B1A1A' },
  pillYellow: {
    backgroundColor: '#FDF3D8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillYellowTxt: { fontSize: 12, fontWeight: '700', color: '#C9A227' },

  // Date cards
  dateRow: { flexDirection: 'row', gap: 10 },
  dateCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  dateTop: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  dateIcon: { fontSize: 14 },
  dateSmall: { fontSize: 11, color: '#888', flexShrink: 1 },
  dateBig: { fontSize: 13, fontWeight: '800', color: '#1A1A2E' },

  // Performance card
  perfCard: {
    backgroundColor: '#1A2E6E',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  perfTitle: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 20 },
  perfCircles: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  gradePill: {
    backgroundColor: '#C9A227',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 30,
  },
  gradeTxt: { fontSize: 16, fontWeight: '800', color: '#fff' },

  // Feedback
  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  feedbackTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
  feedbackTxt: { fontSize: 13, color: '#444', lineHeight: 20 },

  // SWOT
  swotRow: { flexDirection: 'row', gap: 10 },
  strengthCard: {
    flex: 1,
    backgroundColor: '#8B1A1A',
    borderRadius: 12,
    padding: 14,
  },
  strengthTitle: { fontSize: 13, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 12 },
  improveCard: {
    flex: 1,
    backgroundColor: '#C9A227',
    borderRadius: 12,
    padding: 14,
  },
  improveTitle: { fontSize: 13, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 12 },
  swotItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 8 },
  checkGreen: { fontSize: 13, color: '#A8F0A8', fontWeight: '700', marginTop: 1 },
  warnIcon: { fontSize: 13, color: '#fff', marginTop: 1 },
  swotTxt: { fontSize: 11, color: '#fff', lineHeight: 16, flexShrink: 1 },

  // Challenge banner
  challengeCard: {
    backgroundColor: '#1A2E6E',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophyIcon: { fontSize: 22 },
  challengeCenter: { flex: 1 },
  challengeTitle: { fontSize: 13, fontWeight: '800', color: '#fff', marginBottom: 2 },
  challengeSub: { fontSize: 11, color: 'rgba(255,255,255,0.75)' },

  aimTxt: { fontSize: 12, color: '#888', textAlign: 'center' },
});