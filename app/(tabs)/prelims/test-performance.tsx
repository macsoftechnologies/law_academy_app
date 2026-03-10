// app/(tabs)/prelims/test-performance.tsx
// Image 12: Overall Performance Summary after test submission
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TestPerformanceScreen() {
  const {
    subject = 'Civil Procedure Code',
    testId = 'q1',
    testType = 'quiz',
  } = useLocalSearchParams<{ subject?: string; testId?: string; testType?: string }>();

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={s.headerTitle}>{subject}</Text>
          <Text style={s.headerSub}>Attempted on: Nov 28, 2025 | 3:06 PM</Text>
        </View>
      </View>

      {/* Content */}
      <View style={s.content}>
        <Text style={s.sectionTitle}>Overall Performance Summary</Text>

        {/* Score */}
        <View style={s.statCard}>
          <View style={s.statCircle}>
            <Text style={s.statCircleInner}>✓</Text>
          </View>
          <View>
            <Text style={s.statValue}>0.0 | 5</Text>
            <Text style={s.statLabel}>Your Score</Text>
          </View>
        </View>

        {/* Time spent */}
        <View style={[s.statCard, { backgroundColor: '#FFF3E0' }]}>
          <View style={[s.statCircle, { borderColor: '#FF9800' }]}>
            <Text style={s.statCircleInner}>⏱</Text>
          </View>
          <View>
            <Text style={s.statValue}>00:53 | 03:00</Text>
            <Text style={s.statLabel}>Time Spent</Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={s.statsGrid}>
          <StatGridCell icon="★" value="88 | 99" label="Your Rank" color="#C9A227" bg="#FFF8E1" />
          <StatGridCell icon="⏰" value="12.1 | 100" label="Percentile" color="#8B1A1A" bg="#FFF0F0" />
          <StatGridCell icon="◎" value="0.0 | 100" label="Accuracy" color="#1A3C8B" bg="#EEF2FF" />
        </View>
      </View>

      {/* Bottom actions */}
      <View style={s.bottomArea}>
        <View style={s.actionRow}>
          <TouchableOpacity
            style={s.cancelBtn}
            onPress={() => router.dismissAll()}
          >
            <Text style={s.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.reAttemptBtn}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/prelims/terms-conditions',
                params: { testType, subject, testId },
              })
            }
          >
            <Text style={s.reAttemptText}>Re- Attempt</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={s.viewSolutionsBtn}
          onPress={() =>
            router.push({
              pathname: '/(tabs)/prelims/view-solutions',
              params: { subject, testId },
            })
          }
        >
          <Text style={s.viewSolutionsText}>View Solutions</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function StatGridCell({
  icon, value, label, color, bg,
}: {
  icon: string; value: string; label: string; color: string; bg: string;
}) {
  return (
    <View style={[gc.cell, { backgroundColor: bg }]}>
      <Text style={[gc.icon, { color }]}>{icon}</Text>
      <Text style={[gc.value, { color }]}>{value}</Text>
      <Text style={gc.label}>{label}</Text>
    </View>
  );
}

const gc = StyleSheet.create({
  cell: { flex: 1, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4 },
  icon: { fontSize: 22 },
  value: { fontSize: 14, fontWeight: '800' },
  label: { fontSize: 10, color: '#555', textAlign: 'center' },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8EBF3' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  back: { fontSize: 28, color: '#1a1a2e' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e' },
  headerSub: { fontSize: 11, color: '#666', marginTop: 2 },

  content: { flex: 1, padding: 16, gap: 12 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 4 },

  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 14,
  },
  statCircle: {
    width: 44, height: 44, borderRadius: 22,
    borderWidth: 2, borderColor: '#1A3C8B',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  statCircleInner: { fontSize: 20 },
  statValue: { fontSize: 16, fontWeight: '800', color: '#1a1a2e' },
  statLabel: { fontSize: 11, color: '#666', marginTop: 2 },

  statsGrid: { flexDirection: 'row', gap: 10 },

  bottomArea: { paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 90, gap: 10 },
  actionRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: {
    flex: 1, height: 46, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#8B1A1A',
    alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
  },
  cancelText: { color: '#8B1A1A', fontWeight: '700' },
  reAttemptBtn: {
    flex: 1, height: 46, borderRadius: 10,
    backgroundColor: '#8B1A1A',
    alignItems: 'center', justifyContent: 'center',
  },
  reAttemptText: { color: '#fff', fontWeight: '700' },
  viewSolutionsBtn: {
    height: 50, borderRadius: 12,
    backgroundColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  viewSolutionsText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});