// app/(tabs)/prelims/attempt-history.tsx
// Image 4: AP Civil Procedure Code Mocks — attempt history for a single test
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

export default function AttemptHistoryScreen() {
  const { testTitle = 'Mock Test -1', subject = 'Civil Procedure Code', attempts = '3', testId = 'mt1' } =
    useLocalSearchParams<{ testTitle?: string; subject?: string; attempts?: string; testId?: string }>();

  const attemptCount = parseInt(attempts as string, 10) || 3;
  const attemptList = Array.from({ length: attemptCount }, (_, i) => i + 1);

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#E8EBF3" />

      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>AP Civil Procedure Code Mocks</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        {attemptList.map((attempt) => (
          <AttemptCard
            key={attempt}
            attemptNumber={attempt}
            testTitle={testTitle as string}
            subject={subject as string}
            testId={testId as string}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function AttemptCard({
  attemptNumber,
  testTitle,
  subject,
  testId,
}: {
  attemptNumber: number;
  testTitle: string;
  subject: string;
  testId: string;
}) {
  const label =
    attemptNumber === 1
      ? `${testTitle}`
      : `${testTitle} (Attempt ${attemptNumber})`;

  return (
    <View style={s.card}>
      <Text style={s.attemptTitle}>{label}</Text>

      <View style={s.row}>
        <View style={s.infoSide}>
          <View style={s.iconRow}>
            <Text style={s.icon}>⚖️</Text>
            <View>
              <Text style={s.subjectName}>{subject}</Text>
              <Text style={s.subMeta}>30 Questions | 3 Hours</Text>
            </View>
          </View>

          <TouchableOpacity
            style={s.viewResultBtn}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/prelims/mock-test-result',
                params: { subject, testId, attemptNumber },
              })
            }
          >
            <Text style={s.viewResultText}>View Result</Text>
          </TouchableOpacity>
        </View>

        {/* Circular progress placeholder */}
        <View style={s.circleWrap}>
          <View style={s.circle}>
            <Text style={s.circleText}>75%</Text>
          </View>
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
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e', flexShrink: 1 },

  scroll: { padding: 14, gap: 14, paddingBottom: 32 },

  card: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 14,
    elevation: 2,
  },
  attemptTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 10 },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  infoSide: { flex: 1 },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  icon: { fontSize: 24 },
  subjectName: { fontSize: 13, fontWeight: '700', color: '#1a1a2e' },
  subMeta: { fontSize: 11, color: '#666', marginTop: 2 },

  viewResultBtn: {
    backgroundColor: '#C9A227',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewResultText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  circleWrap: { marginLeft: 16 },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#C9A227',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  circleText: { fontSize: 13, fontWeight: '800', color: '#C9A227' },
});