// app/(tabs)/prelims/test-instructions.tsx
// Image 7: Instructions screen before starting the test
// Image 15 right: Same instructions screen for Grand Test
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

const INSTRUCTIONS = [
  'You have 05 Minutes to complete the test.',
  'The test contains a total of 10 Questions for 10 Marks.',
  'There is only one correct answer to each question. Click on the most appropriate option to mark it as your answer.',
  'There is 1/4 penalty for each wrong answer.',
  'You can change your answer by clicking on some other option.',
  'You can unmark your answer by clicking on the "Clear Response" button.',
  'A Number list of all questions appears at the right-hand side of the screen. You can access the questions in any order within a section or across sections by clicking on the question number given on the number list.',
  'You can use rough sheets while taking the test. Do not use calculators, log tables, dictionaries, or any other printed/online reference material during the test.',
  'Do not click the "Submit test" button before',
  'completing the test. A test once submitted cannot be resumed.',
];

export default function TestInstructionsScreen() {
  const {
    testTitle = 'Civil Procedure code Quizz',
    testType = 'quiz',
    subject = 'Civil Procedure Code',
    subjectId = 'cpc',
    testId = 'q1',
  } = useLocalSearchParams<{
    testTitle?: string;
    testType?: string;
    subject?: string;
    subjectId?: string;
    testId?: string;
  }>();

  const handleStartTest = () => {
    router.push({
      pathname: '/(tabs)/prelims/take-test',
      params: { testTitle, testType, subject, subjectId, testId },
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Instructions</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.testTitle}>{testTitle}</Text>

        {/* Stats chips */}
        <View style={s.statsRow}>
          <StatChip value="10" label="Total Questions" />
          <StatChip value="10" label="Total Marks" />
          <StatChip value="5 mins" label="Duration" />
        </View>

        <Text style={s.instructionHeader}>Please read the following instruction very carefully</Text>

        {INSTRUCTIONS.map((inst, i) => (
          <View key={i} style={s.instRow}>
            <Text style={s.instNum}>{i + 1}.</Text>
            <Text style={s.instText}>{inst}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity style={s.startBtn} onPress={handleStartTest}>
          <Text style={s.startText}>Start Test</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <View style={sc.chip}>
      <Text style={sc.value}>{value}</Text>
      <Text style={sc.label}>{label}</Text>
    </View>
  );
}

const sc = StyleSheet.create({
  chip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E8EBF3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  value: { fontSize: 16, fontWeight: '800', color: '#1a1a2e' },
  label: { fontSize: 10, color: '#666', marginTop: 2, textAlign: 'center' },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  back: { fontSize: 28, marginRight: 10, color: '#1a1a2e' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e' },

  scroll: { padding: 16, paddingBottom: 20 },

  testTitle: { fontSize: 20, fontWeight: '900', color: '#1a1a2e', marginBottom: 14 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },

  instructionHeader: {
    fontSize: 13, fontWeight: '700', color: '#1a1a2e',
    marginBottom: 14, lineHeight: 18,
  },

  instRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  instNum: { fontSize: 13, fontWeight: '700', minWidth: 20, color: '#1a1a2e' },
  instText: { fontSize: 13, color: '#333', lineHeight: 19, flex: 1 },

  footer: { paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 120, },
  startBtn: {
    backgroundColor: '#0513A0',
    height: 50, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  startText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});