// app/(tabs)/prelims/grand-tests.tsx
// Image 15 left: Grand Test Information — shows test info card with Results + Start Test buttons
import { router } from 'expo-router';
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

const GRAND_TESTS = [
  { id: 'gt1', title: 'Grand Test - Series 1', questions: 200, mins: 150, hasResults: true },
  { id: 'gt2', title: 'Grand Test - Series 2', questions: 200, mins: 150, hasResults: false },
  { id: 'gt3', title: 'Grand Test - Series 3', questions: 200, mins: 150, hasResults: false },
  { id: 'gt4', title: 'Grand Test - Series 4', questions: 200, mins: 150, hasResults: false },
];

export default function GrandTestsScreen() {
  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Grand Tests</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {GRAND_TESTS.map((test) => (
          <GrandTestCard key={test.id} test={test} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function GrandTestCard({ test }: { test: typeof GRAND_TESTS[0] }) {
  const handleStartTest = () => {
    router.push({
      pathname: '/(tabs)/prelims/grand-test-info',
      params: { testId: test.id, testTitle: test.title, questions: test.questions, mins: test.mins },
    });
  };

  const handleResults = () => {
    router.push({
      pathname: '/(tabs)/prelims/test-performance',
      params: { subject: 'All Subjects', testId: test.id, testType: 'grand' },
    });
  };

  return (
    <View style={s.card}>
      {/* Illustration placeholder */}
      <View style={s.illustrationArea}>
        <Text style={s.illustration}>🎓</Text>
        <View style={s.orbitsWrap}>
          {['⚛️', '💻', '🏛️', '📚'].map((icon, i) => (
            <View key={i} style={[s.orbitIcon, { top: i < 2 ? 10 : 'auto', bottom: i >= 2 ? 10 : 'auto', left: i % 2 === 0 ? 10 : 'auto', right: i % 2 === 1 ? 10 : 'auto' }]}>
              <Text style={{ fontSize: 18 }}>{icon}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Info */}
      <View style={s.infoCard}>
        <Text style={s.testTitle}>All Subjects One Challenge</Text>
        <View style={s.infoRow}>
          <Text style={s.infoLabel}>Total Questions :</Text>
          <Text style={s.infoValue}>{test.questions}</Text>
        </View>
        <View style={s.infoRow}>
          <Text style={s.infoLabel}>Time Limit :</Text>
          <Text style={s.infoValue}>{test.mins} Mins</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={s.actionRow}>
        {test.hasResults && (
          <TouchableOpacity style={s.resultsBtn} onPress={handleResults}>
            <Text style={s.resultsBtnText}>Results</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[s.startBtn, !test.hasResults && { flex: 1 }]}
          onPress={handleStartTest}
        >
          <Text style={s.startBtnText}>Start Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  back: { fontSize: 28, marginRight: 10, color: '#1a1a2e' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1a1a2e' },

  scroll: { padding: 14, gap: 16, paddingBottom: 32 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  illustrationArea: {
    height: 160,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  illustration: { fontSize: 70 },
  orbitsWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  orbitIcon: { position: 'absolute' },

  infoCard: {
    backgroundColor: '#fff',
    margin: 14,
    borderRadius: 10,
    padding: 14,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#eee',
  },
  testTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  infoLabel: { fontSize: 13, color: '#555' },
  infoValue: { fontSize: 13, fontWeight: '700', color: '#1a1a2e' },

  actionRow: { flexDirection: 'row', paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 90, gap: 10 },
  resultsBtn: {
    backgroundColor: '#C9A227',
    paddingHorizontal: 24,
    height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  resultsBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  startBtn: {
    flex: 1, backgroundColor: '#0513A0',
    height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  startBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});