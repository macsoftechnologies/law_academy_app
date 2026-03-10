// app/(tabs)/prelims/mock-test-result.tsx
// Image 5: Mock Test-1 Results — performance overview with teacher's feedback
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

export default function MockTestResultScreen() {
  const { subject = 'Civil Laws', testId = 'mt1', attemptNumber = '1' } =
    useLocalSearchParams<{ subject?: string; testId?: string; attemptNumber?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Mock Test-1 Results</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Tags */}
        <View style={s.tagRow}>
          <View style={[s.tag, { backgroundColor: '#FFF3E0' }]}>
            <Text style={[s.tagText, { color: '#E65100' }]}>Exam Type: Mock Test-1</Text>
          </View>
          <View style={[s.tag, { backgroundColor: '#FFF8E1' }]}>
            <Text style={[s.tagText, { color: '#C9A227' }]}>Subject: {subject}</Text>
          </View>
        </View>

        {/* Dates */}
        <View style={s.datesRow}>
          <View style={s.dateBox}>
            <Text style={s.dateLabel}>📅  Date of Submission:</Text>
            <Text style={s.dateValue}>Nov 14, 2025</Text>
          </View>
          <View style={s.dateBox}>
            <Text style={s.dateLabel}>📅  Date of Evaluation:</Text>
            <Text style={s.dateValue}>Nov 27, 2025</Text>
          </View>
        </View>

        {/* Performance overview */}
        <View style={s.perfCard}>
          <Text style={s.perfTitle}>Performance overview</Text>
          <View style={s.gaugeRow}>
            <GaugeMini value={50} max={100} label="Marks Secured" />
            <GaugeMini value={50} max={100} label="Overall Percentage" />
          </View>
          <View style={s.gradeBadge}>
            <Text style={s.gradeText}>Average</Text>
          </View>
        </View>

        {/* Teacher feedback */}
        <View style={s.feedbackCard}>
          <Text style={s.feedbackTitle}>Teacher's Feedback:</Text>
          <Text style={s.feedbackBody}>
            "You have shown strong conceptual understanding in Property and Contract Law. However, answers can be structured better with proper case law citations and section references. Please focus on time management and clarity in handwriting for upcoming tests."
          </Text>
        </View>

        {/* Strengths + Areas */}
        <View style={s.saRow}>
          <View style={[s.saCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={[s.saTitle, { color: '#2E7D32' }]}>Strengths</Text>
            {['Strong knowledge of core civil law principles', 'Clear reasoning and explanation'].map((pt) => (
              <View key={pt} style={s.saPoint}>
                <Text style={s.tick}>✓</Text>
                <Text style={s.saText}>{pt}</Text>
              </View>
            ))}
          </View>

          <View style={[s.saCard, { backgroundColor: '#FFF8E1' }]}>
            <Text style={[s.saTitle, { color: '#C9A227' }]}>Areas to improve</Text>
            {['Case law referencing', 'Presentation & structure of long answers'].map((pt) => (
              <View key={pt} style={s.saPoint}>
                <Text style={s.warn}>⚠</Text>
                <Text style={s.saText}>{pt}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Next challenge */}
        <View style={s.nextChallenge}>
          <Text style={s.ncIcon}>🏆</Text>
          <View>
            <Text style={s.ncTitle}>Next Challenge: Master in Civil Laws</Text>
            <Text style={s.ncSub}>Evaluated by: Prof. Ramesh</Text>
          </View>
        </View>
        <Text style={s.aimText}>Aim for 90+ Marks in test-2</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function GaugeMini({ value, max, label }: { value: number; max: number; label: string }) {
  return (
    <View style={g.wrap}>
      <View style={g.circle}>
        <Text style={g.value}>{value}/{max}</Text>
      </View>
      <Text style={g.label}>{label}</Text>
    </View>
  );
}

const g = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 6 },
  circle: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 5, borderColor: '#4DD0E1',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  value: { fontSize: 14, fontWeight: '800', color: '#fff' },
  label: { fontSize: 11, color: '#ccc', textAlign: 'center', maxWidth: 90 },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: { fontSize: 28, marginRight: 10, color: '#1a1a2e' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e' },

  scroll: { padding: 14, gap: 14, paddingBottom: 32 },

  tagRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 11, fontWeight: '700' },

  datesRow: { flexDirection: 'row', gap: 10 },
  dateBox: {
    flex: 1, backgroundColor: '#fff', borderRadius: 10,
    padding: 12, elevation: 1,
  },
  dateLabel: { fontSize: 10, color: '#888', marginBottom: 4 },
  dateValue: { fontSize: 13, fontWeight: '700', color: '#1a1a2e' },

  perfCard: {
    backgroundColor: '#1A3C8B',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 14,
  },
  perfTitle: { fontSize: 15, fontWeight: '800', color: '#fff' },
  gaugeRow: { flexDirection: 'row', gap: 30 },
  gradeBadge: {
    backgroundColor: '#C9A227',
    paddingHorizontal: 30, paddingVertical: 8,
    borderRadius: 20,
  },
  gradeText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  feedbackCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 1,
  },
  feedbackTitle: { fontSize: 14, fontWeight: '800', color: '#1a1a2e', marginBottom: 6 },
  feedbackBody: { fontSize: 12, color: '#444', lineHeight: 18, fontStyle: 'italic' },

  saRow: { flexDirection: 'row', gap: 10 },
  saCard: { flex: 1, borderRadius: 12, padding: 12 },
  saTitle: { fontSize: 13, fontWeight: '800', marginBottom: 8 },
  saPoint: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  tick: { color: '#2E7D32', fontWeight: '800' },
  warn: { color: '#C9A227' },
  saText: { fontSize: 11, color: '#333', flex: 1, lineHeight: 16 },

  nextChallenge: {
    backgroundColor: '#0513A0',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ncIcon: { fontSize: 28 },
  ncTitle: { fontSize: 13, fontWeight: '800', color: '#fff' },
  ncSub: { fontSize: 11, color: '#aad4ff', marginTop: 2 },

  aimText: { textAlign: 'center', fontSize: 11, color: '#888', fontStyle: 'italic' },
});