// app/(tabs)/mains/testsubmitted.tsx

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

export default function TestSubmittedScreen() {
  const {
    examType = 'Mains Test-1',
    subjectName = 'Civil Laws',
    subjectId = 'civil',
  } = useLocalSearchParams<{
    examType?: string;
    subjectName?: string;
    subjectId?: string;
  }>();

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <SafeAreaView style={s.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.screenBg} />

      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Done badge + checkmark */}
        <View style={s.topSection}>
          <View style={s.checkWrap}>
            {/* Decorative dots */}
            <View style={[s.dot, s.dotTopLeft]} />
            <View style={[s.dot, s.dotTopRight]} />
            <View style={[s.dot, s.dotBottomLeft]} />

            <View style={s.checkCircle}>
              <Text style={s.checkMark}>✓</Text>
            </View>
            <View style={s.doneBadge}>
              <Text style={s.doneTxt}>Done</Text>
            </View>
          </View>

          <Text style={s.title}>Exam Submitted</Text>
        </View>

        {/* Illustration placeholder — replace with actual image when available */}
        <View style={s.illustrationBox}>
          {/* Trophy + graduation illustration */}
          <View style={s.illustrationInner}>
            <Text style={s.illustrationEmoji}>🏆</Text>
            <View style={s.stackedBooks}>
              <View style={[s.book, { backgroundColor: '#7B6CF6' }]} />
              <View style={[s.book, { backgroundColor: '#E8A838', width: 100 }]} />
              <View style={[s.book, { backgroundColor: '#5BC4D1', width: 90 }]} />
            </View>
            <View style={s.graduateWrap}>
              <Text style={s.graduateEmoji}>🎓</Text>
            </View>
            <View style={s.successTag}>
              <Text style={s.successTxt}>SUCCESS</Text>
            </View>
          </View>
        </View>

        {/* Message */}
        <Text style={s.message}>
          Your responses have been{'\n'}submitted successfully.{'\n'}
          <Text style={s.messageBold}>Your Answers are evaluated within 48hrs</Text>
        </Text>

        {/* Info box */}
        <View style={s.infoBox}>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Exam :</Text>
            <Text style={s.infoValue}>JCJ {subjectName}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Date :</Text>
            <Text style={s.infoValue}>{dateStr}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Time :</Text>
            <Text style={s.infoValue}>{timeStr}</Text>
          </View>
        </View>

        {/* Go to Test Series button */}
        <TouchableOpacity
          style={s.btn}
          onPress={() => router.replace('/(tabs)/mains')}
        >
          <Text style={s.btnTxt}>Go to Test Series</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#EEF0F5' },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
  },

  topSection: { alignItems: 'center', marginBottom: 24 },

  checkWrap: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotTopLeft: { backgroundColor: '#F4B942', top: 0, left: 4 },
  dotTopRight: { backgroundColor: '#E05C5C', top: 4, right: 0 },
  dotBottomLeft: { backgroundColor: '#5BC4D1', bottom: 4, left: 0 },

  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  checkMark: { fontSize: 32, color: '#fff', fontWeight: '800' },

  doneBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  doneTxt: { fontSize: 11, fontWeight: '700', color: '#fff' },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
    textAlign: 'center',
  },

  // Illustration
  illustrationBox: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  illustrationInner: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    width: 200,
    height: 160,
  },
  illustrationEmoji: {
    fontSize: 64,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  stackedBooks: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    gap: 4,
  },
  book: {
    height: 14,
    width: 110,
    borderRadius: 3,
  },
  graduateWrap: {
    position: 'absolute',
    top: 10,
    right: 40,
  },
  graduateEmoji: { fontSize: 28 },
  successTag: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: '#3B5BDB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  successTxt: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 1 },

  // Message
  message: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  messageBold: { fontWeight: '700', color: '#333' },

  // Info box
  infoBox: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: { fontSize: 14, fontWeight: '600', color: '#555' },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },

  // Button
  btn: {
    width: '100%',
    backgroundColor: '#1A2E6E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnTxt: { fontSize: 15, fontWeight: '700', color: '#fff' },
});