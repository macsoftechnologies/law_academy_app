// app/(tabs)/prelims/quizzes.tsx
// Image 16 left: Quizzes — list of quizzes with search, Result + Attempt buttons per quiz
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUIZZES = [
  { id: 'qz1', title: 'Civil Procedure code', questions: 30, hasAttempts: true },
  { id: 'qz2', title: 'Civil Procedure code', questions: 30, hasAttempts: true },
  { id: 'qz3', title: 'Civil Procedure code', questions: 30, hasAttempts: true },
  { id: 'qz4', title: 'Civil Procedure code', questions: 30, hasAttempts: true },
  { id: 'qz5', title: 'Civil Procedure code', questions: 30, hasAttempts: false },
];

export default function QuizzesScreen() {
  const [search, setSearch] = useState('');

  const filtered = QUIZZES.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Quizzes</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {/* Hero banner */}
        <View style={s.heroBanner}>
          <View style={s.heroTextWrap}>
            <Text style={s.heroH1}>Test Your Knowledge with{'\n'}Quizzes</Text>
            <Text style={s.heroSub}>
              You're just looking for a playful way to learn new facts, our quizzes are designed to entertain and educate.
            </Text>
            <TouchableOpacity style={s.playBtn}>
              <Text style={s.playBtnText}>Play Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={s.heroIcon}>🏆</Text>
        </View>

        {/* Search bar */}
        <View style={s.searchWrap}>
          <View style={s.searchBar}>
            <Text style={s.searchIcon}>🔍</Text>
            <TextInput
              style={s.searchInput}
              placeholder="Search for.."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity style={s.filterBtn}>
            <Text style={s.filterIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Quiz list */}
        {filtered.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function QuizCard({ quiz }: { quiz: typeof QUIZZES[0] }) {
  const handleAttempt = () => {
    router.push({
      pathname: '/(tabs)/prelims/quiz-attempts',
      params: { quizId: quiz.id, quizTitle: quiz.title, questions: quiz.questions },
    });
  };

  return (
    <View style={s.card}>
      <View style={s.cardIcon}>
        <Text style={s.cardIconText}>⚖️</Text>
      </View>
      <View style={s.cardBody}>
        <Text style={s.cardTitle}>{quiz.title}</Text>
        <Text style={s.cardMeta}>{quiz.questions} Questions</Text>
        <View style={s.actionRow}>
          {quiz.hasAttempts && (
            <TouchableOpacity
              style={s.resultBtn}
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/prelims/quiz-attempts',
                  params: { quizId: quiz.id, quizTitle: quiz.title, questions: quiz.questions },
                })
              }
            >
              <Text style={s.resultBtnText}>Result</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={s.attemptBtn} onPress={handleAttempt}>
            <Text style={s.attemptBtnText}>Attempt ›</Text>
          </TouchableOpacity>
        </View>
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

  scroll: { padding: 14, gap: 12, paddingBottom: 32 },

  heroBanner: {
    backgroundColor: '#1A3C8B',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  heroTextWrap: { flex: 1 },
  heroH1: { fontSize: 15, fontWeight: '800', color: '#fff', lineHeight: 20, marginBottom: 6 },
  heroSub: { fontSize: 10, color: '#aad4ff', lineHeight: 14, marginBottom: 10 },
  playBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, alignSelf: 'flex-start',
  },
  playBtnText: { fontSize: 11, fontWeight: '700', color: '#1A3C8B' },
  heroIcon: { fontSize: 60, marginLeft: 10 },

  searchWrap: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, height: 42,
    gap: 8, elevation: 1,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 13, color: '#1a1a2e' },
  filterBtn: {
    width: 42, height: 42, borderRadius: 10,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    elevation: 1,
  },
  filterIcon: { fontSize: 18 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    gap: 12,
    elevation: 2,
  },
  cardIcon: {
    width: 52, height: 52, borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center', justifyContent: 'center',
  },
  cardIconText: { fontSize: 26 },
  cardBody: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#1a1a2e', marginBottom: 2 },
  cardMeta: { fontSize: 11, color: '#888', marginBottom: 8 },
  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  resultBtn: {
    backgroundColor: '#FFF8E1', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
  },
  resultBtnText: { fontSize: 12, color: '#C9A227', fontWeight: '700' },
  attemptBtn: {
    backgroundColor: '#FFF0F0', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
  },
  attemptBtnText: { fontSize: 12, color: '#8B1A1A', fontWeight: '700' },
});