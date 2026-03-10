// app/(tabs)/prelims/mock-tests-list.tsx
// Image 3: AP Civil Procedure Code Mocks — list of mock tests (each shows attempts count + Start Test)
// Image 4: Tapping a test that has attempts navigates to attempt-history screen
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_TESTS = [
  { id: 'mt1', title: 'Mock Test 1', questions: 200, mins: 150, attempts: 3, motivator: 'Crash it! every attempt makes you stronger!' },
  { id: 'mt2', title: 'Mock Test 2', questions: 200, mins: 150, attempts: 2, motivator: "You're a genius! Ready for the next challenge?" },
  { id: 'mt3', title: 'Mock Test 3', questions: 200, mins: 150, attempts: 2, motivator: "You're a genius! Ready for the next challenge?" },
  { id: 'mt4', title: 'Mock Test 4', questions: 200, mins: 150, attempts: 0, motivator: null },
];

export default function MockTestsListScreen() {
  const { subject = 'Civil Procedure Code', subjectId = 'cpc' } =
    useLocalSearchParams<{ subject?: string; subjectId?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP {subject} Mocks</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Hero banner */}
        <View style={s.heroBanner}>
          <View style={s.heroText}>
            <Text style={s.heroH1}>Unlock Your{'\n'}Potential</Text>
            <Text style={s.heroSub}>Access Your Exams</Text>
          </View>
          <View style={s.heroChart}>
            <Text style={s.chartEmoji}>📈</Text>
          </View>
        </View>

        {/* Mock test cards */}
        {MOCK_TESTS.map((test) => (
          <MockTestCard
            key={test.id}
            test={test}
            subject={subject}
            subjectId={subjectId}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MockTestCard({
  test,
  subject,
  subjectId,
}: {
  test: typeof MOCK_TESTS[0];
  subject: string;
  subjectId: string;
}) {
  const hasAttempts = test.attempts > 0;

  const handleStartTest = () => {
    router.push({
      pathname: '/(tabs)/prelims/terms-conditions',
      params: {
        testTitle: `${test.title}: ${subject}`,
        testType: 'mock',
        subject,
        subjectId,
        testId: test.id,
      },
    });
  };

  const handleViewAttempts = () => {
    router.push({
      pathname: '/(tabs)/prelims/attempt-history',
      params: {
        testTitle: `${test.title}`,
        subject,
        testId: test.id,
        attempts: test.attempts,
      },
    });
  };

  return (
    <View style={[s.card, hasAttempts && s.cardHighlighted]}>
      <View style={s.cardBody}>
        <View style={s.cardLeft}>
          <Text style={s.cardTitle}>
            {test.title}:{'\n'}{subject}
          </Text>
          <View style={s.metaRow}>
            <View style={s.metaChip}>
              <Text style={s.metaIcon}>📋</Text>
              <Text style={s.metaText}>{test.questions} Ques</Text>
            </View>
            <View style={s.metaChip}>
              <Text style={s.metaIcon}>⏱</Text>
              <Text style={s.metaText}>{test.mins} mins</Text>
            </View>
          </View>

          <View style={s.actionRow}>
            {hasAttempts && (
              <TouchableOpacity style={s.attemptsBtn} onPress={handleViewAttempts}>
                <Text style={s.attemptsBtnText}>{test.attempts} Attempts</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={s.startBtn} onPress={handleStartTest}>
              <Text style={s.startBtnText}>Start Test</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.cardRight}>
          <Text style={s.cardIllustration}>🎯</Text>
        </View>
      </View>

      {test.motivator ? (
        <Text style={s.motivator}>{test.motivator}</Text>
      ) : null}
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
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e', flexShrink: 1 },

  scroll: { padding: 14, gap: 14, paddingBottom: 32 },

  heroBanner: {
    backgroundColor: '#1A3C8B',
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  heroText: {},
  heroH1: { fontSize: 22, fontWeight: '900', color: '#fff', lineHeight: 28 },
  heroSub: { fontSize: 13, color: '#C9A227', fontWeight: '600', marginTop: 6 },
  heroChart: { alignItems: 'center' },
  chartEmoji: { fontSize: 52 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHighlighted: {
    borderWidth: 2,
    borderColor: '#1A3C8B',
  },

  cardBody: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLeft: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '800', color: '#1a1a2e', marginBottom: 8, lineHeight: 20 },

  metaRow: { flexDirection: 'row', gap: 14, marginBottom: 10 },
  metaChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaIcon: { fontSize: 12 },
  metaText: { fontSize: 12, color: '#666' },

  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },

  attemptsBtn: {
    backgroundColor: '#E8EBF3',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  attemptsBtnText: { fontSize: 12, color: '#1A3C8B', fontWeight: '700' },

  startBtn: {
    backgroundColor: '#0513A0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  cardRight: { justifyContent: 'center', paddingLeft: 10 },
  cardIllustration: { fontSize: 44 },

  motivator: {
    marginTop: 8,
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
  },
});