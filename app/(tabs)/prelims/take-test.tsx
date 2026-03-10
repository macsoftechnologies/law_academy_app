// app/(tabs)/prelims/take-test.tsx
// Image 8: Question screen with timer and MCQ options
// Image 9: Question navigator modal (hamburger menu)
// Image 10: Last question with Submit Test button
// Image 11: Test Summary modal before final submission
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
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

// Mock questions
const QUESTIONS = [
  {
    id: 1,
    type: 'Multiple Choice',
    question: "Who is known as the 'Father of the Indian Constitution'?",
    options: ['Mahatma Gandhi', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Sardar Patel'],
    correct: 1,
  },
  {
    id: 2,
    type: 'Multiple Choice',
    question: 'Which court is the highest court in India?',
    options: ['High Court', 'District Court', 'Supreme Court', 'Sessions Court'],
    correct: 2,
  },
  {
    id: 3,
    type: 'Multiple Choice',
    question: 'The Indian Penal Code was enacted in which year?',
    options: ['1850', '1860', '1870', '1880'],
    correct: 1,
  },
  {
    id: 4,
    type: 'Multiple Choice',
    question: 'Under CPC, Order 1 deals with:',
    options: ['Parties to Suits', 'Pleadings', 'Judgment', 'Appeals'],
    correct: 0,
  },
  {
    id: 5,
    type: 'Multiple Choice',
    question: 'The limitation period for filing a civil suit is governed by:',
    options: ['CPC', 'IPC', 'Limitation Act', 'Evidence Act'],
    correct: 2,
  },
];

const TOTAL_DURATION = 5 * 60; // 5 minutes in seconds

export default function TakeTestScreen() {
  const {
    testTitle = 'Civil Procedure Code',
    testType = 'quiz',
    subject = 'Civil Procedure Code',
    testId = 'q1',
  } = useLocalSearchParams<{
    testTitle?: string;
    testType?: string;
    subject?: string;
    testId?: string;
  }>();

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [markedReview, setMarkedReview] = useState<boolean[]>(Array(QUESTIONS.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(TOTAL_DURATION);
  const [showNavModal, setShowNavModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setShowSummaryModal(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const timeColor = timeLeft <= 30 ? '#FF0000' : '#0513A0';
  const isLast = currentQ === QUESTIONS.length - 1;
  const q = QUESTIONS[currentQ];

  const selectOption = (optIdx: number) => {
    const updated = [...answers];
    updated[currentQ] = optIdx;
    setAnswers(updated);
  };

  const handleSaveNext = () => {
    if (!isLast) setCurrentQ((c) => c + 1);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setShowSummaryModal(true);
  };

  const handleFinalSubmit = () => {
    setShowSummaryModal(false);
    router.replace({
      pathname: '/(tabs)/prelims/test-performance',
      params: { subject, testId, testType },
    });
  };

  const attempted = answers.filter((a) => a !== null).length;
  const skipped = QUESTIONS.length - attempted;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      {/* Top bar */}
      <View style={s.topBar}>
        <View>
          <Text style={s.testNameText}>{subject}</Text>
          <Text style={[s.timer, { color: timeColor }]}>
            Total Time Left: {formatTime(timeLeft)}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowNavModal(true)}>
          <Text style={s.hamburger}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Question type + Review */}
        <View style={s.qTypRow}>
          <View style={s.qTypeChip}>
            <Text style={s.qTypeText}>Question Type : {q.type}</Text>
          </View>
          <TouchableOpacity
            style={s.reviewBtn}
            onPress={() => {
              const upd = [...markedReview];
              upd[currentQ] = !upd[currentQ];
              setMarkedReview(upd);
            }}
          >
            <Text style={s.reviewText}>Review {markedReview[currentQ] ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>

        {/* Question number + text */}
        <View style={s.qBlock}>
          <Text style={s.qNum}>{q.id}</Text>
          <Text style={s.qLabel}>Question</Text>
        </View>
        <Text style={s.qText}>{q.question}</Text>

        {/* Options */}
        <View style={s.optionsWrap}>
          {q.options.map((opt, idx) => {
            const selected = answers[currentQ] === idx;
            return (
              <TouchableOpacity
                key={idx}
                style={[s.optionRow, selected && s.optionSelected]}
                onPress={() => selectOption(idx)}
                activeOpacity={0.7}
              >
                <View style={[s.optLetter, selected && s.optLetterSelected]}>
                  <Text style={[s.optLetterText, selected && s.optLetterTextSelected]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[s.optText, selected && s.optTextSelected]}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Report */}
        <TouchableOpacity style={s.reportBtn}>
          <Text style={s.reportText}>⚠ Report</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom nav */}
      <View style={s.bottomBar}>
        <TouchableOpacity
          style={[s.prevBtn, currentQ === 0 && { opacity: 0.4 }]}
          onPress={() => setCurrentQ((c) => Math.max(0, c - 1))}
          disabled={currentQ === 0}
        >
          <Text style={s.prevText}>‹ Previous</Text>
        </TouchableOpacity>

        {isLast ? (
          <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
            <Text style={s.submitText}>Submit Test</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={s.nextBtn} onPress={handleSaveNext}>
            <Text style={s.nextText}>Save & Next</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Navigator Modal */}
      <Modal visible={showNavModal} transparent animationType="slide">
        <TouchableOpacity style={s.modalOverlay} activeOpacity={1} onPress={() => setShowNavModal(false)} />
        <View style={s.navModal}>
          <TouchableOpacity style={s.closeX} onPress={() => setShowNavModal(false)}>
            <Text style={s.closeXText}>✕</Text>
          </TouchableOpacity>
          <Text style={s.navTitle}>{subject}</Text>
          <View style={s.navDivider} />
          <View style={s.navInfo}>
            <Text style={s.navQCount}>Questions: {QUESTIONS.length}</Text>
            <Text style={s.navInfoIcon}>ⓘ</Text>
          </View>

          <View style={s.navGrid}>
            {QUESTIONS.map((_, i) => {
              const isAnswered = answers[i] !== null;
              const isMR = markedReview[i];
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    s.navCell,
                    isAnswered && s.navCellAnswered,
                    i === currentQ && s.navCellCurrent,
                  ]}
                  onPress={() => {
                    setCurrentQ(i);
                    setShowNavModal(false);
                  }}
                >
                  <Text style={[s.navCellText, isAnswered && s.navCellTextAnswered]}>{i + 1}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Legend */}
          <View style={s.legendRow}>
            {[
              { color: '#0513A0', label: 'Answered' },
              { color: '#8B1A1A', label: 'Not Answered' },
              { color: '#C9A227', label: 'Marked For Review' },
            ].map((l) => (
              <View key={l.label} style={s.legendItem}>
                <View style={[s.legendDot, { backgroundColor: l.color }]} />
                <Text style={s.legendText}>{l.label}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={s.navSubmitBtn} onPress={handleSubmit}>
            <Text style={s.navSubmitText}>Submit Test</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Summary Modal */}
      <Modal visible={showSummaryModal} transparent animationType="fade">
        <View style={s.summaryOverlay}>
          <View style={s.summaryModal}>
            <Text style={s.summaryTitle}>Test Summary</Text>
            <Text style={s.summarySubtitle}>Your responses are saved successfully!</Text>

            <View style={s.summaryTable}>
              <View style={s.summaryHeader}>
                <Text style={s.summaryTH}>Section</Text>
                <Text style={s.summaryTH}>Attempted</Text>
                <Text style={s.summaryTH}>Skipped</Text>
              </View>
              <View style={s.summaryRow}>
                <Text style={s.summaryTD}>Civil Law</Text>
                <Text style={s.summaryTD}>{attempted}</Text>
                <Text style={s.summaryTD}>{skipped}</Text>
              </View>
              <View style={[s.summaryRow, { borderTopWidth: 1, borderTopColor: '#eee' }]}>
                <Text style={[s.summaryTD, { fontWeight: '700' }]}>Total</Text>
                <Text style={[s.summaryTD, { fontWeight: '700' }]}>{attempted}</Text>
                <Text style={[s.summaryTD, { fontWeight: '700' }]}>{skipped}</Text>
              </View>
            </View>

            <View style={s.warnRow}>
              <Text style={s.warnIcon}>⚠</Text>
              <Text style={s.warnText}>Are you sure want to submit the test?</Text>
            </View>

            <View style={s.summaryActions}>
              <TouchableOpacity
                style={s.cancelBtn}
                onPress={() => setShowSummaryModal(false)}
              >
                <Text style={s.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.finalSubmitBtn} onPress={handleFinalSubmit}>
                <Text style={s.finalSubmitText}>Submit Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  testNameText: { fontSize: 15, fontWeight: '800', color: '#1a1a2e' },
  timer: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  hamburger: { fontSize: 28, color: '#1a1a2e' },

  scroll: { padding: 16, paddingBottom: 20 },

  qTypRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  qTypeChip: { backgroundColor: '#E8EBF3', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  qTypeText: { fontSize: 11, color: '#555' },
  reviewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewText: { fontSize: 13, color: '#1a1a2e', fontWeight: '600' },

  qBlock: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  qNum: { fontSize: 18, fontWeight: '900', color: '#1a1a2e' },
  qLabel: { fontSize: 16, fontWeight: '700', color: '#1a1a2e' },

  qText: { fontSize: 14, color: '#222', lineHeight: 22, marginBottom: 20 },

  optionsWrap: { gap: 10 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EBF3',
    borderRadius: 10,
    padding: 14,
    gap: 12,
  },
  optionSelected: { backgroundColor: '#0513A0' },

  optLetter: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
  },
  optLetterSelected: { backgroundColor: 'rgba(255,255,255,0.25)' },
  optLetterText: { fontSize: 13, fontWeight: '800', color: '#0513A0' },
  optLetterTextSelected: { color: '#fff' },

  optText: { fontSize: 13, color: '#1a1a2e', flex: 1 },
  optTextSelected: { color: '#fff' },

  reportBtn: { marginTop: 24, alignSelf: 'flex-start' },
  reportText: { color: '#e53935', fontSize: 13 },

  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 120,
    gap: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  prevBtn: {
    flex: 1, height: 46, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  prevText: { color: '#0513A0', fontWeight: '700' },
  nextBtn: {
    flex: 1, height: 46, borderRadius: 10,
    backgroundColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  nextText: { color: '#fff', fontWeight: '700' },
  submitBtn: {
    flex: 1, height: 46, borderRadius: 10,
    backgroundColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700' },

  // Nav modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  navModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  closeX: { position: 'absolute', top: 16, right: 20 },
  closeXText: { fontSize: 18, color: '#333' },
  navTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 4 },
  navDivider: { height: 2, backgroundColor: '#e53935', width: 60, marginBottom: 10 },
  navInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  navQCount: { fontSize: 13, color: '#555' },
  navInfoIcon: { fontSize: 14, color: '#888' },
  navGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  navCell: {
    width: 44, height: 44, borderRadius: 8,
    borderWidth: 1.5, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center',
  },
  navCellAnswered: { backgroundColor: '#0513A0', borderColor: '#0513A0' },
  navCellCurrent: { borderColor: '#C9A227', borderWidth: 2.5 },
  navCellText: { fontSize: 14, fontWeight: '700', color: '#1a1a2e' },
  navCellTextAnswered: { color: '#fff' },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 14, height: 14, borderRadius: 7 },
  legendText: { fontSize: 11, color: '#555' },
  navSubmitBtn: {
    backgroundColor: '#0513A0', height: 48, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  navSubmitText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Summary modal
  summaryOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center', justifyContent: 'center', padding: 20,
  },
  summaryModal: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%',
  },
  summaryTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e', marginBottom: 4 },
  summarySubtitle: { fontSize: 12, color: '#777', marginBottom: 14 },
  summaryTable: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 14 },
  summaryHeader: { flexDirection: 'row', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 8 },
  summaryRow: { flexDirection: 'row', padding: 10 },
  summaryTH: { flex: 1, fontWeight: '700', fontSize: 12, color: '#555' },
  summaryTD: { flex: 1, fontSize: 12, color: '#333' },
  warnRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFF8E1', padding: 10, borderRadius: 8, marginBottom: 16 },
  warnIcon: { fontSize: 16, color: '#C9A227' },
  warnText: { fontSize: 12, color: '#C9A227', fontWeight: '600', flex: 1 },
  summaryActions: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1, height: 44, borderRadius: 10, borderWidth: 1.5, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
  },
  cancelText: { fontSize: 13, color: '#333', fontWeight: '600' },
  finalSubmitBtn: {
    flex: 1, height: 44, borderRadius: 10, backgroundColor: '#8B1A1A',
    alignItems: 'center', justifyContent: 'center',
  },
  finalSubmitText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});