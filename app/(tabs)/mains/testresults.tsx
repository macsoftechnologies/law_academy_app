// app/(tabs)/mains/testresults.tsx

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

const MOCK_TESTS = [
  {
    testName: 'Mains Test -1',
    subjects: [
      { id: 's1', name: 'Civil Law', questions: 30, hours: 3, status: 'Pending', score: null },
      { id: 's2', name: 'Criminal Law', questions: 30, hours: 3, status: 'Evaluated', score: 75 },
    ],
  },
  {
    testName: 'Mains Test -1 (Attempt 2)',
    subjects: [
      { id: 's3', name: 'Civil Law', questions: 30, hours: 3, status: 'Evaluated', score: 75 },
      { id: 's4', name: 'Criminal Law', questions: 30, hours: 3, status: 'Evaluated', score: 75 },
    ],
  },
  {
    testName: 'Mains Test -1 (Attempt 3)',
    subjects: [
      { id: 's5', name: 'Civil Law', questions: 30, hours: 3, status: 'Evaluated', score: 75 },
      { id: 's6', name: 'Criminal Law', questions: 30, hours: 3, status: 'Evaluated', score: 75 },
    ],
  },
];

function CircleProgress({ pct }: { pct: number }) {
  // Simple SVG-free circle using border trick
  const rotation = Math.round((pct / 100) * 360);
  return (
    <View style={cp.wrap}>
      <View style={cp.track}>
        <View style={[cp.fill, { transform: [{ rotate: `${rotation}deg` }] }]} />
      </View>
      <View style={cp.center}>
        <Text style={cp.pctTxt}>{pct}%</Text>
      </View>
    </View>
  );
}

const cp = StyleSheet.create({
  wrap: { width: 54, height: 54, alignItems: 'center', justifyContent: 'center' },
  track: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: '#E8E8E8',
    position: 'absolute',
  },
  fill: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#C9A227',
    borderRightColor: '#C9A227',
    position: 'absolute',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pctTxt: { fontSize: 11, fontWeight: '800', color: '#333' },
});

export default function TestResultsScreen() {
  const { examType = 'Mains Test-1' } = useLocalSearchParams<{ examType?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <View style={s.headerCenter}>
          <Text style={s.headerTop}>AP JCJ Mains Preparation</Text>
          <Text style={s.headerSub}>Mains Test Series</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {MOCK_TESTS.map((test, ti) => (
          <View key={ti} style={s.testGroup}>
            <Text style={s.testName}>{test.testName}</Text>

            {/* Horizontal scroll for subject cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.hScroll}>
              {test.subjects.map((sub) => (
                <View key={sub.id} style={s.subjectCard}>
                  {/* Icon + Name */}
                  <View style={s.cardTop}>
                    <Text style={s.subjectIcon}>⚖️</Text>
                    <Text style={s.subjectName}>{sub.name}</Text>
                  </View>
                  <Text style={s.subjectMeta}>{sub.questions} Questions | {sub.hours} Hours</Text>

                  {/* Bottom: status/button + circle */}
                  <View style={s.cardBottom}>
                    {sub.status === 'Pending' ? (
                      <View style={s.pendingBadge}>
                        <Text style={s.pendingTxt}>Pending</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={s.viewBtn}
                        onPress={() =>
                          router.push({
                            pathname: '/(tabs)/mains/resultdetail',
                            params: {
                              subject: sub.name,
                              examType,
                              scored: sub.score ?? '',
                              totalMarks: 100,
                              rank: '4',
                              outOf: '120',
                              attemptDate: 'Nov 14, 2025',
                              status: sub.status,
                            },
                          })
                        }
                      >
                        <Text style={s.viewBtnTxt}>View Result</Text>
                      </TouchableOpacity>
                    )}

                    {sub.score !== null && (
                      <CircleProgress pct={sub.score} />
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}

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
    backgroundColor: '#EEF0F5',
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerCenter: { flex: 1 },
  headerTop: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  headerSub: { fontSize: 17, fontWeight: '800', color: '#1A1A2E' },

  scroll: { padding: 14, gap: 14 },

  testGroup: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  testName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A2E',
    marginBottom: 12,
  },

  hScroll: { flexDirection: 'row' },

  subjectCard: {
    backgroundColor: '#FDF6E9',
    borderRadius: 12,
    padding: 14,
    width: 160,
    marginRight: 10,
  },

  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  subjectIcon: { fontSize: 16 },
  subjectName: { fontSize: 13, fontWeight: '800', color: '#1A1A2E', flexShrink: 1 },
  subjectMeta: { fontSize: 11, color: '#888', marginBottom: 12 },

  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  pendingBadge: {
    backgroundColor: '#F4E0A0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  pendingTxt: { fontSize: 12, fontWeight: '700', color: '#C9A227' },

  viewBtn: {
    backgroundColor: '#7A1A1A',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },
  viewBtnTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },
});