import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal, ScrollView, StatusBar, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BG = '#E8EAF0';
const NAVY = '#1A2E6E';
const CRIMSON = '#8B1A1A';

const COMMON_ISSUES = [
  { icon: '🖥', label: 'Course Content Access' },
  { icon: '💳', label: 'Payment & Billing' },
  { icon: '⚙️', label: 'Payment & Billing' },
];

export default function HelpCenterScreen() {
  const [problem, setProblem] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (!problem.trim()) return;
    setShowSuccess(true);
  };

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={12}>
          <Text style={s.back}>‹</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Help Center</Text>
        <TouchableOpacity
          style={s.ticketsBtn}
          onPress={() => router.push('/helpcenter/tickets' as any)}
        >
          <Text style={s.ticketsBtnTxt}>Tickets Status</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        {/* Problem textarea */}
        <View style={s.textAreaWrap}>
          <TextInput
            style={s.textArea}
            placeholder="Describe your problem..."
            placeholderTextColor="#AAACB0"
            multiline
            numberOfLines={6}
            value={problem}
            onChangeText={setProblem}
            textAlignVertical="top"
          />
        </View>

        {/* Common Issues */}
        <Text style={s.sectionTitle}>Common Issues</Text>
        <View style={s.issueList}>
          {COMMON_ISSUES.map((issue, i) => (
            <TouchableOpacity key={i} style={s.issueRow} activeOpacity={0.7}>
              <Text style={s.issueIcon}>{issue.icon}</Text>
              <Text style={s.issueLabel}>{issue.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Submit button */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.submitBtn} onPress={handleSubmit}>
          <Text style={s.submitTxt}>Submit Problem</Text>
        </TouchableOpacity>
      </View>

      {/* Success modal */}
      <Modal visible={showSuccess} transparent animationType="slide">
        <View style={s.modalOverlay}>
          <TouchableOpacity style={s.modalDim} onPress={() => {}} />
          <View style={s.successSheet}>
            {/* Check circle */}
            <View style={s.checkCircleWrap}>
              <View style={s.checkCircle}>
                <Text style={s.checkMark}>✓</Text>
              </View>
              <View style={s.doneBadge}>
                <Text style={s.doneTxt}>Done</Text>
              </View>
              {/* Decorative dots */}
              <View style={[s.dot, { top: 10, left: 20, backgroundColor: '#FF6B6B' }]} />
              <View style={[s.dot, { bottom: 10, left: 30, backgroundColor: '#FFD93D' }]} />
              <View style={[s.dot, { top: 20, right: 10, backgroundColor: '#6BCB77' }]} />
            </View>

            <Text style={s.successTitle}>successfully submitted</Text>
            <View style={s.successSubRow}>
              <Text style={s.clockIcon}>🕐</Text>
              <Text style={s.successSub}>Your query will resolved{'\n'}within 24-28 hours.</Text>
            </View>

            <TouchableOpacity
              style={s.gotItBtn}
              onPress={() => {
                setShowSuccess(false);
                setProblem('');
              }}
            >
              <Text style={s.gotItTxt}>Got It !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  back: { fontSize: 28, color: '#1A1A2E', marginRight: 8, fontWeight: '300', lineHeight: 32 },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  ticketsBtn: {
    backgroundColor: CRIMSON,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 8,
  },
  ticketsBtnTxt: { fontSize: 12, fontWeight: '700', color: '#fff' },

  scroll: { paddingHorizontal: 16, gap: 16 },

  textAreaWrap: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1.5, borderColor: '#1A2E6E',
    padding: 4,
  },
  textArea: {
    height: 140, padding: 12,
    fontSize: 14, color: '#1A1A2E',
  },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },

  issueList: { gap: 10 },
  issueRow: {
    backgroundColor: '#fff', borderRadius: 12,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 16,
    gap: 12,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 3, shadowOffset: { width: 0, height: 1 },
  },
  issueIcon:  { fontSize: 20 },
  issueLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },

  bottomBar: {
    paddingHorizontal: 16, paddingVertical: 16,
    backgroundColor: BG,
  },
  submitBtn: {
    backgroundColor: NAVY, paddingVertical: 16,
    borderRadius: 12, alignItems: 'center',
  },
  submitTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },

  // Modal
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalDim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  successSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 32, alignItems: 'center', gap: 12,
  },
  checkCircleWrap: {
    width: 100, height: 100,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative', marginBottom: 8,
  },
  checkCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: '#81C784',
  },
  checkMark: { fontSize: 36, color: '#fff', fontWeight: '900' },
  doneBadge: {
    position: 'absolute', top: -8, right: -4,
    backgroundColor: NAVY,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12,
  },
  doneTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },
  dot: {
    position: 'absolute', width: 8, height: 8, borderRadius: 4,
  },
  successTitle: { fontSize: 20, fontWeight: '900', color: '#1A1A2E' },
  successSubRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  clockIcon: { fontSize: 18, marginTop: 2 },
  successSub: { fontSize: 13, color: '#555', textAlign: 'center', lineHeight: 20 },
  gotItBtn: {
    backgroundColor: NAVY, width: '100%',
    paddingVertical: 16, borderRadius: 12,
    alignItems: 'center', marginTop: 12,
  },
  gotItTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});