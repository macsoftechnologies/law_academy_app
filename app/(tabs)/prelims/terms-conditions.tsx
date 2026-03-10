// app/(tabs)/prelims/terms-conditions.tsx
// Image 6: Terms & Conditions modal before starting a test (full screen version)
// Image 15 middle: Terms & Conditions for Grand Test
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsConditionsScreen() {
  const {
    testTitle = 'Civil Laws Mains Test',
    testType = 'mock',
    subject = 'Civil Laws',
    subjectId = 'cpc',
    testId = 'mt1',
  } = useLocalSearchParams<{
    testTitle?: string;
    testType?: string;
    subject?: string;
    subjectId?: string;
    testId?: string;
  }>();

  const [accepted, setAccepted] = useState(false);

  const terms = [
    `Are you sure you want to start the ${testTitle}?`,
    'Once the test begins, you must complete it within 3 hours.',
    "After submission time, you'll get an additional 15 minutes grace period to scan your answer sheets, convert them into a PDF, and upload the file.",
    'Once started, the test cannot be paused or restarted.',
  ];

  const handleStartTest = () => {
    if (!accepted) return;
    router.push({
      pathname: '/(tabs)/prelims/test-instructions',
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
        <Text style={s.headerTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <View style={s.card}>
          <Text style={s.noteLabel}>Note:</Text>

          {terms.map((term, i) => (
            <View key={i} style={s.termRow}>
              <Text style={s.termNum}>{i + 1}.</Text>
              <Text style={s.termText}>{term}</Text>
            </View>
          ))}

          {/* Accept checkbox */}
          <TouchableOpacity
            style={s.checkRow}
            onPress={() => setAccepted(!accepted)}
            activeOpacity={0.7}
          >
            <View style={[s.checkbox, accepted && s.checkboxChecked]}>
              {accepted && <Text style={s.checkMark}>✓</Text>}
            </View>
            <Text style={s.checkLabel}>I accept Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom buttons */}
      <View style={s.bottomRow}>
        <TouchableOpacity style={s.cancelBtn} onPress={() => router.back()}>
          <Text style={s.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.startBtn, !accepted && s.startBtnDisabled]}
          onPress={handleStartTest}
          disabled={!accepted}
        >
          <Text style={s.startText}>Start Test</Text>
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

  scroll: { padding: 16, paddingBottom: 20 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  noteLabel: { fontSize: 16, fontWeight: '800', color: '#1a1a2e', marginBottom: 14 },

  termRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  termNum: { fontSize: 14, fontWeight: '700', color: '#1a1a2e', minWidth: 18 },
  termText: { fontSize: 13, color: '#333', lineHeight: 20, flex: 1 },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 4,
    borderWidth: 2, borderColor: '#1A3C8B',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#1A3C8B' },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: '800' },
  checkLabel: { fontSize: 13, color: '#1a1a2e', fontWeight: '600' },

 bottomRow: {
  flexDirection: 'row',
  paddingHorizontal: 16,
  paddingTop: 12,
  paddingBottom: 120, // 👈 increase this (was 16)
  gap: 12,
  backgroundColor: '#E8EBF3', // optional for cleaner separation
},
  cancelBtn: {
    flex: 1, height: 48, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#ccc',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cancelText: { fontSize: 14, color: '#333', fontWeight: '600' },

  startBtn: {
    flex: 1, height: 48, borderRadius: 10,
    backgroundColor: '#0513A0',
    alignItems: 'center', justifyContent: 'center',
  },
  startBtnDisabled: { backgroundColor: '#9db0e8' },
  startText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  
});
