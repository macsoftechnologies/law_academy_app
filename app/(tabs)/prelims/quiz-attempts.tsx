// app/(tabs)/prelims/quiz-attempts.tsx
// Image 16 middle: Civil Procedure Code — attempt list for a quiz (Attempt-1, Attempt-2, Attempt-3)
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

export default function QuizAttemptsScreen() {
  const {
    quizId = 'qz1',
    quizTitle = 'Civil Procedure Code',
    questions = '30',
  } = useLocalSearchParams<{ quizId?: string; quizTitle?: string; questions?: string }>();

  const ATTEMPTS = [
    { attemptNum: 1, score: 0, maxScore: 5, timeSpent: '00:53', totalTime: '03:00' },
    { attemptNum: 2, score: 0, maxScore: 5, timeSpent: '00:53', totalTime: '03:00' },
    { attemptNum: 3, score: 0, maxScore: 5, timeSpent: '00:53', totalTime: '03:00' },
  ];

  const handleNewAttempt = () => {
    router.push({
      pathname: '/(tabs)/prelims/test-instructions',
      params: {
        testTitle: quizTitle,
        testType: 'quiz',
        subject: quizTitle,
        subjectId: quizId,
        testId: quizId,
      },
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{quizTitle}</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {ATTEMPTS.map((attempt) => (
          <View key={attempt.attemptNum} style={s.attemptCard}>
            <Text style={s.attemptLabel}>Attempt-{attempt.attemptNum}</Text>

            <View style={s.statsRow}>
              <View style={s.statBox}>
                <View style={s.circleGreen}>
                  <Text style={s.circleInner}>✓</Text>
                </View>
                <View>
                  <Text style={s.statValue}>{attempt.score}.0 | {attempt.maxScore}</Text>
                  <Text style={s.statLabel}>Your Score</Text>
                </View>
              </View>

              <View style={s.divider} />

              <View style={s.statBox}>
                <View style={s.circleGreen}>
                  <Text style={s.circleInner}>⏱</Text>
                </View>
                <View>
                  <Text style={s.statValue}>{attempt.timeSpent} | {attempt.totalTime}</Text>
                  <Text style={s.statLabel}>Time Spent</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* New Attempt button */}
        <TouchableOpacity style={s.newAttemptBtn} onPress={handleNewAttempt}>
          <Text style={s.newAttemptText}>+ New Attempt</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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

  scroll: { padding: 14, gap: 12, paddingBottom: 32 },

  attemptCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  attemptLabel: { fontSize: 15, fontWeight: '800', color: '#1a1a2e', marginBottom: 12 },

  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  statBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  divider: { width: 1, height: 40, backgroundColor: '#eee' },

  circleGreen: {
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 2, borderColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  circleInner: { fontSize: 14, color: '#0513A0' },
  statValue: { fontSize: 13, fontWeight: '800', color: '#1a1a2e' },
  statLabel: { fontSize: 10, color: '#888', marginTop: 2 },

  newAttemptBtn: {
    backgroundColor: '#0513A0',
    height: 50, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 8,
  },
  newAttemptText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});