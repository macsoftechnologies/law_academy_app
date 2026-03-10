// app/(tabs)/prelims/view-solutions.tsx
// Image 13: View solutions — question with correct/wrong highlighted + explanation + "View Solution" toggle
// Image 14: Test Summary modal showing section-wise correct answers
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SOLUTION_QUESTIONS = [
  {
    id: 1,
    question: "Who is known as the 'Father of the Indian Constitution'?",
    options: ['Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Patel'],
    correct: 1,
    userAnswer: 3,
    explanation:
      "Dr. B.R. Ambedkar is widely regarded as the Father of the Indian Constitution because he served as the Chairman of the Drafting Committee of the Constituent Assembly.\n\nHe played a crucial role in shaping the structure, principles, and rights included in the Constitution. His deep understanding of law, social justice, and governance helped create a strong and inclusive framework for India.",
  },
  {
    id: 2,
    question: 'Which court is the highest court in India?',
    options: ['High Court', 'District Court', 'Supreme Court', 'Sessions Court'],
    correct: 2,
    userAnswer: 2,
    explanation: 'The Supreme Court of India is the highest judicial body established under Article 124 of the Constitution.',
  },
  {
    id: 3,
    question: 'The Indian Penal Code was enacted in which year?',
    options: ['1850', '1860', '1870', '1880'],
    correct: 1,
    userAnswer: 0,
    explanation: 'The IPC was enacted in 1860 and came into force on January 1, 1862.',
  },
];

export default function ViewSolutionsScreen() {
  const { subject = 'Civil Procedure Code', testId = 'q1' } =
    useLocalSearchParams<{ subject?: string; testId?: string }>();

  const [currentQ, setCurrentQ] = useState(0);
  const [expandedSolution, setExpandedSolution] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const q = SOLUTION_QUESTIONS[currentQ];
  const correct = SOLUTION_QUESTIONS.filter((q) => q.userAnswer === q.correct).length;

  // Time spent per question (mock)
  const timeSpentSeconds = 4;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>{subject}</Text>
      </View>

      {/* Time spent */}
      <View style={s.timeRow}>
        <View style={s.timeChip}>
          <Text style={s.timeText}>You: 00:0{timeSpentSeconds}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Question */}
        <View style={s.qBlock}>
          <Text style={s.qNum}>{q.id}</Text>
          <Text style={s.qLabel}>Question</Text>
        </View>
        <Text style={s.qText}>{q.question}</Text>

        {/* Options */}
        <View style={s.optionsWrap}>
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.correct;
            const isUserWrong = idx === q.userAnswer && q.userAnswer !== q.correct;
            return (
              <View
                key={idx}
                style={[
                  s.optRow,
                  isCorrect && s.optCorrect,
                  isUserWrong && s.optWrong,
                ]}
              >
                <View style={[
                  s.optCircle,
                  isCorrect && s.optCircleCorrect,
                  isUserWrong && s.optCircleWrong,
                ]}>
                  <Text style={[
                    s.optCircleText,
                    (isCorrect || isUserWrong) && { color: '#fff' },
                  ]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[
                  s.optText,
                  isCorrect && { color: '#fff', fontWeight: '700' },
                  isUserWrong && { color: '#fff' },
                ]}>
                  {opt}
                </Text>
              </View>
            );
          })}
        </View>

        {/* View Solution toggle */}
        <TouchableOpacity
          style={s.solutionToggle}
          onPress={() => setExpandedSolution(!expandedSolution)}
        >
          <Text style={s.solutionToggleText}>👁 View Solution {expandedSolution ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {expandedSolution && (
          <View style={s.solutionBox}>
            <Text style={s.solutionText}>{q.explanation}</Text>
          </View>
        )}

        {/* Report */}
        <TouchableOpacity style={s.reportBtn}>
          <Text style={s.reportText}>⚠ Report</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom nav */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={s.testSummaryBtn}
          onPress={() => setShowSummary(true)}
        >
          <Text style={s.testSummaryText}>Test Summary</Text>
        </TouchableOpacity>
      </View>

      {/* Test Summary Modal */}
      <Modal visible={showSummary} transparent animationType="fade">
        <View style={s.summaryOverlay}>
          <View style={s.summaryModal}>
            <Text style={s.summaryTitle}>Test Summary</Text>
            <View style={s.summaryTable}>
              <View style={s.summaryHead}>
                <Text style={s.sTH}>Section</Text>
                <Text style={s.sTH}>NO.of questions</Text>
                <Text style={s.sTH}>Correct</Text>
              </View>
              <View style={s.summaryRow}>
                <Text style={s.sTD}>Civil Law</Text>
                <Text style={s.sTD}>{SOLUTION_QUESTIONS.length}</Text>
                <Text style={s.sTD}>{correct}</Text>
              </View>
              <View style={[s.summaryRow, { borderTopWidth: 1, borderTopColor: '#eee' }]}>
                <Text style={[s.sTD, { fontWeight: '700' }]}>Total</Text>
                <Text style={[s.sTD, { fontWeight: '700' }]}>{SOLUTION_QUESTIONS.length}</Text>
                <Text style={[s.sTD, { fontWeight: '700' }]}>{correct}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={s.continueBtn}
              onPress={() => {
                setShowSummary(false);
                router.dismissAll();
              }}
            >
              <Text style={s.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#fff',
    elevation: 1,
  },
  back: { fontSize: 28, marginRight: 10, color: '#1a1a2e' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', flex: 1 },

  timeRow: { paddingHorizontal: 16, paddingTop: 8 },
  timeChip: { backgroundColor: '#E8EBF3', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  timeText: { fontSize: 12, color: '#1a1a2e', fontWeight: '600' },

  scroll: { padding: 16, paddingBottom: 20 },

  qBlock: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  qNum: { fontSize: 18, fontWeight: '900', color: '#1a1a2e' },
  qLabel: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },
  qText: { fontSize: 14, color: '#222', lineHeight: 22, marginBottom: 16 },

  optionsWrap: { gap: 10 },
  optRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#E8EBF3', borderRadius: 10, padding: 14, gap: 12,
  },
  optCorrect: { backgroundColor: '#0513A0' },
  optWrong: { backgroundColor: '#8B1A1A' },
  optCircle: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  optCircleCorrect: { backgroundColor: 'rgba(255,255,255,0.25)' },
  optCircleWrong: { backgroundColor: 'rgba(255,255,255,0.2)' },
  optCircleText: { fontSize: 13, fontWeight: '800', color: '#0513A0' },
  optText: { fontSize: 13, color: '#1a1a2e', flex: 1 },

  solutionToggle: { marginTop: 16, flexDirection: 'row', alignItems: 'center' },
  solutionToggleText: { color: '#C9A227', fontWeight: '700', fontSize: 13 },

  solutionBox: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14,
    marginTop: 8, borderLeftWidth: 4, borderLeftColor: '#0513A0',
  },
  solutionText: { fontSize: 13, color: '#333', lineHeight: 20 },

  reportBtn: { marginTop: 20, alignSelf: 'flex-start' },
  reportText: { color: '#e53935', fontSize: 13 },

  bottomBar: {
    paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 120,
    backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#eee',
  },
  testSummaryBtn: {
    backgroundColor: '#0513A0', height: 50, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  testSummaryText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  summaryOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  summaryModal: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%' },
  summaryTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e', marginBottom: 12 },
  summaryTable: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 16 },
  summaryHead: { flexDirection: 'row', backgroundColor: '#F5F5F5', padding: 10 },
  summaryRow: { flexDirection: 'row', padding: 10 },
  sTH: { flex: 1, fontWeight: '700', fontSize: 12, color: '#555' },
  sTD: { flex: 1, fontSize: 12, color: '#333' },
  continueBtn: {
    backgroundColor: '#8B1A1A', height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  continueText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});