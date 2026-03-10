// app/(tabs)/prelims/grand-test-info.tsx
// Image 15 left: Standalone Grand Test Information screen
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GrandTestInfoScreen() {
  const {
    testId = 'gt1',
    testTitle = 'Grand Test - Series 1',
    questions = '200',
    mins = '150',
  } = useLocalSearchParams<{ testId?: string; testTitle?: string; questions?: string; mins?: string }>();

  const handleStartTest = () => {
    router.push({
      pathname: '/(tabs)/prelims/terms-conditions',
      params: {
        testTitle: `Civil Laws Grand Test`,
        testType: 'grand',
        subject: 'All Subjects',
        testId,
      },
    });
  };

  const handleResults = () => {
    router.push({
      pathname: '/(tabs)/prelims/test-performance',
      params: { subject: 'All Subjects', testId, testType: 'grand' },
    });
  };

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Grand Test Information</Text>
      </View>

      <View style={s.content}>
        {/* Big illustration */}
        <View style={s.illustrationWrap}>
          <Text style={s.mainIllustration}>🎓</Text>
          <View style={s.orbitsContainer}>
            {[
              { icon: '⚛️', top: 20, left: 30 },
              { icon: '💻', top: 20, right: 30 },
              { icon: '🏛️', bottom: 20, left: 30 },
              { icon: '📚', bottom: 20, right: 30 },
            ].map((item, i) => (
              <View key={i} style={[s.orbitIcon, { top: item.top, bottom: item.bottom, left: item.left, right: item.right }]}>
                <Text style={{ fontSize: 28 }}>{item.icon}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Info card */}
        <View style={s.infoCard}>
          <Text style={s.infoTitle}>All Subjects One Challenge</Text>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Total Questions :</Text>
            <Text style={s.infoValue}>{questions}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Time Limit :</Text>
            <Text style={s.infoValue}>{mins} Mins</Text>
          </View>
        </View>
      </View>

      {/* Bottom buttons */}
      <View style={s.bottomRow}>
        <TouchableOpacity style={s.resultsBtn} onPress={handleResults}>
          <Text style={s.resultsBtnText}>Results</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.startBtn} onPress={handleStartTest}>
          <Text style={s.startBtnText}>Start Test</Text>
        </TouchableOpacity>
      </View>
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
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#1a1a2e' },

  content: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center', gap: 24 },

  illustrationWrap: {
    width: 260, height: 260, alignItems: 'center', justifyContent: 'center',
    position: 'relative', backgroundColor: '#EEF2FF', borderRadius: 130,
  },
  mainIllustration: { fontSize: 100 },
  orbitsContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  orbitIcon: { position: 'absolute' },

  infoCard: {
    width: '100%', backgroundColor: '#fff', borderRadius: 14,
    padding: 16, elevation: 2,
  },
  infoTitle: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1a1a2e' },

  bottomRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  resultsBtn: {
    flex: 1, height: 48, borderRadius: 10,
    backgroundColor: '#C9A227',
    alignItems: 'center', justifyContent: 'center',
  },
  resultsBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  startBtn: {
    flex: 1, height: 48, borderRadius: 10,
    backgroundColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  startBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});